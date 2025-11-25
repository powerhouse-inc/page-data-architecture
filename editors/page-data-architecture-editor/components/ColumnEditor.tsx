import { useState } from "react";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import type {
  PostgresColumn,
  PageDataArchitectureAction,
} from "@powerhousedao/page-data-architecture/document-models/page-data-architecture";
import {
  updateColumn,
  deleteColumn,
} from "../../../document-models/page-data-architecture/gen/processor/creators.js";

interface ColumnEditorProps {
  column: PostgresColumn;
  endpointId: string;
  processorId: string;
  dispatch: DocumentDispatch<PageDataArchitectureAction>;
}

export function ColumnEditor({
  column,
  endpointId,
  processorId,
  dispatch,
}: ColumnEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: column.name,
    dataType: column.dataType,
    isPrimaryKey: column.isPrimaryKey,
    isNullable: column.isNullable,
    defaultValue: column.defaultValue ?? "",
    references: column.references ?? "",
  });

  const handleSave = () => {
    dispatch(
      updateColumn({
        endpointId,
        processorId,
        id: column.id,
        name: editForm.name,
        dataType: editForm.dataType,
        isPrimaryKey: editForm.isPrimaryKey,
        isNullable: editForm.isNullable,
        defaultValue: editForm.defaultValue || undefined,
        references: editForm.references || undefined,
      }),
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteColumn({ endpointId, processorId, id: column.id }));
  };

  const constraints: string[] = [];
  if (column.isPrimaryKey) constraints.push("PK");
  if (!column.isNullable) constraints.push("NOT NULL");

  if (isEditing) {
    return (
      <div className="pda-column-row pda-column-row-editing">
        <input
          type="text"
          value={editForm.name}
          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
        />
        <input
          type="text"
          value={editForm.dataType}
          onChange={(e) =>
            setEditForm({ ...editForm, dataType: e.target.value })
          }
        />
        <div className="pda-constraints-inputs">
          <label className="pda-checkbox">
            <input
              type="checkbox"
              checked={editForm.isPrimaryKey}
              onChange={(e) =>
                setEditForm({ ...editForm, isPrimaryKey: e.target.checked })
              }
            />
            PK
          </label>
          <label className="pda-checkbox">
            <input
              type="checkbox"
              checked={!editForm.isNullable}
              onChange={(e) =>
                setEditForm({ ...editForm, isNullable: !e.target.checked })
              }
            />
            NOT NULL
          </label>
        </div>
        <input
          type="text"
          placeholder="default"
          value={editForm.defaultValue}
          onChange={(e) =>
            setEditForm({ ...editForm, defaultValue: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="table.column"
          value={editForm.references}
          onChange={(e) =>
            setEditForm({ ...editForm, references: e.target.value })
          }
        />
        <div className="pda-column-actions">
          <button className="pda-icon-btn" onClick={handleSave} title="Save">
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
            className="pda-icon-btn"
            onClick={() => setIsEditing(false)}
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
    );
  }

  return (
    <div className="pda-column-row">
      <code className="pda-column-name">{column.name}</code>
      <span className="pda-column-type">{column.dataType}</span>
      <span className="pda-column-constraints">
        {constraints.length > 0 ? constraints.join(", ") : "—"}
      </span>
      <span className="pda-column-default">
        {column.defaultValue ? <code>{column.defaultValue}</code> : "—"}
      </span>
      <span className="pda-column-references">
        {column.references ? <code>{column.references}</code> : "—"}
      </span>
      <div className="pda-column-actions">
        <button
          className="pda-icon-btn"
          onClick={() => setIsEditing(true)}
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
  );
}
