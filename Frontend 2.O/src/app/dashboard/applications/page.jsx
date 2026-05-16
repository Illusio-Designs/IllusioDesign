'use client';

import { useEffect, useState } from 'react';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useDashSearch } from '@/components/dashboard/SearchContext';
import { applicationAPI, cleanText } from '@/services/api';

const statusTone = (s = '') => {
  const v = s.toLowerCase();
  if (v === 'accepted' || v === 'hired' || v === 'reviewed') return 'success';
  if (v === 'rejected' || v === 'declined') return 'error';
  return 'warn';
};

export default function DashboardApplications() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const { query } = useDashSearch();

  useEffect(() => {
    let m = true;
    applicationAPI.getAll()
      .then((list) => {
        if (!m) return;
        setRows((Array.isArray(list) ? list : []).filter(Boolean).map((a) => ({
          id: a.id,
          name: cleanText(a.name) || 'Unknown',
          email: cleanText(a.email) || '—',
          position: cleanText(a.position?.title || a.positionTitle || a.position) || '—',
          portfolio: cleanText(a.portfolio) || '',
          status: (a.status || 'pending').toLowerCase(),
        })));
      })
      .catch((err) => {
        if (!m) return;
        if (err?.status === 401 || err?.status === 403) setAuthError(true);
      })
      .finally(() => { if (m) setLoading(false); });
    return () => { m = false; };
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? rows.filter((r) =>
        `${r.name} ${r.email} ${r.position} ${r.status}`.toLowerCase().includes(q),
      )
    : rows;
  const pending = rows.filter((r) => r.status === 'pending').length;

  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">Applications</span>
          <h1>Job applications</h1>
          <p>{rows.length} applications · {pending} pending review</p>
        </div>
      </div>

      <section className="dash-card">
        <header className="dash-card-head">
          <div>
            <h3>Candidates</h3>
            <span>{rows.length} total{q ? ` · ${filtered.length} matched` : ''}</span>
          </div>
        </header>

        {loading ? (
          <SkeletonTable rows={6} cols={5} />
        ) : authError ? (
          <div className="dash-empty">
            <div className="dash-empty-icon" aria-hidden>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </div>
            <h3>Sign in to view applications</h3>
            <p>Job applications are private. Connect an authenticated admin session to review candidates.</p>
          </div>
        ) : filtered.length ? (
          <table className="dash-table">
            <thead>
              <tr><th>Candidate</th><th>Email</th><th>Position</th><th>Portfolio</th><th>Status</th></tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id || i}>
                  <td><strong>{r.name}</strong></td>
                  <td>{r.email}</td>
                  <td>{r.position}</td>
                  <td>
                    {r.portfolio ? (
                      <a href={r.portfolio} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>
                        View
                      </a>
                    ) : '—'}
                  </td>
                  <td>
                    <span className={`kit-badge kit-badge-${statusTone(r.status)}`}>
                      <span className="dot" />{r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="dash-empty">
            <h3>No applications yet</h3>
            <p>Submissions from the careers pages will appear here.</p>
          </div>
        )}
      </section>
    </>
  );
}
