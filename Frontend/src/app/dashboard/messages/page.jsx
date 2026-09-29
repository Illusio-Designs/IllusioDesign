'use client';

import { useEffect, useState } from 'react';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useDashSearch } from '@/components/dashboard/SearchContext';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { contactAPI, cleanText } from '@/services/api';

const fmtDate = (d) => {
  const t = d ? new Date(d) : null;
  return t && !Number.isNaN(t.getTime())
    ? t.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : '—';
};

const STATUS = {
  unread: { label: 'Unread', tone: 'error' },
  read: { label: 'Read', tone: 'success' },
  replied: { label: 'Replied', tone: 'success' },
};

const waNumber = (phone) => (phone || '').replace(/[^\d]/g, '');

export default function DashboardMessages() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [active, setActive] = useState(null);
  const [saving, setSaving] = useState(false);
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
          phone: cleanText(c.phone) || '',
          createdAt: c.createdAt,
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

  const setStatus = async (row, status) => {
    if (!row || row.status === status) return;
    setSaving(true);
    try {
      await contactAPI.update(row.id, { status });
      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status } : r)));
      setActive((a) => (a && a.id === row.id ? { ...a, status } : a));
    } catch {
      /* keep current status on failure */
    } finally {
      setSaving(false);
    }
  };

  const openRow = (row) => {
    setActive(row);
    if (row.status === 'unread') setStatus(row, 'read');
  };

  const q = query.trim().toLowerCase();
  const filtered = q
    ? rows.filter((r) =>
        `${r.name} ${r.email} ${r.phone} ${r.subject} ${r.message}`.toLowerCase().includes(q),
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
          <SkeletonTable rows={6} cols={6} />
        ) : authError ? (
          <div className="dash-empty">
            <div className="dash-empty-icon" aria-hidden>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </div>
            <h3>Sign in to view messages</h3>
            <p>Contact messages are private. Connect an authenticated admin session to read the inbox.</p>
          </div>
        ) : filtered.length ? (
          <div style={{ overflowX: 'auto' }}>
          <table className="dash-table">
            <thead>
              <tr><th>Received</th><th>Name</th><th>Contact</th><th>Subject</th><th>Message</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr
                  key={r.id || i}
                  onClick={() => openRow(r)}
                  style={{ cursor: 'pointer', fontWeight: r.status === 'unread' ? 600 : 400 }}
                >
                  <td style={{ whiteSpace: 'nowrap' }}>{fmtDate(r.createdAt)}</td>
                  <td><strong>{r.name}</strong></td>
                  <td>
                    <div>{r.email}</div>
                    {r.phone ? <small>{r.phone}</small> : null}
                  </td>
                  <td>{r.subject}</td>
                  <td style={{ maxWidth: 280 }}>
                    <div style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {r.message}
                    </div>
                  </td>
                  <td>
                    <span className={`kit-badge kit-badge-${(STATUS[r.status] || STATUS.read).tone}`}>
                      <span className="dot" />{(STATUS[r.status] || STATUS.read).label}
                    </span>
                  </td>
                  <td>
                    <Button variant="ghost" size="sm" icon={false} onClick={(e) => { e.stopPropagation(); openRow(r); }}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        ) : (
          <div className="dash-empty">
            <h3>No messages yet</h3>
            <p>Contact-form enquiries from the site will appear here.</p>
          </div>
        )}
      </section>

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title={active ? active.subject : ''}
        description={active ? `From ${active.name} · ${fmtDate(active.createdAt)}` : ''}
        size="md"
      >
        {active ? (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ display: 'grid', gap: 6 }}>
              <div><small>Email</small><div><a href={`mailto:${active.email}`}>{active.email}</a></div></div>
              <div>
                <small>Phone</small>
                <div>{active.phone ? <a href={`tel:${active.phone.replace(/\s/g, '')}`}>{active.phone}</a> : '—'}</div>
              </div>
            </div>
            <div>
              <small>Message</small>
              <p style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: '6px 0 0' }}>{active.message || '—'}</p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {active.phone ? (
                <Button href={`https://wa.me/${waNumber(active.phone)}`} variant="ghost" size="md" icon={false}>WhatsApp</Button>
              ) : null}
              <Button href={`mailto:${active.email}?subject=${encodeURIComponent('Re: ' + active.subject)}`} variant="ghost" size="md" icon={false}>Reply by email</Button>
              <Button variant="primary" size="md" icon={false} onClick={() => setStatus(active, active.status === 'replied' ? 'read' : 'replied')}>
                {saving ? 'Saving…' : active.status === 'replied' ? 'Mark as not replied' : 'Mark as replied'}
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
