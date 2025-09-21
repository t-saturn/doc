"use client";

import { useState } from "react";
import { AdminPanel } from "@/components/admin-panel";
import { ContentView } from "@/components/content-view";
import { Sidebar } from "@/components/sidebar";
import { useUIState } from "@/components/providers/ui-state";
import type { DocumentSection, DocumentContent } from "@/types/docs";
import { initialSections, mockContent } from "@/mocks/docs";

export function Main() {
  const { isAdmin, isSidebarOpen, closeSidebar } = useUIState();

  const [sections, setSections] = useState<DocumentSection[]>(initialSections);
  const [activeSection, setActiveSection] = useState<string>(initialSections[0]?.id ?? "getting-started");
  const [activeSubsection, setActiveSubsection] = useState<string>(initialSections[0]?.subsections[0]?.id ?? "introduction");

  const [content, setContent] = useState<Record<string, DocumentContent>>({
    [`${initialSections[0].id}-${initialSections[0].subsections[0].id}`]: mockContent,
  });

  const handleSelectSubsection = (sectionId: string, subsectionId: string) => {
    setActiveSection(sectionId);
    setActiveSubsection(subsectionId);
    closeSidebar();
  };

  // Si cambian las secciones, mantenemos (si es posible) la selección activa.
  // Si ya no existe, caemos a la primera disponible.
  const handleUpdateSections = (newSections: DocumentSection[]) => {
    setSections(newSections);

    const section = newSections.find((s) => s.id === activeSection) ?? newSections[0];
    const subsection = section?.subsections.find((sub) => sub.id === activeSubsection) ?? section?.subsections?.[0];

    if (section && subsection) {
      setActiveSection(section.id);
      setActiveSubsection(subsection.id);
    }
  };

  const handleUpdateContent = (sectionId: string, subsectionId: string, newContent: DocumentContent) => {
    const key = `${sectionId}-${subsectionId}`;
    setContent((prev) => ({
      ...prev,
      [key]: newContent,
    }));
  };

  const getCurrentContent = (): DocumentContent | undefined => {
    const key = `${activeSection}-${activeSubsection}`;
    return content[key];
  };

  const getCurrentSection = () => {
    return sections.find((s) => s.id === activeSection);
  };

  const getCurrentSubsection = () => {
    const section = getCurrentSection();
    return section?.subsections.find((sub) => sub.id === activeSubsection);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* El Navbar está en el layout: no se renderiza aquí */}
      <div className="flex">
        {!isAdmin && (
          <Sidebar
            sections={sections}
            activeSection={activeSection}
            activeSubsection={activeSubsection}
            onSelectSubsection={handleSelectSubsection}
            isOpen={isSidebarOpen}
            onClose={closeSidebar}
          />
        )}

        <main className="flex-1">
          {isAdmin ? (
            <AdminPanel
              sections={sections}
              onUpdateSections={handleUpdateSections}
              onUpdateContent={handleUpdateContent}
              activeSection={activeSection}
              activeSubsection={activeSubsection}
              currentContent={getCurrentContent()}
            />
          ) : (
            <ContentView
              section={getCurrentSection()}
              subsection={getCurrentSubsection()}
              content={
                getCurrentContent() || {
                  description: "",
                  annotations: "",
                  codeBlocks: [],
                  images: [],
                  notes: "",
                }
              }
            />
          )}
        </main>
      </div>
    </div>
  );
}
