'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import { SkeletonText } from '@/components/ui/Skeleton';
import Button from '@/components/ui/Button';
import Tag from '@/components/ui/Tag';
import CTA from '@/components/home/CTA';
import { caseStudyAPI, resolveImage, toArrayField, cleanText } from '@/services/api';
import { normalizeContentForDisplay } from '@/utils/contentNormalizer';

const titleCase = (s = '') => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const asArray = toArrayField;

// Parse an images field: array of strings, array of objects, or JSON string.
const parseImages = (raw) => {
  let list = raw;
  if (typeof raw === 'string') {
    const s = raw.trim();
    if (s.startsWith('[')) {
      try { list = JSON.parse(s); } catch { list = s.split(','); }
    } else {
      list = s ? s.split(',') : [];
    }
  }
  if (!Array.isArray(list)) list = list ? [list] : [];
  return list
    .map((it) => {
      if (!it) return null;
      if (typeof it === 'string') return resolveImage(cleanText(it));
      if (typeof it === 'object') {
        return resolveImage(it.url || it.path || it.image || it.src || '');
      }
      return null;
    })
    .filter(Boolean);
};

const renderResults = (results) => {
  if (!results) return '';
  if (Array.isArray(results)) {
    return `<ul>${results.map((r) => `<li>${r}</li>`).join('')}</ul>`;
  }
  if (typeof results === 'string') {
    const trimmed = results.trim();
    return trimmed.startsWith('<') ? trimmed : `<p>${trimmed}</p>`;
  }
  return '';
};

const applySEO = (data) => {
  if (typeof document === 'undefined' || !data) return;
  const title = data.seoTitle || data.title;
  if (title) document.title = `${title} — Illusio Designs`;
  if (data.metaDescription || data.description) {
    let el = document.head.querySelector('meta[name="description"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', 'description');
      document.head.appendChild(el);
    }
    el.setAttribute('content', data.metaDescription || data.description);
  }
};

