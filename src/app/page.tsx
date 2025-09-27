import fs from "node:fs/promises";
import path from "node:path";
import { md } from "@/lib/markdown";
import { Main } from "@/components/view/main";
import { docsTree } from "@/config/docs";

export default async function Home() {
  // Render inicial: primer tema del árbol
  const first = docsTree[0]?.subsections?.[0]?.topics?.[0];
  let html = "<p>Selecciona un tema</p>";

  if (first) {
    const filePath = path.join(process.cwd(), "src", "data", first.file);
    const markdown = await fs.readFile(filePath, "utf8");
    html = md.render(markdown);
  }

  return <Main initialHtml={html} />;
}
