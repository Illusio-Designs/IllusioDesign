'use client';

import { useEffect, useMemo, useState } from 'react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Dropdown from '@/components/ui/Dropdown';
import { SkeletonText } from '@/components/ui/Skeleton';
import { useToast } from '@/components/providers/Toaster';
import { settingsAPI } from '@/services/api';

const CATEGORY_META = {
  general: { label: 'General', desc: 'Core site identity' },
  contact: { label: 'Contact details', desc: 'Shown across the public site' },
  social: { label: 'Social links', desc: 'Profile URLs for the footer & social tags' },
  analytics: { label: 'Analytics & tracking', desc: 'Tracking IDs — loaded only after cookie consent' },
};
const CATEGORY_ORDER = ['general', 'contact', 'social', 'analytics'];

const labelFor = (s) =>
  s.label || s.key.replace(/[_-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const inputType = (key = '') => {
  if (key.includes('email')) return 'email';
  if (key.startsWith('social_') || key.includes('url')) return 'url';
  return 'text';
};

const normalizeKey = (raw = '') =>
  raw.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');

const emptyNew = () => ({ key: '', label: '', category: 'general', value: '' });

export default function DashboardSettings() {
  const [rows, setRows] = useState([]);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState(false);
  const [draft, setDraft] = useState(emptyNew());
  const [adding, setAdding] = useState(false);
  const { push } = useToast();

  const load = () => {
    let m = true;
    setLoading(true);
    settingsAPI.getAll()
      .then((list) => {
        if (!m) return;
        setAuthError(false);
        const arr = (Array.isArray(list) ? list : []).filter(Boolean);
        setRows(arr);
        const v = {};
        arr.forEach((s) => { v[s.key] = s.value || ''; });
        setValues(v);
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

  const grouped = useMemo(() => {
    const g = {};
    rows.forEach((s) => {
      const cat = s.category || 'general';
      (g[cat] = g[cat] || []).push(s);
    });
    return g;
  }, [rows]);

  const categories = useMemo(() => {
    const known = CATEGORY_ORDER.filter((c) => grouped[c]);
    const extra = Object.keys(grouped).filter((c) => !CATEGORY_ORDER.includes(c));
    return [...known, ...extra];
  }, [grouped]);

  const change = (key) => (e) => setValues((p) => ({ ...p, [key]: e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await settingsAPI.update(values);
      push({ tone: 'success', title: 'Settings saved', body: 'Platform settings have been updated.' });
    } catch (err) {
      push({ tone: 'error', title: 'Could not save', body: err?.message || 'Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const openAdd = () => {
    setDraft(emptyNew());
    setModal(true);
  };

  const submitAdd = async (e) => {
    e.preventDefault();
    const key = normalizeKey(draft.key);
    if (!key) {
      push({ tone: 'error', title: 'Key required', body: 'Enter a key for the setting.' });
      return;
    }
    if (rows.some((r) => r.key === key)) {
      push({ tone: 'error', title: 'Key already exists', body: `A setting "${key}" already exists.` });
      return;
    }
    setAdding(true);
    try {
      await settingsAPI.updateOne(key, {
        value: draft.value,
        label: draft.label.trim() || undefined,
        category: draft.category,
        isPublic: true,
      });
      push({ tone: 'success', title: 'Setting added', body: `"${key}" has been created.` });
      setModal(false);
      load();
    } catch (err) {
      push({ tone: 'error', title: 'Could not add setting', body: err?.message || 'Please try again.' });
    } finally {
      setAdding(false);
    }
  };

  const removeSetting = async (s) => {
    if (!window.confirm(`Remove the "${labelFor(s)}" setting?`)) return;
    try {
      await settingsAPI.remove(s.key);
      setRows((p) => p.filter((r) => r.key !== s.key));
      setValues((p) => {
        const next = { ...p };
        delete next[s.key];
        return next;
      });
      push({ tone: 'success', title: 'Setting removed', body: `"${s.key}" has been deleted.` });
    } catch (err) {
      push({ tone: 'error', title: 'Could not remove', body: err?.message || 'Please try again.' });
    }
  };

  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">Settings</span>
          <h1>Platform settings</h1>
          <p>Site-wide configuration — contact details, social links and tracking IDs.</p>
        </div>
        {!loading && !authError ? (
          <Button variant="primary" size="sm" icon={false} onClick={openAdd}>+ Add setting</Button>
        ) : null}
      </div>

      {loading ? (
        <section className="dash-card">
          <div className="dash-card-body"><SkeletonText lines={10} /></div>
        </section>
      ) : authError ? (
        <section className="dash-card">
          <div className="dash-empty">
            <div className="dash-empty-icon" aria-hidden>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </div>
            <h3>Sign in to manage settings</h3>
            <p>Platform settings are a protected endpoint. Connect an authenticated admin session to edit them.</p>
          </div>
        </section>
      ) : categories.length === 0 ? (
        <section className="dash-card">
          <div className="dash-empty">
            <h3>No settings yet</h3>
            <p>Use “Add setting” to create your first platform setting.</p>
          </div>
        </section>
      ) : (
        <form onSubmit={save}>
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat] || { label: cat, desc: 'Custom settings' };
            return (
              <section className="dash-card" key={cat}>
                <header className="dash-card-head">
                  <div>
                    <h3>{meta.label}</h3>
                    <span>{meta.desc}</span>
                  </div>
                </header>
                <div className="dash-card-body">
                  {grouped[cat].map((s) => (
                    <div className="field" key={s.key}>
                      <div className="field-labelrow">
                        <label>{labelFor(s)}</label>
                        <button
                          type="button"
                          className="setting-remove-btn"
                          onClick={() => removeSetting(s)}
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        type={inputType(s.key)}
                        value={values[s.key] ?? ''}
                        onChange={change(s.key)}
                        placeholder={cat === 'analytics' ? 'Leave blank to disable' : ''}
                      />
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          <div className="dash-form-actions">
            <Button variant="primary" size="sm" icon={false} type="submit" disabled={saving}>
              {saving ? 'Saving…' : 'Save settings'}
            </Button>
          </div>
        </form>
      )}

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="Add a setting"
        description="Create a custom platform setting."
        size="sm"
      >
        <form className="dash-card-body" style={{ padding: 0 }} onSubmit={submitAdd}>
          <div className="field">
            <label>Key</label>
            <input
              value={draft.key}
              onChange={(e) => setDraft((p) => ({ ...p, key: e.target.value }))}
              placeholder="e.g. whatsapp_number"
            />
            <span className="field-hint">Lowercase identifier — spaces become underscores.</span>
          </div>
          <div className="field">
            <label>Label</label>
            <input
              value={draft.label}
              onChange={(e) => setDraft((p) => ({ ...p, label: e.target.value }))}
              placeholder="e.g. WhatsApp number"
            />
          </div>
          <div className="field">
            <label>Category</label>
            <Dropdown
              width="100%"
              menuWidth={220}
              value={draft.category}
              onSelect={(v) => setDraft((p) => ({ ...p, category: v }))}
              options={CATEGORY_ORDER.map((c) => ({ value: c, label: CATEGORY_META[c].label }))}
            />
          </div>
          <div className="field">
            <label>Value</label>
            <input
              value={draft.value}
              onChange={(e) => setDraft((p) => ({ ...p, value: e.target.value }))}
              placeholder="Setting value"
            />
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
            <Button variant="light" size="sm" icon={false} type="button" onClick={() => setModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" icon={false} type="submit" disabled={adding}>
              {adding ? 'Adding…' : 'Add setting'}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
