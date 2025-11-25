import { type Action } from "document-model";
import type {
  AddEndpointInput,
  UpdateEndpointInput,
  DeleteEndpointInput,
} from "../types.js";

export type AddEndpointAction = Action & {
  type: "ADD_ENDPOINT";
  input: AddEndpointInput;
};
export type UpdateEndpointAction = Action & {
  type: "UPDATE_ENDPOINT";
  input: UpdateEndpointInput;
};
export type DeleteEndpointAction = Action & {
  type: "DELETE_ENDPOINT";
  input: DeleteEndpointInput;
};

export type PageDataArchitectureEndpointAction =
  | AddEndpointAction
  | UpdateEndpointAction
  | DeleteEndpointAction;
