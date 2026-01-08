// lib/github.ts
import { Octokit } from "octokit";
import pLimit from "p-limit";
import { ImportRow, ImportResult } from "./types";
import { labelNameToColorHex } from "./labelColor";

export async function processImport(
  token: string,
  owner: string,
  repo: string,
  rows: ImportRow[],
  projectNumber?: number
): Promise<ImportResult> {
  const octokit = new Octokit({ auth: token });
  const result: ImportResult = {
    ok: true,
    processedCount: 0,
    created: [],
    errors: [],
  };

  // --- Faza A & B: Labels & Milestones ---
  // (Bez zmian w logice labeli/milestone'ów)
  const allLabels = new Set<string>();
  const allMilestones = new Set<string>();

  rows.forEach((row) => {
    row.labels.forEach((l) => allLabels.add(l));
    if (row.milestone) allMilestones.add(row.milestone);
  });

  try {
    const existingLabels = await octokit.paginate(octokit.rest.issues.listLabelsForRepo, { owner, repo });
    const existingLabelNamesLower = new Set(existingLabels.map((l) => l.name.toLowerCase()));

    for (const label of Array.from(allLabels)) {
      if (!existingLabelNamesLower.has(label.toLowerCase())) {
        try {
          await octokit.rest.issues.createLabel({
            owner,
            repo,
            name: label,
            color: labelNameToColorHex(label),
          });
          existingLabelNamesLower.add(label.toLowerCase());
        } catch (e: any) {
          if (e.status !== 422) console.warn(`Label warning: ${e.message}`);
        }
      }
    }

    const existingMilestones = await octokit.paginate(octokit.rest.issues.listMilestones, { owner, repo, state: "all" });
    const milestoneMap = new Map<string, number>();
    existingMilestones.forEach((m) => milestoneMap.set(m.title, m.number));

    for (const msTitle of Array.from(allMilestones)) {
      if (!milestoneMap.has(msTitle)) {
        const created = await octokit.rest.issues.createMilestone({ owner, repo, title: msTitle });
        milestoneMap.set(msTitle, created.data.number);
      }
    }

    // --- Faza C: Prepare Project & Backlog Status ---
    let projectId: string | null = null;
    let statusFieldId: string | null = null;
    let backlogOptionId: string | null = null;

    if (projectNumber) {
      try {
        projectId = await getProjectNodeId(octokit, owner, projectNumber);
        
        // Przygotuj kolumnę "Backlog" (lub znajdź istniejącą)
        const fieldInfo = await ensureBacklogStatus(octokit, projectId);
        if (fieldInfo) {
            statusFieldId = fieldInfo.fieldId;
            backlogOptionId = fieldInfo.optionId;
        } else {
            console.warn("Could not find or create 'Status' field with 'Backlog' option.");
        }
      } catch (e: any) {
        console.error("Project setup warning:", e.message);
      }
    }

    // --- Faza D: Import Issues ---
    const limit = pLimit(3);
    const inputSlice = rows.slice(0, 300);

    const promises = inputSlice.map((row, index) =>
      limit(async () => {
        try {
          const milestoneNumber = row.milestone ? milestoneMap.get(row.milestone) : undefined;

          // 1. Create Issue
          const response = await octokit.rest.issues.create({
            owner,
            repo,
            title: row.title,
            body: row.description,
            labels: row.labels,
            assignees: row.assignees.length > 0 ? row.assignees : undefined,
            milestone: milestoneNumber,
          });

          const issue = response.data;

          // 2. Add to Project & Move to Backlog
          if (projectId && issue.node_id) {
            try {
              const itemId = await addIssueToProject(octokit, projectId, issue.node_id);
              
              if (itemId && statusFieldId && backlogOptionId) {
                  await updateItemStatus(octokit, projectId, itemId, statusFieldId, backlogOptionId);
              }
            } catch (projErr: any) {
              // Logujemy błąd projektu, ale nie przerywamy importu
              console.warn(`Project error for issue #${issue.number}: ${projErr.message}`);
            }
          }

          result.created.push({
            rowIndex: index + 1,
            issueNumber: issue.number,
            url: issue.html_url,
            title: row.title,
          });
        } catch (error: any) {
          result.errors.push({
            rowIndex: index + 1,
            rowTitle: row.title,
            error: error.response?.data?.message || error.message || "Unknown error",
          });
        }
      })
    );

    await Promise.all(promises);
    
    result.processedCount = result.created.length;
    if (result.errors.length > 0) result.ok = false;
    result.created.sort((a, b) => a.rowIndex - b.rowIndex);
    result.errors.sort((a, b) => a.rowIndex - b.rowIndex);

  } catch (globalError: any) {
    throw new Error(`Błąd inicjalizacji importu: ${globalError.message}`);
  }

  return result;
}

