import { type Action } from "document-model";
import type {
  AddProcessorInput,
  UpdateProcessorInput,
  DeleteProcessorInput,
  AddColumnInput,
  UpdateColumnInput,
  DeleteColumnInput,
} from "../types.js";

export type AddProcessorAction = Action & {
  type: "ADD_PROCESSOR";
  input: AddProcessorInput;
};
export type UpdateProcessorAction = Action & {
  type: "UPDATE_PROCESSOR";
  input: UpdateProcessorInput;
};
export type DeleteProcessorAction = Action & {
  type: "DELETE_PROCESSOR";
  input: DeleteProcessorInput;
};
export type AddColumnAction = Action & {
  type: "ADD_COLUMN";
  input: AddColumnInput;
};
export type UpdateColumnAction = Action & {
  type: "UPDATE_COLUMN";
  input: UpdateColumnInput;
};
export type DeleteColumnAction = Action & {
  type: "DELETE_COLUMN";
  input: DeleteColumnInput;
};

export type PageDataArchitectureProcessorAction =
  | AddProcessorAction
  | UpdateProcessorAction
  | DeleteProcessorAction
  | AddColumnAction
  | UpdateColumnAction
  | DeleteColumnAction;
