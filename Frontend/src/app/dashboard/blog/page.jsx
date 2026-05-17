'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import RichTextEditor from '@/components/ui/RichTextEditor';
import ImageField from '@/components/dashboard/ImageField';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useDashSearch } from '@/components/dashboard/SearchContext';
import { useToast } from '@/components/providers/Toaster';
import { blogAPI, cleanText } from '@/services/api';
import { toSlug } from '@/utils/urlSlug';

const today = () => new Date().toISOString().split('T')[0];

const emptyForm = () => ({
  title: '', slug: '', category: '', author: '', tags: '',
  publishDate: today(), content: '',
  seoTitle: '', metaDescription: '', seoKeywords: '', seoUrl: '',
  image: null,
});

const formatDate = (v) => {
  if (!v) return '—';
  try { return new Date(v).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }); } catch { return '—'; }
};

export default function DashboardBlog() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [mode, setMode] = useState('list'); // 'list' | 'form'
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [existingImage, setExistingImage] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState(false);
  const { query } = useDashSearch();
  const { push } = useToast();

  const load = () => {
    let m = true;
    setLoading(true);
    blogAPI.getAll()
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
    setForm((p) => {
      const next = { ...p, [k]: v };
      if (k === 'title' && !slugTouched) next.slug = toSlug(v);
      return next;
    });
  };

  const startNew = () => {
    setEditingId(null);
    setForm(emptyForm());
    setExistingImage('');
    setSlugTouched(false);
    setMode('form');
  };

  const startEdit = async (row) => {
    setBusy(true);
    try {
      const full = (await blogAPI.getById(row.id)) || row;
      setEditingId(row.id);
      setForm({
        title: cleanText(full.title) || '',
        slug: full.slug || toSlug(full.title || ''),
        category: cleanText(full.category) || '',
        author: cleanText(full.author) || '',
        tags: Array.isArray(full.tags) ? full.tags.join(', ') : cleanText(full.tags) || '',
        publishDate: (full.publishDate || full.publishedAt || full.date || today()).slice(0, 10),
        content: full.content || '',
        seoTitle: cleanText(full.seoTitle) || '',
        metaDescription: cleanText(full.metaDescription) || '',
        seoKeywords: cleanText(full.seoKeywords) || '',
        seoUrl: cleanText(full.seoUrl) || '',
        image: null,
      });
      setExistingImage(full.image || '');
      setSlugTouched(true);
      setMode('form');
    } catch (err) {
      push({ tone: 'error', title: 'Could not open post', body: err?.message || 'Please try again.' });
    } finally {
      setBusy(false);
    }
  };

  const remove = async (row) => {
    if (!window.confirm(`Delete "${cleanText(row.title) || 'this post'}"?`)) return;
    try {
      await blogAPI.remove(row.id);
      push({ tone: 'success', title: 'Post deleted', body: 'The article has been removed.' });
      setRows((p) => p.filter((r) => r.id !== row.id));
    } catch (err) {
      push({ tone: 'error', title: 'Could not delete', body: err?.message || 'Please try again.' });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      push({ tone: 'error', title: 'Title required', body: 'Give the post a title.' });
      return;
    }
    setSaving(true);
    const fd = new FormData();
    const slug = form.slug.trim() || toSlug(form.title);
    fd.append('title', form.title.trim());
    fd.append('slug', slug);
    fd.append('seoUrl', form.seoUrl.trim() || slug);
    fd.append('category', form.category.trim());
    fd.append('author', form.author.trim());
    fd.append('tags', form.tags.trim());
    fd.append('date', form.publishDate);
    fd.append('publishDate', form.publishDate);
    fd.append('content', form.content);
    fd.append('seoTitle', form.seoTitle.trim());
    fd.append('metaDescription', form.metaDescription.trim());
    fd.append('seoKeywords', form.seoKeywords.trim());
    if (form.image instanceof File) fd.append('image', form.image);

    try {
      if (editingId) {
        await blogAPI.update(editingId, fd);
        push({ tone: 'success', title: 'Post updated', body: 'Your changes are live.' });
      } else {
        await blogAPI.create(fd);
        push({ tone: 'success', title: 'Post published', body: 'The new article is live.' });
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
    ? rows.filter((r) => `${cleanText(r.title)} ${cleanText(r.category)} ${cleanText(r.author)}`.toLowerCase().includes(q))
    : rows;

  /* ---------- form view ---------- */
  if (mode === 'form') {
    return (
      <>
        <div className="dash-page-head">
          <div>
            <span className="page-eyebrow">Blog</span>
            <h1>{editingId ? 'Edit post' : 'New post'}</h1>
            <p>{editingId ? 'Update an existing journal article.' : 'Write and publish a new journal article.'}</p>
          </div>
          <Button variant="light" size="sm" icon={false} onClick={() => setMode('list')}>← Back to list</Button>
        </div>

        <form onSubmit={submit}>
          <section className="dash-card">
            <header className="dash-card-head"><div><h3>Post details</h3><span>The essentials</span></div></header>
            <div className="dash-card-body">
              <div className="field-row">
                <div className="field">
                  <label>Title</label>
                  <input value={form.title} onChange={set('title')} placeholder="Article title" />
                </div>
                <div className="field">
                  <label>Slug</label>
                  <input value={form.slug} onChange={(e) => { setSlugTouched(true); set('slug')(e); }} placeholder="article-slug" />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Category</label>
                  <input value={form.category} onChange={set('category')} placeholder="e.g. Design" />
                </div>
                <div className="field">
                  <label>Author</label>
                  <input value={form.author} onChange={set('author')} placeholder="Author name" />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Tags</label>
                  <input value={form.tags} onChange={set('tags')} placeholder="Comma separated" />
                </div>
                <div className="field">
                  <label>Publish date</label>
                  <input type="date" value={form.publishDate} onChange={set('publishDate')} />
                </div>
              </div>
              <ImageField
                value={form.image}
                existing={existingImage}
                onChange={(f) => setForm((p) => ({ ...p, image: f }))}
                hint="Recommended 1200×800px. JPG or PNG."
              />
            </div>
          </section>

          <section className="dash-card">
            <header className="dash-card-head"><div><h3>Content</h3><span>The article body</span></div></header>
            <div className="dash-card-body">
              <RichTextEditor value={form.content} onChange={set('content')} placeholder="Write the article…" minHeight={360} />
            </div>
          </section>

          <section className="dash-card">
            <header className="dash-card-head"><div><h3>SEO</h3><span>Search-engine metadata</span></div></header>
            <div className="dash-card-body">
              <div className="field">
                <label>Meta title</label>
                <input value={form.seoTitle} onChange={set('seoTitle')} placeholder="Defaults to the post title" />
              </div>
              <div className="field">
                <label>Meta description</label>
                <textarea value={form.metaDescription} onChange={set('metaDescription')} placeholder="Short search summary" />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Meta keywords</label>
                  <input value={form.seoKeywords} onChange={set('seoKeywords')} placeholder="Comma separated" />
                </div>
                <div className="field">
                  <label>SEO URL</label>
                  <input value={form.seoUrl} onChange={set('seoUrl')} placeholder="Defaults to the slug" />
                </div>
              </div>
            </div>
          </section>

          <div className="dash-form-actions">
            <Button variant="light" size="sm" icon={false} type="button" onClick={() => setMode('list')}>Cancel</Button>
            <Button variant="primary" size="sm" icon={false} type="submit" disabled={saving}>
              {saving ? 'Saving…' : editingId ? 'Save changes' : 'Publish post'}
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
          <span className="page-eyebrow">Blog</span>
          <h1>Journal posts</h1>
          <p>{rows.length} {rows.length === 1 ? 'article' : 'articles'} in the journal.</p>
        </div>
        {!authError ? (
          <Button variant="primary" size="sm" icon={false} onClick={startNew} disabled={busy}>+ New post</Button>
        ) : null}
      </div>

      <section className="dash-card">
        <header className="dash-card-head">
          <div>
            <h3>All posts</h3>
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
            <h3>Sign in to manage posts</h3>
            <p>The journal CMS is a protected endpoint. Connect an authenticated admin session to create and edit posts.</p>
          </div>
        ) : filtered.length ? (
          <table className="dash-table">
            <thead>
              <tr><th>Title</th><th>Category</th><th>Author</th><th>Published</th><th /></tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id || i}>
                  <td><strong>{cleanText(r.title) || 'Untitled'}</strong></td>
                  <td><span className="kit-badge kit-badge-info"><span className="dot" />{cleanText(r.category) || 'Article'}</span></td>
                  <td>{cleanText(r.author) || '—'}</td>
                  <td>{formatDate(r.publishDate || r.publishedAt || r.date || r.createdAt)}</td>
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
            <h3>{q ? 'No posts match your search' : 'No posts yet'}</h3>
            <p>{q ? 'Try a different keyword.' : 'Publish your first journal article.'}</p>
          </div>
        )}
      </section>
    </>
  );
}
