import Papa from "papaparse";
import * as XLSX from "xlsx";
import { ImportRow } from "./types";

/**
 * Parsuje plik (CSV lub Excel) do ustandaryzowanej tablicy ImportRow.
 */
export async function parseFileToRows(file: File): Promise<ImportRow[]> {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (extension === "csv") {
    return parseCsv(file);
  } else if (["xls", "xlsx"].includes(extension || "")) {
    return parseExcel(file);
  } else {
    throw new Error("Nieobsługiwany format pliku. Użyj CSV lub XLSX.");
  }
}

function normalizeRow(raw: any): ImportRow | null {
  // Mapowanie kolumn (case insensitive keys to standard keys)
  const keys = Object.keys(raw);
  const getVal = (keyPart: string) => {
    const foundKey = keys.find((k) =>
      k.toLowerCase().includes(keyPart.toLowerCase())
    );
    return foundKey ? raw[foundKey] : "";
  };

  const title = getVal("Title")?.toString().trim();
  if (!title) return null; // Title is mandatory

  const desc = getVal("Description")?.toString().trim() || "";
  // Search for "Label" to match both "Label" and "Labels" columns
  const labelsStr = getVal("Label")?.toString().trim() || "";
  const assigneesStr = getVal("Assignee")?.toString().trim() || "";
  const milestone = getVal("Milestone")?.toString().trim();

  return {
    title,
    description: desc,
    labels: splitList(labelsStr),
    assignees: splitList(assigneesStr),
    milestone: milestone || undefined,
  };
}

function splitList(str: string): string[] {
  if (!str) return [];
  return str
    .split(/[,;]/) // Dzieli po przecinku lub średniku
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function parseCsv(file: File): Promise<ImportRow[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data
          .map((r) => normalizeRow(r))
          .filter((r): r is ImportRow => r !== null);
        resolve(rows);
      },
      error: (err) => reject(err),
    });
  });
}

function parseExcel(file: File): Promise<ImportRow[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        
        const rows = json
          .map((r) => normalizeRow(r))
          .filter((r): r is ImportRow => r !== null);
        resolve(rows);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsBinaryString(file);
  });
}
