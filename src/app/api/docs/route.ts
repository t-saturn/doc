// src/app/api/docs/route.ts
import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { md } from "@/lib/markdown";
import { docsTree } from "@/config/docs";

// Buscar el file por (sectionId, subsectionId, topicId):
function resolveFile(sectionId: string, subsectionId: string, topicId: string) {
  for (const s of docsTree)
    if (s.id === sectionId) {
      for (const sub of s.subsections)
        if (sub.id === subsectionId) {
          for (const t of sub.topics)
            if (t.id === topicId) {
              return t.file;
            }
        }
    }
  return null;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sectionId = searchParams.get("sectionId") || "";
  const subsectionId = searchParams.get("subsectionId") || "";
  const topicId = searchParams.get("topicId") || "";

  const relFile = resolveFile(sectionId, subsectionId, topicId);
  if (!relFile) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), "src", "data", relFile);
  const content = await fs.readFile(filePath, "utf8");
  const html = md.render(content);

  return NextResponse.json({ html, sourcePath: `/src/data/${relFile}` });
}
