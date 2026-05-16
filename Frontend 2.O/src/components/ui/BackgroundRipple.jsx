'use client';

import { useMemo, useState } from 'react';

export default function BackgroundRipple({ rows = 14, cols = 22, cellSize = 44, bare = false, className = '' }) {
  const cells = useMemo(() => Array.from({ length: rows * cols }), [rows, cols]);
  const [ripples, setRipples] = useState([]);

  const onCellClick = (idx) => {
    const x = idx % cols;
    const y = Math.floor(idx / cols);
    const id = Date.now() + idx;
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 1100);
  };

  return (
    <div
      className={`bg-ripple ${bare ? 'bg-ripple-bare' : ''} ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
      }}
    >
      {cells.map((_, idx) => (
        <button
          key={idx}
          type="button"
          className="bg-ripple-cell"
          tabIndex={-1}
          aria-hidden
          onClick={() => onCellClick(idx)}
        />
      ))}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="bg-ripple-wave"
          style={{
            left: r.x * cellSize + cellSize / 2,
            top: r.y * cellSize + cellSize / 2,
          }}
        />
      ))}
    </div>
  );
}
