import { generateId } from "document-model/core";
import { useState } from "react";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import type {
  Endpoint,
  PageDataArchitectureAction,
} from "@powerhousedao/page-data-architecture/document-models/page-data-architecture";
import {
  updateEndpoint,
  deleteEndpoint,
} from "../../../document-models/page-data-architecture/gen/endpoint/creators.js";
import {
  addSubgraph,
  deleteSubgraph,
  linkSubgraphToProcessor,
  unlinkSubgraphFromProcessor,
} from "../../../document-models/page-data-architecture/gen/subgraph/creators.js";
import {
  addProcessor,
  deleteProcessor,
} from "../../../document-models/page-data-architecture/gen/processor/creators.js";
import { SubgraphEditor } from "./SubgraphEditor.js";
import { ProcessorTable } from "./ProcessorTable.js";
import { GraphQLCodeEditor } from "./GraphQLCodeEditor.js";

interface EndpointCardProps {
  endpoint: Endpoint;
  dispatch: DocumentDispatch<PageDataArchitectureAction>;
  theme?: "dark" | "light";
}

export function EndpointCard({
  endpoint,
  dispatch,
  theme = "light",
}: EndpointCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: endpoint.title,
    urlPath: endpoint.urlPath,
    description: endpoint.description ?? "",
  });
  const [activeTab, setActiveTab] = useState<"subgraphs" | "processors">(
    "subgraphs",
  );
  const [isAddingSubgraph, setIsAddingSubgraph] = useState(false);
  const [isAddingProcessor, setIsAddingProcessor] = useState(false);
  const [newSubgraph, setNewSubgraph] = useState({
    name: "",
    graphqlSchema: "",
    graphqlQuery: "",
    description: "",
  });
  const [newProcessor, setNewProcessor] = useState({
    name: "",
    tableName: "",
    description: "",
  });

  const handleSaveEndpoint = () => {
    dispatch(
      updateEndpoint({
        id: endpoint.id,
        title: editForm.title,
        urlPath: editForm.urlPath,
        description: editForm.description || undefined,
      }),
    );
    setIsEditing(false);
  };

  const handleDeleteEndpoint = () => {
    if (
      window.confirm(
        `Delete endpoint "${endpoint.title}"? This will also delete all subgraphs and processors.`,
      )
    ) {
      dispatch(deleteEndpoint({ id: endpoint.id }));
    }
  };

  const handleAddSubgraph = () => {
    if (
      !newSubgraph.name ||
      !newSubgraph.graphqlSchema ||
      !newSubgraph.graphqlQuery
    )
      return;

    dispatch(
      addSubgraph({
        endpointId: endpoint.id,
        id: generateId(),
        name: newSubgraph.name,
        graphqlSchema: newSubgraph.graphqlSchema,
        graphqlQuery: newSubgraph.graphqlQuery,
        description: newSubgraph.description || undefined,
      }),
    );
    setNewSubgraph({
      name: "",
      graphqlSchema: "",
      graphqlQuery: "",
      description: "",
    });
    setIsAddingSubgraph(false);
  };

  const handleAddProcessor = () => {
    if (!newProcessor.name || !newProcessor.tableName) return;

    dispatch(
      addProcessor({
        endpointId: endpoint.id,
        id: generateId(),
        name: newProcessor.name,
        tableName: newProcessor.tableName,
        description: newProcessor.description || undefined,
      }),
    );
    setNewProcessor({ name: "", tableName: "", description: "" });
    setIsAddingProcessor(false);
  };

  const handleDeleteSubgraph = (subgraphId: string) => {
    dispatch(deleteSubgraph({ endpointId: endpoint.id, id: subgraphId }));
  };

  const handleDeleteProcessor = (processorId: string) => {
    dispatch(deleteProcessor({ endpointId: endpoint.id, id: processorId }));
  };

  const handleLinkSubgraphToProcessor = (
    subgraphId: string,
    processorId: string,
  ) => {
    dispatch(
      linkSubgraphToProcessor({
        endpointId: endpoint.id,
        subgraphId,
        processorId,
      }),
    );
  };

  const handleUnlinkSubgraphFromProcessor = (
    subgraphId: string,
    processorId: string,
  ) => {
    dispatch(
      unlinkSubgraphFromProcessor({
        endpointId: endpoint.id,
        subgraphId,
        processorId,
      }),
    );
  };

  return (
    <div className="pda-endpoint-card">
      <div className="pda-endpoint-header">
        {isEditing ? (
          <div className="pda-endpoint-edit-form">
            <input
              type="text"
              className="pda-input-title"
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
              placeholder="Endpoint title"
            />
            <input
              type="text"
              className="pda-input-url"
              value={editForm.urlPath}
              onChange={(e) =>
                setEditForm({ ...editForm, urlPath: e.target.value })
              }
              placeholder="/path"
            />
            <div className="pda-endpoint-edit-actions">
              <button
                className="pda-btn pda-btn-sm pda-btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="pda-btn pda-btn-sm pda-btn-primary"
                onClick={handleSaveEndpoint}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="pda-endpoint-info">
              <h3 className="pda-endpoint-title">{endpoint.title}</h3>
              <code className="pda-endpoint-url">{endpoint.urlPath}</code>
              {endpoint.description && (
                <p className="pda-endpoint-desc">{endpoint.description}</p>
              )}
            </div>
            <div className="pda-endpoint-actions">
              <button
                className="pda-icon-btn"
                onClick={() => setIsEditing(true)}
                title="Edit endpoint"
              >
                <svg
                  width="16"
                  height="16"
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
                onClick={handleDeleteEndpoint}
                title="Delete endpoint"
              >
                <svg
                  width="16"
                  height="16"
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
          </>
        )}
      </div>

      <div className="pda-endpoint-tabs">
        <button
          className={`pda-tab ${activeTab === "subgraphs" ? "pda-tab-active" : ""}`}
          onClick={() => setActiveTab("subgraphs")}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          Subgraphs ({endpoint.subgraphs.length})
        </button>
        <button
          className={`pda-tab ${activeTab === "processors" ? "pda-tab-active" : ""}`}
          onClick={() => setActiveTab("processors")}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
          Processors ({endpoint.processors.length})
        </button>
      </div>

      <div className="pda-endpoint-content">
        {activeTab === "subgraphs" && (
          <div className="pda-subgraphs-section">
            {endpoint.subgraphs.map((subgraph) => (
              <SubgraphEditor
                key={subgraph.id}
                subgraph={subgraph}
                endpointId={endpoint.id}
                processors={endpoint.processors}
                dispatch={dispatch}
                onDelete={() => handleDeleteSubgraph(subgraph.id)}
                onLinkProcessor={(processorId) =>
                  handleLinkSubgraphToProcessor(subgraph.id, processorId)
                }
                onUnlinkProcessor={(processorId) =>
                  handleUnlinkSubgraphFromProcessor(subgraph.id, processorId)
                }
                theme={theme}
              />
            ))}

            {isAddingSubgraph ? (
              <div className="pda-add-form">
                <div className="pda-add-form-header">
                  <span className="pda-badge pda-badge-graphql">
                    NEW SUBGRAPH
                  </span>
                </div>
                <div className="pda-form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="GetUserMetrics"
                    value={newSubgraph.name}
                    onChange={(e) =>
                      setNewSubgraph({ ...newSubgraph, name: e.target.value })
                    }
                    autoFocus
                  />
                </div>
                <div className="pda-dual-editors">
                  <div className="pda-form-group">
                    <label>GraphQL Schema (Type Definitions)</label>
                    <GraphQLCodeEditor
                      value={newSubgraph.graphqlSchema}
                      onChange={(value) =>
                        setNewSubgraph({
                          ...newSubgraph,
                          graphqlSchema: value,
                        })
                      }
                      height="180px"
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
                      value={newSubgraph.graphqlQuery}
                      onChange={(value) =>
                        setNewSubgraph({
                          ...newSubgraph,
                          graphqlQuery: value,
                        })
                      }
                      height="180px"
                      theme={theme}
                      editorType="query"
                      schemaSource={newSubgraph.graphqlSchema}
                      showTooltip
                      placeholder={`query PostgresColumn {
  name
  dataType
}`}
                    />
                  </div>
                </div>
                <div className="pda-form-group">
                  <label>Description (optional)</label>
                  <input
                    type="text"
                    placeholder="Fetches user dashboard metrics"
                    value={newSubgraph.description}
                    onChange={(e) =>
                      setNewSubgraph({
                        ...newSubgraph,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="pda-form-actions">
                  <button
                    className="pda-btn pda-btn-secondary"
                    onClick={() => setIsAddingSubgraph(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="pda-btn pda-btn-primary"
                    onClick={handleAddSubgraph}
                    disabled={
                      !newSubgraph.name ||
                      !newSubgraph.graphqlSchema ||
                      !newSubgraph.graphqlQuery
                    }
                  >
                    Add Subgraph
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="pda-add-item-btn"
                onClick={() => setIsAddingSubgraph(true)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Subgraph
              </button>
            )}
          </div>
        )}

        {activeTab === "processors" && (
          <div className="pda-processors-section">
            {endpoint.processors.map((processor) => (
              <ProcessorTable
                key={processor.id}
                processor={processor}
                endpointId={endpoint.id}
                dispatch={dispatch}
                onDelete={() => handleDeleteProcessor(processor.id)}
              />
            ))}

            {isAddingProcessor ? (
              <div className="pda-add-form">
                <div className="pda-add-form-header">
                  <span className="pda-badge pda-badge-processor">
                    NEW PROCESSOR
                  </span>
                </div>
                <div className="pda-form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="UserMetricsProcessor"
                    value={newProcessor.name}
                    onChange={(e) =>
                      setNewProcessor({ ...newProcessor, name: e.target.value })
                    }
                    autoFocus
                  />
                </div>
                <div className="pda-form-group">
                  <label>Table Name</label>
                  <input
                    type="text"
                    placeholder="user_metrics"
                    value={newProcessor.tableName}
                    onChange={(e) =>
                      setNewProcessor({
                        ...newProcessor,
                        tableName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="pda-form-group">
                  <label>Description (optional)</label>
                  <input
                    type="text"
                    placeholder="Stores aggregated user metrics"
                    value={newProcessor.description}
                    onChange={(e) =>
                      setNewProcessor({
                        ...newProcessor,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="pda-form-actions">
                  <button
                    className="pda-btn pda-btn-secondary"
                    onClick={() => setIsAddingProcessor(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="pda-btn pda-btn-primary"
                    onClick={handleAddProcessor}
                    disabled={!newProcessor.name || !newProcessor.tableName}
                  >
                    Add Processor
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="pda-add-item-btn"
                onClick={() => setIsAddingProcessor(true)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Processor
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
