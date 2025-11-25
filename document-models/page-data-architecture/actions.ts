import { baseActions } from "document-model";
import {
  endpointActions,
  subgraphActions,
  processorActions,
} from "./gen/creators.js";

/** Actions for the PageDataArchitecture document model */
export const actions = {
  ...baseActions,
  ...endpointActions,
  ...subgraphActions,
  ...processorActions,
};
