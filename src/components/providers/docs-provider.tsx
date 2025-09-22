"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { DocumentSection, DocumentContent } from "@/types/docs";
import { initialSections, mockContent } from "@/mocks/docs";

type DocsContextType = {
  sections: DocumentSection[];
  activeSection: string;
  activeSubsection: string;

  // Selectores útiles
  currentSection?: DocumentSection;
  currentSubsection?: { id: string; title: string; order: number } | undefined;
  currentContent?: DocumentContent;

  // Acciones
  selectSubsection: (sectionId: string, subsectionId: string) => void;
  updateSections: (newSections: DocumentSection[]) => void;
  updateContent: (sectionId: string, subsectionId: string, newContent: DocumentContent) => void;
};

const DocsContext = createContext<DocsContextType | null>(null);

export function DocsProvider({ children }: { children: React.ReactNode }) {
  const [sections, setSections] = useState<DocumentSection[]>(initialSections);
  const [activeSection, setActiveSection] = useState<string>(initialSections[0]?.id ?? "getting-started");
  const [activeSubsection, setActiveSubsection] = useState<string>(initialSections[0]?.subsections[0]?.id ?? "introduction");

  const [content, setContent] = useState<Record<string, DocumentContent>>({
    [`${initialSections[0].id}-${initialSections[0].subsections[0].id}`]: mockContent,
  });

  const selectSubsection = (sectionId: string, subsectionId: string) => {
    setActiveSection(sectionId);
    setActiveSubsection(subsectionId);
  };

  const updateSections = (newSections: DocumentSection[]) => {
    setSections(newSections);

    const section = newSections.find((s) => s.id === activeSection) ?? newSections[0];
    const subsection = section?.subsections.find((sub) => sub.id === activeSubsection) ?? section?.subsections?.[0];

    if (section && subsection) {
      setActiveSection(section.id);
      setActiveSubsection(subsection.id);
    }
  };

  const updateContent = (sectionId: string, subsectionId: string, newContent: DocumentContent) => {
    const key = `${sectionId}-${subsectionId}`;
    setContent((prev) => ({ ...prev, [key]: newContent }));
  };

  const key = `${activeSection}-${activeSubsection}`;
  const currentContent = content[key];
  const currentSection = sections.find((s) => s.id === activeSection);
  const currentSubsection = currentSection?.subsections.find((s) => s.id === activeSubsection);

  const value = useMemo<DocsContextType>(
    () => ({
      sections,
      activeSection,
      activeSubsection,
      currentSection,
      currentSubsection,
      currentContent,
      selectSubsection,
      updateSections,
      updateContent,
    }),
    [sections, activeSection, activeSubsection, currentSection, currentSubsection, currentContent]
  );

  return <DocsContext.Provider value={value}>{children}</DocsContext.Provider>;
}

export function useDocs() {
  const ctx = useContext(DocsContext);
  if (!ctx) throw new Error("useDocs debe usarse dentro de <DocsProvider>");
  return ctx;
}
