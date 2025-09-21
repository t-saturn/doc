import { ChevronRight, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { cn } from "@/lib/utils";
import { DocumentSection } from "@/types/docs";

type SidebarProps = {
  sections: DocumentSection[];
  activeSection?: string;
  activeSubsection?: string;
  onSelectSubsection: (sectionId: string, subsectionId: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

type SectionItemProps = {
  section: DocumentSection;
  isActive: boolean;
  activeSubsection?: string;
  onSelectSubsection: (sectionId: string, subsectionId: string) => void;
};

export const Sidebar = ({ sections, activeSection, activeSubsection, onSelectSubsection, isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {isOpen && <div className="lg:hidden z-40 fixed inset-0 bg-black/20" onClick={onClose} />}

      <aside
        className={cn(
          "top-16 left-0 z-50 lg:z-auto lg:static fixed bg-sidebar border-r w-80 h-[calc(100vh-4rem)] transition-transform lg:translate-x-0 duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <ScrollArea className="h-full">
          <div className="p-4">
            <h2 className="mb-4 px-2 font-semibold text-sidebar-foreground">Documentación</h2>

            <nav className="space-y-2">
              {sections.map((section) => (
                <SectionItem
                  key={section.id}
                  section={section}
                  isActive={activeSection === section.id}
                  activeSubsection={activeSubsection}
                  onSelectSubsection={onSelectSubsection}
                />
              ))}
            </nav>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};

const SectionItem: React.FC<SectionItemProps> = ({ section, isActive, activeSubsection, onSelectSubsection }) => {
  return (
    <Collapsible defaultOpen={isActive}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="justify-start gap-2 px-2 py-2 w-full h-auto">
          <ChevronRight className="size-4 [&[data-state=open]]:rotate-90 transition-transform" />
          <div className="flex-shrink-0 rounded-full size-3" style={{ backgroundColor: section.color || "#6b7280" }} />
          <span className="text-left truncate">{section.title}</span>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-1 mt-1 pl-6">
        {section.subsections.map((subsection) => (
          <Button
            key={subsection.id}
            variant="ghost"
            className={cn("justify-start gap-2 px-2 py-1.5 w-full h-auto text-sm", activeSubsection === subsection.id && "bg-sidebar-accent text-sidebar-accent-foreground")}
            onClick={() => onSelectSubsection(section.id, subsection.id)}
          >
            <FileText className="flex-shrink-0 size-3" />
            <span className="text-left truncate">{subsection.title}</span>
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
