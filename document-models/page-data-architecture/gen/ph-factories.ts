/**
 * Factory methods for creating PageDataArchitectureDocument instances
 */
import type { PHAuthState, PHDocumentState, PHBaseState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model/core";
import type {
  PageDataArchitectureDocument,
  PageDataArchitectureLocalState,
  PageDataArchitectureGlobalState,
  PageDataArchitecturePHState,
} from "./types.js";
import { createDocument } from "./utils.js";

export function defaultGlobalState(): PageDataArchitectureGlobalState {
  return {
    endpoints: [],
  };
}

export function defaultLocalState(): PageDataArchitectureLocalState {
  return {};
}

export function defaultPHState(): PageDataArchitecturePHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<PageDataArchitectureGlobalState>,
): PageDataArchitectureGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  } as PageDataArchitectureGlobalState;
}

export function createLocalState(
  state?: Partial<PageDataArchitectureLocalState>,
): PageDataArchitectureLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as PageDataArchitectureLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<PageDataArchitectureGlobalState>,
  localState?: Partial<PageDataArchitectureLocalState>,
): PageDataArchitecturePHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a PageDataArchitectureDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createPageDataArchitectureDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<PageDataArchitectureGlobalState>;
    local?: Partial<PageDataArchitectureLocalState>;
  }>,
): PageDataArchitectureDocument {
  const document = createDocument(
    state
      ? createState(
          createBaseState(state.auth, state.document),
          state.global,
          state.local,
        )
      : undefined,
  );

  return document;
}
