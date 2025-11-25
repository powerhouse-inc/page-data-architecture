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
  addProcessor,
  AddProcessorInputSchema,
  updateProcessor,
  UpdateProcessorInputSchema,
  deleteProcessor,
  DeleteProcessorInputSchema,
  addColumn,
  AddColumnInputSchema,
  updateColumn,
  UpdateColumnInputSchema,
  deleteColumn,
  DeleteColumnInputSchema,
} from "@powerhousedao/page-data-architecture/document-models/page-data-architecture";

describe("Processor Operations", () => {
  it("should handle addProcessor operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddProcessorInputSchema());

    const updatedDocument = reducer(document, addProcessor(input));

    expect(isPageDataArchitectureDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_PROCESSOR",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle updateProcessor operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateProcessorInputSchema());

    const updatedDocument = reducer(document, updateProcessor(input));

    expect(isPageDataArchitectureDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_PROCESSOR",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle deleteProcessor operation", () => {
    const document = utils.createDocument();
    const input = generateMock(DeleteProcessorInputSchema());

    const updatedDocument = reducer(document, deleteProcessor(input));

    expect(isPageDataArchitectureDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_PROCESSOR",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addColumn operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddColumnInputSchema());

    const updatedDocument = reducer(document, addColumn(input));

    expect(isPageDataArchitectureDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_COLUMN");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle updateColumn operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateColumnInputSchema());

    const updatedDocument = reducer(document, updateColumn(input));

    expect(isPageDataArchitectureDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_COLUMN",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle deleteColumn operation", () => {
    const document = utils.createDocument();
    const input = generateMock(DeleteColumnInputSchema());

    const updatedDocument = reducer(document, deleteColumn(input));

    expect(isPageDataArchitectureDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_COLUMN",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
