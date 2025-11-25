import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { pageDataArchitectureDocumentType } from "./document-type.js";
import { PageDataArchitectureStateSchema } from "./schema/zod.js";
import type {
  PageDataArchitectureDocument,
  PageDataArchitecturePHState,
} from "./types.js";

/** Schema for validating the header object of a PageDataArchitecture document */
export const PageDataArchitectureDocumentHeaderSchema =
  BaseDocumentHeaderSchema.extend({
    documentType: z.literal(pageDataArchitectureDocumentType),
  });

/** Schema for validating the state object of a PageDataArchitecture document */
export const PageDataArchitecturePHStateSchema = BaseDocumentStateSchema.extend(
  {
    global: PageDataArchitectureStateSchema(),
  },
);

export const PageDataArchitectureDocumentSchema = z.object({
  header: PageDataArchitectureDocumentHeaderSchema,
  state: PageDataArchitecturePHStateSchema,
  initialState: PageDataArchitecturePHStateSchema,
});

/** Simple helper function to check if a state object is a PageDataArchitecture document state object */
export function isPageDataArchitectureState(
  state: unknown,
): state is PageDataArchitecturePHState {
  return PageDataArchitecturePHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a PageDataArchitecture document state object */
export function assertIsPageDataArchitectureState(
  state: unknown,
): asserts state is PageDataArchitecturePHState {
  PageDataArchitecturePHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a PageDataArchitecture document */
export function isPageDataArchitectureDocument(
  document: unknown,
): document is PageDataArchitectureDocument {
  return PageDataArchitectureDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a PageDataArchitecture document */
export function assertIsPageDataArchitectureDocument(
  document: unknown,
): asserts document is PageDataArchitectureDocument {
  PageDataArchitectureDocumentSchema.parse(document);
}
