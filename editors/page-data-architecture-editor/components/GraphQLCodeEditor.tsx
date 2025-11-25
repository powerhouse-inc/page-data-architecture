import CodeMirror from "@uiw/react-codemirror";
import { graphql } from "cm6-graphql";
import { useMemo } from "react";
import { EditorView } from "@codemirror/view";
import { linter, type Diagnostic } from "@codemirror/lint";
import {
  parse,
  Source,
  Kind,
  buildSchema,
  type DocumentNode,
  type SelectionSetNode,
  type DefinitionNode,
  type TypeDefinitionNode,
  type FieldDefinitionNode,
  type GraphQLSchema,
} from "graphql";

interface GraphQLCodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  height?: string;
  readOnly?: boolean;
  theme?: "dark" | "light";
  editorType?: "schema" | "query";
  /** For query editors: the schema SDL to validate against */
  schemaSource?: string;
  /** Show helper tooltip */
  showTooltip?: boolean;
  tooltipText?: string;
}

// Build an executable schema from user type definitions for autocomplete
function buildExecutableSchema(sdl: string): GraphQLSchema | null {
  if (!sdl.trim()) return null;

  try {
    // Parse the SDL to extract all fields from all types
    const ast = parse(new Source(sdl), { noLocation: false });
    const allFields: Map<string, string> = new Map();

    for (const def of ast.definitions) {
      if (isTypeDefinition(def) && "fields" in def && def.fields) {
        for (const field of def.fields as readonly FieldDefinitionNode[]) {
          // Get the field's type as a string from the original SDL
          const fieldName = field.name.value;
          const fieldType = getFieldTypeString(field);
          allFields.set(fieldName, fieldType);
        }
      }
    }

    if (allFields.size === 0) return null;

    // Build a Query type that directly exposes all fields from user types
    const queryFields = Array.from(allFields.entries())
      .map(([name, type]) => `  ${name}: ${type}`)
      .join("\n");

    const executableSDL = `type Query {
${queryFields}
}`;

    return buildSchema(executableSDL);
  } catch {
    return null;
  }
}

// Extract the type string from a field definition
function getFieldTypeString(field: FieldDefinitionNode): string {
  function typeToString(type: FieldDefinitionNode["type"]): string {
    switch (type.kind) {
      case Kind.NAMED_TYPE:
        return type.name.value;
      case Kind.NON_NULL_TYPE:
        return `${typeToString(type.type)}!`;
      case Kind.LIST_TYPE:
        return `[${typeToString(type.type)}]`;
      default:
        return "String";
    }
  }
  return typeToString(field.type);
}

// Extract type names and their fields from a schema SDL
function extractSchemaTypes(sdl: string): Map<string, Set<string>> | null {
  if (!sdl.trim()) return null;

  try {
    const ast = parse(new Source(sdl), { noLocation: false });
    const types = new Map<string, Set<string>>();

    for (const def of ast.definitions) {
      if (isTypeDefinition(def)) {
        const typeName = def.name.value;
        const fields = new Set<string>();

        if ("fields" in def && def.fields) {
          for (const field of def.fields as readonly FieldDefinitionNode[]) {
            fields.add(field.name.value);
          }
        }

        types.set(typeName, fields);
      }
    }

    return types.size > 0 ? types : null;
  } catch {
    return null;
  }
}

function isTypeDefinition(def: DefinitionNode): def is TypeDefinitionNode {
  return (
    def.kind === Kind.OBJECT_TYPE_DEFINITION ||
    def.kind === Kind.INTERFACE_TYPE_DEFINITION ||
    def.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION
  );
}

