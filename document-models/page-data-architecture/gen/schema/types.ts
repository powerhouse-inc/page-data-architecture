export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Amount: {
    input: { unit?: string; value?: number };
    output: { unit?: string; value?: number };
  };
  Amount_Crypto: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Currency: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Fiat: {
    input: { unit: string; value: number };
    output: { unit: string; value: number };
  };
  Amount_Money: { input: number; output: number };
  Amount_Percentage: { input: number; output: number };
  Amount_Tokens: { input: number; output: number };
  Currency: { input: string; output: string };
  Date: { input: string; output: string };
  DateTime: { input: string; output: string };
  EmailAddress: { input: string; output: string };
  EthereumAddress: { input: string; output: string };
  OID: { input: string; output: string };
  OLabel: { input: string; output: string };
  PHID: { input: string; output: string };
  URL: { input: string; output: string };
  Upload: { input: File; output: File };
};

export type AddColumnInput = {
  dataType: Scalars["String"]["input"];
  defaultValue?: InputMaybe<Scalars["String"]["input"]>;
  endpointId: Scalars["OID"]["input"];
  id: Scalars["OID"]["input"];
  isNullable: Scalars["Boolean"]["input"];
  isPrimaryKey: Scalars["Boolean"]["input"];
  name: Scalars["String"]["input"];
  processorId: Scalars["OID"]["input"];
  references?: InputMaybe<Scalars["String"]["input"]>;
};

export type AddEndpointInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  title: Scalars["String"]["input"];
  urlPath: Scalars["String"]["input"];
};

export type AddProcessorInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  endpointId: Scalars["OID"]["input"];
  id: Scalars["OID"]["input"];
  name: Scalars["String"]["input"];
  tableName: Scalars["String"]["input"];
};

export type AddSubgraphInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  endpointId: Scalars["OID"]["input"];
  graphqlQuery: Scalars["String"]["input"];
  graphqlSchema: Scalars["String"]["input"];
  id: Scalars["OID"]["input"];
  name: Scalars["String"]["input"];
};

export type DeleteColumnInput = {
  endpointId: Scalars["OID"]["input"];
  id: Scalars["OID"]["input"];
  processorId: Scalars["OID"]["input"];
};

export type DeleteEndpointInput = {
  id: Scalars["OID"]["input"];
};

export type DeleteProcessorInput = {
  endpointId: Scalars["OID"]["input"];
  id: Scalars["OID"]["input"];
};

export type DeleteSubgraphInput = {
  endpointId: Scalars["OID"]["input"];
  id: Scalars["OID"]["input"];
};

export type Endpoint = {
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  processors: Array<Processor>;
  subgraphs: Array<Subgraph>;
  title: Scalars["String"]["output"];
  urlPath: Scalars["String"]["output"];
};

export type LinkSubgraphToProcessorInput = {
  endpointId: Scalars["OID"]["input"];
  processorId: Scalars["OID"]["input"];
  subgraphId: Scalars["OID"]["input"];
};

export type PageDataArchitectureState = {
  endpoints: Array<Endpoint>;
};

export type PostgresColumn = {
  dataType: Scalars["String"]["output"];
  defaultValue: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  isNullable: Scalars["Boolean"]["output"];
  isPrimaryKey: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  references: Maybe<Scalars["String"]["output"]>;
};

export type Processor = {
  columns: Array<PostgresColumn>;
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  name: Scalars["String"]["output"];
  tableName: Scalars["String"]["output"];
};

export type Subgraph = {
  description: Maybe<Scalars["String"]["output"]>;
  graphqlQuery: Scalars["String"]["output"];
  graphqlSchema: Scalars["String"]["output"];
  id: Scalars["OID"]["output"];
  name: Scalars["String"]["output"];
  processorIds: Array<Scalars["OID"]["output"]>;
};

export type UnlinkSubgraphFromProcessorInput = {
  endpointId: Scalars["OID"]["input"];
  processorId: Scalars["OID"]["input"];
  subgraphId: Scalars["OID"]["input"];
};

export type UpdateColumnInput = {
  dataType?: InputMaybe<Scalars["String"]["input"]>;
  defaultValue?: InputMaybe<Scalars["String"]["input"]>;
  endpointId: Scalars["OID"]["input"];
  id: Scalars["OID"]["input"];
  isNullable?: InputMaybe<Scalars["Boolean"]["input"]>;
  isPrimaryKey?: InputMaybe<Scalars["Boolean"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  processorId: Scalars["OID"]["input"];
  references?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateEndpointInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  title?: InputMaybe<Scalars["String"]["input"]>;
  urlPath?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateProcessorInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  endpointId: Scalars["OID"]["input"];
  id: Scalars["OID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  tableName?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateSubgraphInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  endpointId: Scalars["OID"]["input"];
  graphqlQuery?: InputMaybe<Scalars["String"]["input"]>;
  graphqlSchema?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};
