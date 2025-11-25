import { type Action } from "document-model";
import type {
  AddSubgraphInput,
  UpdateSubgraphInput,
  DeleteSubgraphInput,
  LinkSubgraphToProcessorInput,
  UnlinkSubgraphFromProcessorInput,
} from "../types.js";

export type AddSubgraphAction = Action & {
  type: "ADD_SUBGRAPH";
  input: AddSubgraphInput;
};
export type UpdateSubgraphAction = Action & {
  type: "UPDATE_SUBGRAPH";
  input: UpdateSubgraphInput;
};
export type DeleteSubgraphAction = Action & {
  type: "DELETE_SUBGRAPH";
  input: DeleteSubgraphInput;
};
export type LinkSubgraphToProcessorAction = Action & {
  type: "LINK_SUBGRAPH_TO_PROCESSOR";
  input: LinkSubgraphToProcessorInput;
};
export type UnlinkSubgraphFromProcessorAction = Action & {
  type: "UNLINK_SUBGRAPH_FROM_PROCESSOR";
  input: UnlinkSubgraphFromProcessorInput;
};

export type PageDataArchitectureSubgraphAction =
  | AddSubgraphAction
  | UpdateSubgraphAction
  | DeleteSubgraphAction
  | LinkSubgraphToProcessorAction
  | UnlinkSubgraphFromProcessorAction;
