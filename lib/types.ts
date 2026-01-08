// lib/types.ts

export interface ImportRow {
  title: string;
  description: string;
  labels: string[]; // Tablica stringów po splicie
  assignees: string[]; // Tablica loginów po splicie
  milestone?: string; // Tytuł milestone'a
}

export interface ImportResult {
  ok: boolean;
  processedCount: number;
  created: {
    rowIndex: number;
    issueNumber: number;
    url: string;
    title: string;
  }[];
  errors: {
    rowIndex: number;
    error: string;
    rowTitle: string;
  }[];
}

export interface ImportRequest {
  owner: string;
  repo: string;
  projectNumber?: number; // Opcjonalny numer projektu
  rows: ImportRow[];
}
