'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { seoAPI, cleanText } from '@/services/api';

const PAGES = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About' },
  { key: 'case-study', label: 'Case Studies' },
  { key: 'blog', label: 'Blog' },
  { key: 'career', label: 'Career' },
  { key: 'contact', label: 'Contact' },
];

export default function DashboardSEO() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let m = true;
    Promise.all(
      PAGES.map((p) =>
        seoAPI.getByPagePublic(p.key)
          .then((d) => ({ ...p, seo: d || null }))
          .catch(() => ({ ...p, seo: null })),
      ),
    ).then((list) => {
      if (!m) return;
      setRows(list);
      setLoading(false);
    });
    return () => { m = false; };
  }, []);

  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">SEO</span>
          <h1>Page meta &amp; SEO</h1>
          <p>Title and description meta for each public page.</p>
        </div>
      </div>

      <section className="dash-card">
        <header className="dash-card-head">
          <div>
            <h3>Pages</h3>
            <span>{PAGES.length} tracked pages</span>
          </div>
        </header>

        {loading ? (
          <SkeletonTable rows={6} cols={3} />
        ) : (
          <table className="dash-table">
            <thead>
              <tr><th>Page</th><th>Meta title</th><th>Meta description</th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.key}>
                  <td><strong>{r.label}</strong></td>
                  <td>{cleanText(r.seo?.title) || <span style={{ color: 'var(--muted)' }}>Not set</span>}</td>
                  <td style={{ maxWidth: 380, whiteSpace: 'normal' }}>
                    {cleanText(r.seo?.description) || <span style={{ color: 'var(--muted)' }}>Not set</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}
