import type { DocumentModelModule } from "document-model";
import { createState } from "document-model";
import { defaultBaseState } from "document-model/core";
import type { PageDataArchitecturePHState } from "@powerhousedao/page-data-architecture/document-models/page-data-architecture";
import {
  actions,
  documentModel,
  reducer,
  utils,
} from "@powerhousedao/page-data-architecture/document-models/page-data-architecture";

/** Document model module for the Todo List document type */
export const PageDataArchitecture: DocumentModelModule<PageDataArchitecturePHState> =
  {
    reducer,
    actions,
    utils,
    documentModel: createState(defaultBaseState(), documentModel),
  };
