// TODO: remove eslint-disable rules once refactor is done
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { StateReducer } from "document-model";
import { isDocumentAction, createReducer } from "document-model/core";
import type { PageDataArchitecturePHState } from "@powerhousedao/page-data-architecture/document-models/page-data-architecture";

import { pageDataArchitectureEndpointOperations } from "../src/reducers/endpoint.js";
import { pageDataArchitectureSubgraphOperations } from "../src/reducers/subgraph.js";
import { pageDataArchitectureProcessorOperations } from "../src/reducers/processor.js";

import {
  AddEndpointInputSchema,
  UpdateEndpointInputSchema,
  DeleteEndpointInputSchema,
  AddSubgraphInputSchema,
  UpdateSubgraphInputSchema,
  DeleteSubgraphInputSchema,
  LinkSubgraphToProcessorInputSchema,
  UnlinkSubgraphFromProcessorInputSchema,
  AddProcessorInputSchema,
  UpdateProcessorInputSchema,
  DeleteProcessorInputSchema,
  AddColumnInputSchema,
  UpdateColumnInputSchema,
  DeleteColumnInputSchema,
} from "./schema/zod.js";

const stateReducer: StateReducer<PageDataArchitecturePHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }

  switch (action.type) {
    case "ADD_ENDPOINT":
      AddEndpointInputSchema().parse(action.input);
      pageDataArchitectureEndpointOperations.addEndpointOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_ENDPOINT":
      UpdateEndpointInputSchema().parse(action.input);
      pageDataArchitectureEndpointOperations.updateEndpointOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "DELETE_ENDPOINT":
      DeleteEndpointInputSchema().parse(action.input);
      pageDataArchitectureEndpointOperations.deleteEndpointOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_SUBGRAPH":
      AddSubgraphInputSchema().parse(action.input);
      pageDataArchitectureSubgraphOperations.addSubgraphOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_SUBGRAPH":
      UpdateSubgraphInputSchema().parse(action.input);
      pageDataArchitectureSubgraphOperations.updateSubgraphOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "DELETE_SUBGRAPH":
      DeleteSubgraphInputSchema().parse(action.input);
      pageDataArchitectureSubgraphOperations.deleteSubgraphOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "LINK_SUBGRAPH_TO_PROCESSOR":
      LinkSubgraphToProcessorInputSchema().parse(action.input);
      pageDataArchitectureSubgraphOperations.linkSubgraphToProcessorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UNLINK_SUBGRAPH_FROM_PROCESSOR":
      UnlinkSubgraphFromProcessorInputSchema().parse(action.input);
      pageDataArchitectureSubgraphOperations.unlinkSubgraphFromProcessorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_PROCESSOR":
      AddProcessorInputSchema().parse(action.input);
      pageDataArchitectureProcessorOperations.addProcessorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_PROCESSOR":
      UpdateProcessorInputSchema().parse(action.input);
      pageDataArchitectureProcessorOperations.updateProcessorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "DELETE_PROCESSOR":
      DeleteProcessorInputSchema().parse(action.input);
      pageDataArchitectureProcessorOperations.deleteProcessorOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_COLUMN":
      AddColumnInputSchema().parse(action.input);
      pageDataArchitectureProcessorOperations.addColumnOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "UPDATE_COLUMN":
      UpdateColumnInputSchema().parse(action.input);
      pageDataArchitectureProcessorOperations.updateColumnOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "DELETE_COLUMN":
      DeleteColumnInputSchema().parse(action.input);
      pageDataArchitectureProcessorOperations.deleteColumnOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    default:
      return state;
  }
};

export const reducer = createReducer<PageDataArchitecturePHState>(stateReducer);