// Validate query fields against schema types
function validateQueryAgainstSchema(
  queryDoc: DocumentNode,
  schemaTypes: Map<string, Set<string>>,
  view: {
    state: { doc: { line: (n: number) => { from: number; to: number } } };
  },
): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];

  // Get all field names from all types combined (for simple validation)
  const allFields = new Set<string>();
  for (const fields of schemaTypes.values()) {
    for (const field of fields) {
      allFields.add(field);
    }
  }

  // Also add type names as valid (for query operations like `query TypeName { ... }`)
  for (const typeName of schemaTypes.keys()) {
    allFields.add(typeName);
  }

  // Recursively check all field selections in the query
  function checkSelectionSet(selectionSet: SelectionSetNode) {
    for (const selection of selectionSet.selections) {
      if (selection.kind === Kind.FIELD) {
        const fieldNode = selection;
        const fieldName = fieldNode.name.value;

        // Skip introspection fields
        if (fieldName.startsWith("__")) continue;

        // Check if field exists in any type
        if (!allFields.has(fieldName)) {
          const loc = fieldNode.name.loc;
          if (loc) {
            const line = view.state.doc.line(loc.startToken.line);
            const from = line.from + loc.startToken.column - 1;
            const to = from + fieldName.length;

            diagnostics.push({
              from,
              to: Math.min(to, line.to),
              severity: "error",
              message: `Field "${fieldName}" is not defined in the schema. Available fields: ${Array.from(allFields).slice(0, 5).join(", ")}${allFields.size > 5 ? "..." : ""}`,
              source: "GraphQL Query Validation",
            });
          }
        }

        // Recursively check nested selections
        if (fieldNode.selectionSet) {
          checkSelectionSet(fieldNode.selectionSet);
        }
      }
    }
  }

  // Check all operations in the query document
  for (const def of queryDoc.definitions) {
    if (def.kind === Kind.OPERATION_DEFINITION) {
      checkSelectionSet(def.selectionSet);
    }
  }

  return diagnostics;
}

// Create a GraphQL syntax linter
function createGraphQLLinter(
  editorType: "schema" | "query",
  schemaSource?: string,
) {
  return linter((view) => {
    const diagnostics: Diagnostic[] = [];
    const doc = view.state.doc.toString();

    if (!doc.trim()) {
      return diagnostics;
    }

    try {
      // Parse the document first
      const documentAST = parse(new Source(doc), {
        noLocation: false,
      });

      // For query editors with a schema, validate fields against the schema
      if (editorType === "query" && schemaSource) {
        const schemaTypes = extractSchemaTypes(schemaSource);
        if (schemaTypes) {
          const schemaErrors = validateQueryAgainstSchema(
            documentAST,
            schemaTypes,
            view,
          );
          diagnostics.push(...schemaErrors);
        }
      }
    } catch (error) {
      if (error instanceof Error && "locations" in error) {
        const graphqlError = error as {
          message: string;
          locations?: Array<{ line: number; column: number }>;
        };

        if (graphqlError.locations && graphqlError.locations.length > 0) {
          const location = graphqlError.locations[0];
          const line = view.state.doc.line(location.line);
          const from = line.from + location.column - 1;
          const to = Math.min(from + 1, line.to);

          diagnostics.push({
            from,
            to,
            severity: "error",
            message: graphqlError.message,
            source:
              editorType === "schema" ? "GraphQL Schema" : "GraphQL Query",
          });
        } else {
          // Error without location - show at the end
          const docLength = view.state.doc.length;
          diagnostics.push({
            from: Math.max(0, docLength - 1),
            to: docLength,
            severity: "error",
            message: error.message,
            source:
              editorType === "schema" ? "GraphQL Schema" : "GraphQL Query",
          });
        }
      }
    }

    return diagnostics;
  });
}

