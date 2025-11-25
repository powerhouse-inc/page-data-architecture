import { generateId } from "document-model/core";
import { useState } from "react";
import { useSelectedPageDataArchitectureDocument } from "@powerhousedao/page-data-architecture/document-models/page-data-architecture";
import { addEndpoint } from "../../document-models/page-data-architecture/gen/creators.js";
import { EndpointCard } from "./components/EndpointCard.js";
import { EmptyState } from "./components/EmptyState.js";
import { DocumentToolbar } from "@powerhousedao/design-system/connect";

export default function Editor() {
  const [document, dispatch] = useSelectedPageDataArchitectureDocument();
  const [isAddingEndpoint, setIsAddingEndpoint] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [newEndpoint, setNewEndpoint] = useState({
    title: "",
    urlPath: "",
    description: "",
  });

  if (!document) return null;

  const { endpoints } = document.state.global;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleAddEndpoint = () => {
    if (!newEndpoint.title || !newEndpoint.urlPath) return;

    dispatch(
      addEndpoint({
        id: generateId(),
        title: newEndpoint.title,
        urlPath: newEndpoint.urlPath,
        description: newEndpoint.description || undefined,
      }),
    );
    setNewEndpoint({ title: "", urlPath: "", description: "" });
    setIsAddingEndpoint(false);
  };

  return (
    <div>
      <DocumentToolbar />
      <div
        className={`pda-editor ${theme === "light" ? "pda-theme-light" : ""}`}
      >
        <header className="pda-header">
          <div className="pda-header-content">
            <div className="pda-logo">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <h1>Page Data Architecture</h1>
            </div>
            <div className="pda-header-actions">
              <div className="pda-stats">
                <span className="pda-stat">
                  <span className="pda-stat-value">{endpoints.length}</span>
                  <span className="pda-stat-label">Endpoints</span>
                </span>
                <span className="pda-stat">
                  <span className="pda-stat-value">
                    {endpoints.reduce((acc, e) => acc + e.subgraphs.length, 0)}
                  </span>
                  <span className="pda-stat-label">Subgraphs</span>
                </span>
                <span className="pda-stat">
                  <span className="pda-stat-value">
                    {endpoints.reduce((acc, e) => acc + e.processors.length, 0)}
                  </span>
                  <span className="pda-stat-label">Processors</span>
                </span>
              </div>
              <button
                className="pda-theme-toggle"
                onClick={toggleTheme}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              >
                {theme === "dark" ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
                {theme === "dark" ? "Light" : "Dark"}
              </button>
            </div>
          </div>
        </header>

        <main className="pda-main">
          {endpoints.length === 0 && !isAddingEndpoint ? (
            <EmptyState onAddEndpoint={() => setIsAddingEndpoint(true)} />
          ) : (
            <div className="pda-endpoints-list">
              {endpoints.map((endpoint) => (
                <EndpointCard
                  key={endpoint.id}
                  endpoint={endpoint}
                  dispatch={dispatch}
                  theme={theme}
                />
              ))}

              {isAddingEndpoint ? (
                <div className="pda-new-endpoint-card">
                  <div className="pda-new-endpoint-header">
                    <span className="pda-badge">NEW ENDPOINT</span>
                  </div>
                  <div className="pda-new-endpoint-form">
                    <div className="pda-form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        placeholder="Dashboard Page"
                        value={newEndpoint.title}
                        onChange={(e) =>
                          setNewEndpoint({
                            ...newEndpoint,
                            title: e.target.value,
                          })
                        }
                        autoFocus
                      />
                    </div>
                    <div className="pda-form-group">
                      <label>URL Path</label>
                      <input
                        type="text"
                        placeholder="/dashboard"
                        value={newEndpoint.urlPath}
                        onChange={(e) =>
                          setNewEndpoint({
                            ...newEndpoint,
                            urlPath: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="pda-form-group">
                      <label>Description (optional)</label>
                      <textarea
                        placeholder="Main dashboard displaying user metrics..."
                        value={newEndpoint.description}
                        onChange={(e) =>
                          setNewEndpoint({
                            ...newEndpoint,
                            description: e.target.value,
                          })
                        }
                        rows={2}
                      />
                    </div>
                    <div className="pda-form-actions">
                      <button
                        type="button"
                        className="pda-btn pda-btn-secondary"
                        onClick={() => setIsAddingEndpoint(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="pda-btn pda-btn-primary"
                        onClick={handleAddEndpoint}
                        disabled={!newEndpoint.title || !newEndpoint.urlPath}
                      >
                        Create Endpoint
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="pda-add-endpoint-btn-inline"
                  onClick={() => setIsAddingEndpoint(true)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span>Add Endpoint</span>
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
