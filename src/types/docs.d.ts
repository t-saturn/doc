export interface DocumentSubsection {
  id: string;
  title: string;
  description?: string;
  order: number;
}

export interface DocumentSection {
  id: string;
  title: string;
  color?: string;
  order: number;
  subsections: DocumentSubsection[];
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

export interface DocumentContent {
  description: string;
  annotations: string;
  codeBlocks: CodeBlock[];
  images: ImageContent[];
  notes: string;
}
