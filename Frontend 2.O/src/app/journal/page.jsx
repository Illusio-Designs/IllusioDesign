'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Pagination from '@/components/ui/Pagination';
import { SkeletonCards } from '@/components/ui/Skeleton';
import CTA from '@/components/home/CTA';
import useSEO from '@/hooks/useSEO';
import { blogAPI, resolveImage } from '@/services/api';
import { toSlug } from '@/utils/urlSlug';

const formatDate = (v) => {
  if (!v) return '';
  try { return new Date(v).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' }); } catch { return ''; }
};

const PAGE_SIZE = 6;

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function JournalPage() {
  useSEO('blog');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let m = true;
    blogAPI.getAllPublic()
      .then((items) => {
        if (!m) return;
        const mapped = (items || []).filter(Boolean).map((p) => ({
          id: p.id,
          slug: p.slug || p.seoUrl || toSlug(p.title) || String(p.id),
          title: p.title,
          category: p.category || 'Article',
          image: resolveImage(p.image) || '/images/digitalmarketing.webp',
          date: formatDate(p.publishedAt || p.publishDate || p.createdAt || p.date),
          summary: p.summary || p.excerpt || '',
        }));
        setPosts(mapped);
      })
      .catch(() => {})
      .finally(() => { if (m) setLoading(false); });
    return () => { m = false; };
  }, []);

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const visible = useMemo(
    () => posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [posts, page],
  );

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Journal' }]}
          eyebrow="From the studio"
          title={<>Notes on design,<br /> craft and <em>growth.</em></>}
          description="Working playbooks, opinionated takes, and the things we wish we knew earlier."
        />

        <section style={{ padding: '20px 0 80px' }}>
          <Container>
            {loading ? (
              <SkeletonCards count={6} height={220} />
            ) : visible.length === 0 ? (
              <div className="empty-state">
                <h3>No articles yet</h3>
                <p>Check back soon — we&apos;re writing in the open.</p>
              </div>
            ) : (
              <motion.div
                className="journal-grid"
                key={page}
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
              >
                {visible.map((post) => (
                  <motion.div key={post.id} variants={cardVariant}>
                    <Link href={`/journal/${post.slug}`} className="journal-card">
                      <div className="journal-thumb">
                        <Image src={post.image} alt={post.title} width={520} height={360} />
                      </div>
                      <div className="journal-body">
                        <div className="journal-meta">
                          <span className="pill">{post.category}</span>
                          {post.date ? <span>{post.date}</span> : null}
                        </div>
                        <h3>{post.title}</h3>
                        {post.summary ? <p>{post.summary}</p> : null}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {totalPages > 1 ? (
              <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
                <Pagination page={page} total={totalPages} onChange={setPage} />
              </div>
            ) : null}
          </Container>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
