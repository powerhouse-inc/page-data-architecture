import type { BaseSubgraph } from "@powerhousedao/reactor-api";
import { addFile } from "document-drive";
import { setName } from "document-model";
import {
  actions,
  pageDataArchitectureDocumentType,
} from "@powerhousedao/page-data-architecture/document-models/page-data-architecture";

import type {
  PageDataArchitectureDocument,
  AddEndpointInput,
  UpdateEndpointInput,
  DeleteEndpointInput,
  AddSubgraphInput,
  UpdateSubgraphInput,
  DeleteSubgraphInput,
  LinkSubgraphToProcessorInput,
  UnlinkSubgraphFromProcessorInput,
  AddProcessorInput,
  UpdateProcessorInput,
  DeleteProcessorInput,
  AddColumnInput,
  UpdateColumnInput,
  DeleteColumnInput,
} from "@powerhousedao/page-data-architecture/document-models/page-data-architecture";

export const getResolvers = (
  subgraph: BaseSubgraph,
): Record<string, unknown> => {
  const reactor = subgraph.reactor;

  return {
    Query: {
      PageDataArchitecture: async () => {
        return {
          getDocument: async (args: { docId: string; driveId: string }) => {
            const { docId, driveId } = args;

            if (!docId) {
              throw new Error("Document id is required");
            }

            if (driveId) {
              const docIds = await reactor.getDocuments(driveId);
              if (!docIds.includes(docId)) {
                throw new Error(
                  `Document with id ${docId} is not part of ${driveId}`,
                );
              }
            }

            const doc =
              await reactor.getDocument<PageDataArchitectureDocument>(docId);
            return {
              driveId: driveId,
              ...doc,
              ...doc.header,
              created: doc.header.createdAtUtcIso,
              lastModified: doc.header.lastModifiedAtUtcIso,
              state: doc.state.global,
              stateJSON: doc.state.global,
              revision: doc.header?.revision?.global ?? 0,
            };
          },
          getDocuments: async (args: { driveId: string }) => {
            const { driveId } = args;
            const docsIds = await reactor.getDocuments(driveId);
            const docs = await Promise.all(
              docsIds.map(async (docId) => {
                const doc =
                  await reactor.getDocument<PageDataArchitectureDocument>(
                    docId,
                  );
                return {
                  driveId: driveId,
                  ...doc,
                  ...doc.header,
                  created: doc.header.createdAtUtcIso,
                  lastModified: doc.header.lastModifiedAtUtcIso,
                  state: doc.state.global,
                  stateJSON: doc.state.global,
                  revision: doc.header?.revision?.global ?? 0,
                };
              }),
            );

            return docs.filter(
              (doc) =>
                doc.header.documentType === pageDataArchitectureDocumentType,
            );
          },
        };
      },
    },
    Mutation: {
      PageDataArchitecture_createDocument: async (
        _: unknown,
        args: { name: string; driveId?: string },
      ) => {
        const { driveId, name } = args;
        const document = await reactor.addDocument(
          pageDataArchitectureDocumentType,
        );

        if (driveId) {
          await reactor.addAction(
            driveId,
            addFile({
              name,
              id: document.header.id,
              documentType: pageDataArchitectureDocumentType,
            }),
          );
        }

        if (name) {
          await reactor.addAction(document.header.id, setName(name));
        }

        return document.header.id;
      },

      PageDataArchitecture_addEndpoint: async (
        _: unknown,
        args: { docId: string; input: AddEndpointInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<PageDataArchitectureDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addEndpoint(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addEndpoint");
        }

        return true;
      },

      PageDataArchitecture_updateEndpoint: async (
        _: unknown,
        args: { docId: string; input: UpdateEndpointInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<PageDataArchitectureDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updateEndpoint(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to updateEndpoint");
        }

        return true;
      },

      PageDataArchitecture_deleteEndpoint: async (
        _: unknown,
        args: { docId: string; input: DeleteEndpointInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<PageDataArchitectureDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.deleteEndpoint(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to deleteEndpoint");
        }

        return true;
      },

      PageDataArchitecture_addSubgraph: async (
        _: unknown,
        args: { docId: string; input: AddSubgraphInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<PageDataArchitectureDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addSubgraph(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addSubgraph");
        }

        return true;
      },

      PageDataArchitecture_updateSubgraph: async (
        _: unknown,
        args: { docId: string; input: UpdateSubgraphInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<PageDataArchitectureDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updateSubgraph(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to updateSubgraph");
        }

        return true;
      },

      PageDataArchitecture_deleteSubgraph: async (
        _: unknown,
        args: { docId: string; input: DeleteSubgraphInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<PageDataArchitectureDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.deleteSubgraph(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to deleteSubgraph");
        }

        return true;
      },

      PageDataArchitecture_linkSubgraphToProcessor: async (
        _: unknown,
        args: { docId: string; input: LinkSubgraphToProcessorInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<PageDataArchitectureDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.linkSubgraphToProcessor(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to linkSubgraphToProcessor",
          );
        }

        return true;
      },

      PageDataArchitecture_unlinkSubgraphFromProcessor: async (
        _: unknown,
        args: { docId: string; input: UnlinkSubgraphFromProcessorInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<PageDataArchitectureDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.unlinkSubgraphFromProcessor(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(
            result.error?.message ?? "Failed to unlinkSubgraphFromProcessor",
          );
        }

        return true;
      },

      PageDataArchitecture_addProcessor: async (
        _: unknown,
        args: { docId: string; input: AddProcessorInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<PageDataArchitectureDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.addProcessor(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addProcessor");
        }

        return true;
      },

      PageDataArchitecture_updateProcessor: async (
        _: unknown,
        args: { docId: string; input: UpdateProcessorInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<PageDataArchitectureDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updateProcessor(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to updateProcessor");
        }

        return true;
      },

      PageDataArchitecture_deleteProcessor: async (
        _: unknown,
        args: { docId: string; input: DeleteProcessorInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<PageDataArchitectureDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.deleteProcessor(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to deleteProcessor");
        }

        return true;
      },

      PageDataArchitecture_addColumn: async (
        _: unknown,
        args: { docId: string; input: AddColumnInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<PageDataArchitectureDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(docId, actions.addColumn(input));

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to addColumn");
        }

        return true;
      },

      PageDataArchitecture_updateColumn: async (
        _: unknown,
        args: { docId: string; input: UpdateColumnInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<PageDataArchitectureDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.updateColumn(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to updateColumn");
        }

        return true;
      },

      PageDataArchitecture_deleteColumn: async (
        _: unknown,
        args: { docId: string; input: DeleteColumnInput },
      ) => {
        const { docId, input } = args;
        const doc =
          await reactor.getDocument<PageDataArchitectureDocument>(docId);
        if (!doc) {
          throw new Error("Document not found");
        }

        const result = await reactor.addAction(
          docId,
          actions.deleteColumn(input),
        );

        if (result.status !== "SUCCESS") {
          throw new Error(result.error?.message ?? "Failed to deleteColumn");
        }

        return true;
      },
    },
  };
};