export default function WorkDetailPage({ params }) {
  const slug = params?.slug;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let m = true;
    caseStudyAPI
      .getByIdPublic(slug)
      .then((d) => {
        if (!m) return;
        if (!d) {
          setError(true);
          return;
        }
        const cover = resolveImage(d.image) || null;
        const gallery = parseImages(d.additionalImages)
          // drop the cover image if it also appears in the gallery
          .filter((src) => src && src !== cover)
          // drop duplicates within the gallery itself
          .filter((src, idx, arr) => arr.indexOf(src) === idx);

        const next = {
          title: d.title,
          category: d.category || 'Project',
          description: d.description || '',
          image: cover,
          challenges: d.challenges || '',
          solution: d.solution || '',
          results: d.results || '',
          conclusion: d.conclusion || '',
          clientName: d.clientName || d.client || '',
          industry: d.industry || '',
          location: d.location || '',
          duration: d.duration || '',
          services: asArray(d.services),
          techStack: asArray(d.techStack || d.technologies),
          tags: asArray(d.tags),
          additionalImages: gallery,
          link: d.link || null,
          seoTitle: d.seoTitle,
          metaDescription: d.metaDescription,
        };
        setProject(next);
        applySEO(next);
      })
      .catch(() => setError(true))
      .finally(() => { if (m) setLoading(false); });
    return () => { m = false; };
  }, [slug]);

  const safe = useMemo(() => {
    if (!project) return null;
    return {
      description: DOMPurify.sanitize(normalizeContentForDisplay(project.description)),
      challenges: DOMPurify.sanitize(normalizeContentForDisplay(project.challenges)),
      solution: DOMPurify.sanitize(normalizeContentForDisplay(project.solution)),
      results: DOMPurify.sanitize(normalizeContentForDisplay(renderResults(project.results))),
      conclusion: DOMPurify.sanitize(normalizeContentForDisplay(project.conclusion)),
    };
  }, [project]);

  const fallbackTitle = slug ? titleCase(slug) : 'Case study';

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Work', href: '/work' }, { label: project?.title || fallbackTitle }]}
          eyebrow={project?.industry || project?.category || 'Project'}
          title={project?.title || fallbackTitle}
        />

        {project?.image ? (
          <section style={{ padding: '20px 0 40px' }}>
            <Container>
              <div className="service-cover">
                <Image src={project.image} alt={project.title} width={1400} height={780} />
              </div>
            </Container>
          </section>
        ) : null}

        <section style={{ padding: '40px 0 60px' }}>
          <Container>
            {loading ? (
              <SkeletonText lines={6} />
            ) : error || !project ? (
              <div className="empty-state">
                <h3>We couldn&apos;t find this project</h3>
                <p>It may have been moved. <Link href="/work">Browse all work</Link> or <Link href="/contact">get in touch</Link>.</p>
              </div>
            ) : (
              <div className="detail-grid">
                <article className="detail-content prose">
                  {safe.description ? (
                    <div dangerouslySetInnerHTML={{ __html: safe.description }} />
                  ) : null}

                  {safe.challenges ? (
                    <div dangerouslySetInnerHTML={{ __html: safe.challenges }} />
                  ) : null}

                  {project.tags?.length ? (
                    <div className="article-tags">
                      {project.tags.map((t) => (
                        <Tag key={t} tone="soft" size="sm">{t}</Tag>
                      ))}
                    </div>
                  ) : null}
                </article>

                <aside className="detail-aside">
                  <div className="detail-aside-card">
                    {project.clientName ? (
                      <div className="detail-meta-row">
                        <small>Client</small>
                        <strong>{project.clientName}</strong>
                      </div>
                    ) : null}
                    {project.location ? (
                      <div className="detail-meta-row">
                        <small>Location</small>
                        <strong>{project.location}</strong>
                      </div>
                    ) : null}
                    {project.duration ? (
                      <div className="detail-meta-row">
                        <small>Duration</small>
                        <strong>{project.duration}</strong>
                      </div>
                    ) : null}
                    {project.services?.length ? (
                      <div className="detail-meta-row">
                        <small>Services</small>
                        <div className="detail-meta-chips">
                          {project.services.map((s) => <span key={s}>{s}</span>)}
                        </div>
                      </div>
                    ) : null}
                    {project.techStack?.length ? (
                      <div className="detail-meta-row">
                        <small>Tech stack</small>
                        <div className="detail-meta-chips">
                          {project.techStack.map((t) => <span key={t}>{t}</span>)}
                        </div>
                      </div>
                    ) : null}
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm" style={{ marginTop: 8 }}>
                        Visit project
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M17 7H8M17 7V16" /></svg>
                      </a>
                    ) : null}
                  </div>
                </aside>
              </div>
            )}
          </Container>
        </section>

        {project?.additionalImages?.length ? (
          <section style={{ padding: '20px 0 60px' }}>
            <Container>
              <div className="detail-gallery">
                {project.additionalImages.map((src) => (
                  <div key={src} className="detail-gallery-cell">
                    <Image src={src} alt="" width={900} height={620} />
                  </div>
                ))}
              </div>
            </Container>
          </section>
        ) : null}

        {project && (safe?.solution || safe?.results) ? (
          <section style={{ padding: '40px 0 60px' }}>
            <Container>
              <div className="cs-panels">
                {safe.solution ? (
                  <div className="cs-panel">
                    <div
                      className="cs-panel-body prose"
                      dangerouslySetInnerHTML={{ __html: safe.solution }}
                    />
                  </div>
                ) : null}
                {safe.results ? (
                  <div className="cs-panel cs-panel-results">
                    <div
                      className="cs-panel-body prose"
                      dangerouslySetInnerHTML={{ __html: safe.results }}
                    />
                  </div>
                ) : null}
              </div>
            </Container>
          </section>
        ) : null}

        {project && safe?.conclusion ? (
          <section style={{ padding: '20px 0 60px' }}>
            <Container size="md">
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: safe.conclusion }}
              />
            </Container>
          </section>
        ) : null}

        <section style={{ padding: '0 0 60px' }}>
          <Container>
            <Button href="/work" variant="ghost" size="sm" icon={false}>← Back to all work</Button>
          </Container>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
