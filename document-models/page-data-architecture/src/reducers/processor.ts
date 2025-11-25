import {
  EndpointNotFoundError,
  ProcessorNotFoundError,
  ColumnNotFoundError,
} from "../../gen/processor/error.js";
import type { PageDataArchitectureProcessorOperations } from "@powerhousedao/page-data-architecture/document-models/page-data-architecture";

export const pageDataArchitectureProcessorOperations: PageDataArchitectureProcessorOperations =
  {
    addProcessorOperation(state, action) {
          const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);
          if (!endpoint) {
              throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);
          }
          endpoint.processors.push({
              id: action.input.id,
              name: action.input.name,
              description: action.input.description || null,
              tableName: action.input.tableName,
              columns: []
          });
      },
    updateProcessorOperation(state, action) {
        const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);
        if (!endpoint) {
            throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);
        }
        const processor = endpoint.processors.find(p => p.id === action.input.id);
        if (!processor) {
            throw new ProcessorNotFoundError(`Processor with ID ${action.input.id} not found`);
        }
        if (action.input.name) processor.name = action.input.name;
        if (action.input.description !== undefined && action.input.description !== null) processor.description = action.input.description;
        if (action.input.tableName) processor.tableName = action.input.tableName;
    },
    deleteProcessorOperation(state, action) {
        const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);
        if (!endpoint) {
            throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);
        }
        const index = endpoint.processors.findIndex(p => p.id === action.input.id);
        if (index === -1) {
            throw new ProcessorNotFoundError(`Processor with ID ${action.input.id} not found`);
        }
        endpoint.processors.splice(index, 1);
        endpoint.subgraphs.forEach(subgraph => {
            const processorIndex = subgraph.processorIds.indexOf(action.input.id);
            if (processorIndex !== -1) {
                subgraph.processorIds.splice(processorIndex, 1);
            }
        });
    },
    addColumnOperation(state, action) {
        const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);
        if (!endpoint) {
            throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);
        }
        const processor = endpoint.processors.find(p => p.id === action.input.processorId);
        if (!processor) {
            throw new ProcessorNotFoundError(`Processor with ID ${action.input.processorId} not found`);
        }
        processor.columns.push({
            id: action.input.id,
            name: action.input.name,
            dataType: action.input.dataType,
            isPrimaryKey: action.input.isPrimaryKey,
            isNullable: action.input.isNullable,
            defaultValue: action.input.defaultValue || null,
            references: action.input.references || null
        });
    },
    updateColumnOperation(state, action) {
        const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);
        if (!endpoint) {
            throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);
        }
        const processor = endpoint.processors.find(p => p.id === action.input.processorId);
        if (!processor) {
            throw new ProcessorNotFoundError(`Processor with ID ${action.input.processorId} not found`);
        }
        const column = processor.columns.find(c => c.id === action.input.id);
        if (!column) {
            throw new ColumnNotFoundError(`Column with ID ${action.input.id} not found`);
        }
        if (action.input.name) column.name = action.input.name;
        if (action.input.dataType) column.dataType = action.input.dataType;
        if (action.input.isPrimaryKey !== undefined && action.input.isPrimaryKey !== null) column.isPrimaryKey = action.input.isPrimaryKey;
        if (action.input.isNullable !== undefined && action.input.isNullable !== null) column.isNullable = action.input.isNullable;
        if (action.input.defaultValue !== undefined && action.input.defaultValue !== null) column.defaultValue = action.input.defaultValue;
        if (action.input.references !== undefined && action.input.references !== null) column.references = action.input.references;
    },
    deleteColumnOperation(state, action) {
        const endpoint = state.endpoints.find(e => e.id === action.input.endpointId);
        if (!endpoint) {
            throw new EndpointNotFoundError(`Endpoint with ID ${action.input.endpointId} not found`);
        }
        const processor = endpoint.processors.find(p => p.id === action.input.processorId);
        if (!processor) {
            throw new ProcessorNotFoundError(`Processor with ID ${action.input.processorId} not found`);
        }
        const index = processor.columns.findIndex(c => c.id === action.input.id);
        if (index === -1) {
            throw new ColumnNotFoundError(`Column with ID ${action.input.id} not found`);
        }
        processor.columns.splice(index, 1);
    },
  };
