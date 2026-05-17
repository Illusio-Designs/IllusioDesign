'use client';

import { useEffect, useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import Button from '@/components/ui/Button';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useToast } from '@/components/providers/Toaster';
import { contentAPI, cleanText } from '@/services/api';
import { normalizeBrTags } from '@/utils/contentNormalizer';

const emptyForm = () => ({
  key: '',
  title: '',
  type: 'section',
  body: '',
  metaTitle: '',
  metaDescription: '',
  metaKeywords: '',
  status: 'published',
  order: 0,
});

const sanitize = (html) =>
  DOMPurify.sanitize(normalizeBrTags(html || ''), {
    ADD_TAGS: ['iframe', 'video', 'audio', 'source'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'controls', 'target'],
  });

const lockIcon = (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default function DashboardContent() {
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
    contentAPI.getAll()
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
    setForm(emptyForm());
    setEditing('new');
  };

  const startEdit = (r) => {
    setForm({
      key: r.key || '',
      title: r.title || '',
      type: r.type || 'section',
      body: r.body || '',
      metaTitle: r.metaTitle || '',
      metaDescription: r.metaDescription || '',
      metaKeywords: r.metaKeywords || '',
      status: r.status || 'published',
      order: r.order ?? 0,
    });
    setEditing(r);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.key.trim()) {
      push({ tone: 'error', title: 'Key required', body: 'Give the content block a unique key.' });
      return;
    }
    setSaving(true);
    const payload = {
      key: form.key.trim(),
      title: form.title.trim(),
      type: form.type.trim() || 'section',
      body: sanitize(form.body),
      metaTitle: form.metaTitle.trim(),
      metaDescription: form.metaDescription.trim(),
      metaKeywords: form.metaKeywords.trim(),
      status: form.status,
      order: Number(form.order) || 0,
    };
    try {
      if (editing === 'new') {
        await contentAPI.create(payload);
      } else {
        await contentAPI.update(editing.id, payload);
      }
      push({ tone: 'success', title: 'Content saved', body: `“${payload.key}” is updated.` });
      setEditing(null);
      load();
    } catch (err) {
      push({ tone: 'error', title: 'Could not save', body: err?.message || 'Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (r) => {
    if (!window.confirm(`Delete content block “${r.key}”? This cannot be undone.`)) return;
    try {
      await contentAPI.remove(r.id);
      push({ tone: 'success', title: 'Deleted', body: `“${r.key}” was removed.` });
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
            <span className="page-eyebrow">Content</span>
            <h1>{isNew ? 'New content block' : `Edit “${editing.key}”`}</h1>
            <p>Reusable content block surfaced on the public site by its key.</p>
          </div>
          <Button variant="light" size="sm" icon={false} onClick={() => setEditing(null)}>← Back to list</Button>
        </div>

        <form onSubmit={submit}>
          <section className="dash-card">
            <header className="dash-card-head"><div><h3>Details</h3><span>Identify and label this block</span></div></header>
            <div className="dash-card-body">
              <div className="field">
                <label>Key *</label>
                <input value={form.key} onChange={set('key')} placeholder="e.g. home-hero, about-intro" disabled={!isNew} />
                <span className="field-hint">
                  {isNew ? 'Unique slug used to fetch this block. It cannot be changed later.' : 'The key is fixed once a block is created.'}
                </span>
              </div>
              <div className="field">
                <label>Title</label>
                <input value={form.title} onChange={set('title')} placeholder="Human-readable title" />
              </div>
              <div className="field">
                <label>Type</label>
                <input value={form.type} onChange={set('type')} placeholder="section" />
                <span className="field-hint">e.g. section, hero, banner, faq.</span>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Status</label>
                  <select value={form.status} onChange={set('status')}>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div className="field">
                  <label>Order</label>
                  <input type="number" value={form.order} onChange={set('order')} />
                  <span className="field-hint">Lower numbers appear first.</span>
                </div>
              </div>
            </div>
          </section>

          <section className="dash-card">
            <header className="dash-card-head"><div><h3>Body</h3><span>Rich content for this block</span></div></header>
            <div className="dash-card-body">
              <RichTextEditor
                value={form.body}
                onChange={(v) => setForm((p) => ({ ...p, body: v }))}
                placeholder="Write the content — headings, lists, links…"
                minHeight={320}
              />
            </div>
          </section>

          <section className="dash-card">
            <header className="dash-card-head"><div><h3>SEO metadata</h3><span>Optional — used when this block backs a page</span></div></header>
            <div className="dash-card-body">
              <div className="field">
                <label>Meta title</label>
                <input value={form.metaTitle} onChange={set('metaTitle')} placeholder="Search-result title" />
              </div>
              <div className="field">
                <label>Meta description</label>
                <textarea value={form.metaDescription} onChange={set('metaDescription')} placeholder="Short summary shown under the title in search results" />
              </div>
              <div className="field">
                <label>Meta keywords</label>
                <input value={form.metaKeywords} onChange={set('metaKeywords')} placeholder="Comma separated" />
              </div>
            </div>
          </section>

          <div className="dash-form-actions">
            <Button variant="light" size="sm" icon={false} type="button" onClick={() => setEditing(null)}>Cancel</Button>
            <Button variant="primary" size="sm" icon={false} type="submit" disabled={saving}>
              {saving ? 'Saving…' : isNew ? 'Create content' : 'Save changes'}
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
          <span className="page-eyebrow">Content</span>
          <h1>Content management</h1>
          <p>{records.length} content {records.length === 1 ? 'block' : 'blocks'}.</p>
        </div>
        {!authError ? (
          <Button variant="primary" size="sm" icon={false} onClick={startCreate}>New content</Button>
        ) : null}
      </div>

      <section className="dash-card">
        <header className="dash-card-head">
          <div><h3>Content blocks</h3><span>Reusable blocks keyed by slug</span></div>
        </header>

        {loading ? (
          <SkeletonTable rows={5} cols={6} />
        ) : authError ? (
          <div className="dash-empty">
            <div className="dash-empty-icon" aria-hidden>{lockIcon}</div>
            <h3>Sign in to manage content</h3>
            <p>Content management is a protected endpoint. Connect an authenticated admin session to add or edit blocks.</p>
          </div>
        ) : records.length === 0 ? (
          <div className="dash-empty">
            <div className="dash-empty-icon" aria-hidden>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 5h16M4 12h16M4 19h10" />
              </svg>
            </div>
            <h3>No content blocks yet</h3>
            <p>Create your first reusable content block to surface it on the public site.</p>
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr><th>Key</th><th>Title</th><th>Type</th><th>Status</th><th>Order</th><th /></tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.key}</strong></td>
                  <td>{cleanText(r.title) || <span style={{ color: 'var(--muted)' }}>—</span>}</td>
                  <td>{r.type || 'section'}</td>
                  <td>
                    <span className={`kit-badge kit-badge-${r.status === 'published' ? 'success' : 'info'}`}>
                      <span className="dot" />{r.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>{r.order ?? 0}</td>
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
