'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import CTA from '@/components/home/CTA';
import { blogAPI, resolveImage } from '@/services/api';

const fallback = {
  title: 'From the studio',
  category: 'Article',
  image: '/images/digitalmarketing.webp',
  date: '',
  content: '<p>This post is being prepared. Meanwhile, browse the rest of our writing or get in touch — we love a good design conversation.</p>',
};

const formatDate = (v) => {
  if (!v) return '';
  try { return new Date(v).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' }); } catch { return ''; }
};

const titleCase = (s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export default function JournalDetailPage({ params }) {
  const slug = params?.slug;
  const [post, setPost] = useState(null);

  useEffect(() => {
    let m = true;
    blogAPI.getAllPublic().then((items) => {
      if (!m || !items?.length) return;
      const match = items.find((p) => p.slug === slug || String(p.id) === String(slug));
      if (match) {
        setPost({
          title: match.title,
          category: match.category || 'Article',
          image: resolveImage(match.image) || fallback.image,
          date: formatDate(match.publishedAt || match.createdAt),
          content: match.content || match.body || `<p>${match.summary || ''}</p>`,
        });
      }
    }).catch(() => {});
    return () => { m = false; };
  }, [slug]);

  const data = post || { ...fallback, title: slug ? titleCase(slug) : fallback.title };

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Journal', href: '/journal' }, { label: data.title }]}
          eyebrow={data.category}
          title={data.title}
          description={data.date}
        />

        <section style={{ padding: '20px 0 60px' }}>
          <Container>
            <div className="service-cover">
              <Image src={data.image} alt={data.title} width={1400} height={780} />
            </div>
          </Container>
        </section>

        <article style={{ padding: '40px 0 80px' }}>
          <Container size="md">
            <div className="prose" dangerouslySetInnerHTML={{ __html: typeof data.content === 'string' ? data.content : '' }} />
            <p style={{ marginTop: 36 }}>
              <Link href="/journal" className="btn btn-ghost btn-sm">← All articles</Link>
            </p>
          </Container>
        </article>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
