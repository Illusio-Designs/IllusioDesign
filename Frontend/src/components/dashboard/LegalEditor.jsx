'use client';

import { useEffect, useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import Button from '@/components/ui/Button';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { SkeletonText } from '@/components/ui/Skeleton';
import { useToast } from '@/components/providers/Toaster';
import { normalizeBrTags } from '@/utils/contentNormalizer';

const hasText = (html) => String(html).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim().length > 0;

/**
 * Shared CMS editor for the Privacy Policy and Terms of Service documents.
 * Both are single HTML documents stored behind matching admin endpoints.
 */
export default function LegalEditor({ api, eyebrow, title, subtitle, publicHref }) {
  const [recordId, setRecordId] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [updatedAt, setUpdatedAt] = useState('');
  const { push } = useToast();

  useEffect(() => {
    let m = true;
    api.getAll()
      .then((list) => {
        if (!m) return;
        setAuthError(false);
        const doc = (Array.isArray(list) ? list : []).filter(Boolean)[0];
        if (doc) {
          setRecordId(doc.id || doc._id || null);
          setContent(doc.content || '');
          const ts = doc.updatedAt || doc.lastUpdated || doc.createdAt;
          if (ts) {
            try {
              setUpdatedAt(new Date(ts).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
            } catch {}
          }
        }
      })
      .catch((err) => {
        if (!m) return;
        if (err?.status === 401 || err?.status === 403) setAuthError(true);
      })
      .finally(() => { if (m) setLoading(false); });
    return () => { m = false; };
  }, [api]);

  const save = async (e) => {
    e.preventDefault();
    if (!hasText(content)) {
      push({ tone: 'error', title: 'Nothing to save', body: 'Add some content first.' });
      return;
    }
    setSaving(true);
    const payload = {
      content: DOMPurify.sanitize(normalizeBrTags(content), {
        ADD_TAGS: ['iframe', 'video', 'audio', 'source'],
        ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'controls', 'target'],
      }),
    };
    try {
      if (recordId) {
        await api.update(recordId, payload);
      } else {
        const created = await api.create(payload);
        const id = created?.data?.id || created?.id || created?._id;
        if (id) setRecordId(id);
      }
      setUpdatedAt(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
      push({ tone: 'success', title: 'Saved', body: `${title} published to the live site.` });
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
          <span className="page-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{updatedAt ? `Last updated ${updatedAt}` : subtitle}</p>
        </div>
        {publicHref ? (
          <Button href={publicHref} variant="light" size="sm" icon={false}>View live page</Button>
        ) : null}
      </div>

      {authError ? (
        <section className="dash-card">
          <div className="dash-empty">
            <div className="dash-empty-icon" aria-hidden>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3>Sign in to edit this document</h3>
            <p>This editor writes to a protected endpoint. Connect an authenticated admin session to make changes.</p>
          </div>
        </section>
      ) : (
        <section className="dash-card">
          <header className="dash-card-head">
            <div>
              <h3>Content</h3>
              <span>Format with the toolbar — saving publishes to the live page</span>
            </div>
          </header>
          <form className="dash-card-body" onSubmit={save}>
            {loading ? (
              <SkeletonText lines={10} />
            ) : (
              <>
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Write the document — use the toolbar for headings, lists and links…"
                  minHeight={420}
                />
                <div>
                  <Button variant="primary" size="sm" icon={false} type="submit" disabled={saving}>
                    {saving ? 'Saving…' : recordId ? 'Save changes' : 'Publish document'}
                  </Button>
                </div>
              </>
            )}
          </form>
        </section>
      )}
    </>
  );
}
