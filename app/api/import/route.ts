// app/api/import/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { processImport } from "@/lib/github";
import { ImportRow } from "@/lib/types";

// Wymuszenie środowiska Node.js dla api route (dla p-limit i octokit)
export const runtime = "nodejs";

const schema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  projectNumber: z.number().int().positive().optional(), // Nowe pole
  rows: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      labels: z.array(z.string()),
      assignees: z.array(z.string()),
      milestone: z.string().optional(),
    })
  ).min(1).max(300),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Pobierz token z nagłówka Authorization
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized: Missing or invalid GitHub Token" },
        { status: 401 }
      );
    }
    const token = authHeader.split(" ")[1];

    const body = await req.json();
    const validation = schema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation Error", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { owner, repo, projectNumber, rows } = validation.data;
    
    // Rzutowanie typów Zod na nasze typy (kompatybilne)
    const result = await processImport(token, owner, repo, rows as ImportRow[], projectNumber);

    return NextResponse.json(result);

  } catch (error: any) {
    console.error("API Import Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}