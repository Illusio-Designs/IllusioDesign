'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import MagneticButton from '@/components/ui/MagneticButton';
import Tag from '@/components/ui/Tag';
import { SkeletonCards } from '@/components/ui/Skeleton';
import { caseStudyAPI, resolveImage } from '@/services/api';

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const tagTones = ['c1', 'c2', 'c3', 'c4', 'c5'];

export default function Work() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    caseStudyAPI
      .getAllPublic()
      .then((items) => {
        if (!mounted) return;
        const mapped = (Array.isArray(items) ? items : [])
          .filter(Boolean)
          .slice(0, 4)
          .map((p) => ({
            id: p.id,
            slug: p.seoUrl || p.slug || p.id,
            title: p.title,
            tag: p.category || 'Case Study',
            image: resolveImage(p.image),
          }));
        setProjects(mapped);
      })
      .catch(() => {})
      .finally(() => { if (mounted) setLoading(false); });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="work" id="work">
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 60, flexWrap: 'wrap' }}>
          <SectionHeader
            eyebrow="Case Studies"
            index="02"
            title={<>Case studies<br /> we&apos;re <em>proud of.</em></>}
            className="section-header-flush"
          />
          <MagneticButton strength={0.18}>
            <Button href="/work" variant="light" size="md">
              All case studies
            </Button>
          </MagneticButton>
        </div>

        {loading ? (
          <SkeletonCards count={4} height={300} />
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <h3>Work coming soon</h3>
            <p>New case studies are on the way.</p>
          </div>
        ) : (
          <motion.div
            className="work-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            {projects.map((project, i) => (
              <motion.article key={i} className="work-card" variants={cardVariant}>
                <Link href={`/work/${project.id}`} className="work-thumb">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={720}
                      height={540}
                    />
                  ) : (
                    <span className="thumb-empty" aria-hidden />
                  )}
                  <span className="work-arrow" aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H8M17 7V16" />
                    </svg>
                  </span>
                </Link>
                <div className="work-meta">
                  <h3>{project.title}</h3>
                  <Tag tone={tagTones[i % tagTones.length]} size="sm">{project.tag}</Tag>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  );
}
