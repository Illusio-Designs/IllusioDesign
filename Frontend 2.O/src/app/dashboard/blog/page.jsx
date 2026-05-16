'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useDashSearch } from '@/components/dashboard/SearchContext';
import { blogAPI, cleanText } from '@/services/api';

const formatDate = (v) => {
  if (!v) return '—';
  try { return new Date(v).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }); } catch { return '—'; }
};

export default function DashboardBlog() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const { query } = useDashSearch();

  useEffect(() => {
    let m = true;
    blogAPI.getAllPublic()
      .then((list) => {
        if (!m) return;
        setRows((Array.isArray(list) ? list : []).filter(Boolean).map((b) => ({
          id: b.id,
          title: cleanText(b.title) || 'Untitled',
          category: cleanText(b.category || 'Article'),
          author: cleanText(b.author || '—'),
          date: formatDate(b.publishedAt || b.publishDate || b.createdAt),
        })));
      })
      .catch(() => { if (m) setRows([]); })
      .finally(() => { if (m) setLoading(false); });
    return () => { m = false; };
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? rows.filter((r) =>
        `${r.title} ${r.category} ${r.author}`.toLowerCase().includes(q),
      )
    : rows;

  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">Blog</span>
          <h1>Journal posts</h1>
          <p>Every article published to the journal.</p>
        </div>
        <Button variant="primary" size="sm" icon={false}>+ New post</Button>
      </div>

      <section className="dash-card">
        <header className="dash-card-head">
          <div>
            <h3>All posts</h3>
            <span>{rows.length} total{q ? ` · ${filtered.length} matched` : ''}</span>
          </div>
        </header>

        {loading ? (
          <SkeletonTable rows={6} cols={4} />
        ) : filtered.length ? (
          <table className="dash-table">
            <thead>
              <tr><th>Title</th><th>Category</th><th>Author</th><th>Published</th></tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id || i}>
                  <td><strong>{r.title}</strong></td>
                  <td><span className="kit-badge kit-badge-info"><span className="dot" />{r.category}</span></td>
                  <td>{r.author}</td>
                  <td>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="dash-empty">
            <h3>No posts found</h3>
            <p>Nothing matches your search yet.</p>
          </div>
        )}
      </section>
    </>
  );
}
