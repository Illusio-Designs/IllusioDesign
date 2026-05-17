'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import RichTextEditor from '@/components/ui/RichTextEditor';
import ImageField from '@/components/dashboard/ImageField';
import { SkeletonTable } from '@/components/ui/Skeleton';
import { useDashSearch } from '@/components/dashboard/SearchContext';
import { useToast } from '@/components/providers/Toaster';
import { caseStudyAPI, cleanText, toArrayField } from '@/services/api';

const emptyForm = () => ({
  title: '', year: '', industries: '', services: '', duration: '', link: '',
  category: '', tags: '', techStack: '', location: '', clientName: '',
  description: '', challenges: '', solution: '', results: '', conclusion: '',
  seoTitle: '', metaDescription: '', seoKeywords: '', seoUrl: '',
  image: null,
});

export default function DashboardProjects() {
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
    caseStudyAPI.getAll()
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
    setExistingImage('');
    setMode('form');
  };

  const startEdit = async (row) => {
    setBusy(true);
    try {
      const f = (await caseStudyAPI.getById(row.id)) || row;
      setEditingId(row.id);
      setForm({
        title: cleanText(f.title || f.projectName) || '',
        year: cleanText(f.year) || '',
        industries: cleanText(f.industries || f.industry) || '',
        services: toArrayField(f.services).join(', '),
        duration: cleanText(f.duration) || '',
        link: cleanText(f.link) || '',
        category: cleanText(f.category) || '',
        tags: toArrayField(f.tags).join(', '),
        techStack: toArrayField(f.techStack).join(', '),
        location: cleanText(f.location) || '',
        clientName: cleanText(f.clientName) || '',
        description: f.description || '',
        challenges: f.challenges || '',
        solution: f.solution || '',
        results: f.results || '',
        conclusion: f.conclusion || '',
        seoTitle: cleanText(f.seoTitle) || '',
        metaDescription: cleanText(f.metaDescription) || '',
        seoKeywords: cleanText(f.seoKeywords) || '',
        seoUrl: cleanText(f.seoUrl) || '',
        image: null,
      });
      setExistingImage(f.image || '');
      setMode('form');
    } catch (err) {
      push({ tone: 'error', title: 'Could not open project', body: err?.message || 'Please try again.' });
    } finally {
      setBusy(false);
    }
  };

  const remove = async (row) => {
    if (!window.confirm(`Delete "${cleanText(row.title) || 'this project'}"?`)) return;
    try {
      await caseStudyAPI.remove(row.id);
      push({ tone: 'success', title: 'Project deleted', body: 'The case study has been removed.' });
      setRows((p) => p.filter((r) => r.id !== row.id));
    } catch (err) {
      push({ tone: 'error', title: 'Could not delete', body: err?.message || 'Please try again.' });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      push({ tone: 'error', title: 'Title required', body: 'Give the project a title.' });
      return;
    }
    setSaving(true);
    const fd = new FormData();
    const list = (s) => JSON.stringify(String(s).split(',').map((x) => x.trim()).filter(Boolean));
    fd.append('title', form.title.trim());
    fd.append('projectName', form.title.trim());
    fd.append('year', form.year.trim());
    fd.append('industries', form.industries.trim());
    fd.append('industry', form.industries.trim());
    fd.append('services', list(form.services));
    fd.append('duration', form.duration.trim());
    fd.append('link', form.link.trim());
    fd.append('category', form.category.trim());
    fd.append('tags', list(form.tags));
    fd.append('techStack', list(form.techStack));
    fd.append('location', form.location.trim());
    fd.append('clientName', form.clientName.trim());
    fd.append('description', form.description);
    fd.append('challenges', form.challenges);
    fd.append('solution', form.solution);
    fd.append('results', form.results);
    fd.append('conclusion', form.conclusion);
    fd.append('seoTitle', form.seoTitle.trim());
    fd.append('metaDescription', form.metaDescription.trim());
    fd.append('seoKeywords', form.seoKeywords.trim());
    fd.append('seoUrl', form.seoUrl.trim());
    if (form.image instanceof File) fd.append('image', form.image);

    try {
      if (editingId) {
        await caseStudyAPI.update(editingId, fd);
        push({ tone: 'success', title: 'Project updated', body: 'Your changes are live.' });
      } else {
        await caseStudyAPI.create(fd);
        push({ tone: 'success', title: 'Project published', body: 'The new case study is live.' });
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
    ? rows.filter((r) => `${cleanText(r.title)} ${cleanText(r.category)} ${cleanText(r.clientName)}`.toLowerCase().includes(q))
    : rows;

  /* ---------- form view ---------- */
  if (mode === 'form') {
    return (
      <>
        <div className="dash-page-head">
          <div>
            <span className="page-eyebrow">Project</span>
            <h1>{editingId ? 'Edit project' : 'New project'}</h1>
            <p>{editingId ? 'Update an existing case study.' : 'Add a new case study to the portfolio.'}</p>
          </div>
          <Button variant="light" size="sm" icon={false} onClick={() => setMode('list')}>← Back to list</Button>
        </div>

        <form onSubmit={submit}>
          <section className="dash-card">
            <header className="dash-card-head"><div><h3>Project details</h3><span>Overview &amp; meta</span></div></header>
            <div className="dash-card-body">
              <div className="field-row">
                <div className="field">
                  <label>Title</label>
                  <input value={form.title} onChange={set('title')} placeholder="Project title" />
                </div>
                <div className="field">
                  <label>Client name</label>
                  <input value={form.clientName} onChange={set('clientName')} placeholder="Client" />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Category</label>
                  <input value={form.category} onChange={set('category')} placeholder="e.g. Branding" />
                </div>
                <div className="field">
                  <label>Industry</label>
                  <input value={form.industries} onChange={set('industries')} placeholder="e.g. Fintech" />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Year</label>
                  <input value={form.year} onChange={set('year')} placeholder="2025" />
                </div>
                <div className="field">
                  <label>Duration</label>
                  <input value={form.duration} onChange={set('duration')} placeholder="e.g. 8 weeks" />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Location</label>
                  <input value={form.location} onChange={set('location')} placeholder="City, Country" />
                </div>
                <div className="field">
                  <label>Live link</label>
                  <input value={form.link} onChange={set('link')} placeholder="https://" />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Services</label>
                  <input value={form.services} onChange={set('services')} placeholder="Comma separated" />
                </div>
                <div className="field">
                  <label>Tags</label>
                  <input value={form.tags} onChange={set('tags')} placeholder="Comma separated" />
                </div>
              </div>
              <div className="field">
                <label>Tech stack</label>
                <input value={form.techStack} onChange={set('techStack')} placeholder="Comma separated" />
              </div>
              <ImageField
                label="Cover image"
                value={form.image}
                existing={existingImage}
                onChange={(f) => setForm((p) => ({ ...p, image: f }))}
                hint="Recommended 1600×1000px. JPG or PNG."
              />
            </div>
          </section>

          <section className="dash-card">
            <header className="dash-card-head"><div><h3>Case study content</h3><span>Each section is shown on the project page</span></div></header>
            <div className="dash-card-body">
              {[
                ['description', 'Overview'],
                ['challenges', 'The challenge'],
                ['solution', 'Our solution'],
                ['results', 'Results'],
                ['conclusion', 'Conclusion'],
              ].map(([key, label]) => (
                <div className="field" key={key}>
                  <label>{label}</label>
                  <RichTextEditor
                    value={form[key]}
                    onChange={set(key)}
                    placeholder={`Write the ${label.toLowerCase()}…`}
                    minHeight={200}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="dash-card">
            <header className="dash-card-head"><div><h3>SEO</h3><span>Search-engine metadata</span></div></header>
            <div className="dash-card-body">
              <div className="field">
                <label>Meta title</label>
                <input value={form.seoTitle} onChange={set('seoTitle')} placeholder="Defaults to the project title" />
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
                  <input value={form.seoUrl} onChange={set('seoUrl')} placeholder="project-url" />
                </div>
              </div>
            </div>
          </section>

          <div className="dash-form-actions">
            <Button variant="light" size="sm" icon={false} type="button" onClick={() => setMode('list')}>Cancel</Button>
            <Button variant="primary" size="sm" icon={false} type="submit" disabled={saving}>
              {saving ? 'Saving…' : editingId ? 'Save changes' : 'Publish project'}
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
          <span className="page-eyebrow">Project</span>
          <h1>Case studies</h1>
          <p>{rows.length} {rows.length === 1 ? 'project' : 'projects'} in the portfolio.</p>
        </div>
        {!authError ? (
          <Button variant="primary" size="sm" icon={false} onClick={startNew} disabled={busy}>+ New project</Button>
        ) : null}
      </div>

      <section className="dash-card">
        <header className="dash-card-head">
          <div>
            <h3>All projects</h3>
            <span>{rows.length} total{q ? ` · ${filtered.length} matched` : ''}</span>
          </div>
        </header>

        {loading ? (
          <SkeletonTable rows={6} cols={4} />
        ) : authError ? (
          <div className="dash-empty">
            <div className="dash-empty-icon" aria-hidden>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </div>
            <h3>Sign in to manage projects</h3>
            <p>The portfolio CMS is a protected endpoint. Connect an authenticated admin session to create and edit case studies.</p>
          </div>
        ) : filtered.length ? (
          <table className="dash-table">
            <thead>
              <tr><th>Title</th><th>Category</th><th>Client</th><th /></tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id || i}>
                  <td><strong>{cleanText(r.title) || 'Untitled'}</strong></td>
                  <td><span className="kit-badge kit-badge-info"><span className="dot" />{cleanText(r.category) || 'Case Study'}</span></td>
                  <td>{cleanText(r.clientName) || '—'}</td>
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
            <h3>{q ? 'No projects match your search' : 'No projects yet'}</h3>
            <p>{q ? 'Try a different keyword.' : 'Add your first case study.'}</p>
          </div>
        )}
      </section>
    </>
  );
}
