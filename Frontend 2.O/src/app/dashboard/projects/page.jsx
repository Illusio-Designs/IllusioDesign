'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useDashSearch } from '@/components/dashboard/SearchContext';
import { caseStudyAPI, toArrayField } from '@/services/api';

const toneFor = (cat = '') => {
  const c = cat.toLowerCase();
  if (c.includes('brand')) return 'warn';
  if (c.includes('web') || c.includes('app')) return 'success';
  if (c.includes('b2b')) return 'info';
  return 'info';
};

export default function ProjectsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const { query } = useDashSearch();

  useEffect(() => {
    let m = true;
    caseStudyAPI.getAllPublic()
      .then((list) => {
        if (!m) return;
        const mapped = (Array.isArray(list) ? list : []).filter(Boolean).map((p) => ({
          id: p.id,
          name: p.title || 'Untitled',
          client: p.clientName || p.client || '—',
          category: p.category || 'project',
          tech: toArrayField(p.techStack || p.technologies).join(', ') || '—',
          duration: p.duration || '—',
        }));
        setRows(mapped);
      })
      .catch(() => {})
      .finally(() => { if (m) setLoading(false); });
    return () => { m = false; };
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? rows.filter((r) =>
        `${r.name} ${r.client} ${r.category} ${r.tech}`.toLowerCase().includes(q),
      )
    : rows;

  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">Projects</span>
          <h1>All case studies</h1>
          <p>Every project published on the public site.</p>
        </div>
        <Button variant="primary" size="sm" icon={false}>+ New project</Button>
      </div>

      <section className="dash-card">
        <header className="dash-card-head">
          <div>
            <h3>Case studies</h3>
            <span>{rows.length} total{q ? ` · ${filtered.length} matched` : ''}</span>
          </div>
        </header>

        {loading ? (
          <SkeletonTable rows={6} cols={5} />
        ) : filtered.length ? (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Client</th>
                <th>Category</th>
                <th>Tech stack</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id || i}>
                  <td><strong>{r.name}</strong></td>
                  <td>{r.client}</td>
                  <td>
                    <span className={`kit-badge kit-badge-${toneFor(r.category)}`}>
                      <span className="dot" />{r.category}
                    </span>
                  </td>
                  <td>{r.tech}</td>
                  <td>{r.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: 24, color: 'var(--muted)', fontSize: 14 }}>
            No projects match your search.
          </div>
        )}
      </section>
    </>
  );
}
