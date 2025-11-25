import type { DocumentModelGlobalState } from "document-model";

export const documentModel: DocumentModelGlobalState = {
  author: {
    name: "Powerhouse",
    website: "https://www.powerhouse.inc/",
  },
  description:
    "Defines URL page endpoints with their associated GraphQL subgraphs and PostgreSQL processor tables for data architecture documentation.",
  extension: ".pharch",
  id: "powerhouse/page-data-architecture",
  name: "PageDataArchitecture",
  specifications: [
    {
      changeLog: [],
      modules: [
        {
          description: "Operations for managing URL page endpoints",
          id: "endpoint-module",
          name: "endpoint",
          operations: [
            {
              description: "Create a new URL page endpoint",
              errors: [],
              examples: [],
              id: "add-endpoint-op",
              name: "ADD_ENDPOINT",
              reducer:
                "state.endpoints.push({\n    id: action.input.id,\n    title: action.input.title,\n    urlPath: action.input.urlPath,\n    description: action.input.description || null,\n    subgraphs: [],\n    processors: []\n});",
              schema:
                "input AddEndpointInput {\n    id: OID!\n    title: String!\n    urlPath: String!\n    description: String\n}",
              scope: "global",
              template: "Create a new URL page endpoint",
            },
            {
              description:
                "Update an existing endpoint title, URL path, or description",
              errors: [
                {
                  code: "ENDPOINT_NOT_FOUND",
                  description: "The specified endpoint does not exist",
                  id: "endpoint-not-found-error-1",
                  name: "EndpointNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "update-endpoint-op",
              name: "UPDATE_ENDPOINT",
              reducer:
                "const endpoint = state.endpoints.find(e => e.id === action.input.id);\nif (!endpoint) {\n    throw new EndpointNotFoundError(`Endpoint with ID ${action.input.id} not found`);\n}\nif (action.input.title) endpoint.title = action.input.title;\nif (action.input.urlPath) endpoint.urlPath = action.input.urlPath;\nif (action.input.description !== undefined && action.input.description !== null) endpoint.description = action.input.description;",
              schema:
                "input UpdateEndpointInput {\n    id: OID!\n    title: String\n    urlPath: String\n    description: String\n}",
              scope: "global",
              template:
                "Update an existing endpoint title, URL path, or description",
            },
            {
              description:
                "Remove an endpoint and all its subgraphs and processors",
              errors: [
                {
                  code: "ENDPOINT_NOT_FOUND",
                  description: "The specified endpoint does not exist",
                  id: "endpoint-not-found-error-2",
                  name: "EndpointNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "delete-endpoint-op",
              name: "DELETE_ENDPOINT",
              reducer:
                "const index = state.endpoints.findIndex(e => e.id === action.input.id);\nif (index === -1) {\n    throw new EndpointNotFoundError(`Endpoint with ID ${action.input.id} not found`);\n}\nstate.endpoints.splice(index, 1);",
              schema: "input DeleteEndpointInput {\n    id: OID!\n}",
              scope: "global",
              template:
                "Remove an endpoint and all its subgraphs and processors",
            },
          ],
        },
        {
          description:
            "Operations for managing GraphQL subgraphs within endpoints",
          id: "subgraph-module",
          name: "subgraph",
          operations: [
            {
              description: "Add a new GraphQL subgraph to an endpoint",
              errors: [
                {
                  code: "ENDPOINT_NOT_FOUND",
                  description: "The specified endpoint does not exist",
                  id: "endpoint-not-found-error-3",
                  name: "EndpointNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "add-subgraph-op",
              name: "ADD_SUBGRAPH",
              reducer:
                "const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);\nif (!endpoint) {\n    throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);\n}\nendpoint.subgraphs.push({\n    id: action.input.id,\n    name: action.input.name,\n    description: action.input.description || null,\n    graphqlSchema: action.input.graphqlSchema,\n    graphqlQuery: action.input.graphqlQuery,\n    processorIds: []\n});",
              schema:
                "input AddSubgraphInput {\n    endpointId: OID!\n    id: OID!\n    name: String!\n    description: String\n    graphqlSchema: String!\n    graphqlQuery: String!\n}",
              scope: "global",
              template: "Add a new GraphQL subgraph to an endpoint",
            },
            {
              description:
                "Update a subgraph's name, description, or GraphQL code",
              errors: [
                {
                  code: "ENDPOINT_NOT_FOUND",
                  description: "The specified endpoint does not exist",
                  id: "endpoint-not-found-error-4",
                  name: "EndpointNotFoundError",
                  template: "",
                },
                {
                  code: "SUBGRAPH_NOT_FOUND",
                  description: "The specified subgraph does not exist",
                  id: "subgraph-not-found-error-1",
                  name: "SubgraphNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "update-subgraph-op",
              name: "UPDATE_SUBGRAPH",
              reducer:
                "const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);\nif (!endpoint) {\n    throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);\n}\nconst subgraph = endpoint.subgraphs.find(s => s.id === action.input.id);\nif (!subgraph) {\n    throw new SubgraphNotFoundError(`Subgraph with ID ${action.input.id} not found`);\n}\nif (action.input.name) subgraph.name = action.input.name;\nif (action.input.description !== undefined && action.input.description !== null) subgraph.description = action.input.description;\nif (action.input.graphqlSchema) subgraph.graphqlSchema = action.input.graphqlSchema;\nif (action.input.graphqlQuery) subgraph.graphqlQuery = action.input.graphqlQuery;",
              schema:
                "input UpdateSubgraphInput {\n    endpointId: OID!\n    id: OID!\n    name: String\n    description: String\n    graphqlSchema: String\n    graphqlQuery: String\n}",
              scope: "global",
              template:
                "Update a subgraph's name, description, or GraphQL code",
            },
            {
              description: "Remove a subgraph from an endpoint",
              errors: [
                {
                  code: "ENDPOINT_NOT_FOUND",
                  description: "The specified endpoint does not exist",
                  id: "endpoint-not-found-error-5",
                  name: "EndpointNotFoundError",
                  template: "",
                },
                {
                  code: "SUBGRAPH_NOT_FOUND",
                  description: "The specified subgraph does not exist",
                  id: "subgraph-not-found-error-2",
                  name: "SubgraphNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "delete-subgraph-op",
              name: "DELETE_SUBGRAPH",
              reducer:
                "const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);\nif (!endpoint) {\n    throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);\n}\nconst index = endpoint.subgraphs.findIndex(s => s.id === action.input.id);\nif (index === -1) {\n    throw new SubgraphNotFoundError(`Subgraph with ID ${action.input.id} not found`);\n}\nendpoint.subgraphs.splice(index, 1);",
              schema:
                "input DeleteSubgraphInput {\n    endpointId: OID!\n    id: OID!\n}",
              scope: "global",
              template: "Remove a subgraph from an endpoint",
            },
            {
              description: "Associate a subgraph with a processor",
              errors: [
                {
                  code: "ENDPOINT_NOT_FOUND",
                  description: "The specified endpoint does not exist",
                  id: "endpoint-not-found-error-6",
                  name: "EndpointNotFoundError",
                  template: "",
                },
                {
                  code: "SUBGRAPH_NOT_FOUND",
                  description: "The specified subgraph does not exist",
                  id: "subgraph-not-found-error-3",
                  name: "SubgraphNotFoundError",
                  template: "",
                },
                {
                  code: "PROCESSOR_NOT_FOUND",
                  description: "The specified processor does not exist",
                  id: "processor-not-found-error-1",
                  name: "ProcessorNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "link-subgraph-to-processor-op",
              name: "LINK_SUBGRAPH_TO_PROCESSOR",
              reducer:
                "const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);\nif (!endpoint) {\n    throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);\n}\nconst subgraph = endpoint.subgraphs.find(s => s.id === action.input.subgraphId);\nif (!subgraph) {\n    throw new SubgraphNotFoundError(`Subgraph with ID ${action.input.subgraphId} not found`);\n}\nconst processor = endpoint.processors.find(p => p.id === action.input.processorId);\nif (!processor) {\n    throw new ProcessorNotFoundError(`Processor with ID ${action.input.processorId} not found`);\n}\nif (!subgraph.processorIds.includes(action.input.processorId)) {\n    subgraph.processorIds.push(action.input.processorId);\n}",
              schema:
                "input LinkSubgraphToProcessorInput {\n    endpointId: OID!\n    subgraphId: OID!\n    processorId: OID!\n}",
              scope: "global",
              template: "Associate a subgraph with a processor",
            },
            {
              description:
                "Remove association between a subgraph and a processor",
              errors: [
                {
                  code: "ENDPOINT_NOT_FOUND",
                  description: "The specified endpoint does not exist",
                  id: "endpoint-not-found-error-7",
                  name: "EndpointNotFoundError",
                  template: "",
                },
                {
                  code: "SUBGRAPH_NOT_FOUND",
                  description: "The specified subgraph does not exist",
                  id: "subgraph-not-found-error-4",
                  name: "SubgraphNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "unlink-subgraph-from-processor-op",
              name: "UNLINK_SUBGRAPH_FROM_PROCESSOR",
              reducer:
                "const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);\nif (!endpoint) {\n    throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);\n}\nconst subgraph = endpoint.subgraphs.find(s => s.id === action.input.subgraphId);\nif (!subgraph) {\n    throw new SubgraphNotFoundError(`Subgraph with ID ${action.input.subgraphId} not found`);\n}\nconst processorIndex = subgraph.processorIds.indexOf(action.input.processorId);\nif (processorIndex !== -1) {\n    subgraph.processorIds.splice(processorIndex, 1);\n}",
              schema:
                "input UnlinkSubgraphFromProcessorInput {\n    endpointId: OID!\n    subgraphId: OID!\n    processorId: OID!\n}",
              scope: "global",
              template: "Remove association between a subgraph and a processor",
            },
          ],
        },
        {
          description:
            "Operations for managing PostgreSQL processor tables within endpoints",
          id: "processor-module",
          name: "processor",
          operations: [
            {
              description:
                "Add a new PostgreSQL processor table to an endpoint",
              errors: [
                {
                  code: "ENDPOINT_NOT_FOUND",
                  description: "The specified endpoint does not exist",
                  id: "endpoint-not-found-error-8",
                  name: "EndpointNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "add-processor-op",
              name: "ADD_PROCESSOR",
              reducer:
                "const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);\nif (!endpoint) {\n    throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);\n}\nendpoint.processors.push({\n    id: action.input.id,\n    name: action.input.name,\n    description: action.input.description || null,\n    tableName: action.input.tableName,\n    columns: []\n});",
              schema:
                "input AddProcessorInput {\n    endpointId: OID!\n    id: OID!\n    name: String!\n    description: String\n    tableName: String!\n}",
              scope: "global",
              template: "Add a new PostgreSQL processor table to an endpoint",
            },
            {
              description:
                "Update a processor's name, description, or table name",
              errors: [
                {
                  code: "ENDPOINT_NOT_FOUND",
                  description: "The specified endpoint does not exist",
                  id: "endpoint-not-found-error-9",
                  name: "EndpointNotFoundError",
                  template: "",
                },
                {
                  code: "PROCESSOR_NOT_FOUND",
                  description: "The specified processor does not exist",
                  id: "processor-not-found-error-2",
                  name: "ProcessorNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "update-processor-op",
              name: "UPDATE_PROCESSOR",
              reducer:
                "const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);\nif (!endpoint) {\n    throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);\n}\nconst processor = endpoint.processors.find(p => p.id === action.input.id);\nif (!processor) {\n    throw new ProcessorNotFoundError(`Processor with ID ${action.input.id} not found`);\n}\nif (action.input.name) processor.name = action.input.name;\nif (action.input.description !== undefined && action.input.description !== null) processor.description = action.input.description;\nif (action.input.tableName) processor.tableName = action.input.tableName;",
              schema:
                "input UpdateProcessorInput {\n    endpointId: OID!\n    id: OID!\n    name: String\n    description: String\n    tableName: String\n}",
              scope: "global",
              template: "Update a processor's name, description, or table name",
            },
            {
              description:
                "Remove a processor from an endpoint (also unlinks from all subgraphs)",
              errors: [
                {
                  code: "ENDPOINT_NOT_FOUND",
                  description: "The specified endpoint does not exist",
                  id: "endpoint-not-found-error-10",
                  name: "EndpointNotFoundError",
                  template: "",
                },
                {
                  code: "PROCESSOR_NOT_FOUND",
                  description: "The specified processor does not exist",
                  id: "processor-not-found-error-3",
                  name: "ProcessorNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "delete-processor-op",
              name: "DELETE_PROCESSOR",
              reducer:
                "const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);\nif (!endpoint) {\n    throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);\n}\nconst index = endpoint.processors.findIndex(p => p.id === action.input.id);\nif (index === -1) {\n    throw new ProcessorNotFoundError(`Processor with ID ${action.input.id} not found`);\n}\nendpoint.processors.splice(index, 1);\nendpoint.subgraphs.forEach(subgraph => {\n    const processorIndex = subgraph.processorIds.indexOf(action.input.id);\n    if (processorIndex !== -1) {\n        subgraph.processorIds.splice(processorIndex, 1);\n    }\n});",
              schema:
                "input DeleteProcessorInput {\n    endpointId: OID!\n    id: OID!\n}",
              scope: "global",
              template:
                "Remove a processor from an endpoint (also unlinks from all subgraphs)",
            },
            {
              description: "Add a column to a processor table",
              errors: [
                {
                  code: "ENDPOINT_NOT_FOUND",
                  description: "The specified endpoint does not exist",
                  id: "endpoint-not-found-error-11",
                  name: "EndpointNotFoundError",
                  template: "",
                },
                {
                  code: "PROCESSOR_NOT_FOUND",
                  description: "The specified processor does not exist",
                  id: "processor-not-found-error-4",
                  name: "ProcessorNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "add-column-op",
              name: "ADD_COLUMN",
              reducer:
                "const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);\nif (!endpoint) {\n    throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);\n}\nconst processor = endpoint.processors.find(p => p.id === action.input.processorId);\nif (!processor) {\n    throw new ProcessorNotFoundError(`Processor with ID ${action.input.processorId} not found`);\n}\nprocessor.columns.push({\n    id: action.input.id,\n    name: action.input.name,\n    dataType: action.input.dataType,\n    isPrimaryKey: action.input.isPrimaryKey,\n    isNullable: action.input.isNullable,\n    defaultValue: action.input.defaultValue || null,\n    references: action.input.references || null\n});",
              schema:
                "input AddColumnInput {\n    endpointId: OID!\n    processorId: OID!\n    id: OID!\n    name: String!\n    dataType: String!\n    isPrimaryKey: Boolean!\n    isNullable: Boolean!\n    defaultValue: String\n    references: String\n}",
              scope: "global",
              template: "Add a column to a processor table",
            },
            {
              description: "Update column properties",
              errors: [
                {
                  code: "ENDPOINT_NOT_FOUND",
                  description: "The specified endpoint does not exist",
                  id: "endpoint-not-found-error-12",
                  name: "EndpointNotFoundError",
                  template: "",
                },
                {
                  code: "PROCESSOR_NOT_FOUND",
                  description: "The specified processor does not exist",
                  id: "processor-not-found-error-5",
                  name: "ProcessorNotFoundError",
                  template: "",
                },
                {
                  code: "COLUMN_NOT_FOUND",
                  description: "The specified column does not exist",
                  id: "column-not-found-error-1",
                  name: "ColumnNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "update-column-op",
              name: "UPDATE_COLUMN",
              reducer:
                "const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);\nif (!endpoint) {\n    throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);\n}\nconst processor = endpoint.processors.find(p => p.id === action.input.processorId);\nif (!processor) {\n    throw new ProcessorNotFoundError(`Processor with ID ${action.input.processorId} not found`);\n}\nconst column = processor.columns.find(c => c.id === action.input.id);\nif (!column) {\n    throw new ColumnNotFoundError(`Column with ID ${action.input.id} not found`);\n}\nif (action.input.name) column.name = action.input.name;\nif (action.input.dataType) column.dataType = action.input.dataType;\nif (action.input.isPrimaryKey !== undefined && action.input.isPrimaryKey !== null) column.isPrimaryKey = action.input.isPrimaryKey;\nif (action.input.isNullable !== undefined && action.input.isNullable !== null) column.isNullable = action.input.isNullable;\nif (action.input.defaultValue !== undefined && action.input.defaultValue !== null) column.defaultValue = action.input.defaultValue;\nif (action.input.references !== undefined && action.input.references !== null) column.references = action.input.references;",
              schema:
                "input UpdateColumnInput {\n    endpointId: OID!\n    processorId: OID!\n    id: OID!\n    name: String\n    dataType: String\n    isPrimaryKey: Boolean\n    isNullable: Boolean\n    defaultValue: String\n    references: String\n}",
              scope: "global",
              template: "Update column properties",
            },
            {
              description: "Remove a column from a processor table",
              errors: [
                {
                  code: "ENDPOINT_NOT_FOUND",
                  description: "The specified endpoint does not exist",
                  id: "endpoint-not-found-error-13",
                  name: "EndpointNotFoundError",
                  template: "",
                },
                {
                  code: "PROCESSOR_NOT_FOUND",
                  description: "The specified processor does not exist",
                  id: "processor-not-found-error-6",
                  name: "ProcessorNotFoundError",
                  template: "",
                },
                {
                  code: "COLUMN_NOT_FOUND",
                  description: "The specified column does not exist",
                  id: "column-not-found-error-2",
                  name: "ColumnNotFoundError",
                  template: "",
                },
              ],
              examples: [],
              id: "delete-column-op",
              name: "DELETE_COLUMN",
              reducer:
                "const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);\nif (!endpoint) {\n    throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);\n}\nconst processor = endpoint.processors.find(p => p.id === action.input.processorId);\nif (!processor) {\n    throw new ProcessorNotFoundError(`Processor with ID ${action.input.processorId} not found`);\n}\nconst index = processor.columns.findIndex(c => c.id === action.input.id);\nif (index === -1) {\n    throw new ColumnNotFoundError(`Column with ID ${action.input.id} not found`);\n}\nprocessor.columns.splice(index, 1);",
              schema:
                "input DeleteColumnInput {\n    endpointId: OID!\n    processorId: OID!\n    id: OID!\n}",
              scope: "global",
              template: "Remove a column from a processor table",
            },
          ],
        },
      ],
      state: {
        global: {
          examples: [],
          initialValue: '"{\\n    \\"endpoints\\": []\\n}"',
          schema:
            "type PostgresColumn {\n    id: OID!\n    name: String!\n    dataType: String!\n    isPrimaryKey: Boolean!\n    isNullable: Boolean!\n    defaultValue: String\n    references: String\n}\n\ntype Processor {\n    id: OID!\n    name: String!\n    description: String\n    tableName: String!\n    columns: [PostgresColumn!]!\n}\n\ntype Subgraph {\n    id: OID!\n    name: String!\n    description: String\n    graphqlSchema: String!\n    graphqlQuery: String!\n    processorIds: [OID!]!\n}\n\ntype Endpoint {\n    id: OID!\n    title: String!\n    urlPath: String!\n    description: String\n    subgraphs: [Subgraph!]!\n    processors: [Processor!]!\n}\n\ntype PageDataArchitectureState {\n    endpoints: [Endpoint!]!\n}",
        },
        local: {
          examples: [],
          initialValue: '""',
          schema: "",
        },
      },
      version: 1,
    },
  ],
};
