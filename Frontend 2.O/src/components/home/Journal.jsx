'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import MagneticButton from '@/components/ui/MagneticButton';
import { blogAPI, resolveImage } from '@/services/api';

const fallback = [
  {
    id: 'b1',
    slug: 'designing-landing-pages-that-convert',
    title: 'Designing landing pages that actually convert in 2026.',
    image: '/images/digitalmarketing.webp',
    date: 'May 04, 2026',
    category: 'Growth',
  },
  {
    id: 'b2',
    slug: 'practical-ux-audit-checklist',
    title: 'A practical UX audit checklist for product teams.',
    image: '/images/web&app.webp',
    date: 'April 22, 2026',
    category: 'UX',
  },
  {
    id: 'b3',
    slug: 'design-systems-from-day-one',
    title: 'How we build scalable design systems from day one.',
    image: '/images/Branding&Designing.webp',
    date: 'April 10, 2026',
    category: 'Systems',
  },
];

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
  const [posts, setPosts] = useState(fallback);

  useEffect(() => {
    let mounted = true;
    blogAPI
      .getAllPublic()
      .then((items) => {
        if (!mounted || !items?.length) return;
        const mapped = items
          .filter(Boolean)
          .slice(0, 3)
          .map((p) => ({
            id: p.id,
            slug: p.slug || p.id,
            title: p.title,
            image: resolveImage(p.image) || fallback[0].image,
            date: formatDate(p.publishedAt || p.createdAt),
            category: p.category || 'Journal',
          }));
        if (mapped.length) setPosts(mapped);
      })
      .catch(() => {});
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
            title={<>Notes on design,<br /> craft and <em>growth.</em></>}
          />
          <MagneticButton strength={0.18}>
            <Button href="#blog" variant="light" size="md">
              All articles
            </Button>
          </MagneticButton>
        </div>

        <motion.div
          className="blog-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {posts.map((post, i) => (
            <motion.div key={post.id} variants={cardVariant}>
              <Link href={`#${post.slug}`} className={`blog-card ${i === 0 ? 'is-feature' : ''}`}>
                <div className="blog-thumb">
                  <Image src={post.image} alt={post.title} width={680} height={460} />
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
      </Container>
    </section>
  );
}
