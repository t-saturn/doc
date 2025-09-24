"use client";
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import type { DocumentSection, DocumentContent, DocSubsection, DocTopic } from "@/types/docs";
import { docsTree } from "@/config/docs";

type DocsContextType = {
  sections: DocumentSection[];
  activeSection: string;
  activeSubsection?: string;
  activeTopic?: string;

  currentSection?: DocumentSection;
  currentSubsection?: DocSubsection;
  currentTopic?: DocTopic;
  currentContent?: DocumentContent;

  selectNode: (sectionId: string, subsectionId?: string, topicId?: string) => void;
};

const DocsContext = createContext<DocsContextType | null>(null);

export function DocsProvider({ children }: { children: React.ReactNode }) {
  const sections = useMemo(() => docsTree.slice().sort((a, b) => a.order - b.order), []);

  // defaults
  const first = sections[0];
  const firstSub = "subsections" in (first ?? {}) ? first?.subsections?.[0] : undefined;
  const firstTopic = firstSub && "topics" in firstSub ? firstSub.topics?.[0] : undefined;

  const [activeSection, setActiveSection] = useState(first?.id ?? "");
  const [activeSubsection, setActiveSubsection] = useState<string | undefined>(firstSub?.id);
  const [activeTopic, setActiveTopic] = useState<string | undefined>(firstTopic?.id);

  const [cache, setCache] = useState<Record<string, DocumentContent>>({});

  const selectNode = (s: string, sub?: string, t?: string) => {
    setActiveSection(s);
    setActiveSubsection(sub);
    setActiveTopic(t);
  };

  const key = `${activeSection}__${activeSubsection ?? ""}__${activeTopic ?? ""}`;
  const currentSection = sections.find((s) => s.id === activeSection);
  const currentSubsection = currentSection && "subsections" in currentSection ? currentSection.subsections?.find((x) => x.id === activeSubsection) : undefined;
  const currentTopic = currentSubsection && "topics" in currentSubsection ? currentSubsection.topics?.find((x) => x.id === activeTopic) : undefined;

  const currentContent = cache[key];

  useEffect(() => {
    (async () => {
      if (!activeSection) return;
      const params = new URLSearchParams({
        sectionId: activeSection,
        ...(activeSubsection ? { subsectionId: activeSubsection } : {}),
        ...(activeTopic ? { topicId: activeTopic } : {}),
      });
      if (cache[key]) return;
      const res = await fetch(`/api/docs?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as DocumentContent;
      setCache((p) => ({ ...p, [key]: data }));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, activeSubsection, activeTopic]);

  const value = useMemo(
    () => ({
      sections,
      activeSection,
      activeSubsection,
      activeTopic,
      currentSection,
      currentSubsection,
      currentTopic,
      currentContent,
      selectNode,
    }),
    [sections, activeSection, activeSubsection, activeTopic, currentSection, currentSubsection, currentTopic, currentContent]
  );

  return <DocsContext.Provider value={value}>{children}</DocsContext.Provider>;
}

export const useDocs = () => {
  const ctx = useContext(DocsContext);
  if (!ctx) throw new Error("useDocs debe usarse dentro de <DocsProvider>");
  return ctx;
};
