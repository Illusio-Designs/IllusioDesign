'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import ImageField from '@/components/dashboard/ImageField';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useDashSearch } from '@/components/dashboard/SearchContext';
import { useToast } from '@/components/providers/Toaster';
import { teamAPI, cleanText } from '@/services/api';

const initials = (n = '') =>
  n.split(' ').map((x) => x[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || 'M';

const emptyForm = () => ({ name: '', role: '', bio: '', order: '', image: null });

export default function DashboardTeam() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [mode, setMode] = useState('list');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [existingImage, setExistingImage] = useState('');
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState(false);
  const { query } = useDashSearch();
  const { push } = useToast();

  const load = () => {
    let m = true;
    setLoading(true);
    teamAPI.getAll()
      .then((list) => {
        if (!m) return;
        setAuthError(false);
        const sorted = (Array.isArray(list) ? list : []).filter(Boolean)
          .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
        setRows(sorted);
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
    setExistingImage('');
    setMode('form');
  };

  const startEdit = async (row) => {
    setBusy(true);
    try {
      const f = (await teamAPI.getById(row.id)) || row;
      setEditingId(row.id);
      setForm({
        name: cleanText(f.name) || '',
        role: cleanText(f.role) || '',
        bio: cleanText(f.bio) || '',
        order: f.order != null ? String(f.order) : '',
        image: null,
      });
      setExistingImage(f.image || '');
      setMode('form');
    } catch (err) {
      push({ tone: 'error', title: 'Could not open member', body: err?.message || 'Please try again.' });
    } finally {
      setBusy(false);
    }
  };

  const remove = async (row) => {
    if (!window.confirm(`Remove ${cleanText(row.name) || 'this member'} from the team?`)) return;
    try {
      await teamAPI.remove(row.id);
      push({ tone: 'success', title: 'Member removed', body: 'The team member has been removed.' });
      setRows((p) => p.filter((r) => r.id !== row.id));
    } catch (err) {
      push({ tone: 'error', title: 'Could not remove', body: err?.message || 'Please try again.' });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      push({ tone: 'error', title: 'Name required', body: 'Enter the member name.' });
      return;
    }
    setSaving(true);
    const fd = new FormData();
    fd.append('name', form.name.trim());
    fd.append('role', form.role.trim());
    fd.append('bio', form.bio.trim());
    fd.append('order', form.order === '' ? '0' : String(form.order));
    if (form.image instanceof File) fd.append('image', form.image);

    try {
      if (editingId) {
        await teamAPI.update(editingId, fd);
        push({ tone: 'success', title: 'Member updated', body: 'Your changes are live on the About page.' });
      } else {
        await teamAPI.create(fd);
        push({ tone: 'success', title: 'Member added', body: 'The new member is live on the About page.' });
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
    ? rows.filter((r) => `${cleanText(r.name)} ${cleanText(r.role)}`.toLowerCase().includes(q))
    : rows;

  /* ---------- form view ---------- */
  if (mode === 'form') {
    return (
      <>
        <div className="dash-page-head">
          <div>
            <span className="page-eyebrow">Team</span>
            <h1>{editingId ? 'Edit member' : 'New member'}</h1>
            <p>{editingId ? 'Update a studio team member.' : 'Add a member to the public About page.'}</p>
          </div>
          <Button variant="light" size="sm" icon={false} onClick={() => setMode('list')}>← Back to list</Button>
        </div>

        <form onSubmit={submit}>
          <section className="dash-card">
            <header className="dash-card-head"><div><h3>Member details</h3><span>Shown on the About page</span></div></header>
            <div className="dash-card-body">
              <div className="field-row">
                <div className="field">
                  <label>Name</label>
                  <input value={form.name} onChange={set('name')} placeholder="Full name" />
                </div>
                <div className="field">
                  <label>Role</label>
                  <input value={form.role} onChange={set('role')} placeholder="e.g. Lead Designer" />
                </div>
              </div>
              <div className="field">
                <label>Bio</label>
                <textarea value={form.bio} onChange={set('bio')} placeholder="Short bio" />
              </div>
              <div className="field" style={{ maxWidth: 200 }}>
                <label>Display order</label>
                <input type="number" value={form.order} onChange={set('order')} placeholder="0" />
                <span className="field-hint">Lower numbers appear first.</span>
              </div>
              <ImageField
                label="Photo"
                value={form.image}
                existing={existingImage}
                onChange={(f) => setForm((p) => ({ ...p, image: f }))}
                hint="Square image recommended. JPG or PNG."
              />
            </div>
          </section>

          <div className="dash-form-actions">
            <Button variant="light" size="sm" icon={false} type="button" onClick={() => setMode('list')}>Cancel</Button>
            <Button variant="primary" size="sm" icon={false} type="submit" disabled={saving}>
              {saving ? 'Saving…' : editingId ? 'Save changes' : 'Add member'}
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
          <span className="page-eyebrow">Team</span>
          <h1>Studio team</h1>
          <p>{rows.length} {rows.length === 1 ? 'member' : 'members'} on the public About page.</p>
        </div>
        {!authError ? (
          <Button variant="primary" size="sm" icon={false} onClick={startNew} disabled={busy}>+ New member</Button>
        ) : null}
      </div>

      <section className="dash-card">
        <header className="dash-card-head">
          <div>
            <h3>All members</h3>
            <span>{rows.length} total{q ? ` · ${filtered.length} matched` : ''}</span>
          </div>
        </header>

        {loading ? (
          <SkeletonTable rows={5} cols={4} />
        ) : authError ? (
          <div className="dash-empty">
            <div className="dash-empty-icon" aria-hidden>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </div>
            <h3>Sign in to manage the team</h3>
            <p>The team CMS is a protected endpoint. Connect an authenticated admin session to add and edit members.</p>
          </div>
        ) : filtered.length ? (
          <table className="dash-table">
            <thead>
              <tr><th>Member</th><th>Role</th><th>Order</th><th /></tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id || i}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span className="avatar-init av-sm">{initials(cleanText(r.name))}</span>
                      <strong>{cleanText(r.name) || 'Unnamed'}</strong>
                    </div>
                  </td>
                  <td>{cleanText(r.role) || '—'}</td>
                  <td>{r.order != null ? r.order : '—'}</td>
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
            <h3>{q ? 'No members match your search' : 'No team members yet'}</h3>
            <p>{q ? 'Try a different name.' : 'Add your first studio team member.'}</p>
          </div>
        )}
      </section>
    </>
  );
}
