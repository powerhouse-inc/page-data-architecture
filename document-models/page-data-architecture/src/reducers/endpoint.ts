import { EndpointNotFoundError } from "../../gen/endpoint/error.js";
import type { PageDataArchitectureEndpointOperations } from "@powerhousedao/page-data-architecture/document-models/page-data-architecture";

export const pageDataArchitectureEndpointOperations: PageDataArchitectureEndpointOperations =
  {
    addEndpointOperation(state, action) {
          state.endpoints.push({
              id: action.input.id,
              title: action.input.title,
              urlPath: action.input.urlPath,
              description: action.input.description || null,
              comments: action.input.comments || null,
              subgraphs: [],
              processors: []
          });
      },
    updateEndpointOperation(state, action) {
        const endpoint = state.endpoints.find(e => e.id === action.input.id);
        if (!endpoint) {
            throw new EndpointNotFoundError(`Endpoint with ID ${action.input.id} not found`);
        }
        if (action.input.title) endpoint.title = action.input.title;
        if (action.input.urlPath) endpoint.urlPath = action.input.urlPath;
        if (action.input.description !== undefined && action.input.description !== null) endpoint.description = action.input.description;
        if (action.input.comments !== undefined && action.input.comments !== null) endpoint.comments = action.input.comments;
    },
    deleteEndpointOperation(state, action) {
        const index = state.endpoints.findIndex(e => e.id === action.input.id);
        if (index === -1) {
            throw new EndpointNotFoundError(`Endpoint with ID ${action.input.id} not found`);
        }
        state.endpoints.splice(index, 1);
    },
  };
