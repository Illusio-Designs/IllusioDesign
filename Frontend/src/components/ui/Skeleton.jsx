'use client';

export default function Skeleton({ w = '100%', h = 16, radius = 8, className = '', style }) {
  return (
    <span
      className={`skeleton ${className}`}
      style={{ width: w, height: h, borderRadius: radius, ...style }}
      aria-hidden
    />
  );
}

export function SkeletonText({ lines = 3, lastWidth = '60%' }) {
  return (
    <span className="skeleton-text" aria-hidden>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} h={12} w={i === lines - 1 ? lastWidth : '100%'} />
      ))}
    </span>
  );
}

export function SkeletonTable({ rows = 6, cols = 4 }) {
  return (
    <div className="skeleton-table" aria-hidden>
      <div className="skeleton-table-head">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} h={10} w="50%" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div className="skeleton-table-row" key={r}>
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} h={13} w={c === 0 ? '78%' : '52%'} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonCards({ count = 6, height = 180 }) {
  return (
    <div className="skeleton-cards" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div className="skeleton-card" key={i}>
          <Skeleton h={height} radius={16} />
          <Skeleton h={14} w="70%" />
          <Skeleton h={11} w="45%" />
        </div>
      ))}
    </div>
  );
}
