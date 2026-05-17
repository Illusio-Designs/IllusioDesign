'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useDashSearch } from '@/components/dashboard/SearchContext';
import { useToast } from '@/components/providers/Toaster';
import { userAPI, cleanText } from '@/services/api';

const initials = (n = '') =>
  n.split(' ').map((x) => x[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || 'U';

const fmtDate = (v) => {
  if (!v) return '—';
  try {
    return new Date(v).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return '—';
  }
};

const emptyForm = { username: '', email: '', password: '', role: 'admin' };

export default function DashboardUsers() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const { query } = useDashSearch();
  const { push } = useToast();

  const load = () => {
    let m = true;
    setLoading(true);
    userAPI.getAll()
      .then((list) => {
        if (!m) return;
        setAuthError(false);
        setRows((Array.isArray(list) ? list : []).filter(Boolean).map((u) => ({
          id: u.id || u._id,
          name: cleanText(u.name || u.username || u.fullName) || 'Unnamed',
          email: cleanText(u.email) || '—',
          role: cleanText(u.role || u.type || 'admin'),
          createdAt: u.createdAt || u.created_at || u.joinedAt || '',
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

  const change = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const openInvite = () => {
    setForm(emptyForm);
    setModal(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.username.trim() || !form.email.trim() || !form.password.trim()) {
      push({ tone: 'error', title: 'Missing details', body: 'Name, email and password are required.' });
      return;
    }
    setSaving(true);
    try {
      await userAPI.create({
        username: form.username.trim(),
        name: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      });
      push({ tone: 'success', title: 'User added', body: `${form.username.trim()} can now access the dashboard.` });
      setModal(false);
      load();
    } catch (err) {
      push({ tone: 'error', title: 'Could not add user', body: err?.message || 'Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const removeUser = async (u) => {
    if (!u.id) return;
    if (!window.confirm(`Remove ${u.name}? They will lose dashboard access.`)) return;
    try {
      await userAPI.remove(u.id);
      push({ tone: 'success', title: 'User removed', body: `${u.name} no longer has access.` });
      setRows((p) => p.filter((r) => r.id !== u.id));
    } catch (err) {
      push({ tone: 'error', title: 'Could not remove user', body: err?.message || 'Please try again.' });
    }
  };

  const q = query.trim().toLowerCase();
  const filtered = q
    ? rows.filter((r) => `${r.name} ${r.email} ${r.role}`.toLowerCase().includes(q))
    : rows;

  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">Users</span>
          <h1>Admin users</h1>
          <p>{rows.length} {rows.length === 1 ? 'person' : 'people'} with dashboard access.</p>
        </div>
        {!authError ? (
          <Button variant="primary" size="sm" icon={false} onClick={openInvite}>+ Add user</Button>
        ) : null}
      </div>

      <section className="dash-card">
        <header className="dash-card-head">
          <div>
            <h3>All users</h3>
            <span>{rows.length} total{q ? ` · ${filtered.length} matched` : ''}</span>
          </div>
        </header>

        {loading ? (
          <SkeletonTable rows={5} cols={4} />
        ) : authError ? (
          <div className="dash-empty">
            <div className="dash-empty-icon" aria-hidden>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3>Sign in to manage users</h3>
            <p>The admin user list is a protected endpoint. Connect an authenticated admin session to view and manage access.</p>
          </div>
        ) : filtered.length ? (
          <table className="dash-table">
            <thead>
              <tr><th>User</th><th>Email</th><th>Role</th><th>Joined</th><th /></tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr key={u.id || i}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span className="avatar-init av-sm">{initials(u.name)}</span>
                      <strong>{u.name}</strong>
                    </div>
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span className="kit-badge kit-badge-success">
                      <span className="dot" />{u.role || 'admin'}
                    </span>
                  </td>
                  <td>{fmtDate(u.createdAt)}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="dash-row-action danger" onClick={() => removeUser(u)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="dash-empty">
            <h3>{q ? 'No users match your search' : 'No users yet'}</h3>
            <p>{q ? 'Try a different name or email.' : 'Add a teammate to give them dashboard access.'}</p>
          </div>
        )}
      </section>

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="Add admin user"
        description="Create a login for a teammate."
        size="sm"
      >
        <form className="dash-card-body" style={{ padding: 0 }} onSubmit={submit}>
          <div className="field">
            <label>Name</label>
            <input value={form.username} onChange={change('username')} placeholder="Jane Doe" />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" value={form.email} onChange={change('email')} placeholder="jane@illusiodesigns.agency" />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" value={form.password} onChange={change('password')} placeholder="Temporary password" />
          </div>
          <div className="field">
            <label>Role</label>
            <select value={form.role} onChange={change('role')}>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
            <Button variant="light" size="sm" icon={false} type="button" onClick={() => setModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" icon={false} type="submit" disabled={saving}>
              {saving ? 'Adding…' : 'Add user'}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
