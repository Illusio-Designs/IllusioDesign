'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useDashSearch } from '@/components/dashboard/SearchContext';
import { useToast } from '@/components/providers/Toaster';
import { positionAPI, cleanText } from '@/services/api';

const TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];

const emptyForm = () => ({
  title: '', experience: '', location: '', type: 'Full-time',
  description: '', requirements: '', isActive: true,
});

export default function DashboardPositions() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [mode, setMode] = useState('list');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState(false);
  const { query } = useDashSearch();
  const { push } = useToast();

  const load = () => {
    let m = true;
    setLoading(true);
    positionAPI.getAll()
      .then((list) => {
        if (!m) return;
        setAuthError(false);
        setRows((Array.isArray(list) ? list : []).filter(Boolean));
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

  const set = (k) => (e) => {
    const v = e?.target ? e.target.value : e;
    setForm((p) => ({ ...p, [k]: v }));
  };

  const startNew = () => {
    setEditingId(null);
    setForm(emptyForm());
    setMode('form');
  };

  const startEdit = async (row) => {
    setBusy(true);
    try {
      const f = (await positionAPI.getById(row.id)) || row;
      setEditingId(row.id);
      setForm({
        title: cleanText(f.title) || '',
        experience: cleanText(f.experience) || '',
        location: cleanText(f.location) || '',
        type: cleanText(f.type) || 'Full-time',
        description: f.description || '',
        requirements: Array.isArray(f.requirements) ? f.requirements.join(', ') : cleanText(f.requirements) || '',
        isActive: f.isActive !== false,
      });
      setMode('form');
    } catch (err) {
      push({ tone: 'error', title: 'Could not open position', body: err?.message || 'Please try again.' });
    } finally {
      setBusy(false);
    }
  };

  const remove = async (row) => {
    if (!window.confirm(`Delete "${cleanText(row.title) || 'this position'}"?`)) return;
    try {
      await positionAPI.remove(row.id);
      push({ tone: 'success', title: 'Position deleted', body: 'The opening has been removed.' });
      setRows((p) => p.filter((r) => r.id !== row.id));
    } catch (err) {
      push({ tone: 'error', title: 'Could not delete', body: err?.message || 'Please try again.' });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      push({ tone: 'error', title: 'Title required', body: 'Give the position a title.' });
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      experience: form.experience.trim(),
      location: form.location.trim(),
      type: form.type,
      description: form.description,
      requirements: form.requirements.trim(),
      isActive: form.isActive,
    };
    try {
      if (editingId) {
        await positionAPI.update(editingId, payload);
        push({ tone: 'success', title: 'Position updated', body: 'Your changes are live.' });
      } else {
        await positionAPI.create(payload);
        push({ tone: 'success', title: 'Position posted', body: 'The new opening is live.' });
      }
      setMode('list');
      load();
    } catch (err) {
      push({ tone: 'error', title: 'Could not save', body: err?.message || 'Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const q = query.trim().toLowerCase();
  const filtered = q
    ? rows.filter((r) => `${cleanText(r.title)} ${cleanText(r.location)} ${cleanText(r.type)}`.toLowerCase().includes(q))
    : rows;

  /* ---------- form view ---------- */
  if (mode === 'form') {
    return (
      <>
        <div className="dash-page-head">
          <div>
            <span className="page-eyebrow">Position</span>
            <h1>{editingId ? 'Edit position' : 'New position'}</h1>
            <p>{editingId ? 'Update an existing job opening.' : 'Post a new job opening to the careers page.'}</p>
          </div>
          <Button variant="light" size="sm" icon={false} onClick={() => setMode('list')}>← Back to list</Button>
        </div>

        <form onSubmit={submit}>
          <section className="dash-card">
            <header className="dash-card-head"><div><h3>Role details</h3><span>Title, location &amp; type</span></div></header>
            <div className="dash-card-body">
              <div className="field">
                <label>Job title</label>
                <input value={form.title} onChange={set('title')} placeholder="e.g. Senior Product Designer" />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Experience</label>
                  <input value={form.experience} onChange={set('experience')} placeholder="e.g. 3+ years / Fresher" />
                </div>
                <div className="field">
                  <label>Location</label>
                  <input value={form.location} onChange={set('location')} placeholder="e.g. Rajkot / Remote" />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Employment type</label>
                  <Dropdown
                    width="100%"
                    menuWidth={200}
                    value={form.type}
                    onSelect={(v) => setForm((p) => ({ ...p, type: v }))}
                    options={TYPES.map((t) => ({ value: t, label: t }))}
                  />
                </div>
                <div className="field">
                  <label>Status</label>
                  <div className="field-toggle">
                    <button
                      type="button"
                      className={`toggle ${form.isActive ? 'is-on' : ''}`}
                      onClick={() => setForm((p) => ({ ...p, isActive: !p.isActive }))}
                      aria-pressed={form.isActive}
                    >
                      <span />
                    </button>
                    <span>{form.isActive ? 'Active — visible on careers page' : 'Inactive — hidden'}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="dash-card">
            <header className="dash-card-head"><div><h3>Description</h3><span>About the role</span></div></header>
            <div className="dash-card-body">
              <RichTextEditor
                value={form.description}
                onChange={set('description')}
                placeholder="Describe the role, responsibilities and what you're looking for…"
                minHeight={280}
              />
            </div>
          </section>

          <section className="dash-card">
            <header className="dash-card-head"><div><h3>Requirements</h3><span>Skills &amp; tools</span></div></header>
            <div className="dash-card-body">
              <div className="field">
                <label>Required skills</label>
                <textarea
                  value={form.requirements}
                  onChange={set('requirements')}
                  placeholder="e.g. Figma, Photoshop, Illustrator, React"
                />
                <span className="field-hint">Comma separated — shown as tags on the careers page.</span>
              </div>
            </div>
          </section>

          <div className="dash-form-actions">
            <Button variant="light" size="sm" icon={false} type="button" onClick={() => setMode('list')}>Cancel</Button>
            <Button variant="primary" size="sm" icon={false} type="submit" disabled={saving}>
              {saving ? 'Saving…' : editingId ? 'Save changes' : 'Post position'}
            </Button>
          </div>
        </form>
      </>
    );
  }

  /* ---------- list view ---------- */
  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">Position</span>
          <h1>Open positions</h1>
          <p>{rows.length} {rows.length === 1 ? 'role' : 'roles'} on the careers page.</p>
        </div>
        {!authError ? (
          <Button variant="primary" size="sm" icon={false} onClick={startNew} disabled={busy}>+ New position</Button>
        ) : null}
      </div>

      <section className="dash-card">
        <header className="dash-card-head">
          <div>
            <h3>All positions</h3>
            <span>{rows.length} total{q ? ` · ${filtered.length} matched` : ''}</span>
          </div>
        </header>

        {loading ? (
          <SkeletonTable rows={5} cols={5} />
        ) : authError ? (
          <div className="dash-empty">
            <div className="dash-empty-icon" aria-hidden>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </div>
            <h3>Sign in to manage positions</h3>
            <p>The careers CMS is a protected endpoint. Connect an authenticated admin session to post and edit openings.</p>
          </div>
        ) : filtered.length ? (
          <table className="dash-table">
            <thead>
              <tr><th>Role</th><th>Type</th><th>Location</th><th>Status</th><th /></tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id || i}>
                  <td><strong>{cleanText(r.title) || 'Untitled'}</strong></td>
                  <td>{cleanText(r.type) || '—'}</td>
                  <td>{cleanText(r.location) || '—'}</td>
                  <td>
                    <span className={`kit-badge kit-badge-${r.isActive !== false ? 'success' : 'error'}`}>
                      <span className="dot" />{r.isActive !== false ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="dash-row-actions">
                      <button className="dash-row-action" onClick={() => startEdit(r)}>Edit</button>
                      <button className="dash-row-action danger" onClick={() => remove(r)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="dash-empty">
            <h3>{q ? 'No positions match your search' : 'No positions yet'}</h3>
            <p>{q ? 'Try a different keyword.' : 'Post your first job opening.'}</p>
          </div>
        )}
      </section>
    </>
  );
}
