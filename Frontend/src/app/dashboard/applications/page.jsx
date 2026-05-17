'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/ui/Modal';
import Dropdown from '@/components/ui/Dropdown';
import Button from '@/components/ui/Button';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useDashSearch } from '@/components/dashboard/SearchContext';
import { useToast } from '@/components/providers/Toaster';
import { applicationAPI, cleanText, resolveImage } from '@/services/api';

const STATUSES = ['pending', 'reviewed', 'accepted', 'rejected'];

const statusTone = (s = '') => {
  const v = s.toLowerCase();
  if (v === 'accepted' || v === 'hired') return 'success';
  if (v === 'rejected' || v === 'declined') return 'error';
  if (v === 'reviewed') return 'info';
  return 'warn';
};

const externalHref = (v = '') => (/^https?:\/\//i.test(v) ? v : `https://${v}`);

export default function DashboardApplications() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [active, setActive] = useState(null);
  const [status, setStatus] = useState('pending');
  const [saving, setSaving] = useState(false);
  const { query } = useDashSearch();
  const { push } = useToast();

  const load = () => {
    let m = true;
    setLoading(true);
    applicationAPI.getAll()
      .then((list) => {
        if (!m) return;
        setAuthError(false);
        setRows((Array.isArray(list) ? list : []).filter(Boolean).map((a) => ({
          id: a.id,
          name: cleanText(a.name) || 'Unknown',
          email: cleanText(a.email) || '—',
          contact: cleanText(a.contact || a.phone) || '',
          position: cleanText(a.position?.title || a.positionTitle || a.position) || '—',
          portfolio: cleanText(a.portfolio) || '',
          resume: a.resume || '',
          coverLetter: cleanText(a.coverLetter || a.message) || '',
          status: (a.status || 'pending').toLowerCase(),
        })));
      })
      .catch((err) => {
        if (!m) return;
        if (err?.status === 401 || err?.status === 403) setAuthError(true);
        setRows([]);
      })
      .finally(() => { if (m) setLoading(false); });
    return () => { m = false; };
  };

  useEffect(load, []);

  const open = (row) => {
    setActive(row);
    setStatus(row.status);
  };

  const saveStatus = async () => {
    if (!active) return;
    setSaving(true);
    try {
      await applicationAPI.update(active.id, { status });
      setRows((p) => p.map((r) => (r.id === active.id ? { ...r, status } : r)));
      push({ tone: 'success', title: 'Status updated', body: `${active.name} marked as ${status}.` });
      setActive(null);
    } catch (err) {
      push({ tone: 'error', title: 'Could not update', body: err?.message || 'Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!active) return;
    if (!window.confirm(`Delete the application from ${active.name}?`)) return;
    try {
      await applicationAPI.remove(active.id);
      setRows((p) => p.filter((r) => r.id !== active.id));
      push({ tone: 'success', title: 'Application deleted', body: 'The submission has been removed.' });
      setActive(null);
    } catch (err) {
      push({ tone: 'error', title: 'Could not delete', body: err?.message || 'Please try again.' });
    }
  };

  const q = query.trim().toLowerCase();
  const filtered = q
    ? rows.filter((r) => `${r.name} ${r.email} ${r.position} ${r.status}`.toLowerCase().includes(q))
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
              <tr><th>Candidate</th><th>Email</th><th>Position</th><th>Status</th><th /></tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id || i}>
                  <td><strong>{r.name}</strong></td>
                  <td>{r.email}</td>
                  <td>{r.position}</td>
                  <td>
                    <span className={`kit-badge kit-badge-${statusTone(r.status)}`}>
                      <span className="dot" />{r.status}
                    </span>
                  </td>
                  <td>
                    <button className="dash-row-action" onClick={() => open(r)}>Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="dash-empty">
            <h3>{q ? 'No applications match your search' : 'No applications yet'}</h3>
            <p>{q ? 'Try a different keyword.' : 'Submissions from the careers pages will appear here.'}</p>
          </div>
        )}
      </section>

      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        title={active?.name || 'Application'}
        description={active?.position ? `Applied for ${active.position}` : 'Candidate application'}
        size="md"
      >
        {active ? (
          <div className="app-detail">
            <dl className="app-detail-grid">
              <div><dt>Email</dt><dd><a href={`mailto:${active.email}`}>{active.email}</a></dd></div>
              <div><dt>Contact</dt><dd>{active.contact || '—'}</dd></div>
              <div><dt>Position</dt><dd>{active.position}</dd></div>
              <div>
                <dt>Portfolio</dt>
                <dd>
                  {active.portfolio
                    ? <a href={externalHref(active.portfolio)} target="_blank" rel="noreferrer">View portfolio</a>
                    : '—'}
                </dd>
              </div>
              <div>
                <dt>Resume</dt>
                <dd>
                  {active.resume
                    ? <a href={resolveImage(active.resume)} target="_blank" rel="noreferrer">Download resume</a>
                    : '—'}
                </dd>
              </div>
            </dl>

            {active.coverLetter ? (
              <div className="app-detail-cover">
                <dt>Cover letter</dt>
                <p>{active.coverLetter}</p>
              </div>
            ) : null}

            <div className="field">
              <label>Application status</label>
              <Dropdown
                width="100%"
                menuWidth={220}
                value={status}
                onSelect={setStatus}
                options={STATUSES.map((s) => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))}
              />
            </div>

            <div className="dash-form-actions" style={{ padding: '4px 0 0', justifyContent: 'space-between' }}>
              <button type="button" className="dash-row-action danger" onClick={remove}>Delete application</button>
              <Button variant="primary" size="sm" icon={false} type="button" onClick={saveStatus} disabled={saving}>
                {saving ? 'Saving…' : 'Save status'}
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
