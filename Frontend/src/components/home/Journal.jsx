'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import MagneticButton from '@/components/ui/MagneticButton';
import { SkeletonCards } from '@/components/ui/Skeleton';
import { blogAPI, resolveImage } from '@/services/api';
import { toSlug } from '@/utils/urlSlug';

const formatDate = (value) => {
  if (!value) return '';
  try {
    return new Date(value).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });
  } catch {
    return '';
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Journal() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    blogAPI
      .getAllPublic()
      .then((items) => {
        if (!mounted) return;
        const mapped = (Array.isArray(items) ? items : [])
          .filter(Boolean)
          .slice(0, 3)
          .map((p) => ({
            id: p.id,
            slug: p.slug || p.seoUrl || toSlug(p.title) || String(p.id),
            title: p.title,
            image: resolveImage(p.image),
            date: formatDate(p.publishedAt || p.publishDate || p.createdAt),
            category: p.category || 'Journal',
          }));
        setPosts(mapped);
      })
      .catch(() => {})
      .finally(() => { if (mounted) setLoading(false); });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="blog" id="blog">
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 60, flexWrap: 'wrap' }}>
          <SectionHeader
            eyebrow="From the journal"
            index="06"
            title={<>Digital Growth <em>Hub.</em></>}
          />
          <MagneticButton strength={0.18}>
            <Button href="/journal" variant="light" size="md">
              All articles
            </Button>
          </MagneticButton>
        </div>

        {loading ? (
          <SkeletonCards count={3} height={220} />
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <h3>No articles yet</h3>
            <p>We&apos;re writing in the open — check back soon.</p>
          </div>
        ) : (
          <motion.div
            className="blog-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          >
            {posts.map((post, i) => (
              <motion.div key={i} variants={cardVariant}>
                <Link href={`/journal/${post.slug}`} className="blog-card">
                  <div className="blog-thumb">
                    {post.image ? (
                      <Image src={post.image} alt={post.title} width={680} height={460} />
                    ) : (
                      <span className="thumb-empty" aria-hidden />
                    )}
                  </div>
                  <div className="body">
                    <div className="blog-meta">
                      <span className="pill">{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <span className="more">
                      Read more
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M17 7H8M17 7V16" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  );
}
