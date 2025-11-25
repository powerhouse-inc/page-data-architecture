import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import {
  useDocumentsInSelectedDrive,
  useDocumentsInSelectedFolder,
  useDocumentById,
  useSelectedDocument,
} from "@powerhousedao/reactor-browser";
import type {
  PageDataArchitectureDocument,
  PageDataArchitectureAction,
} from "@powerhousedao/page-data-architecture/document-models/page-data-architecture";
import { isPageDataArchitectureDocument } from "./gen/document-schema.js";

/** Hook to get a PageDataArchitecture document by its id */
export function usePageDataArchitectureDocumentById(
  documentId: string | null | undefined,
):
  | [PageDataArchitectureDocument, DocumentDispatch<PageDataArchitectureAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isPageDataArchitectureDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected PageDataArchitecture document */
export function useSelectedPageDataArchitectureDocument():
  | [PageDataArchitectureDocument, DocumentDispatch<PageDataArchitectureAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useSelectedDocument();
  if (!isPageDataArchitectureDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get all PageDataArchitecture documents in the selected drive */
export function usePageDataArchitectureDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isPageDataArchitectureDocument);
}

/** Hook to get all PageDataArchitecture documents in the selected folder */
export function usePageDataArchitectureDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isPageDataArchitectureDocument);
}
