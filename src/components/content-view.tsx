import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { FileText, Image as ImageIcon, Code2, StickyNote } from "lucide-react";
import { DocumentContent, DocumentSection, DocumentSubsection } from "@/types/docs";

type ContentViewProps = {
  section?: DocumentSection;
  subsection?: DocumentSubsection;
  content: DocumentContent;
};

export const ContentView = ({ section, subsection, content }: ContentViewProps) => {
  if (!section || !subsection) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <div className="space-y-2 text-center">
          <FileText className="mx-auto size-12 text-muted-foreground" />
          <h3 className="font-semibold">Selecciona una sección</h3>
          <p className="text-muted-foreground">Elige una sección del menú lateral para ver su contenido</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="space-y-8 mx-auto p-6 max-w-4xl">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full size-4" style={{ backgroundColor: section.color || "#6b7280" }} />
              <Badge variant="secondary">{section.title}</Badge>
            </div>
            <h1 className="font-bold text-3xl">{subsection.title}</h1>
            {subsection.description && <p className="text-muted-foreground text-lg">{subsection.description}</p>}
          </div>

          <Separator />

          {content.description && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="size-5" />
                  Descripción General
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-w-none prose prose-sm">
                  <MarkdownRenderer content={content.description} />
                </div>
              </CardContent>
            </Card>
          )}

          {content.annotations && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <StickyNote className="size-5" />
                  Anotaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-w-none prose prose-sm">
                  <MarkdownRenderer content={content.annotations} />
                </div>
              </CardContent>
            </Card>
          )}

          {content.codeBlocks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="size-5" />
                  Ejemplos de Código
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {content.codeBlocks.map((block, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{block.title}</h4>
                      <Badge variant="outline">{block.language}</Badge>
                    </div>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code className="font-mono text-sm">{block.code}</code>
                    </pre>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {content.images.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="size-5" />
                  Imágenes y Diagramas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {content.images.map((image, index) => (
                  <div key={index} className="space-y-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image.url} alt={image.alt} className="border rounded-lg w-full" />
                    {image.caption && <p className="text-muted-foreground text-sm text-center">{image.caption}</p>}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {content.notes && (
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <StickyNote className="size-5" />
                  Notas Adicionales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-w-none prose prose-sm">
                  <MarkdownRenderer content={content.notes} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

// Simple markdown renderer component
function MarkdownRenderer({ content }: { content: string }) {
  // This is a simple implementation. In a real app, you'd use a proper markdown parser
  const lines = content.split("\n");

  return (
    <div className="space-y-2">
      {lines.map((line, index) => {
        if (line.startsWith("# ")) {
          return (
            <h1 key={index} className="font-bold text-2xl">
              {line.slice(2)}
            </h1>
          );
        } else if (line.startsWith("## ")) {
          return (
            <h2 key={index} className="font-semibold text-xl">
              {line.slice(3)}
            </h2>
          );
        } else if (line.startsWith("### ")) {
          return (
            <h3 key={index} className="font-medium text-lg">
              {line.slice(4)}
            </h3>
          );
        } else if (line.startsWith("- ")) {
          return (
            <li key={index} className="ml-4">
              {line.slice(2)}
            </li>
          );
        } else if (line.trim() === "") {
          return <br key={index} />;
        } else {
          return <p key={index}>{line}</p>;
        }
      })}
    </div>
  );
}
