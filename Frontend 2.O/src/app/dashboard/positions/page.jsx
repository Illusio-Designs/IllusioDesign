'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useDashSearch } from '@/components/dashboard/SearchContext';
import { positionAPI, cleanText } from '@/services/api';

export default function DashboardPositions() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const { query } = useDashSearch();

  useEffect(() => {
    let m = true;
    positionAPI.getAllPublic()
      .then((list) => {
        if (!m) return;
        setRows((Array.isArray(list) ? list : []).filter(Boolean).map((p) => ({
          id: p.id,
          title: cleanText(p.title) || 'Untitled role',
          department: cleanText(p.department || 'Studio'),
          location: cleanText(p.location || 'Remote'),
          salary: cleanText(p.salary || '—'),
        })));
      })
      .catch(() => { if (m) setRows([]); })
      .finally(() => { if (m) setLoading(false); });
    return () => { m = false; };
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? rows.filter((r) =>
        `${r.title} ${r.department} ${r.location} ${r.salary}`.toLowerCase().includes(q),
      )
    : rows;

  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">Positions</span>
          <h1>Open roles</h1>
          <p>Career listings shown on the public site.</p>
        </div>
        <Button variant="primary" size="sm" icon={false}>+ New position</Button>
      </div>

      <section className="dash-card">
        <header className="dash-card-head">
          <div>
            <h3>All positions</h3>
            <span>{rows.length} open{q ? ` · ${filtered.length} matched` : ''}</span>
          </div>
        </header>

        {loading ? (
          <SkeletonTable rows={5} cols={4} />
        ) : filtered.length ? (
          <table className="dash-table">
            <thead>
              <tr><th>Role</th><th>Department</th><th>Location</th><th>Compensation</th></tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id || i}>
                  <td><strong>{r.title}</strong></td>
                  <td><span className="kit-badge kit-badge-info"><span className="dot" />{r.department}</span></td>
                  <td>{r.location}</td>
                  <td>{r.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="dash-empty">
            <h3>No open positions</h3>
            <p>Published career listings will appear here.</p>
          </div>
        )}
      </section>
    </>
  );
}
