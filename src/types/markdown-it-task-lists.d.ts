declare module "markdown-it-task-lists" {
  import type MarkdownIt from "markdown-it";

  export interface TaskListsOptions {
    enabled?: boolean;
    label?: boolean;
    labelAfter?: boolean;
    lineNumber?: boolean;
  }

  // Plugin de MarkdownIt
  export default function taskLists(md: MarkdownIt, opts?: TaskListsOptions): void;
}
