'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import CTA from '@/components/home/CTA';
import { blogAPI, resolveImage } from '@/services/api';

const fallback = [
  { id: 'b1', slug: 'designing-landing-pages-that-convert', title: 'Designing landing pages that actually convert in 2026.', category: 'Growth', image: '/images/digitalmarketing.webp', date: 'May 04, 2026', summary: 'Five repeatable patterns we use on every conversion page we ship.' },
  { id: 'b2', slug: 'practical-ux-audit-checklist', title: 'A practical UX audit checklist for product teams.', category: 'UX', image: '/images/web&app.webp', date: 'April 22, 2026', summary: 'A no-fluff checklist you can run in a single afternoon.' },
  { id: 'b3', slug: 'design-systems-from-day-one', title: 'How we build scalable design systems from day one.', category: 'Systems', image: '/images/Branding&Designing.webp', date: 'April 10, 2026', summary: 'Start small, grow on purpose.' },
  { id: 'b4', slug: 'b2b-onboarding-patterns', title: 'B2B onboarding patterns that lift activation.', category: 'UX', image: '/images/b2b.webp', date: 'March 26, 2026', summary: 'What we learned rebuilding onboarding for three SaaS clients.' },
  { id: 'b5', slug: 'rebrand-without-losing-equity', title: 'Rebranding without losing brand equity.', category: 'Brand', image: '/images/nanak-finserv.webp', date: 'March 12, 2026', summary: 'Lessons from refreshing a 30-year-old finance brand.' },
  { id: 'b6', slug: 'designing-for-trust-in-fintech', title: 'Designing for trust in fintech products.', category: 'Fintech', image: '/images/crosscoin.webp', date: 'March 02, 2026', summary: 'Twelve micro-decisions that make a fintech UI feel safe.' },
];

const formatDate = (v) => {
  if (!v) return '';
  try { return new Date(v).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' }); } catch { return ''; }
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function JournalPage() {
  const [posts, setPosts] = useState(fallback);

  useEffect(() => {
    let m = true;
    blogAPI.getAllPublic().then((items) => {
      if (!m || !items?.length) return;
      const mapped = items.filter(Boolean).map((p) => ({
        id: p.id,
        slug: p.slug || p.id,
        title: p.title,
        category: p.category || 'Article',
        image: resolveImage(p.image) || fallback[0].image,
        date: formatDate(p.publishedAt || p.createdAt),
        summary: p.summary || p.excerpt || '',
      }));
      if (mapped.length) setPosts(mapped);
    }).catch(() => {});
    return () => { m = false; };
  }, []);

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

        <section style={{ padding: '20px 0 100px' }}>
          <Container>
            <motion.div
              className="journal-grid"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            >
              {posts.map((post) => (
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
          </Container>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
