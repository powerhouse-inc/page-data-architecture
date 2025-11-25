import { type SignalDispatch } from "document-model";
import {
  type AddSubgraphAction,
  type UpdateSubgraphAction,
  type DeleteSubgraphAction,
  type LinkSubgraphToProcessorAction,
  type UnlinkSubgraphFromProcessorAction,
} from "./actions.js";
import { type PageDataArchitectureState } from "../types.js";

export interface PageDataArchitectureSubgraphOperations {
  addSubgraphOperation: (
    state: PageDataArchitectureState,
    action: AddSubgraphAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateSubgraphOperation: (
    state: PageDataArchitectureState,
    action: UpdateSubgraphAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteSubgraphOperation: (
    state: PageDataArchitectureState,
    action: DeleteSubgraphAction,
    dispatch?: SignalDispatch,
  ) => void;
  linkSubgraphToProcessorOperation: (
    state: PageDataArchitectureState,
    action: LinkSubgraphToProcessorAction,
    dispatch?: SignalDispatch,
  ) => void;
  unlinkSubgraphFromProcessorOperation: (
    state: PageDataArchitectureState,
    action: UnlinkSubgraphFromProcessorAction,
    dispatch?: SignalDispatch,
  ) => void;
}