export function GraphQLCodeEditor({
  value,
  onChange,
  placeholder,
  height = "200px",
  readOnly = false,
  theme = "light",
  editorType = "query",
  schemaSource,
  showTooltip = false,
  tooltipText,
}: GraphQLCodeEditorProps) {
  const graphqlLinter = useMemo(
    () => createGraphQLLinter(editorType, schemaSource),
    [editorType, schemaSource],
  );

  // Build executable schema for autocomplete (only for query editors with schema)
  const autocompleteSchema = useMemo(() => {
    if (editorType === "query" && schemaSource) {
      return buildExecutableSchema(schemaSource);
    }
    return null;
  }, [editorType, schemaSource]);

  const extensions = useMemo(() => {
    // Pass schema to graphql() for autocomplete support
    const graphqlExtension = autocompleteSchema
      ? graphql(autocompleteSchema)
      : graphql();

    const exts = [
      graphqlExtension,
      EditorView.lineWrapping,
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
        ".cm-placeholder": {
          color: theme === "dark" ? "#5c6d82" : "#718096",
          fontStyle: "italic",
        },
        // Lint diagnostic styling
        ".cm-diagnostic": {
          padding: "4px 8px",
          marginLeft: "0",
          borderRadius: "4px",
        },
        ".cm-diagnostic-error": {
          borderLeft: "3px solid #ef4444",
          backgroundColor:
            theme === "dark"
              ? "rgba(239, 68, 68, 0.15)"
              : "rgba(239, 68, 68, 0.1)",
        },
        ".cm-diagnostic-warning": {
          borderLeft: "3px solid #f59e0b",
          backgroundColor:
            theme === "dark"
              ? "rgba(245, 158, 11, 0.15)"
              : "rgba(245, 158, 11, 0.1)",
        },
        ".cm-lintRange-error": {
          backgroundImage: "none",
          textDecoration: "wavy underline #ef4444",
          textDecorationSkipInk: "none",
        },
        ".cm-lintRange-warning": {
          backgroundImage: "none",
          textDecoration: "wavy underline #f59e0b",
          textDecorationSkipInk: "none",
        },
        ".cm-lint-marker-error": {
          content: '""',
        },
        ".cm-panel.cm-panel-lint": {
          backgroundColor: theme === "dark" ? "#1a1a2e" : "#fef2f2",
          borderTop: `1px solid ${theme === "dark" ? "#2d2d44" : "#fecaca"}`,
        },
        ".cm-panel.cm-panel-lint ul": {
          maxHeight: "100px",
        },
        ".cm-panel.cm-panel-lint li": {
          cursor: "pointer",
        },
        // Autocomplete styling
        ".cm-tooltip-autocomplete": {
          backgroundColor: theme === "dark" ? "#1a1a2e" : "#ffffff",
          border: `1px solid ${theme === "dark" ? "#2d2d44" : "#e5e7eb"}`,
          borderRadius: "6px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
        ".cm-tooltip-autocomplete ul li": {
          padding: "4px 8px",
        },
        ".cm-tooltip-autocomplete ul li[aria-selected]": {
          backgroundColor:
            theme === "dark"
              ? "rgba(0, 212, 255, 0.2)"
              : "rgba(8, 145, 178, 0.1)",
        },
      }),
    ];

    // Add linter only for editable editors
    if (!readOnly) {
      exts.push(graphqlLinter);
    }

    if (readOnly) {
      exts.push(EditorView.editable.of(false));
    }

    return exts;
  }, [readOnly, theme, graphqlLinter, autocompleteSchema]);

  // Custom theme based on editor type and light/dark mode
  const customTheme = useMemo(() => {
    const isDark = theme === "dark";
    const isSchema = editorType === "schema";

    return EditorView.theme(
      {
        "&": {
          backgroundColor: isDark ? "#0a0e14" : "#fafbfc",
          color: isDark ? "#e6e6e6" : "#1a1a2e",
        },
        ".cm-content": {
          caretColor: isSchema
            ? isDark
              ? "#e91e8c"
              : "#db2777"
            : isDark
              ? "#00d4ff"
              : "#0891b2",
        },
        ".cm-cursor, .cm-dropCursor": {
          borderLeftColor: isSchema
            ? isDark
              ? "#e91e8c"
              : "#db2777"
            : isDark
              ? "#00d4ff"
              : "#0891b2",
        },
        "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
          {
            backgroundColor: isSchema
              ? isDark
                ? "rgba(233, 30, 140, 0.2)"
                : "rgba(219, 39, 119, 0.15)"
              : isDark
                ? "rgba(0, 212, 255, 0.2)"
                : "rgba(8, 145, 178, 0.15)",
          },
        ".cm-activeLine": {
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.03)"
            : "rgba(0, 0, 0, 0.03)",
        },
        ".cm-gutterElement": {
          color: isDark ? "#5c6d82" : "#a0aec0",
        },
        // GraphQL syntax highlighting
        ".tok-keyword": {
          color: isSchema
            ? isDark
              ? "#e91e8c"
              : "#db2777"
            : isDark
              ? "#00d4ff"
              : "#0891b2",
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
        ".tok-atom": {
          color: isDark ? "#c678dd" : "#9333ea",
        },
      },
      { dark: isDark },
    );
  }, [theme, editorType]);

  const defaultTooltip =
    editorType === "query"
      ? "Query fields must match the types defined in the Schema editor. Use Ctrl+Space for autocomplete."
      : undefined;

  const displayTooltip = tooltipText ?? defaultTooltip;

  return (
    <div className={`pda-graphql-editor pda-graphql-editor-${editorType}`}>
      {showTooltip && displayTooltip && (
        <div className="pda-graphql-editor-tooltip">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>{displayTooltip}</span>
        </div>
      )}
      <CodeMirror
        value={value}
        height={height}
        extensions={[...extensions, customTheme]}
        onChange={onChange}
        placeholder={placeholder}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightActiveLine: true,
          foldGutter: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          highlightSelectionMatches: true,
          lintKeymap: true,
        }}
      />
    </div>
  );
}
