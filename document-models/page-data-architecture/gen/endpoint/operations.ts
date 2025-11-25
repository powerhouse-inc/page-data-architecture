import { type SignalDispatch } from "document-model";
import {
  type AddEndpointAction,
  type UpdateEndpointAction,
  type DeleteEndpointAction,
} from "./actions.js";
import { type PageDataArchitectureState } from "../types.js";

export interface PageDataArchitectureEndpointOperations {
  addEndpointOperation: (
    state: PageDataArchitectureState,
    action: AddEndpointAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateEndpointOperation: (
    state: PageDataArchitectureState,
    action: UpdateEndpointAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteEndpointOperation: (
    state: PageDataArchitectureState,
    action: DeleteEndpointAction,
    dispatch?: SignalDispatch,
  ) => void;
}
