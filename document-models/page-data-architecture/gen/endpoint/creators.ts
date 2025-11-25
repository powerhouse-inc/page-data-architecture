import { createAction } from "document-model/core";
import {
  AddEndpointInputSchema,
  UpdateEndpointInputSchema,
  DeleteEndpointInputSchema,
} from "../schema/zod.js";
import type {
  AddEndpointInput,
  UpdateEndpointInput,
  DeleteEndpointInput,
} from "../types.js";
import type {
  AddEndpointAction,
  UpdateEndpointAction,
  DeleteEndpointAction,
} from "./actions.js";

export const addEndpoint = (input: AddEndpointInput) =>
  createAction<AddEndpointAction>(
    "ADD_ENDPOINT",
    { ...input },
    undefined,
    AddEndpointInputSchema,
    "global",
  );

export const updateEndpoint = (input: UpdateEndpointInput) =>
  createAction<UpdateEndpointAction>(
    "UPDATE_ENDPOINT",
    { ...input },
    undefined,
    UpdateEndpointInputSchema,
    "global",
  );

export const deleteEndpoint = (input: DeleteEndpointInput) =>
  createAction<DeleteEndpointAction>(
    "DELETE_ENDPOINT",
    { ...input },
    undefined,
    DeleteEndpointInputSchema,
    "global",
  );
