import { generateId } from "document-model/core";
import { useState } from "react";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import type {
  Processor,
  PageDataArchitectureAction,
} from "@powerhousedao/page-data-architecture/document-models/page-data-architecture";
import {
  updateProcessor,
  addColumn,
} from "../../../document-models/page-data-architecture/gen/processor/creators.js";
import { ColumnEditor } from "./ColumnEditor.js";
import { MigrationCodeEditor } from "./MigrationCodeEditor.js";

interface ProcessorTableProps {
  processor: Processor;
  endpointId: string;
  dispatch: DocumentDispatch<PageDataArchitectureAction>;
  onDelete: () => void;
}

const POSTGRES_TYPES = [
  "SERIAL",
  "BIGSERIAL",
  "INTEGER",
  "BIGINT",
  "SMALLINT",
  "VARCHAR(255)",
  "TEXT",
  "BOOLEAN",
  "TIMESTAMP",
  "TIMESTAMPTZ",
  "DATE",
  "TIME",
  "DECIMAL",
  "NUMERIC",
  "REAL",
  "DOUBLE PRECISION",
  "UUID",
  "JSON",
  "JSONB",
  "BYTEA",
];

export function ProcessorTable({
  processor,
  endpointId,
  dispatch,
  onDelete,
}: ProcessorTableProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [editForm, setEditForm] = useState({
    name: processor.name,
    tableName: processor.tableName,
    description: processor.description ?? "",
  });
  const [newColumn, setNewColumn] = useState({
    name: "",
    dataType: "VARCHAR(255)",
    isPrimaryKey: false,
    isNullable: true,
    defaultValue: "",
    references: "",
  });

  const handleSave = () => {
    dispatch(
      updateProcessor({
        endpointId,
        id: processor.id,
        name: editForm.name,
        tableName: editForm.tableName,
        description: editForm.description || undefined,
      }),
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Delete processor "${processor.name}"? This will unlink it from all subgraphs.`,
      )
    ) {
      onDelete();
    }
  };

  const handleAddColumn = () => {
    console.log("handleAddColumn called with:", newColumn);
    if (!newColumn.name || !newColumn.dataType) {
      console.log("Validation failed: name or dataType missing");
      return;
    }

    const action = addColumn({
      endpointId,
      processorId: processor.id,
      id: generateId(),
      name: newColumn.name,
      dataType: newColumn.dataType,
      isPrimaryKey: newColumn.isPrimaryKey,
      isNullable: newColumn.isNullable,
      defaultValue: newColumn.defaultValue || undefined,
      references: newColumn.references || undefined,
    });
    console.log("Adding column with action:", action);
    console.log("Endpoint ID:", endpointId);
    console.log("Processor ID:", processor.id);
    dispatch(action);

    setNewColumn({
      name: "",
      dataType: "VARCHAR(255)",
      isPrimaryKey: false,
      isNullable: true,
      defaultValue: "",
      references: "",
    });
    setIsAddingColumn(false);
  };

  return (
    <div
      className={`pda-processor ${isExpanded ? "pda-processor-expanded" : ""}`}
    >
      <div
        className="pda-processor-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="pda-processor-info">
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
          <span className="pda-badge pda-badge-processor">PSQL</span>
          <span className="pda-processor-name">{processor.name}</span>
          <code className="pda-table-name">{processor.tableName}</code>
          <span className="pda-column-count">
            {processor.columns.length} columns
          </span>
        </div>
        <div
          className="pda-processor-actions"
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
        <div className="pda-processor-body">
          {isEditing ? (
            <div className="pda-processor-edit">
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
              <div className="pda-form-group">
                <label>Table Name</label>
                <input
                  type="text"
                  value={editForm.tableName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, tableName: e.target.value })
                  }
                />
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
              {processor.description && (
                <p className="pda-processor-desc">{processor.description}</p>
              )}

              <div className="pda-columns-table">
                <div className="pda-columns-header">
                  <span>Column</span>
                  <span>Type</span>
                  <span>Constraints</span>
                  <span>Default</span>
                  <span>References</span>
                  <span></span>
                </div>
                {processor.columns.map((column) => (
                  <ColumnEditor
                    key={column.id}
                    column={column}
                    endpointId={endpointId}
                    processorId={processor.id}
                    dispatch={dispatch}
                  />
                ))}

                {isAddingColumn ? (
                  <div className="pda-new-column-row">
                    <input
                      type="text"
                      placeholder="column_name"
                      value={newColumn.name}
                      onChange={(e) =>
                        setNewColumn({ ...newColumn, name: e.target.value })
                      }
                      autoFocus
                    />
                    <select
                      value={newColumn.dataType}
                      onChange={(e) =>
                        setNewColumn({ ...newColumn, dataType: e.target.value })
                      }
                    >
                      {POSTGRES_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <div className="pda-constraints-inputs">
                      <label className="pda-checkbox">
                        <input
                          type="checkbox"
                          checked={newColumn.isPrimaryKey}
                          onChange={(e) =>
                            setNewColumn({
                              ...newColumn,
                              isPrimaryKey: e.target.checked,
                            })
                          }
                        />
                        PK
                      </label>
                      <label className="pda-checkbox">
                        <input
                          type="checkbox"
                          checked={!newColumn.isNullable}
                          onChange={(e) =>
                            setNewColumn({
                              ...newColumn,
                              isNullable: !e.target.checked,
                            })
                          }
                        />
                        NOT NULL
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="default"
                      value={newColumn.defaultValue}
                      onChange={(e) =>
                        setNewColumn({
                          ...newColumn,
                          defaultValue: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="table.column"
                      value={newColumn.references}
                      onChange={(e) =>
                        setNewColumn({
                          ...newColumn,
                          references: e.target.value,
                        })
                      }
                    />
                    <div className="pda-column-actions">
                      <button
                        type="button"
                        className="pda-icon-btn"
                        onClick={handleAddColumn}
                        title="Add column"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="pda-icon-btn"
                        onClick={() => setIsAddingColumn(false)}
                        title="Cancel"
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
                  </div>
                ) : (
                  <button
                    className="pda-add-column-btn"
                    onClick={() => setIsAddingColumn(true)}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add Column
                  </button>
                )}
              </div>

              <MigrationCodeEditor
                tableName={processor.tableName}
                columns={processor.columns}
                height="280px"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
