import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { md } from "@/lib/markdown";
import type { DocumentSection } from "@/types/docs";
import { docsTree } from "@/config/docs";

function findSection(id: string): DocumentSection | undefined {
  return docsTree.find((s) => s.id === id);
}

function resolveFile(sectionId: string, subsectionId?: string, topicId?: string) {
  const sec = findSection(sectionId);
  if (!sec) return null;

  // Nivel 1: sección terminal
  if ("file" in sec && !subsectionId && !topicId) return sec.file;

  if ("subsections" in sec && subsectionId) {
    const sub = sec.subsections?.find((x) => x.id === subsectionId);
    if (!sub) return null;

    // Nivel 2: subsección terminal
    if ("file" in sub && !topicId) return sub.file;

    // Nivel 3: tema
    if ("topics" in sub && topicId) {
      const t = sub.topics?.find((y) => y.id === topicId);
      if (t) return t.file;
    }
  }
  return null;
}

export async function GET(req: Request) {
  const u = new URL(req.url);
  const sectionId = u.searchParams.get("sectionId") ?? "";
  const subsectionId = u.searchParams.get("subsectionId") ?? undefined;
  const topicId = u.searchParams.get("topicId") ?? undefined;

  const rel = resolveFile(sectionId, subsectionId, topicId);
  if (!rel) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const filePath = path.join(process.cwd(), "src", "data", rel);
  const raw = await fs.readFile(filePath, "utf8");
  const html = md.render(raw);
  return NextResponse.json({ html, sourcePath: `/src/data/${rel}` });
}
