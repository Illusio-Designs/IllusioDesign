'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import ImageField from '@/components/dashboard/ImageField';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useToast } from '@/components/providers/Toaster';
import { seoAPI, cleanText } from '@/services/api';

const PAGES = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About' },
  { key: 'case-study', label: 'Case Studies' },
  { key: 'blog', label: 'Blog' },
  { key: 'career', label: 'Career' },
  { key: 'contact', label: 'Contact' },
];

const emptyForm = () => ({ title: '', description: '', keywords: '', ogImage: null });

export default function DashboardSEO() {
  const [records, setRecords] = useState({});
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [editing, setEditing] = useState(null); // page key being edited
  const [form, setForm] = useState(emptyForm());
  const [existingOg, setExistingOg] = useState('');
  const [exists, setExists] = useState(false);
  const [saving, setSaving] = useState(false);
  const { push } = useToast();

  const load = () => {
    let m = true;
    setLoading(true);
    seoAPI.getAll()
      .then((list) => {
        if (!m) return;
        setAuthError(false);
        const map = {};
        (Array.isArray(list) ? list : []).filter(Boolean).forEach((r) => {
          if (r.page) map[r.page] = r;
        });
        setRecords(map);
      })
      .catch((err) => {
        if (!m) return;
        if (err?.status === 401 || err?.status === 403) setAuthError(true);
        setRecords({});
      })
      .finally(() => { if (m) setLoading(false); });
    return () => { m = false; };
  };

  useEffect(load, []);

  const set = (k) => (e) => {
    const v = e?.target ? e.target.value : e;
    setForm((p) => ({ ...p, [k]: v }));
  };

  const startEdit = (pageKey) => {
    const r = records[pageKey] || null;
    setEditing(pageKey);
    setExists(Boolean(r));
    setForm({
      title: cleanText(r?.title) || '',
      description: cleanText(r?.description) || '',
      keywords: cleanText(r?.keywords) || '',
      ogImage: null,
    });
    setExistingOg(r?.ogImage || '');
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    fd.append('page', editing);
    fd.append('title', form.title.trim());
    fd.append('description', form.description.trim());
    fd.append('keywords', form.keywords.trim());
    if (form.ogImage instanceof File) fd.append('ogImage', form.ogImage);

    try {
      if (exists) await seoAPI.update(editing, fd);
      else await seoAPI.create(fd);
      push({ tone: 'success', title: 'SEO saved', body: `Meta for the ${editing} page is updated.` });
      setEditing(null);
      load();
    } catch (err) {
      push({ tone: 'error', title: 'Could not save', body: err?.message || 'Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  /* ---------- edit view ---------- */
  if (editing) {
    const label = PAGES.find((p) => p.key === editing)?.label || editing;
    return (
      <>
        <div className="dash-page-head">
          <div>
            <span className="page-eyebrow">SEO</span>
            <h1>{label} page meta</h1>
            <p>Title, description and social preview for the public {label.toLowerCase()} page.</p>
          </div>
          <Button variant="light" size="sm" icon={false} onClick={() => setEditing(null)}>← Back to list</Button>
        </div>

        <form onSubmit={submit}>
          <section className="dash-card">
            <header className="dash-card-head"><div><h3>Search metadata</h3><span>Shown in search results &amp; browser tabs</span></div></header>
            <div className="dash-card-body">
              <div className="field">
                <label>Meta title</label>
                <input value={form.title} onChange={set('title')} placeholder={`${label} — Illusio Designs`} />
                <span className="field-hint">Keep under ~60 characters.</span>
              </div>
              <div className="field">
                <label>Meta description</label>
                <textarea value={form.description} onChange={set('description')} placeholder="Short summary shown under the title in search results" />
                <span className="field-hint">Keep under ~160 characters.</span>
              </div>
              <div className="field">
                <label>Meta keywords</label>
                <input value={form.keywords} onChange={set('keywords')} placeholder="Comma separated" />
              </div>
            </div>
          </section>

          <section className="dash-card">
            <header className="dash-card-head"><div><h3>Social preview</h3><span>Open Graph image for shared links</span></div></header>
            <div className="dash-card-body">
              <ImageField
                label="OG image"
                value={form.ogImage}
                existing={existingOg}
                onChange={(f) => setForm((p) => ({ ...p, ogImage: f }))}
                hint="Recommended 1200×630px. Shown when the page is shared on social media."
              />
            </div>
          </section>

          <div className="dash-form-actions">
            <Button variant="light" size="sm" icon={false} type="button" onClick={() => setEditing(null)}>Cancel</Button>
            <Button variant="primary" size="sm" icon={false} type="submit" disabled={saving}>
              {saving ? 'Saving…' : 'Save metadata'}
            </Button>
          </div>
        </form>
      </>
    );
  }

  /* ---------- list view ---------- */
  const setCount = PAGES.filter((p) => records[p.key]).length;

  return (
    <>
      <div className="dash-page-head">
        <div>
          <span className="page-eyebrow">SEO</span>
          <h1>Page meta &amp; SEO</h1>
          <p>{setCount} of {PAGES.length} pages have custom metadata.</p>
        </div>
      </div>

      <section className="dash-card">
        <header className="dash-card-head">
          <div>
            <h3>Pages</h3>
            <span>{PAGES.length} tracked pages</span>
          </div>
        </header>

        {loading ? (
          <SkeletonTable rows={6} cols={4} />
        ) : authError ? (
          <div className="dash-empty">
            <div className="dash-empty-icon" aria-hidden>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </div>
            <h3>Sign in to manage SEO</h3>
            <p>Page metadata is a protected endpoint. Connect an authenticated admin session to edit titles and descriptions.</p>
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr><th>Page</th><th>Meta title</th><th>Meta description</th><th /></tr>
            </thead>
            <tbody>
              {PAGES.map((p) => {
                const r = records[p.key];
                return (
                  <tr key={p.key}>
                    <td><strong>{p.label}</strong></td>
                    <td>{cleanText(r?.title) || <span style={{ color: 'var(--muted)' }}>Not set</span>}</td>
                    <td style={{ maxWidth: 360, whiteSpace: 'normal' }}>
                      {cleanText(r?.description) || <span style={{ color: 'var(--muted)' }}>Not set</span>}
                    </td>
                    <td>
                      <button className="dash-row-action" onClick={() => startEdit(p.key)}>Edit</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}
