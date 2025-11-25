import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useMemo, useCallback, useState } from "react";
import { EditorView } from "@codemirror/view";
import type { PostgresColumn } from "@powerhousedao/page-data-architecture/document-models/page-data-architecture";

interface MigrationCodeEditorProps {
  tableName: string;
  columns: PostgresColumn[];
  height?: string;
  theme?: "dark" | "light";
}

// Map Postgres types to Kysely-compatible type strings
function mapPostgresTypeToKysely(dataType: string): string {
  const type = dataType.toUpperCase();

  // Handle VARCHAR with length
  if (type.startsWith("VARCHAR")) {
    return "'varchar(255)'";
  }

  switch (type) {
    case "SERIAL":
      return "'serial'";
    case "BIGSERIAL":
      return "'bigserial'";
    case "INTEGER":
    case "INT":
      return "'integer'";
    case "BIGINT":
      return "'bigint'";
    case "SMALLINT":
      return "'smallint'";
    case "TEXT":
      return "'text'";
    case "BOOLEAN":
    case "BOOL":
      return "'boolean'";
    case "TIMESTAMP":
      return "'timestamp'";
    case "TIMESTAMPTZ":
      return "'timestamptz'";
    case "DATE":
      return "'date'";
    case "TIME":
      return "'time'";
    case "DECIMAL":
    case "NUMERIC":
      return "'decimal'";
    case "REAL":
      return "'real'";
    case "DOUBLE PRECISION":
      return "'double precision'";
    case "UUID":
      return "'uuid'";
    case "JSON":
      return "'json'";
    case "JSONB":
      return "'jsonb'";
    case "BYTEA":
      return "'bytea'";
    default:
      return `'${dataType.toLowerCase()}'`;
  }
}

// Generate migration code from table definition
function generateMigrationCode(
  tableName: string,
  columns: PostgresColumn[],
): string {
  if (!tableName || columns.length === 0) {
    return `import { type IRelationalDb } from "document-drive";

export async function up(db: IRelationalDb<any>): Promise<void> {
  // Add columns to generate migration code
}

export async function down(db: IRelationalDb<any>): Promise<void> {
  // Add columns to generate migration code
}`;
  }

  // Find primary key columns
  const primaryKeyColumns = columns.filter((col) => col.isPrimaryKey);
  const primaryKeyNames = primaryKeyColumns.map((col) => `"${col.name}"`);

  // Generate column definitions
  const columnDefinitions = columns
    .map((col) => {
      let line = `      .addColumn('${col.name}', ${mapPostgresTypeToKysely(col.dataType)}`;

      // Add modifiers
      const modifiers: string[] = [];

      if (col.isPrimaryKey && primaryKeyColumns.length === 1) {
        modifiers.push("(col) => col.primaryKey()");
      } else if (!col.isNullable) {
        modifiers.push("(col) => col.notNull()");
      }

      if (col.defaultValue) {
        // Check if it's a function call (like NOW()) or a literal value
        const defaultVal = col.defaultValue;
        if (
          defaultVal.toUpperCase().includes("()") ||
          defaultVal.toUpperCase() === "TRUE" ||
          defaultVal.toUpperCase() === "FALSE"
        ) {
          modifiers.push(`(col) => col.defaultTo(sql\`${defaultVal}\`)`);
        } else if (!isNaN(Number(defaultVal))) {
          modifiers.push(`(col) => col.defaultTo(${defaultVal})`);
        } else {
          modifiers.push(`(col) => col.defaultTo('${defaultVal}')`);
        }
      }

      if (col.references) {
        const [refTable, refColumn] = col.references.split(".");
        if (refTable && refColumn) {
          modifiers.push(`(col) => col.references('${refTable}.${refColumn}')`);
        }
      }

      // Combine modifiers into a single callback if multiple exist
      if (modifiers.length === 1) {
        line += `, ${modifiers[0]}`;
      } else if (modifiers.length > 1) {
        // For multiple modifiers, chain them
        const chainedModifiers = modifiers
          .map((m) => m.replace("(col) => col.", ""))
          .join(".");
        line += `, (col) => col.${chainedModifiers}`;
      }

      line += ")";
      return line;
    })
    .join("\n");

  // Generate primary key constraint if composite
  const primaryKeyConstraint =
    primaryKeyColumns.length > 1
      ? `\n      .addPrimaryKeyConstraint("${tableName}_pkey", [${primaryKeyNames.join(", ")}])`
      : "";

  return `import { type IRelationalDb } from "document-drive";
import { sql } from "kysely";

export async function up(db: IRelationalDb<any>): Promise<void> {
  await db.schema.dropTable("${tableName}").ifExists().execute();

  try {
    await db.schema
      .createTable("${tableName}")
${columnDefinitions}${primaryKeyConstraint}
      .ifNotExists()
      .execute();
  } catch (error) {
    console.error("Failed to create table ${tableName}:", error);
    throw error;
  }
}

export async function down(db: IRelationalDb<any>): Promise<void> {
  await db.schema.dropTable("${tableName}").execute();
}`;
}

