import { createAction } from "document-model/core";
import {
  AddProcessorInputSchema,
  UpdateProcessorInputSchema,
  DeleteProcessorInputSchema,
  AddColumnInputSchema,
  UpdateColumnInputSchema,
  DeleteColumnInputSchema,
} from "../schema/zod.js";
import type {
  AddProcessorInput,
  UpdateProcessorInput,
  DeleteProcessorInput,
  AddColumnInput,
  UpdateColumnInput,
  DeleteColumnInput,
} from "../types.js";
import type {
  AddProcessorAction,
  UpdateProcessorAction,
  DeleteProcessorAction,
  AddColumnAction,
  UpdateColumnAction,
  DeleteColumnAction,
} from "./actions.js";

export const addProcessor = (input: AddProcessorInput) =>
  createAction<AddProcessorAction>(
    "ADD_PROCESSOR",
    { ...input },
    undefined,
    AddProcessorInputSchema,
    "global",
  );

export const updateProcessor = (input: UpdateProcessorInput) =>
  createAction<UpdateProcessorAction>(
    "UPDATE_PROCESSOR",
    { ...input },
    undefined,
    UpdateProcessorInputSchema,
    "global",
  );

export const deleteProcessor = (input: DeleteProcessorInput) =>
  createAction<DeleteProcessorAction>(
    "DELETE_PROCESSOR",
    { ...input },
    undefined,
    DeleteProcessorInputSchema,
    "global",
  );

export const addColumn = (input: AddColumnInput) =>
  createAction<AddColumnAction>(
    "ADD_COLUMN",
    { ...input },
    undefined,
    AddColumnInputSchema,
    "global",
  );

export const updateColumn = (input: UpdateColumnInput) =>
  createAction<UpdateColumnAction>(
    "UPDATE_COLUMN",
    { ...input },
    undefined,
    UpdateColumnInputSchema,
    "global",
  );

export const deleteColumn = (input: DeleteColumnInput) =>
  createAction<DeleteColumnAction>(
    "DELETE_COLUMN",
    { ...input },
    undefined,
    DeleteColumnInputSchema,
    "global",
  );
