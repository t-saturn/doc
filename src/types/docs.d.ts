export interface DocumentSubsection {
  id: string;
  title: string;
  description?: string;
  order: number;
}

export interface CodeBlock {
  language: string;
  title: string;
  code: string;
}

export interface ImageContent {
  url: string;
  alt: string;
  caption: string;
}

export type DocTopic = {
  id: string;
  title: string;
  order: number;
  file: string; // ruta al .md relativo a /src/data
};

export type DocSubsection = {
  id: string;
  title: string;
  order: number;
  topics: DocTopic[];
};

export type DocumentSection = {
  id: string;
  title: string;
  color?: string;
  order: number;
  subsections: DocSubsection[];
};

export type DocumentContent = {
  html: string; // contenido ya renderizado
  sourcePath: string; // ruta real usada
};