export function MigrationCodeEditor({
  tableName,
  columns,
  height = "300px",
  theme = "light",
}: MigrationCodeEditorProps) {
  const migrationCode = useMemo(
    () => generateMigrationCode(tableName, columns),
    [tableName, columns],
  );

  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(() => {
    void navigator.clipboard.writeText(migrationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [migrationCode]);

  const extensions = useMemo(() => {
    return [
      javascript({ typescript: true }),
      EditorView.lineWrapping,
      EditorView.editable.of(false),
      EditorView.theme({
        "&": {
          fontSize: "13px",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        },
        ".cm-content": {
          padding: "12px 0",
        },
        ".cm-line": {
          padding: "0 16px",
        },
        ".cm-gutters": {
          backgroundColor: "transparent",
          border: "none",
          paddingLeft: "8px",
        },
        ".cm-activeLineGutter": {
          backgroundColor: "transparent",
        },
      }),
    ];
  }, []);

  const customTheme = useMemo(() => {
    const isDark = theme === "dark";

    return EditorView.theme(
      {
        "&": {
          backgroundColor: isDark ? "#0a0e14" : "#fafbfc",
          color: isDark ? "#e6e6e6" : "#1a1a2e",
        },
        ".cm-content": {
          caretColor: isDark ? "#ff6b35" : "#ea580c",
        },
        ".cm-cursor, .cm-dropCursor": {
          borderLeftColor: isDark ? "#ff6b35" : "#ea580c",
        },
        "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
          {
            backgroundColor: isDark
              ? "rgba(255, 107, 53, 0.2)"
              : "rgba(234, 88, 12, 0.15)",
          },
        ".cm-activeLine": {
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.03)"
            : "rgba(0, 0, 0, 0.03)",
        },
        ".cm-gutterElement": {
          color: isDark ? "#5c6d82" : "#a0aec0",
        },
        // TypeScript syntax highlighting
        ".tok-keyword": {
          color: isDark ? "#ff6b35" : "#ea580c",
          fontWeight: "500",
        },
        ".tok-typeName": {
          color: isDark ? "#ffc107" : "#d97706",
        },
        ".tok-propertyName": {
          color: isDark ? "#39d353" : "#059669",
        },
        ".tok-string": {
          color: isDark ? "#98c379" : "#16a34a",
        },
        ".tok-number": {
          color: isDark ? "#d19a66" : "#ea580c",
        },
        ".tok-comment": {
          color: isDark ? "#5c6d82" : "#94a3b8",
          fontStyle: "italic",
        },
        ".tok-punctuation": {
          color: isDark ? "#8b9caf" : "#64748b",
        },
        ".tok-variableName": {
          color: isDark ? "#61afef" : "#2563eb",
        },
        ".tok-function": {
          color: isDark ? "#61afef" : "#2563eb",
        },
        ".tok-definition": {
          color: isDark ? "#e5c07b" : "#ca8a04",
        },
      },
      { dark: isDark },
    );
  }, [theme]);

  return (
    <div className="pda-migration-editor">
      <div className="pda-migration-editor-header">
        <div className="pda-migration-editor-title">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <span>Migration Code</span>
          <code className="pda-migration-filename">
            {tableName ? `${tableName}.migration.ts` : "migration.ts"}
          </code>
        </div>
        <button
          className={`pda-copy-btn ${copied ? "pda-copy-btn-copied" : ""}`}
          onClick={copyToClipboard}
          title="Copy to clipboard"
        >
          {copied ? (
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
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <CodeMirror
        value={migrationCode}
        height={height}
        extensions={[...extensions, customTheme]}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightActiveLine: true,
          foldGutter: true,
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: false,
          bracketMatching: true,
          closeBrackets: false,
          autocompletion: false,
          highlightSelectionMatches: true,
        }}
      />
    </div>
  );
}
