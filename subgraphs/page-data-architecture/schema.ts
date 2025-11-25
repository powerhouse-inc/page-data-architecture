import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Queries: PageDataArchitecture Document
  """
  type PageDataArchitectureQueries {
    getDocument(docId: PHID!, driveId: PHID): PageDataArchitecture
    getDocuments(driveId: String!): [PageDataArchitecture!]
  }

  type Query {
    PageDataArchitecture: PageDataArchitectureQueries
  }

  """
  Mutations: PageDataArchitecture
  """
  type Mutation {
    PageDataArchitecture_createDocument(name: String!, driveId: String): String

    PageDataArchitecture_addEndpoint(
      driveId: String
      docId: PHID
      input: PageDataArchitecture_AddEndpointInput
    ): Int
    PageDataArchitecture_updateEndpoint(
      driveId: String
      docId: PHID
      input: PageDataArchitecture_UpdateEndpointInput
    ): Int
    PageDataArchitecture_deleteEndpoint(
      driveId: String
      docId: PHID
      input: PageDataArchitecture_DeleteEndpointInput
    ): Int
    PageDataArchitecture_addSubgraph(
      driveId: String
      docId: PHID
      input: PageDataArchitecture_AddSubgraphInput
    ): Int
    PageDataArchitecture_updateSubgraph(
      driveId: String
      docId: PHID
      input: PageDataArchitecture_UpdateSubgraphInput
    ): Int
    PageDataArchitecture_deleteSubgraph(
      driveId: String
      docId: PHID
      input: PageDataArchitecture_DeleteSubgraphInput
    ): Int
    PageDataArchitecture_linkSubgraphToProcessor(
      driveId: String
      docId: PHID
      input: PageDataArchitecture_LinkSubgraphToProcessorInput
    ): Int
    PageDataArchitecture_unlinkSubgraphFromProcessor(
      driveId: String
      docId: PHID
      input: PageDataArchitecture_UnlinkSubgraphFromProcessorInput
    ): Int
    PageDataArchitecture_addProcessor(
      driveId: String
      docId: PHID
      input: PageDataArchitecture_AddProcessorInput
    ): Int
    PageDataArchitecture_updateProcessor(
      driveId: String
      docId: PHID
      input: PageDataArchitecture_UpdateProcessorInput
    ): Int
    PageDataArchitecture_deleteProcessor(
      driveId: String
      docId: PHID
      input: PageDataArchitecture_DeleteProcessorInput
    ): Int
    PageDataArchitecture_addColumn(
      driveId: String
      docId: PHID
      input: PageDataArchitecture_AddColumnInput
    ): Int
    PageDataArchitecture_updateColumn(
      driveId: String
      docId: PHID
      input: PageDataArchitecture_UpdateColumnInput
    ): Int
    PageDataArchitecture_deleteColumn(
      driveId: String
      docId: PHID
      input: PageDataArchitecture_DeleteColumnInput
    ): Int
  }

  """
  Module: Endpoint
  """
  input PageDataArchitecture_AddEndpointInput {
    id: OID!
    title: String!
    urlPath: String!
    description: String
    comments: String
  }
  input PageDataArchitecture_UpdateEndpointInput {
    id: OID!
    title: String
    urlPath: String
    description: String
    comments: String
  }
  input PageDataArchitecture_DeleteEndpointInput {
    id: OID!
  }

  """
  Module: Subgraph
  """
  input PageDataArchitecture_AddSubgraphInput {
    endpointId: OID!
    id: OID!
    name: String!
    description: String
    graphqlSchema: String!
    graphqlQuery: String!
  }
  input PageDataArchitecture_UpdateSubgraphInput {
    endpointId: OID!
    id: OID!
    name: String
    description: String
    graphqlSchema: String
    graphqlQuery: String
  }
  input PageDataArchitecture_DeleteSubgraphInput {
    endpointId: OID!
    id: OID!
  }
  input PageDataArchitecture_LinkSubgraphToProcessorInput {
    endpointId: OID!
    subgraphId: OID!
    processorId: OID!
  }
  input PageDataArchitecture_UnlinkSubgraphFromProcessorInput {
    endpointId: OID!
    subgraphId: OID!
    processorId: OID!
  }

  """
  Module: Processor
  """
  input PageDataArchitecture_AddProcessorInput {
    endpointId: OID!
    id: OID!
    name: String!
    description: String
    tableName: String!
  }
  input PageDataArchitecture_UpdateProcessorInput {
    endpointId: OID!
    id: OID!
    name: String
    description: String
    tableName: String
  }
  input PageDataArchitecture_DeleteProcessorInput {
    endpointId: OID!
    id: OID!
  }
  input PageDataArchitecture_AddColumnInput {
    endpointId: OID!
    processorId: OID!
    id: OID!
    name: String!
    dataType: String!
    isPrimaryKey: Boolean!
    isNullable: Boolean!
    defaultValue: String
    references: String
  }
  input PageDataArchitecture_UpdateColumnInput {
    endpointId: OID!
    processorId: OID!
    id: OID!
    name: String
    dataType: String
    isPrimaryKey: Boolean
    isNullable: Boolean
    defaultValue: String
    references: String
  }
  input PageDataArchitecture_DeleteColumnInput {
    endpointId: OID!
    processorId: OID!
    id: OID!
  }
`;