// --- GraphQL Helpers ---

async function getProjectNodeId(octokit: Octokit, owner: string, projectNumber: number): Promise<string> {
  // 1. Try User
  try {
    const userRes: any = await octokit.graphql(`
      query($owner: String!, $number: Int!) {
        user(login: $owner) { projectV2(number: $number) { id } }
      }
    `, { owner, number: projectNumber });
    if (userRes.user?.projectV2?.id) return userRes.user.projectV2.id;
  } catch(e) {}

  // 2. Try Org
  try {
    const orgRes: any = await octokit.graphql(`
      query($owner: String!, $number: Int!) {
        organization(login: $owner) { projectV2(number: $number) { id } }
      }
    `, { owner, number: projectNumber });
    if (orgRes.organization?.projectV2?.id) return orgRes.organization.projectV2.id;
  } catch(e) {}

  throw new Error(`Project #${projectNumber} not found.`);
}

async function addIssueToProject(octokit: Octokit, projectId: string, contentId: string): Promise<string> {
  const mutation = `
    mutation($projectId: ID!, $contentId: ID!) {
      addProjectV2ItemById(input: {projectId: $projectId, contentId: $contentId}) {
        item { id }
      }
    }
  `;
  const res: any = await octokit.graphql(mutation, { projectId, contentId });
  return res.addProjectV2ItemById?.item?.id;
}

async function ensureBacklogStatus(octokit: Octokit, projectId: string): Promise<{fieldId: string, optionId: string} | null> {
    // 1. Helper to fetch fields
    const fetchFields = async () => {
        const query = `
          query($projectId: ID!) {
            node(id: $projectId) {
              ... on ProjectV2 {
                fields(first: 100) { # Zwiększono limit do 100
                  nodes {
                    ... on ProjectV2SingleSelectField {
                      id
                      name
                      options {
                        id
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        `;
        const res: any = await octokit.graphql(query, { projectId });
        return res.node?.fields?.nodes || [];
    };

    let fields = await fetchFields();
    const statusField = fields.find((f: any) => f.name === "Status"); // Szukamy pola "Status"

    if (!statusField) return null;

    // 2. Szukamy opcji "Backlog" (case-insensitive)
    let backlogOption = statusField.options.find((o: any) => o.name.toLowerCase() === "backlog");

    if (backlogOption) {
        return { fieldId: statusField.id, optionId: backlogOption.id };
    }

    // 3. Create "Backlog" option if missing
    try {
        const mutation = `
            mutation($fieldId: ID!, $name: String!) {
                createProjectV2FieldOption(input: {fieldId: $fieldId, name: $name}) {
                    projectV2FieldOption { id }
                }
            }
        `;
        const createRes: any = await octokit.graphql(mutation, { fieldId: statusField.id, name: "Backlog" });
        return { 
            fieldId: statusField.id, 
            optionId: createRes.createProjectV2FieldOption.projectV2FieldOption.id 
        };
    } catch (e: any) {
        console.warn("Failed to create Backlog option, retrying fetch...", e.message);
        // Fallback: Może opcja jednak powstała (race condition) lub błąd był mylący. Pobierzmy pola ponownie.
        fields = await fetchFields();
        const refreshedStatusField = fields.find((f: any) => f.name === "Status");
        backlogOption = refreshedStatusField?.options.find((o: any) => o.name.toLowerCase() === "backlog");
        
        if (backlogOption && refreshedStatusField) {
             return { fieldId: refreshedStatusField.id, optionId: backlogOption.id };
        }
    }
    
    return null;
}

async function updateItemStatus(octokit: Octokit, projectId: string, itemId: string, fieldId: string, optionId: string) {
    const mutation = `
        mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $optionId: String!) {
            updateProjectV2ItemFieldValue(input: {
                projectId: $projectId,
                itemId: $itemId,
                fieldId: $fieldId,
                value: { singleSelectOptionId: $optionId }
            }) {
                projectV2Item { id }
            }
        }
    `;
    await octokit.graphql(mutation, { projectId, itemId, fieldId, optionId });
}