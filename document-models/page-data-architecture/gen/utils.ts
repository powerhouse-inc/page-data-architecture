import type { DocumentModelUtils } from "document-model";
import {
  baseCreateDocument,
  baseSaveToFileHandle,
  baseLoadFromInput,
  defaultBaseState,
  generateId,
} from "document-model/core";
import type {
  PageDataArchitectureGlobalState,
  PageDataArchitectureLocalState,
} from "./types.js";
import type { PageDataArchitecturePHState } from "./types.js";
import { reducer } from "./reducer.js";
import { pageDataArchitectureDocumentType } from "./document-type.js";
import {
  isPageDataArchitectureDocument,
  assertIsPageDataArchitectureDocument,
  isPageDataArchitectureState,
  assertIsPageDataArchitectureState,
} from "./document-schema.js";

export const initialGlobalState: PageDataArchitectureGlobalState = {
  endpoints: [],
};
export const initialLocalState: PageDataArchitectureLocalState = {};

export const utils: DocumentModelUtils<PageDataArchitecturePHState> = {
  fileExtension: ".pharch",
  createState(state) {
    return {
      ...defaultBaseState(),
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createDocument(state) {
    const document = baseCreateDocument(utils.createState, state);

    document.header.documentType = pageDataArchitectureDocumentType;

    // for backwards compatibility, but this is NOT a valid signed document id
    document.header.id = generateId();

    return document;
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromInput(input) {
    return baseLoadFromInput(input, reducer);
  },
  isStateOfType(state) {
    return isPageDataArchitectureState(state);
  },
  assertIsStateOfType(state) {
    return assertIsPageDataArchitectureState(state);
  },
  isDocumentOfType(document) {
    return isPageDataArchitectureDocument(document);
  },
  assertIsDocumentOfType(document) {
    return assertIsPageDataArchitectureDocument(document);
  },
};

export const createDocument = utils.createDocument;
export const createState = utils.createState;
export const saveToFileHandle = utils.saveToFileHandle;
export const loadFromInput = utils.loadFromInput;
export const isStateOfType = utils.isStateOfType;
export const assertIsStateOfType = utils.assertIsStateOfType;
export const isDocumentOfType = utils.isDocumentOfType;
export const assertIsDocumentOfType = utils.assertIsDocumentOfType;
