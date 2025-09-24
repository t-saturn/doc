// src/components/view/main.tsx (Client OK)
"use client";

import { useDocs } from "@/components/providers/docs-provider";

type MainProps = {
  initialHtml?: string;
};

export function Main({ initialHtml }: MainProps) {
  const { currentContent } = useDocs();

  const html = currentContent?.html ?? initialHtml ?? "<p>Sin contenido</p>";

  return (
    <main className="place-items-start grid p-4 min-h-[calc(100vh-4rem)]">
      <div className="dark:prose-invert mx-auto w-full max-w-6xl prose" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
