"use client";

import { useState } from "react";
import { Plus, Edit3, Trash2, Save, Image as ImageIcon, Link, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { DocumentSection, DocumentSubsection } from "@/components/sidebar";
import { DocumentContent, CodeBlock, ImageContent } from "@/components/content-view";

interface AdminPanelProps {
  sections: DocumentSection[];
  onUpdateSections: (sections: DocumentSection[]) => void;
  onUpdateContent: (sectionId: string, subsectionId: string, content: DocumentContent) => void;
  activeSection?: string;
  activeSubsection?: string;
  currentContent?: DocumentContent;
}

export function AdminPanel({ sections, onUpdateSections, onUpdateContent, activeSection, activeSubsection, currentContent }: AdminPanelProps) {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSubsectionTitle, setNewSubsectionTitle] = useState("");

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;

    const newSection: DocumentSection = {
      id: `section-${Date.now()}`,
      title: newSectionTitle,
      color: "#3b82f6",
      order: sections.length,
      subsections: [],
    };

    onUpdateSections([...sections, newSection]);
    setNewSectionTitle("");
  };

  const handleAddSubsection = (sectionId: string) => {
    if (!newSubsectionTitle.trim()) return;

    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        const newSubsection: DocumentSubsection = {
          id: `subsection-${Date.now()}`,
          title: newSubsectionTitle,
          order: section.subsections.length,
        };
        return {
          ...section,
          subsections: [...section.subsections, newSubsection],
        };
      }
      return section;
    });

    onUpdateSections(updatedSections);
    setNewSubsectionTitle("");
  };

  const handleDeleteSection = (sectionId: string) => {
    onUpdateSections(sections.filter((s) => s.id !== sectionId));
  };

  const handleDeleteSubsection = (sectionId: string, subsectionId: string) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          subsections: section.subsections.filter((sub) => sub.id !== subsectionId),
        };
      }
      return section;
    });
    onUpdateSections(updatedSections);
  };

  return (
    <div className="flex-1 p-6">
      <div className="space-y-6 mx-auto max-w-6xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-2xl">Panel de Administración</h1>
            <p className="text-muted-foreground">Gestiona las secciones y contenido de la documentación</p>
          </div>
        </div>

        <Tabs defaultValue="structure" className="w-full">
          <TabsList>
            <TabsTrigger value="structure">Estructura</TabsTrigger>
            <TabsTrigger value="content" disabled={!activeSection || !activeSubsection}>
              Contenido
            </TabsTrigger>
          </TabsList>

          <TabsContent value="structure" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Secciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add New Section */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Nueva sección..."
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddSection()}
                  />
                  <Button onClick={handleAddSection}>
                    <Plus className="size-4" />
                  </Button>
                </div>

                <Separator />

                {/* Sections List */}
                <div className="space-y-4">
                  {sections.map((section) => (
                    <Card key={section.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-3">
                            <div className="rounded-full size-4" style={{ backgroundColor: section.color }} />
                            <h3 className="font-medium">{section.title}</h3>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => setEditingSection(editingSection === section.id ? null : section.id)}>
                              <Edit3 className="size-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteSection(section.id)}>
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Subsections */}
                        <div className="space-y-2 pl-6">
                          {section.subsections.map((subsection) => (
                            <div key={subsection.id} className="flex justify-between items-center bg-muted/50 p-2 rounded">
                              <span className="text-sm">{subsection.title}</span>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteSubsection(section.id, subsection.id)}>
                                <Trash2 className="size-3" />
                              </Button>
                            </div>
                          ))}

                          {/* Add Subsection */}
                          <div className="flex gap-2">
                            <Input
                              placeholder="Nueva subsección..."
                              value={newSubsectionTitle}
                              onChange={(e) => setNewSubsectionTitle(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && handleAddSubsection(section.id)}
                              className="text-sm"
                            />
                            <Button size="sm" onClick={() => handleAddSubsection(section.id)}>
                              <Plus className="size-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <ContentEditor
              content={currentContent}
              onSave={(content) => {
                if (activeSection && activeSubsection) {
                  onUpdateContent(activeSection, activeSubsection, content);
                }
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ContentEditor({ content, onSave }: { content?: DocumentContent; onSave: (content: DocumentContent) => void }) {
  const [editContent, setEditContent] = useState<DocumentContent>(
    content || {
      description: "",
      annotations: "",
      codeBlocks: [],
      images: [],
      notes: "",
    }
  );

  const handleSave = () => {
    onSave(editContent);
  };

  const addCodeBlock = () => {
    setEditContent((prev) => ({
      ...prev,
      codeBlocks: [...prev.codeBlocks, { language: "javascript", code: "", title: "" }],
    }));
  };

  const updateCodeBlock = (index: number, field: keyof CodeBlock, value: string) => {
    setEditContent((prev) => ({
      ...prev,
      codeBlocks: prev.codeBlocks.map((block, i) => (i === index ? { ...block, [field]: value } : block)),
    }));
  };

  const removeCodeBlock = (index: number) => {
    setEditContent((prev) => ({
      ...prev,
      codeBlocks: prev.codeBlocks.filter((_, i) => i !== index),
    }));
  };

  const addImage = () => {
    setEditContent((prev) => ({
      ...prev,
      images: [...prev.images, { url: "", alt: "", caption: "" }],
    }));
  };

  const updateImage = (index: number, field: keyof ImageContent, value: string) => {
    setEditContent((prev) => ({
      ...prev,
      images: prev.images.map((image, i) => (i === index ? { ...image, [field]: value } : image)),
    }));
  };

  const removeImage = (index: number) => {
    setEditContent((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validateImageUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Editor de Contenido
          <Button onClick={handleSave}>
            <Save className="mr-2 size-4" />
            Guardar
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Description */}
        <div className="space-y-2">
          <Label>Descripción General</Label>
          <Textarea
            placeholder="Escribe la descripción en Markdown..."
            value={editContent.description}
            onChange={(e) => setEditContent((prev) => ({ ...prev, description: e.target.value }))}
            className="min-h-32"
          />
        </div>

        {/* Annotations */}
        <div className="space-y-2">
          <Label>Anotaciones</Label>
          <Textarea
            placeholder="Anotaciones en Markdown..."
            value={editContent.annotations}
            onChange={(e) => setEditContent((prev) => ({ ...prev, annotations: e.target.value }))}
            className="min-h-24"
          />
        </div>

        {/* Code Blocks */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Bloques de Código</Label>
            <Button variant="outline" size="sm" onClick={addCodeBlock}>
              <Plus className="mr-2 size-4" />
              Agregar Código
            </Button>
          </div>

          {editContent.codeBlocks.map((block, index) => (
            <Card key={index}>
              <CardContent className="space-y-3 p-4">
                <div className="flex justify-between items-center">
                  <Input placeholder="Título del bloque de código" value={block.title} onChange={(e) => updateCodeBlock(index, "title", e.target.value)} className="flex-1 mr-2" />
                  <Select value={block.language} onValueChange={(value) => updateCodeBlock(index, "language", value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="css">CSS</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="sm" onClick={() => removeCodeBlock(index)} className="ml-2">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
                <Textarea placeholder="Código..." value={block.code} onChange={(e) => updateCodeBlock(index, "code", e.target.value)} className="min-h-24 font-mono" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label>Notas Adicionales</Label>
          <Textarea
            placeholder="Notas en Markdown..."
            value={editContent.notes}
            onChange={(e) => setEditContent((prev) => ({ ...prev, notes: e.target.value }))}
            className="min-h-24"
          />
        </div>

        {/* Images */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <Label>Imágenes</Label>
              <p className="mt-1 text-muted-foreground text-sm">Agrega imágenes desde URLs públicas (Google Drive, GitHub Raw, etc.)</p>
            </div>
            <Button variant="outline" size="sm" onClick={addImage}>
              <Plus className="mr-2 size-4" />
              Agregar Imagen
            </Button>
          </div>

          {editContent.images.map((image, index) => (
            <Card key={index}>
              <CardContent className="space-y-3 p-4">
                <div className="flex items-start gap-2">
                  <div className="flex-1 space-y-3">
                    <div className="space-y-2">
                      <Label className="text-sm">URL de la imagen</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="https://ejemplo.com/imagen.jpg"
                          value={image.url}
                          onChange={(e) => updateImage(index, "url", e.target.value)}
                          className={`flex-1 ${image.url && !validateImageUrl(image.url) ? "border-destructive" : ""}`}
                        />
                        {image.url && validateImageUrl(image.url) && (
                          <Button variant="ghost" size="sm" onClick={() => window.open(image.url, "_blank")} title="Ver imagen">
                            <ExternalLink className="size-4" />
                          </Button>
                        )}
                      </div>
                      {image.url && !validateImageUrl(image.url) && <p className="text-destructive text-sm">URL no válida</p>}
                    </div>

                    <div className="gap-3 grid grid-cols-1 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-sm">Texto alternativo</Label>
                        <Input placeholder="Descripción de la imagen" value={image.alt} onChange={(e) => updateImage(index, "alt", e.target.value)} />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">Leyenda (opcional)</Label>
                        <Input placeholder="Leyenda de la imagen" value={image.caption} onChange={(e) => updateImage(index, "caption", e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <Button variant="ghost" size="sm" onClick={() => removeImage(index)} className="mt-6">
                    <Trash2 className="size-4" />
                  </Button>
                </div>

                {/* Image Preview */}
                {image.url && validateImageUrl(image.url) && (
                  <div className="bg-muted/50 mt-3 p-3 rounded-lg">
                    <p className="mb-2 font-medium text-sm">Vista previa:</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.url}
                      alt={image.alt || "Preview"}
                      className="border rounded max-w-full h-32 object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = "block";
                      }}
                    />
                    <div className="hidden bg-muted p-2 rounded text-muted-foreground text-sm">No se pudo cargar la imagen</div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Helper Text */}
          {editContent.images.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="p-6 text-center">
                <ImageIcon className="mx-auto mb-2 size-8 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">No hay imágenes agregadas</p>
                <p className="mt-1 text-muted-foreground text-xs">Haz clic en &quot;Agregar Imagen&quot; para comenzar</p>
              </CardContent>
            </Card>
          )}

          {/* URL Examples */}
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-2 mb-2">
                <Link className="mt-0.5 size-4 text-muted-foreground" />
                <h4 className="font-medium text-sm">Ejemplos de URLs válidas:</h4>
              </div>
              <div className="space-y-1 ml-6 text-muted-foreground text-xs">
                <p>
                  <strong>GitHub Raw:</strong> https://raw.githubusercontent.com/user/repo/main/image.png
                </p>
                <p>
                  <strong>Google Drive:</strong> https://drive.google.com/uc?id=FILE_ID (archivo público)
                </p>
                <p>
                  <strong>URLs directas:</strong> https://ejemplo.com/imagen.jpg
                </p>
              </div>
              <p className="mt-2 ml-6 text-muted-foreground text-xs">Asegúrate de que las URLs sean públicas y accesibles</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
