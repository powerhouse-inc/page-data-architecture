/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect } from "vitest";
import {
  utils,
  initialGlobalState,
  initialLocalState,
  pageDataArchitectureDocumentType,
  isPageDataArchitectureDocument,
  assertIsPageDataArchitectureDocument,
  isPageDataArchitectureState,
  assertIsPageDataArchitectureState,
} from "@powerhousedao/page-data-architecture/document-models/page-data-architecture";
import { ZodError } from "zod";

describe("PageDataArchitecture Document Model", () => {
  it("should create a new PageDataArchitecture document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(pageDataArchitectureDocumentType);
  });

  it("should create a new PageDataArchitecture document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isPageDataArchitectureDocument(document)).toBe(true);
    expect(isPageDataArchitectureState(document.state)).toBe(true);
  });
  it("should reject a document that is not a PageDataArchitecture document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsPageDataArchitectureDocument(wrongDocumentType)).toThrow();
      expect(isPageDataArchitectureDocument(wrongDocumentType)).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
  const wrongState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongState.state.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isPageDataArchitectureState(wrongState.state)).toBe(false);
    expect(assertIsPageDataArchitectureState(wrongState.state)).toThrow();
    expect(isPageDataArchitectureDocument(wrongState)).toBe(false);
    expect(assertIsPageDataArchitectureDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isPageDataArchitectureState(wrongInitialState.state)).toBe(false);
    expect(
      assertIsPageDataArchitectureState(wrongInitialState.state),
    ).toThrow();
    expect(isPageDataArchitectureDocument(wrongInitialState)).toBe(false);
    expect(assertIsPageDataArchitectureDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isPageDataArchitectureDocument(missingIdInHeader)).toBe(false);
    expect(assertIsPageDataArchitectureDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isPageDataArchitectureDocument(missingNameInHeader)).toBe(false);
    expect(assertIsPageDataArchitectureDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isPageDataArchitectureDocument(missingCreatedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsPageDataArchitectureDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(
      isPageDataArchitectureDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toBe(false);
    expect(
      assertIsPageDataArchitectureDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
