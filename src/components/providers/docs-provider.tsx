/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/providers/docs-provider.tsx
"use client";

import { createContext, useContext, useMemo, useState, useEffect } from "react";
import type { DocumentSection, DocumentContent } from "@/types/docs";
import { docsTree } from "@/config/docs";

type DocsContextType = {
  sections: DocumentSection[];
  activeSection: string;
  activeSubsection: string;
  activeTopic: string;

  currentSection?: DocumentSection;
  currentSubsection?: DocumentSection["subsections"][number];
  currentTopic?: DocumentSection["subsections"][number]["topics"][number];
  currentContent?: DocumentContent;

  // Acciones
  selectTopic: (sectionId: string, subsectionId: string, topicId: string) => void;
};

const DocsContext = createContext<DocsContextType | null>(null);

export function DocsProvider({ children }: { children: React.ReactNode }) {
  const sections = docsTree.slice().sort((a: { order: number }, b: { order: number }) => a.order - b.order);

  const defaultSection = sections[0];
  const defaultSub = defaultSection?.subsections?.[0];
  const defaultTopic = defaultSub?.topics?.[0];

  const [activeSection, setActiveSection] = useState(defaultSection?.id ?? "");
  const [activeSubsection, setActiveSubsection] = useState(defaultSub?.id ?? "");
  const [activeTopic, setActiveTopic] = useState(defaultTopic?.id ?? "");

  const [contentCache, setContentCache] = useState<Record<string, DocumentContent>>({});

  const key = `${activeSection}-${activeSubsection}-${activeTopic}`;

  const currentSection = sections.find((s: { id: any }) => s.id === activeSection);
  const currentSubsection = currentSection?.subsections.find((s: { id: any }) => s.id === activeSubsection);
  const currentTopic = currentSubsection?.topics.find((t: { id: any }) => t.id === activeTopic);
  const currentContent = contentCache[key];

  const selectTopic = (sectionId: string, subsectionId: string, topicId: string) => {
    setActiveSection(sectionId);
    setActiveSubsection(subsectionId);
    setActiveTopic(topicId);
  };

  // Cargar contenido cuando cambian los activos
  useEffect(() => {
    if (!activeSection || !activeSubsection || !activeTopic) return;

    const load = async () => {
      const cacheKey = `${activeSection}-${activeSubsection}-${activeTopic}`;
      if (contentCache[cacheKey]) return;

      const res = await fetch(`/api/docs?sectionId=${activeSection}&subsectionId=${activeSubsection}&topicId=${activeTopic}`, { cache: "no-store" });
      if (!res.ok) return;

      const data = (await res.json()) as DocumentContent;
      setContentCache((prev) => ({ ...prev, [cacheKey]: data }));
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, activeSubsection, activeTopic]);

  const value = useMemo<DocsContextType>(
    () => ({
      sections,
      activeSection,
      activeSubsection,
      activeTopic,
      currentSection,
      currentSubsection,
      currentTopic,
      currentContent,
      selectTopic,
    }),
    [sections, activeSection, activeSubsection, activeTopic, currentSection, currentSubsection, currentTopic, currentContent]
  );

  return <DocsContext.Provider value={value}>{children}</DocsContext.Provider>;
}

export function useDocs() {
  const ctx = useContext(DocsContext);
  if (!ctx) throw new Error("useDocs debe usarse dentro de <DocsProvider>");
  return ctx;
}
