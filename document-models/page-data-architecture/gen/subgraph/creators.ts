import { createAction } from "document-model/core";
import {
  AddSubgraphInputSchema,
  UpdateSubgraphInputSchema,
  DeleteSubgraphInputSchema,
  LinkSubgraphToProcessorInputSchema,
  UnlinkSubgraphFromProcessorInputSchema,
} from "../schema/zod.js";
import type {
  AddSubgraphInput,
  UpdateSubgraphInput,
  DeleteSubgraphInput,
  LinkSubgraphToProcessorInput,
  UnlinkSubgraphFromProcessorInput,
} from "../types.js";
import type {
  AddSubgraphAction,
  UpdateSubgraphAction,
  DeleteSubgraphAction,
  LinkSubgraphToProcessorAction,
  UnlinkSubgraphFromProcessorAction,
} from "./actions.js";

export const addSubgraph = (input: AddSubgraphInput) =>
  createAction<AddSubgraphAction>(
    "ADD_SUBGRAPH",
    { ...input },
    undefined,
    AddSubgraphInputSchema,
    "global",
  );

export const updateSubgraph = (input: UpdateSubgraphInput) =>
  createAction<UpdateSubgraphAction>(
    "UPDATE_SUBGRAPH",
    { ...input },
    undefined,
    UpdateSubgraphInputSchema,
    "global",
  );

export const deleteSubgraph = (input: DeleteSubgraphInput) =>
  createAction<DeleteSubgraphAction>(
    "DELETE_SUBGRAPH",
    { ...input },
    undefined,
    DeleteSubgraphInputSchema,
    "global",
  );

export const linkSubgraphToProcessor = (input: LinkSubgraphToProcessorInput) =>
  createAction<LinkSubgraphToProcessorAction>(
    "LINK_SUBGRAPH_TO_PROCESSOR",
    { ...input },
    undefined,
    LinkSubgraphToProcessorInputSchema,
    "global",
  );

export const unlinkSubgraphFromProcessor = (
  input: UnlinkSubgraphFromProcessorInput,
) =>
  createAction<UnlinkSubgraphFromProcessorAction>(
    "UNLINK_SUBGRAPH_FROM_PROCESSOR",
    { ...input },
    undefined,
    UnlinkSubgraphFromProcessorInputSchema,
    "global",
  );
