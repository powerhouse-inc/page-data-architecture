import type { PHDocument, PHBaseState } from "document-model";
import type { PageDataArchitectureAction } from "./actions.js";
import type { PageDataArchitectureState as PageDataArchitectureGlobalState } from "./schema/types.js";

type PageDataArchitectureLocalState = Record<PropertyKey, never>;
type PageDataArchitecturePHState = PHBaseState & {
  global: PageDataArchitectureGlobalState;
  local: PageDataArchitectureLocalState;
};
type PageDataArchitectureDocument = PHDocument<PageDataArchitecturePHState>;

export * from "./schema/types.js";

export type {
  PageDataArchitectureGlobalState,
  PageDataArchitectureLocalState,
  PageDataArchitecturePHState,
  PageDataArchitectureAction,
  PageDataArchitectureDocument,
};
