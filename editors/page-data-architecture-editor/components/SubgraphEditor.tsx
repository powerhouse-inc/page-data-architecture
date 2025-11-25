import { useState } from "react";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import type {
  Subgraph,
  Processor,
  PageDataArchitectureAction,
} from "@powerhousedao/page-data-architecture/document-models/page-data-architecture";
import { updateSubgraph } from "../../../document-models/page-data-architecture/gen/subgraph/creators.js";
import { GraphQLCodeEditor } from "./GraphQLCodeEditor.js";

interface SubgraphEditorProps {
  subgraph: Subgraph;
  endpointId: string;
  processors: Processor[];
  dispatch: DocumentDispatch<PageDataArchitectureAction>;
  onDelete: () => void;
  onLinkProcessor: (processorId: string) => void;
  onUnlinkProcessor: (processorId: string) => void;
  theme?: "dark" | "light";
}

export function SubgraphEditor({
  subgraph,
  endpointId,
  processors,
  dispatch,
  onDelete,
  onLinkProcessor,
  onUnlinkProcessor,
  theme = "light",
}: SubgraphEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: subgraph.name,
    graphqlSchema: subgraph.graphqlSchema,
    graphqlQuery: subgraph.graphqlQuery,
    description: subgraph.description ?? "",
  });

  const linkedProcessors = processors.filter((p) =>
    subgraph.processorIds.includes(p.id),
  );
  const unlinkedProcessors = processors.filter(
    (p) => !subgraph.processorIds.includes(p.id),
  );

  const handleSave = () => {
    dispatch(
      updateSubgraph({
        endpointId,
        id: subgraph.id,
        name: editForm.name,
        graphqlSchema: editForm.graphqlSchema,
        graphqlQuery: editForm.graphqlQuery,
        description: editForm.description || undefined,
      }),
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete subgraph "${subgraph.name}"?`)) {
      onDelete();
    }
  };

  return (
    <div
      className={`pda-subgraph ${isExpanded ? "pda-subgraph-expanded" : ""}`}
    >
      <div
        className="pda-subgraph-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="pda-subgraph-info">
          <svg
            className={`pda-chevron ${isExpanded ? "pda-chevron-down" : ""}`}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="pda-badge pda-badge-graphql">GQL</span>
          <span className="pda-subgraph-name">{subgraph.name}</span>
          {linkedProcessors.length > 0 && (
            <span
              className="pda-link-count"
              title={`Linked to ${linkedProcessors.length} processor(s)`}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              {linkedProcessors.length}
            </span>
          )}
        </div>
        <div
          className="pda-subgraph-actions"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="pda-icon-btn"
            onClick={() => {
              setIsEditing(true);
              setIsExpanded(true);
            }}
            title="Edit"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            className="pda-icon-btn pda-icon-btn-danger"
            onClick={handleDelete}
            title="Delete"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="pda-subgraph-body">
          {isEditing ? (
            <div className="pda-subgraph-edit">
              <div className="pda-form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />
              </div>
              <div className="pda-dual-editors">
                <div className="pda-form-group">
                  <label>GraphQL Schema (Type Definitions)</label>
                  <GraphQLCodeEditor
                    value={editForm.graphqlSchema}
                    onChange={(value) =>
                      setEditForm({
                        ...editForm,
                        graphqlSchema: value,
                      })
                    }
                    height="250px"
                    theme={theme}
                    editorType="schema"
                    placeholder={`type PostgresColumn {
  id: OID!
  name: String!
  dataType: String!
}`}
                  />
                </div>
                <div className="pda-form-group">
                  <label>GraphQL Query</label>
                  <GraphQLCodeEditor
                    value={editForm.graphqlQuery}
                    onChange={(value) =>
                      setEditForm({ ...editForm, graphqlQuery: value })
                    }
                    height="250px"
                    theme={theme}
                    editorType="query"
                    schemaSource={editForm.graphqlSchema}
                    showTooltip
                    placeholder={`query PostgresColumn {
  name
  dataType
}`}
                  />
                </div>
              </div>
              <div className="pda-form-group">
                <label>Description</label>
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                />
              </div>
              <div className="pda-form-actions">
                <button
                  className="pda-btn pda-btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  className="pda-btn pda-btn-primary"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <>
              {subgraph.description && (
                <p className="pda-subgraph-desc">{subgraph.description}</p>
              )}
              <div className="pda-dual-editors">
                <div className="pda-code-block pda-code-block-schema">
                  <div className="pda-code-header">
                    <span>Schema (Types)</span>
                  </div>
                  <GraphQLCodeEditor
                    value={subgraph.graphqlSchema}
                    height="200px"
                    theme={theme}
                    editorType="schema"
                    readOnly
                  />
                </div>
                <div className="pda-code-block pda-code-block-query">
                  <div className="pda-code-header">
                    <span>Query</span>
                  </div>
                  <GraphQLCodeEditor
                    value={subgraph.graphqlQuery}
                    height="200px"
                    theme={theme}
                    editorType="query"
                    readOnly
                  />
                </div>
              </div>

              <div className="pda-processor-links">
                <div className="pda-links-header">
                  <h4>Linked Processors</h4>
                </div>
                {linkedProcessors.length > 0 ? (
                  <div className="pda-linked-processors">
                    {linkedProcessors.map((processor) => (
                      <div key={processor.id} className="pda-linked-processor">
                        <span className="pda-badge pda-badge-processor">
                          PSQL
                        </span>
                        <span>{processor.name}</span>
                        <code>{processor.tableName}</code>
                        <button
                          className="pda-unlink-btn"
                          onClick={() => onUnlinkProcessor(processor.id)}
                          title="Unlink processor"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="pda-no-links">No processors linked</p>
                )}

                {unlinkedProcessors.length > 0 && (
                  <div className="pda-available-processors">
                    <span className="pda-available-label">Link to:</span>
                    {unlinkedProcessors.map((processor) => (
                      <button
                        key={processor.id}
                        className="pda-link-processor-btn"
                        onClick={() => onLinkProcessor(processor.id)}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        {processor.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
