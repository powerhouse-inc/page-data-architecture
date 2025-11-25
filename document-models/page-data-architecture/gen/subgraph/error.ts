export type ErrorCode =
  | "EndpointNotFoundError"
  | "SubgraphNotFoundError"
  | "ProcessorNotFoundError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class EndpointNotFoundError extends Error implements ReducerError {
  errorCode = "EndpointNotFoundError" as ErrorCode;
  constructor(message = "EndpointNotFoundError") {
    super(message);
  }
}

export class SubgraphNotFoundError extends Error implements ReducerError {
  errorCode = "SubgraphNotFoundError" as ErrorCode;
  constructor(message = "SubgraphNotFoundError") {
    super(message);
  }
}

export class ProcessorNotFoundError extends Error implements ReducerError {
  errorCode = "ProcessorNotFoundError" as ErrorCode;
  constructor(message = "ProcessorNotFoundError") {
    super(message);
  }
}

export const errors = {
  AddSubgraph: {
    EndpointNotFoundError,
  },
  UpdateSubgraph: {
    EndpointNotFoundError,
    SubgraphNotFoundError,
  },
  DeleteSubgraph: {
    EndpointNotFoundError,
    SubgraphNotFoundError,
  },
  LinkSubgraphToProcessor: {
    EndpointNotFoundError,
    SubgraphNotFoundError,
    ProcessorNotFoundError,
  },
  UnlinkSubgraphFromProcessor: {
    EndpointNotFoundError,
    SubgraphNotFoundError,
  },
};
