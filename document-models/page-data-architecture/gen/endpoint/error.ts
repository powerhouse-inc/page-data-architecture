export type ErrorCode = "EndpointNotFoundError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class EndpointNotFoundError extends Error implements ReducerError {
  errorCode = "EndpointNotFoundError" as ErrorCode;
  constructor(message = "EndpointNotFoundError") {
    super(message);
  }
}

export const errors = {
  UpdateEndpoint: {
    EndpointNotFoundError,
  },
  DeleteEndpoint: {
    EndpointNotFoundError,
  },
};
