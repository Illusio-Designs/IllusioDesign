'use client';

import { useEffect, useMemo, useState } from 'react';
import Button from '@/components/ui/Button';
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

export default function DashboardSettings() {
  const [rows, setRows] = useState([]);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [saving, setSaving] = useState(false);
  const { push } = useToast();

  useEffect(() => {
    let m = true;
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
  }, []);

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

  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">Settings</span>
          <h1>Platform settings</h1>
          <p>Site-wide configuration — contact details, social links and tracking IDs.</p>
        </div>
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
            <h3>No settings found</h3>
            <p>The backend has no settings configured yet.</p>
          </div>
        </section>
      ) : (
        <form onSubmit={save}>
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat] || { label: cat, desc: '' };
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
                      <label>{labelFor(s)}</label>
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
    </>
  );
}
