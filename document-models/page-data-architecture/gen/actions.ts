import type { PageDataArchitectureEndpointAction } from "./endpoint/actions.js";
import type { PageDataArchitectureSubgraphAction } from "./subgraph/actions.js";
import type { PageDataArchitectureProcessorAction } from "./processor/actions.js";

export * from "./endpoint/actions.js";
export * from "./subgraph/actions.js";
export * from "./processor/actions.js";

export type PageDataArchitectureAction =
  | PageDataArchitectureEndpointAction
  | PageDataArchitectureSubgraphAction
  | PageDataArchitectureProcessorAction;
