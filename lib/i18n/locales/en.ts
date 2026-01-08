import { Dictionary } from '../types';

export const en: Dictionary = {
  common: {
    loading: "Loading...",
    error: "[ERROR]",
    processing: "Processing...",
    executeImport: "Execute Import",
    clearReset: "< Clear and Reset",
    footer: "© TymonPawelczyk 2026",
  },
  home: {
    title: "GitHub Issue Importer",
    tokenLabel: "Personal Access Token",
    tokenPlaceholder: "ghp_...",
    tokenHelp: "Token is used only for this request and is not stored. Requires `repo` and `project` scopes.",
    tokenCreateLabel: "Generate one here",
    ownerLabel: "Repo Owner",
    ownerPlaceholder: "Your GitHub username",
    repoLabel: "Repo Name",
    repoPlaceholder: "Your repository name",
    projectLabel: "Project ID",
    projectPlaceholder: "e.g. 12",
    fileLabel: "Source File (CSV / XLSX)",
    fileHelp: "Required: Title. Optional: Description, Labels, Assignee, Milestone.",
    chooseFile: "Choose File",
    noFileSelected: "No file chosen",
    loadedRows: (count) => `Loaded ${count} rows.`,
    reportTitle: "Execution Report",
    created: "Created",
    errors: "Errors",
    errorLogs: "Error Logs:",
    lastCreated: "Last Created:",
    dataPreview: "Data Preview (First 50)",
    tableHeaders: {
      number: "#",
      title: "Title",
      labels: "Labels",
      assignee: "Assignee",
      milestone: "Milestone",
    },
    moreRows: (count) => `...and ${count} more.`,
  },
  modal: {
    buttonTitle: "Security & How it works",
    title: "Security & How it Works",
    byokTitle: "🔐 Bring Your Own Key (BYOK)",
    byokText1: "This application operates on a stateless model. We do not have a database. Your Personal Access Token is:",
    byokList: [
      "Sent directly from your browser to the backend via encrypted HTTPS.",
      "Kept in the server's RAM only for the duration of the request (seconds).",
      "Permanently discarded immediately after the operation completes."
    ],
    importTitle: "🚀 How the Import Works",
    importList: [
      "Parsing: Your CSV/Excel file is processed securely to extract titles, descriptions, labels, and milestones.",
      "Setup: The app checks if the necessary Labels and Milestones exist in your repo. If not, it creates them for you automatically.",
      "Creation: Issues are created via the official GitHub API. If you provided a Project ID, tasks are added to your project and moved to the 'Backlog' column."
    ],
    openSourceTitle: "✅ Open Source Transparency",
    openSourceText: "The source code is completely transparent. You can verify exactly how your token is handled by inspecting the repository. This ensures that no hidden data collection occurs.",
    viewSource: "View Source on GitHub",
    closeButton: "I Understand, Let's Import!",
  }
};
