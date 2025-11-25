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
  addSubgraph,
  AddSubgraphInputSchema,
  updateSubgraph,
  UpdateSubgraphInputSchema,
  deleteSubgraph,
  DeleteSubgraphInputSchema,
  linkSubgraphToProcessor,
  LinkSubgraphToProcessorInputSchema,
  unlinkSubgraphFromProcessor,
  UnlinkSubgraphFromProcessorInputSchema,
} from "@powerhousedao/page-data-architecture/document-models/page-data-architecture";

describe("Subgraph Operations", () => {
  it("should handle addSubgraph operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddSubgraphInputSchema());

    const updatedDocument = reducer(document, addSubgraph(input));

    expect(isPageDataArchitectureDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_SUBGRAPH",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle updateSubgraph operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateSubgraphInputSchema());

    const updatedDocument = reducer(document, updateSubgraph(input));

    expect(isPageDataArchitectureDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_SUBGRAPH",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle deleteSubgraph operation", () => {
    const document = utils.createDocument();
    const input = generateMock(DeleteSubgraphInputSchema());

    const updatedDocument = reducer(document, deleteSubgraph(input));

    expect(isPageDataArchitectureDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_SUBGRAPH",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle linkSubgraphToProcessor operation", () => {
    const document = utils.createDocument();
    const input = generateMock(LinkSubgraphToProcessorInputSchema());

    const updatedDocument = reducer(document, linkSubgraphToProcessor(input));

    expect(isPageDataArchitectureDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "LINK_SUBGRAPH_TO_PROCESSOR",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle unlinkSubgraphFromProcessor operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UnlinkSubgraphFromProcessorInputSchema());

    const updatedDocument = reducer(
      document,
      unlinkSubgraphFromProcessor(input),
    );

    expect(isPageDataArchitectureDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UNLINK_SUBGRAPH_FROM_PROCESSOR",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
