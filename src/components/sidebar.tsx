"use client";

import { ChevronRight, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { cn } from "@/lib/utils";
import { useDocs } from "@/components/providers/docs-provider";
import { useUIState } from "@/components/providers/ui-state";

export function Sidebar() {
  const { sections, activeSection, activeSubsection, activeTopic, selectNode } = useDocs();
  const { isSidebarOpen, closeSidebar } = useUIState();

  const onPick = (s: string, sub?: string, t?: string) => {
    selectNode(s, sub, t);
    closeSidebar();
  };

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
              {sections.map((section) => {
                // Sección terminal (nivel 1)
                if ("file" in section) {
                  const active = activeSection === section.id && !activeSubsection && !activeTopic;
                  return (
                    <Button
                      key={section.id}
                      variant="ghost"
                      className={cn("justify-start gap-2 px-2 py-2 w-full h-auto", active && "bg-sidebar-accent text-sidebar-accent-foreground")}
                      onClick={() => onPick(section.id)}
                    >
                      <div className="flex-shrink-0 rounded-full size-3" style={{ backgroundColor: section.color || "#6b7280" }} />
                      <span className="text-left truncate">{section.title}</span>
                    </Button>
                  );
                }

                // Sección contenedora (nivel 2/3)
                return (
                  <Collapsible key={section.id} defaultOpen={activeSection === section.id}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="justify-start gap-2 px-2 py-2 w-full h-auto">
                        <ChevronRight className="size-4 [&[data-state=open]]:rotate-90 transition-transform" />
                        <div className="flex-shrink-0 rounded-full size-3" style={{ backgroundColor: section.color || "#6b7280" }} />
                        <span className="text-left truncate">{section.title}</span>
                      </Button>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="space-y-1 mt-1 pl-6">
                      {section.subsections.map((sub) => {
                        // Sub terminal (nivel 2)
                        if ("file" in sub) {
                          const active = activeSection === section.id && activeSubsection === sub.id && !activeTopic;
                          return (
                            <Button
                              key={sub.id}
                              variant="ghost"
                              className={cn("justify-start gap-2 px-2 py-1.5 w-full h-auto text-sm", active && "bg-sidebar-accent text-sidebar-accent-foreground")}
                              onClick={() => onPick(section.id, sub.id)}
                            >
                              <FileText className="size-3" />
                              <span className="text-left truncate">{sub.title}</span>
                            </Button>
                          );
                        }

                        // Sub contenedor (nivel 3)
                        return (
                          <Collapsible key={sub.id} defaultOpen={activeSubsection === sub.id}>
                            <CollapsibleTrigger asChild>
                              <Button variant="ghost" className="justify-start gap-2 px-2 py-1.5 w-full h-auto text-sm">
                                <ChevronRight className="size-3 [&[data-state=open]]:rotate-90 transition-transform" />
                                <span className="text-left truncate">{sub.title}</span>
                              </Button>
                            </CollapsibleTrigger>

                            <CollapsibleContent className="space-y-1 mt-1 pl-6">
                              {sub.topics.map((topic) => {
                                const active = activeSection === section.id && activeSubsection === sub.id && activeTopic === topic.id;
                                return (
                                  <Button
                                    key={topic.id}
                                    variant="ghost"
                                    className={cn("justify-start gap-2 px-2 py-1.5 w-full h-auto text-sm", active && "bg-sidebar-accent text-sidebar-accent-foreground")}
                                    onClick={() => onPick(section.id, sub.id, topic.id)}
                                  >
                                    <FileText className="size-3" />
                                    <span className="text-left truncate">{topic.title}</span>
                                  </Button>
                                );
                              })}
                            </CollapsibleContent>
                          </Collapsible>
                        );
                      })}
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </nav>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}
