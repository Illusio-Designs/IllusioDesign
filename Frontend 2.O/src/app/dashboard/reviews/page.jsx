'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { StarRating } from '@/components/ui/StarRating';
import { useDashSearch } from '@/components/dashboard/SearchContext';
import { reviewAPI, cleanText } from '@/services/api';

export default function DashboardReviews() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const { query } = useDashSearch();

  useEffect(() => {
    let m = true;
    reviewAPI.getAllPublic()
      .then((list) => {
        if (!m) return;
        setRows((Array.isArray(list) ? list : []).filter(Boolean).map((r) => ({
          id: r.id,
          author: cleanText(r.author || r.client || r.name) || 'Anonymous',
          company: cleanText(r.company || r.role || r.position || '—'),
          rating: Number(r.rating) || 5,
          comment: cleanText(r.comment || r.quote || r.message || ''),
        })));
      })
      .catch(() => { if (m) setRows([]); })
      .finally(() => { if (m) setLoading(false); });
    return () => { m = false; };
  }, []);

  const avg = rows.length
    ? Math.round((rows.reduce((a, r) => a + r.rating, 0) / rows.length) * 10) / 10
    : 0;

  const q = query.trim().toLowerCase();
  const filtered = q
    ? rows.filter((r) =>
        `${r.author} ${r.company} ${r.comment}`.toLowerCase().includes(q),
      )
    : rows;

  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">Reviews</span>
          <h1>Client reviews</h1>
          <p>{rows.length} reviews · {avg || '—'} average rating</p>
        </div>
      </div>

      <section className="dash-card">
        <header className="dash-card-head">
          <div>
            <h3>All reviews</h3>
            <span>{rows.length} total{q ? ` · ${filtered.length} matched` : ''}</span>
          </div>
        </header>

        {loading ? (
          <SkeletonTable rows={6} cols={4} />
        ) : filtered.length ? (
          <table className="dash-table">
            <thead>
              <tr><th>Author</th><th>Company</th><th>Rating</th><th>Comment</th></tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id || i}>
                  <td><strong>{r.author}</strong></td>
                  <td>{r.company}</td>
                  <td><span style={{ color: 'var(--accent)' }}><StarRating value={r.rating} size={13} /></span></td>
                  <td>{r.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="dash-empty">
            <h3>No reviews yet</h3>
            <p>Client reviews submitted from the site appear here.</p>
          </div>
        )}
      </section>
    </>
  );
}
