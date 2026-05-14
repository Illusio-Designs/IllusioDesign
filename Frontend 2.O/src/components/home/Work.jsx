'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import MagneticButton from '@/components/ui/MagneticButton';
import { caseStudyAPI, resolveImage } from '@/services/api';

const fallback = [
  { id: 'f1', title: 'Amrut App', tag: 'Mobile App', image: '/images/Amrut App.webp' },
  { id: 'f2', title: 'Aicumen AI', tag: 'SaaS Platform', image: '/images/aicumen-ai.webp' },
  { id: 'f3', title: 'Crosscoin', tag: 'Fintech', image: '/images/crosscoin.webp' },
  { id: 'f4', title: 'Flowline', tag: 'Dashboard', image: '/images/flowline.webp' },
];

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Work() {
  const [projects, setProjects] = useState(fallback);

  useEffect(() => {
    let mounted = true;
    caseStudyAPI
      .getAllPublic()
      .then((items) => {
        if (!mounted || !items?.length) return;
        const mapped = items
          .filter(Boolean)
          .slice(0, 4)
          .map((p) => ({
            id: p.id,
            slug: p.seoUrl || p.slug || p.id,
            title: p.title,
            tag: p.category || 'Case Study',
            image: resolveImage(p.image) || fallback[0].image,
          }));
        if (mapped.length) setProjects(mapped);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="work" id="work">
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, marginBottom: 60, flexWrap: 'wrap' }}>
          <SectionHeader
            eyebrow="Selected work"
            index="02"
            title={<>Recent projects<br /> we&apos;re <em>proud of.</em></>}
            className="section-header-flush"
          />
          <MagneticButton strength={0.18}>
            <Button href="#contact" variant="light" size="md">
              All projects
            </Button>
          </MagneticButton>
        </div>

        <motion.div
          className="work-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {projects.map((project) => (
            <motion.article key={project.id} className="work-card" variants={cardVariant}>
              <Link href={project.slug ? `#work-${project.id}` : '#contact'} className="work-thumb">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={720}
                  height={540}
                />
                <span className="work-arrow" aria-hidden>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H8M17 7V16" />
                  </svg>
                </span>
              </Link>
              <div className="work-meta">
                <h3>{project.title}</h3>
                <span className="work-category">{project.tag}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
