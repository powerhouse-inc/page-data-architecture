export type ErrorCode =
  | "EndpointNotFoundError"
  | "ProcessorNotFoundError"
  | "ColumnNotFoundError";

export interface ReducerError {
  errorCode: ErrorCode;
}

export class EndpointNotFoundError extends Error implements ReducerError {
  errorCode = "EndpointNotFoundError" as ErrorCode;
  constructor(message = "EndpointNotFoundError") {
    super(message);
  }
}

export class ProcessorNotFoundError extends Error implements ReducerError {
  errorCode = "ProcessorNotFoundError" as ErrorCode;
  constructor(message = "ProcessorNotFoundError") {
    super(message);
  }
}

export class ColumnNotFoundError extends Error implements ReducerError {
  errorCode = "ColumnNotFoundError" as ErrorCode;
  constructor(message = "ColumnNotFoundError") {
    super(message);
  }
}

export const errors = {
  AddProcessor: {
    EndpointNotFoundError,
  },
  UpdateProcessor: {
    EndpointNotFoundError,
    ProcessorNotFoundError,
  },
  DeleteProcessor: {
    EndpointNotFoundError,
    ProcessorNotFoundError,
  },
  AddColumn: {
    EndpointNotFoundError,
    ProcessorNotFoundError,
  },
  UpdateColumn: {
    EndpointNotFoundError,
    ProcessorNotFoundError,
    ColumnNotFoundError,
  },
  DeleteColumn: {
    EndpointNotFoundError,
    ProcessorNotFoundError,
    ColumnNotFoundError,
  },
};
