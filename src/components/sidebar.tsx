// src/components/sidebar.tsx
"use client";

import { ChevronRight, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { cn } from "@/lib/utils";
import { useDocs } from "@/components/providers/docs-provider";
import { useUIState } from "@/components/providers/ui-state";

export function Sidebar() {
  const { sections, activeSection, activeSubsection, activeTopic, selectTopic } = useDocs();
  const { isSidebarOpen, closeSidebar } = useUIState();

  return (
    <>
      {isSidebarOpen && <div className="lg:hidden z-40 fixed inset-0 bg-black/20" onClick={closeSidebar} />}
      <aside
        className={cn(
          "top-16 left-0 z-50 lg:z-auto lg:static fixed bg-sidebar border-r w-80 h-[calc(100vh-4rem)] transition-transform lg:translate-x-0 duration-300",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <ScrollArea className="h-full">
          <div className="p-4">
            <h2 className="mb-4 px-2 font-semibold text-sidebar-foreground">Documentación</h2>

            <nav className="space-y-2">
              {sections.map((section) => (
                <Collapsible key={section.id} defaultOpen={activeSection === section.id}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="justify-start gap-2 px-2 py-2 w-full h-auto">
                      <ChevronRight className="size-4 [&[data-state=open]]:rotate-90 transition-transform" />
                      <div className="flex-shrink-0 rounded-full size-3" style={{ backgroundColor: section.color || "#6b7280" }} />
                      <span className="text-left truncate">{section.title}</span>
                    </Button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="space-y-1 mt-1 pl-6">
                    {section.subsections.map((sub) => (
                      <Collapsible key={sub.id} defaultOpen={activeSubsection === sub.id}>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" className="justify-start gap-2 px-2 py-1.5 w-full h-auto text-sm">
                            <ChevronRight className="size-3 [&[data-state=open]]:rotate-90 transition-transform" />
                            <span className="text-left truncate">{sub.title}</span>
                          </Button>
                        </CollapsibleTrigger>

                        <CollapsibleContent className="space-y-1 mt-1 pl-6">
                          {sub.topics.map((topic) => (
                            <Button
                              key={topic.id}
                              variant="ghost"
                              className={cn(
                                "justify-start gap-2 px-2 py-1.5 w-full h-auto text-sm",
                                activeSection === section.id && activeSubsection === sub.id && activeTopic === topic.id && "bg-sidebar-accent text-sidebar-accent-foreground"
                              )}
                              onClick={() => {
                                selectTopic(section.id, sub.id, topic.id);
                                closeSidebar();
                              }}
                            >
                              <FileText className="flex-shrink-0 size-3" />
                              <span className="text-left truncate">{topic.title}</span>
                            </Button>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}
