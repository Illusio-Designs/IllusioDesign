'use client';

const range = (n) => Array.from({ length: n }, (_, i) => i + 1);

export default function Pagination({ page = 1, total = 1, onChange }) {
  const safeTotal = Math.max(1, total);
  const items = range(safeTotal);

  const handle = (p) => {
    if (p < 1 || p > safeTotal || p === page) return;
    onChange?.(p);
  };

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        className="pagination-btn"
        onClick={() => handle(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18L9 12L15 6" /></svg>
      </button>
      <ul>
        {items.map((p) => (
          <li key={p}>
            <button
              className={`pagination-num ${p === page ? 'is-active' : ''}`}
              onClick={() => handle(p)}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          </li>
        ))}
      </ul>
      <button
        className="pagination-btn"
        onClick={() => handle(page + 1)}
        disabled={page >= safeTotal}
        aria-label="Next page"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18L15 12L9 6" /></svg>
      </button>
    </nav>
  );
}
