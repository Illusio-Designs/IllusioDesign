'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useToast } from '@/components/providers/Toaster';
import { milestoneAPI, cleanText } from '@/services/api';

const emptyForm = () => ({
  label: '',
  title: '',
  description: '',
  order: 0,
  status: 'published',
});

const lockIcon = (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default function DashboardMilestones() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [editing, setEditing] = useState(null); // null = list, 'new' = create, record = edit
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const { push } = useToast();

  const load = () => {
    let m = true;
    setLoading(true);
    milestoneAPI.getAll()
      .then((list) => {
        if (!m) return;
        setAuthError(false);
        setRecords(Array.isArray(list) ? list.filter(Boolean) : []);
      })
      .catch((err) => {
        if (!m) return;
        if (err?.status === 401 || err?.status === 403) setAuthError(true);
        setRecords([]);
      })
      .finally(() => { if (m) setLoading(false); });
    return () => { m = false; };
  };

  useEffect(load, []);

  const set = (k) => (e) => {
    const v = e?.target ? e.target.value : e;
    setForm((p) => ({ ...p, [k]: v }));
  };

  const startCreate = () => {
    const nextOrder = records.reduce((max, r) => Math.max(max, Number(r.order) || 0), 0) + 1;
    setForm({ ...emptyForm(), order: nextOrder });
    setEditing('new');
  };

  const startEdit = (r) => {
    setForm({
      label: r.label || '',
      title: r.title || '',
      description: r.description || '',
      order: r.order ?? 0,
      status: r.status || 'published',
    });
    setEditing(r);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.label.trim() || !form.title.trim()) {
      push({ tone: 'error', title: 'Missing details', body: 'A period label and a title are both required.' });
      return;
    }
    setSaving(true);
    const payload = {
      label: form.label.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      order: Number(form.order) || 0,
      status: form.status,
    };
    try {
      if (editing === 'new') {
        await milestoneAPI.create(payload);
      } else {
        await milestoneAPI.update(editing.id, payload);
      }
      push({ tone: 'success', title: 'Milestone saved', body: `“${payload.label} — ${payload.title}” is updated.` });
      setEditing(null);
      load();
    } catch (err) {
      push({ tone: 'error', title: 'Could not save', body: err?.message || 'Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (r) => {
    if (!window.confirm(`Delete milestone “${r.label} — ${r.title}”? This cannot be undone.`)) return;
    try {
      await milestoneAPI.remove(r.id);
      push({ tone: 'success', title: 'Deleted', body: `“${r.title}” was removed.` });
      load();
    } catch (err) {
      push({ tone: 'error', title: 'Could not delete', body: err?.message || 'Please try again.' });
    }
  };

  /* ---------- edit / create view ---------- */
  if (editing) {
    const isNew = editing === 'new';
    return (
      <>
        <div className="dash-page-head">
          <div>
            <span className="page-eyebrow">Roadmap</span>
            <h1>{isNew ? 'New milestone' : `Edit “${editing.title}”`}</h1>
            <p>A point on the company roadmap timeline shown on the About page.</p>
          </div>
          <Button variant="light" size="sm" icon={false} onClick={() => setEditing(null)}>← Back to list</Button>
        </div>

        <form onSubmit={submit}>
          <section className="dash-card">
            <header className="dash-card-head"><div><h3>Milestone</h3><span>Period, title and description</span></div></header>
            <div className="dash-card-body">
              <div className="field">
                <label>Period label *</label>
                <input value={form.label} onChange={set('label')} placeholder="e.g. 2015, Jun 1 2017, Q1 2018" />
                <span className="field-hint">The date / period shown beside the timeline dot.</span>
              </div>
              <div className="field">
                <label>Title *</label>
                <input value={form.title} onChange={set('title')} placeholder="e.g. Founded as a branding agency" />
              </div>
              <div className="field">
                <label>Description</label>
                <textarea value={form.description} onChange={set('description')} placeholder="A short sentence about this milestone" />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Order</label>
                  <input type="number" value={form.order} onChange={set('order')} />
                  <span className="field-hint">Lower numbers appear earlier on the timeline.</span>
                </div>
                <div className="field">
                  <label>Status</label>
                  <select value={form.status} onChange={set('status')}>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <div className="dash-form-actions">
            <Button variant="light" size="sm" icon={false} type="button" onClick={() => setEditing(null)}>Cancel</Button>
            <Button variant="primary" size="sm" icon={false} type="submit" disabled={saving}>
              {saving ? 'Saving…' : isNew ? 'Create milestone' : 'Save changes'}
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
          <span className="page-eyebrow">Roadmap</span>
          <h1>Company milestones</h1>
          <p>{records.length} milestone{records.length === 1 ? '' : 's'} on the About-page roadmap.</p>
        </div>
        {!authError ? (
          <Button variant="primary" size="sm" icon={false} onClick={startCreate}>New milestone</Button>
        ) : null}
      </div>

      <section className="dash-card">
        <header className="dash-card-head">
          <div><h3>Timeline</h3><span>Ordered as they appear on the public roadmap</span></div>
        </header>

        {loading ? (
          <SkeletonTable rows={4} cols={5} />
        ) : authError ? (
          <div className="dash-empty">
            <div className="dash-empty-icon" aria-hidden>{lockIcon}</div>
            <h3>Sign in to manage milestones</h3>
            <p>The roadmap is a protected endpoint. Connect an authenticated admin session to add or edit milestones.</p>
          </div>
        ) : records.length === 0 ? (
          <div className="dash-empty">
            <div className="dash-empty-icon" aria-hidden>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h18M12 3v18" />
              </svg>
            </div>
            <h3>No milestones yet</h3>
            <p>Add your first milestone to build out the company roadmap.</p>
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr><th>Order</th><th>Period</th><th>Title</th><th>Status</th><th /></tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id}>
                  <td>{r.order ?? 0}</td>
                  <td><strong>{r.label}</strong></td>
                  <td>{cleanText(r.title)}</td>
                  <td>
                    <span className={`kit-badge kit-badge-${r.status === 'published' ? 'success' : 'info'}`}>
                      <span className="dot" />{r.status === 'published' ? 'Published' : 'Draft'}
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
        )}
      </section>
    </>
  );
}
