'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { SkeletonCards } from '@/components/ui/Skeleton';
import { caseStudyAPI, resolveImage } from '@/services/api';

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function RelatedWork({ category, heading = 'Related projects' }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let m = true;
    caseStudyAPI
      .getAllPublic(category)
      .then((list) => {
        if (!m) return;
        const mapped = (Array.isArray(list) ? list : [])
          .filter(Boolean)
          .slice(0, 3)
          .map((p) => ({
            id: p.id,
            title: p.title,
            category: p.category || 'Case Study',
            image: resolveImage(p.image),
          }));
        setItems(mapped);
      })
      .catch(() => {})
      .finally(() => { if (m) setLoading(false); });
    return () => { m = false; };
  }, [category]);

  if (!loading && items.length === 0) return null;

  return (
    <section style={{ padding: '40px 0 20px' }}>
      <Container>
        <div className="related-head">
          <div>
            <span className="related-eyebrow">Selected work</span>
            <h2 className="section-title">{heading}</h2>
          </div>
          <Button href="/work" variant="light" size="md">All case studies</Button>
        </div>

        {loading ? (
          <SkeletonCards count={3} height={320} />
        ) : (
        <motion.div
          className="related-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {items.map((p, i) => (
            <motion.div key={i} variants={cardVariant}>
              <Link href={`/work/${p.id}`} className="related-card">
                <div className="related-media">
                  {p.image ? (
                    <Image src={p.image} alt={p.title} width={640} height={480} />
                  ) : (
                    <span className="thumb-empty" aria-hidden />
                  )}
                  <span className="related-tag">{p.category}</span>
                  <span className="related-index">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="related-info">
                  <h3>{p.title}</h3>
                  <span className="related-go">
                    View case study
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
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
