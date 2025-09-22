"use client";

import { AdminPanel } from "@/components/admin-panel";
import { ContentView } from "@/components/content-view";
import { useUIState } from "@/components/providers/ui-state";
import { useDocs } from "@/components/providers/docs-provider";

export function Main() {
  const { isAdmin } = useUIState();
  const { sections, activeSection, activeSubsection, currentSection, currentSubsection, currentContent, updateSections, updateContent } = useDocs();

  return (
    <div className="bg-background min-h-screen">
      {/* Navbar y Sidebar están en el layout */}
      <main className="flex-1">
        {isAdmin ? (
          <AdminPanel
            sections={sections}
            onUpdateSections={updateSections}
            onUpdateContent={updateContent}
            activeSection={activeSection}
            activeSubsection={activeSubsection}
            currentContent={currentContent}
          />
        ) : (
          <ContentView
            section={currentSection}
            subsection={currentSubsection}
            content={
              currentContent || {
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
  );
}
