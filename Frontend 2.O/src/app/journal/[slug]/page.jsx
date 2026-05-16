'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import { SkeletonText } from '@/components/ui/Skeleton';
import Button from '@/components/ui/Button';
import CTA from '@/components/home/CTA';
import { blogAPI, resolveImage, toArrayField } from '@/services/api';
import { normalizeContentForDisplay } from '@/utils/contentNormalizer';

const formatDate = (v) => {
  if (!v) return '';
  try { return new Date(v).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' }); } catch { return ''; }
};

const titleCase = (s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const asArray = toArrayField;

const applySEO = (data) => {
  if (typeof document === 'undefined' || !data) return;
  const title = data.seoTitle || data.title;
  if (title) document.title = `${title} — Illusio Designs`;
  if (data.metaDescription) {
    let el = document.head.querySelector('meta[name="description"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', 'description');
      document.head.appendChild(el);
    }
    el.setAttribute('content', data.metaDescription);
  }
};

export default function JournalDetailPage({ params }) {
  const slug = params?.slug;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let m = true;
    blogAPI
      .getBySlugPublic(slug)
      .then((data) => {
        if (!m) return;
        if (!data) {
          setError(true);
          return;
        }
        const next = {
          title: data.title,
          category: data.category || 'Article',
          image: resolveImage(data.image) || null,
          date: formatDate(data.publishedAt || data.publishDate || data.createdAt || data.date),
          author: data.author || '',
          tags: asArray(data.tags),
          content: data.content || data.body || '',
          seoTitle: data.seoTitle,
          metaDescription: data.metaDescription,
        };
        setPost(next);
        applySEO(next);
      })
      .catch(() => setError(true))
      .finally(() => { if (m) setLoading(false); });
    return () => { m = false; };
  }, [slug]);

  const safeHTML = post?.content
    ? DOMPurify.sanitize(normalizeContentForDisplay(post.content))
    : '';

  const fallbackTitle = slug ? titleCase(slug) : 'Journal';

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Journal', href: '/journal' }, { label: post?.title || fallbackTitle }]}
          eyebrow={post?.category || 'Article'}
          title={post?.title || fallbackTitle}
        />

        {post?.image ? (
          <section style={{ padding: '20px 0 40px' }}>
            <Container>
              <div className="service-cover">
                <Image src={post.image} alt={post.title} width={1400} height={780} />
              </div>
            </Container>
          </section>
        ) : null}

        <section style={{ padding: '40px 0 60px' }}>
          <Container>
            {loading ? (
              <SkeletonText lines={7} />
            ) : error || !post ? (
              <div className="empty-state">
                <h3>We couldn&apos;t find this article</h3>
                <p>It may have been moved. <Link href="/journal">Browse the journal</Link> or <Link href="/contact">get in touch</Link>.</p>
              </div>
            ) : (
              <div className="detail-grid">
                <article className="detail-content prose">
                  {safeHTML ? (
                    <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
                  ) : (
                    <p>This post is being prepared. Meanwhile, browse the rest of our writing or <Link href="/contact">get in touch</Link>.</p>
                  )}
                </article>

                <aside className="detail-aside">
                  <div className="detail-aside-card">
                    {post.author ? (
                      <div className="detail-meta-row">
                        <small>Written by</small>
                        <strong>{post.author}</strong>
                      </div>
                    ) : null}
                    {post.date ? (
                      <div className="detail-meta-row">
                        <small>Published</small>
                        <strong>{post.date}</strong>
                      </div>
                    ) : null}
                    {post.tags?.length ? (
                      <div className="detail-meta-row">
                        <small>Tags</small>
                        <div className="detail-meta-chips">
                          {post.tags.map((t) => <span key={t}>{t}</span>)}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </aside>
              </div>
            )}
          </Container>
        </section>

        <section style={{ padding: '0 0 60px' }}>
          <Container>
            <Button href="/journal" variant="ghost" size="sm" icon={false}>← All articles</Button>
          </Container>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
