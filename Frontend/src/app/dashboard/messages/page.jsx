'use client';

import { useEffect, useState } from 'react';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useDashSearch } from '@/components/dashboard/SearchContext';
import { contactAPI, cleanText } from '@/services/api';

export default function DashboardMessages() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const { query } = useDashSearch();

  useEffect(() => {
    let m = true;
    contactAPI.getAll()
      .then((list) => {
        if (!m) return;
        setRows((Array.isArray(list) ? list : []).filter(Boolean).map((c) => ({
          id: c.id,
          name: cleanText(c.name) || 'Unknown',
          email: cleanText(c.email) || '—',
          subject: cleanText(c.subject) || '—',
          message: cleanText(c.message) || '',
          status: (c.status || 'unread').toLowerCase(),
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
        `${r.name} ${r.email} ${r.subject} ${r.message}`.toLowerCase().includes(q),
      )
    : rows;
  const unread = rows.filter((r) => r.status === 'unread').length;

  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">Messages</span>
          <h1>Contact messages</h1>
          <p>{rows.length} messages · {unread} unread</p>
        </div>
      </div>

      <section className="dash-card">
        <header className="dash-card-head">
          <div>
            <h3>Inbox</h3>
            <span>{rows.length} total{q ? ` · ${filtered.length} matched` : ''}</span>
          </div>
        </header>

        {loading ? (
          <SkeletonTable rows={6} cols={4} />
        ) : authError ? (
          <div className="dash-empty">
            <div className="dash-empty-icon" aria-hidden>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </div>
            <h3>Sign in to view messages</h3>
            <p>Contact messages are private. Connect an authenticated admin session to read the inbox.</p>
          </div>
        ) : filtered.length ? (
          <table className="dash-table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Subject</th><th>Message</th><th>Status</th></tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id || i}>
                  <td><strong>{r.name}</strong></td>
                  <td>{r.email}</td>
                  <td>{r.subject}</td>
                  <td>{r.message}</td>
                  <td>
                    <span className={`kit-badge kit-badge-${r.status === 'unread' ? 'error' : 'success'}`}>
                      <span className="dot" />{r.status === 'unread' ? 'Unread' : 'Read'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="dash-empty">
            <h3>No messages yet</h3>
            <p>Contact-form enquiries from the site will appear here.</p>
          </div>
        )}
      </section>
    </>
  );
}
