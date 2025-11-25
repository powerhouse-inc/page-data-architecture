import { z } from "zod";
import type {
  AddColumnInput,
  AddEndpointInput,
  AddProcessorInput,
  AddSubgraphInput,
  DeleteColumnInput,
  DeleteEndpointInput,
  DeleteProcessorInput,
  DeleteSubgraphInput,
  Endpoint,
  LinkSubgraphToProcessorInput,
  PageDataArchitectureState,
  PostgresColumn,
  Processor,
  Subgraph,
  UnlinkSubgraphFromProcessorInput,
  UpdateColumnInput,
  UpdateEndpointInput,
  UpdateProcessorInput,
  UpdateSubgraphInput,
} from "./types.js";

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
  v !== undefined && v !== null;

export const definedNonNullAnySchema = z
  .any()
  .refine((v) => isDefinedNonNullAny(v));

export function AddColumnInputSchema(): z.ZodObject<
  Properties<AddColumnInput>
> {
  return z.object({
    dataType: z.string(),
    defaultValue: z.string().nullish(),
    endpointId: z.string(),
    id: z.string(),
    isNullable: z.boolean(),
    isPrimaryKey: z.boolean(),
    name: z.string(),
    processorId: z.string(),
    references: z.string().nullish(),
  });
}

export function AddEndpointInputSchema(): z.ZodObject<
  Properties<AddEndpointInput>
> {
  return z.object({
    description: z.string().nullish(),
    id: z.string(),
    title: z.string(),
    urlPath: z.string(),
  });
}

export function AddProcessorInputSchema(): z.ZodObject<
  Properties<AddProcessorInput>
> {
  return z.object({
    description: z.string().nullish(),
    endpointId: z.string(),
    id: z.string(),
    name: z.string(),
    tableName: z.string(),
  });
}

export function AddSubgraphInputSchema(): z.ZodObject<
  Properties<AddSubgraphInput>
> {
  return z.object({
    description: z.string().nullish(),
    endpointId: z.string(),
    graphqlQuery: z.string(),
    graphqlSchema: z.string(),
    id: z.string(),
    name: z.string(),
  });
}

export function DeleteColumnInputSchema(): z.ZodObject<
  Properties<DeleteColumnInput>
> {
  return z.object({
    endpointId: z.string(),
    id: z.string(),
    processorId: z.string(),
  });
}

export function DeleteEndpointInputSchema(): z.ZodObject<
  Properties<DeleteEndpointInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function DeleteProcessorInputSchema(): z.ZodObject<
  Properties<DeleteProcessorInput>
> {
  return z.object({
    endpointId: z.string(),
    id: z.string(),
  });
}

export function DeleteSubgraphInputSchema(): z.ZodObject<
  Properties<DeleteSubgraphInput>
> {
  return z.object({
    endpointId: z.string(),
    id: z.string(),
  });
}

export function EndpointSchema(): z.ZodObject<Properties<Endpoint>> {
  return z.object({
    __typename: z.literal("Endpoint").optional(),
    description: z.string().nullable(),
    id: z.string(),
    processors: z.array(ProcessorSchema()),
    subgraphs: z.array(SubgraphSchema()),
    title: z.string(),
    urlPath: z.string(),
  });
}

export function LinkSubgraphToProcessorInputSchema(): z.ZodObject<
  Properties<LinkSubgraphToProcessorInput>
> {
  return z.object({
    endpointId: z.string(),
    processorId: z.string(),
    subgraphId: z.string(),
  });
}

export function PageDataArchitectureStateSchema(): z.ZodObject<
  Properties<PageDataArchitectureState>
> {
  return z.object({
    __typename: z.literal("PageDataArchitectureState").optional(),
    endpoints: z.array(EndpointSchema()),
  });
}

export function PostgresColumnSchema(): z.ZodObject<
  Properties<PostgresColumn>
> {
  return z.object({
    __typename: z.literal("PostgresColumn").optional(),
    dataType: z.string(),
    defaultValue: z.string().nullable(),
    id: z.string(),
    isNullable: z.boolean(),
    isPrimaryKey: z.boolean(),
    name: z.string(),
    references: z.string().nullable(),
  });
}

export function ProcessorSchema(): z.ZodObject<Properties<Processor>> {
  return z.object({
    __typename: z.literal("Processor").optional(),
    columns: z.array(PostgresColumnSchema()),
    description: z.string().nullable(),
    id: z.string(),
    name: z.string(),
    tableName: z.string(),
  });
}

export function SubgraphSchema(): z.ZodObject<Properties<Subgraph>> {
  return z.object({
    __typename: z.literal("Subgraph").optional(),
    description: z.string().nullable(),
    graphqlQuery: z.string(),
    graphqlSchema: z.string(),
    id: z.string(),
    name: z.string(),
    processorIds: z.array(z.string()),
  });
}

export function UnlinkSubgraphFromProcessorInputSchema(): z.ZodObject<
  Properties<UnlinkSubgraphFromProcessorInput>
> {
  return z.object({
    endpointId: z.string(),
    processorId: z.string(),
    subgraphId: z.string(),
  });
}

export function UpdateColumnInputSchema(): z.ZodObject<
  Properties<UpdateColumnInput>
> {
  return z.object({
    dataType: z.string().nullish(),
    defaultValue: z.string().nullish(),
    endpointId: z.string(),
    id: z.string(),
    isNullable: z.boolean().nullish(),
    isPrimaryKey: z.boolean().nullish(),
    name: z.string().nullish(),
    processorId: z.string(),
    references: z.string().nullish(),
  });
}

export function UpdateEndpointInputSchema(): z.ZodObject<
  Properties<UpdateEndpointInput>
> {
  return z.object({
    description: z.string().nullish(),
    id: z.string(),
    title: z.string().nullish(),
    urlPath: z.string().nullish(),
  });
}

export function UpdateProcessorInputSchema(): z.ZodObject<
  Properties<UpdateProcessorInput>
> {
  return z.object({
    description: z.string().nullish(),
    endpointId: z.string(),
    id: z.string(),
    name: z.string().nullish(),
    tableName: z.string().nullish(),
  });
}

export function UpdateSubgraphInputSchema(): z.ZodObject<
  Properties<UpdateSubgraphInput>
> {
  return z.object({
    description: z.string().nullish(),
    endpointId: z.string(),
    graphqlQuery: z.string().nullish(),
    graphqlSchema: z.string().nullish(),
    id: z.string(),
    name: z.string().nullish(),
  });
}
