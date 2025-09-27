import type { DocumentSection } from "@/types/docs";

export const docsTree: DocumentSection[] = [
  // Nivel 1: sección con archivo directo
  {
    id: "intro",
    title: "INTRODUCCIÓN",
    order: 1,
    color: "#0ea5e9",
    file: "introduction.md",
  },
  {
    id: "objectives-scope",
    title: "OBJETIVOS Y ALCANCE",
    order: 2,
    color: "#10b981",
    file: "objectives-scope.md",
    // subsections: [
    //   { id: "objectives", title: "Objetivos", order: 1, file: "objectives.md" },
    //   { id: "scope", title: "Alcance", order: 2, file: "scope.md" },
    //   { id: "defs", title: "Definiciones y Abreviaturas", order: 3, file: "definitions.md" },
    // ],
  },
  {
    id: "toolbar-main-buttons",
    title: "BARRA DE HERRAMIENTAS / BOTONES PRINCIPALES DEL SISTEMA",
    order: 3,
    color: "#10b981",
    file: "toolbar-main-buttons.md",
    // subsections: [
    //   { id: "objectives", title: "Objetivos", order: 1, file: "objectives.md" },
    //   { id: "scope", title: "Alcance", order: 2, file: "scope.md" },
    //   { id: "defs", title: "Definiciones y Abreviaturas", order: 3, file: "definitions.md" },
    // ],
  },
  {
    id: "system-description",
    title: "DESCRIPCIÓN DEL SISTEMA",
    order: 4,
    color: "#f59e0b",
    subsections: [
      {
        id: "access",
        title: "Descripción de acceso al sistema",
        order: 1,
        topics: [
          { id: "auth", title: "Autentificación del Usuario", order: 1, file: "system/access/auth.md" },
          { id: "requirements", title: "Requisitos del sistema", order: 2, file: "system/access/requirements.md" },
          { id: "manual", title: "Manual de usuario", order: 3, file: "system/access/manual.md" },
          { id: "home", title: "Página Principal", order: 4, file: "system/access/home.md" },
        ],
      },
    ],
  },
  // Ejemplo extra: barra de herramientas (nivel 1)
  { id: "toolbar", title: "BARRA DE HERRAMIENTAS", order: 3, color: "#a78bfa", file: "toolbar.md" },
];
