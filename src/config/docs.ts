import type { DocumentSection } from "@/types/docs";

export const docsTree: DocumentSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    color: "#10b981",
    order: 1,
    subsections: [
      {
        id: "intro",
        title: "Introducción",
        order: 1,
        topics: [
          {
            id: "what-is",
            title: "¿Qué es?",
            order: 1,
            file: "introduction.md", // => src/data/introduction.md
          },
          {
            id: "complete-readme",
            title: "README Completo",
            order: 2,
            file: "complete-markdown-readme.md",
          },
        ],
      },
      {
        id: "setup",
        title: "Instalación",
        order: 2,
        topics: [
          { id: "requirements", title: "Requisitos", order: 1, file: "setup/requirements.md" },
          { id: "install", title: "Instalar", order: 2, file: "setup/install.md" },
        ],
      },
    ],
  },
  // ...más secciones
];
