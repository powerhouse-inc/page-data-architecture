import {
  EndpointNotFoundError,
  SubgraphNotFoundError,
  ProcessorNotFoundError,
} from "../../gen/subgraph/error.js";
import type { PageDataArchitectureSubgraphOperations } from "@powerhousedao/page-data-architecture/document-models/page-data-architecture";

export const pageDataArchitectureSubgraphOperations: PageDataArchitectureSubgraphOperations =
  {
    addSubgraphOperation(state, action) {
          const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);
          if (!endpoint) {
              throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);
          }
          endpoint.subgraphs.push({
              id: action.input.id,
              name: action.input.name,
              description: action.input.description || null,
              graphqlSchema: action.input.graphqlSchema,
              graphqlQuery: action.input.graphqlQuery,
              processorIds: []
          });
      },
    updateSubgraphOperation(state, action) {
        const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);
        if (!endpoint) {
            throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);
        }
        const subgraph = endpoint.subgraphs.find(s => s.id === action.input.id);
        if (!subgraph) {
            throw new SubgraphNotFoundError(`Subgraph with ID ${action.input.id} not found`);
        }
        if (action.input.name) subgraph.name = action.input.name;
        if (action.input.description !== undefined && action.input.description !== null) subgraph.description = action.input.description;
        if (action.input.graphqlSchema) subgraph.graphqlSchema = action.input.graphqlSchema;
        if (action.input.graphqlQuery) subgraph.graphqlQuery = action.input.graphqlQuery;
    },
    deleteSubgraphOperation(state, action) {
        const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);
        if (!endpoint) {
            throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);
        }
        const index = endpoint.subgraphs.findIndex(s => s.id === action.input.id);
        if (index === -1) {
            throw new SubgraphNotFoundError(`Subgraph with ID ${action.input.id} not found`);
        }
        endpoint.subgraphs.splice(index, 1);
    },
    linkSubgraphToProcessorOperation(state, action) {
        const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);
        if (!endpoint) {
            throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);
        }
        const subgraph = endpoint.subgraphs.find(s => s.id === action.input.subgraphId);
        if (!subgraph) {
            throw new SubgraphNotFoundError(`Subgraph with ID ${action.input.subgraphId} not found`);
        }
        const processor = endpoint.processors.find(p => p.id === action.input.processorId);
        if (!processor) {
            throw new ProcessorNotFoundError(`Processor with ID ${action.input.processorId} not found`);
        }
        if (!subgraph.processorIds.includes(action.input.processorId)) {
            subgraph.processorIds.push(action.input.processorId);
        }
    },
    unlinkSubgraphFromProcessorOperation(state, action) {
        const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);
        if (!endpoint) {
            throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);
        }
        const subgraph = endpoint.subgraphs.find(s => s.id === action.input.subgraphId);
        if (!subgraph) {
            throw new SubgraphNotFoundError(`Subgraph with ID ${action.input.subgraphId} not found`);
        }
        const processorIndex = subgraph.processorIds.indexOf(action.input.processorId);
        if (processorIndex !== -1) {
            subgraph.processorIds.splice(processorIndex, 1);
        }
    },
  };
