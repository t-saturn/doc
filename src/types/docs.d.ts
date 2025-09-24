export type DocTopic = {
  id: string;
  title: string;
  order: number;
  file: string; // src/data/...
};

type NodeBase = { id: string; title: string; order: number };

export type DocSubsection = NodeBase &
  (
    | { file: string; topics?: never } // terminal (nivel 2)
    | { topics: DocTopic[]; file?: never }
  ); // contenedor (nivel 3)

export type DocumentSection = NodeBase & { color?: string } & (
    | { file: string; subsections?: never } // terminal (nivel 1)
    | { subsections: DocSubsection[]; file?: never }
  ); // contenedor (nivel 2/3)

export type DocumentContent = {
  html: string;
  sourcePath: string;
};
