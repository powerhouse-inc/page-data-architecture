import { type SignalDispatch } from "document-model";
import {
  type AddProcessorAction,
  type UpdateProcessorAction,
  type DeleteProcessorAction,
  type AddColumnAction,
  type UpdateColumnAction,
  type DeleteColumnAction,
} from "./actions.js";
import { type PageDataArchitectureState } from "../types.js";

export interface PageDataArchitectureProcessorOperations {
  addProcessorOperation: (
    state: PageDataArchitectureState,
    action: AddProcessorAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateProcessorOperation: (
    state: PageDataArchitectureState,
    action: UpdateProcessorAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteProcessorOperation: (
    state: PageDataArchitectureState,
    action: DeleteProcessorAction,
    dispatch?: SignalDispatch,
  ) => void;
  addColumnOperation: (
    state: PageDataArchitectureState,
    action: AddColumnAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateColumnOperation: (
    state: PageDataArchitectureState,
    action: UpdateColumnAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteColumnOperation: (
    state: PageDataArchitectureState,
    action: DeleteColumnAction,
    dispatch?: SignalDispatch,
  ) => void;
}
