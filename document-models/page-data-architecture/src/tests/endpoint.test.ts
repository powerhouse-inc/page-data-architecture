/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect } from "vitest";
import { generateMock } from "@powerhousedao/codegen";
import {
  reducer,
  utils,
  isPageDataArchitectureDocument,
  addEndpoint,
  AddEndpointInputSchema,
  updateEndpoint,
  UpdateEndpointInputSchema,
  deleteEndpoint,
  DeleteEndpointInputSchema,
} from "@powerhousedao/page-data-architecture/document-models/page-data-architecture";

describe("Endpoint Operations", () => {
  it("should handle addEndpoint operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddEndpointInputSchema());

    const updatedDocument = reducer(document, addEndpoint(input));

    expect(isPageDataArchitectureDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_ENDPOINT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle updateEndpoint operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateEndpointInputSchema());

    const updatedDocument = reducer(document, updateEndpoint(input));

    expect(isPageDataArchitectureDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_ENDPOINT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle deleteEndpoint operation", () => {
    const document = utils.createDocument();
    const input = generateMock(DeleteEndpointInputSchema());

    const updatedDocument = reducer(document, deleteEndpoint(input));

    expect(isPageDataArchitectureDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_ENDPOINT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
