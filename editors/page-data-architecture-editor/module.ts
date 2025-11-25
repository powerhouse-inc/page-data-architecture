import type { EditorModule } from "document-model";
import { lazy } from "react";

/** Document editor module for the Todo List document type */
export const PageDataArchitectureEditor: EditorModule = {
  Component: lazy(() => import("./editor.js")),
  documentTypes: ["powerhouse/page-data-architecture"],
  config: {
    id: "page-data-architecture-editor",
    name: "PageDataArchitectureEditor",
  },
};
