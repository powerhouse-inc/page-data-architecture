interface EmptyStateProps {
  onAddEndpoint: () => void;
}

export function EmptyState({ onAddEndpoint }: EmptyStateProps) {
  return (
    <div className="pda-empty-state">
      <div className="pda-empty-icon">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </div>
      <h2>No Endpoints Defined</h2>
      <p>
        Start building your page data architecture by adding URL endpoints. Each
        endpoint can have multiple GraphQL subgraphs and PostgreSQL processors.
      </p>
      <button
        className="pda-btn pda-btn-primary pda-btn-lg"
        onClick={onAddEndpoint}
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
        Create First Endpoint
      </button>
    </div>
  );
}
