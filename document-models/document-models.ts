import type { DocumentModelModule } from "document-model";
import { PageDataArchitecture } from "./page-data-architecture/module.js";

export const documentModels: DocumentModelModule<any>[] = [
  PageDataArchitecture,
];
