import type { DocumentSection, DocumentContent } from "@/types/docs";

export const initialSections: DocumentSection[] = [
  {
    id: "getting-started",
    title: "Primeros Pasos",
    color: "#3b82f6",
    order: 0,
    subsections: [
      { id: "introduction", title: "Introducción", order: 0 },
      { id: "installation", title: "Instalación", order: 1 },
      { id: "quick-start", title: "Inicio Rápido", order: 2 },
    ],
  },
  {
    id: "api-reference",
    title: "Referencia API",
    color: "#10b981",
    order: 1,
    subsections: [
      { id: "authentication", title: "Autenticación", order: 0 },
      { id: "endpoints", title: "Endpoints", order: 1 },
      { id: "responses", title: "Respuestas", order: 2 },
    ],
  },
  {
    id: "examples",
    title: "Ejemplos",
    color: "#f59e0b",
    order: 2,
    subsections: [
      { id: "basic-usage", title: "Uso Básico", order: 0 },
      { id: "advanced-features", title: "Funciones Avanzadas", order: 1 },
    ],
  },
];

export const mockContent: DocumentContent = {
  description: `# Introducción a DocuManager

DocuManager es una plataforma moderna para la gestión de documentación técnica que permite tanto la visualización como la administración de contenido técnico usando Markdown.

## Características Principales

- Interfaz limpia y profesional
- Editor de Markdown en tiempo real
- Navegación jerárquica
- Soporte para múltiples idiomas
- Modo claro/oscuro

Esta herramienta está diseñada para equipos de desarrollo que necesitan mantener documentación técnica actualizada y accesible.`,

  annotations: `## Notas Importantes

- La documentación se renderiza en tiempo real
- Los cambios se guardan automáticamente
- Soporte completo para sintaxis Markdown
- Integración con sistemas de control de versiones`,

  codeBlocks: [
    {
      language: "javascript",
      title: "Configuración Inicial",
      code: `// Configuración básica del proyecto
const config = {
  theme: 'light',
  language: 'es',
  autoSave: true,
  renderMode: 'markdown'
};

export default config;`,
    },
    {
      language: "typescript",
      title: "Interfaz de Documentación",
      code: `interface DocumentSection {
  id: string;
  title: string;
  color?: string;
  order: number;
  subsections: DocumentSubsection[];
}

interface DocumentContent {
  description: string;
  annotations: string;
  codeBlocks: CodeBlock[];
  images: ImageContent[];
  notes: string;
}`,
    },
  ],

  images: [
    {
      url: "https://images.unsplash.com/photo-1591381287254-b3349c60bf9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkb2N1bWVudGF0aW9uJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc1ODQzODY0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Interfaz moderna de documentación técnica",
      caption: "Ejemplo de una interfaz limpia y profesional para documentación",
    },
    {
      url: "https://images.unsplash.com/photo-1754039985001-ccafee437736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwZGV2ZWxvcG1lbnQlMjB3b3JrZmxvd3xlbnwxfHx8fDE3NTg0Mzg2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Flujo de trabajo de desarrollo con código",
      caption: "Workflow típico en el desarrollo de software moderno",
    },
  ],

  notes: `## Tips y Consejos

### Para Usuarios
- Utiliza la búsqueda global para encontrar contenido rápidamente
- El modo oscuro es ideal para sesiones largas de lectura
- Los enlaces internos te permiten navegar entre secciones relacionadas

### Para Administradores
- Organiza el contenido de forma jerárquica para mejor navegación
- Utiliza colores distintivos para cada sección principal
- Incluye ejemplos de código para mayor claridad

### Mejores Prácticas
- Mantén las descripciones concisas pero informativas
- Incluye ejemplos prácticos en cada sección
- Actualiza regularmente el contenido para mantenerlo relevante`,
};
