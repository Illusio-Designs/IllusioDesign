'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import { SkeletonCards } from '@/components/ui/Skeleton';
import Button from '@/components/ui/Button';
import Tag from '@/components/ui/Tag';
import CTA from '@/components/home/CTA';
import useSEO from '@/hooks/useSEO';
import { caseStudyAPI, resolveImage, toArrayField } from '@/services/api';

const categories = [
  { key: '', label: 'All' },
  { key: 'branding', label: 'Branding & Design' },
  { key: 'web', label: 'Web' },
  { key: 'app', label: 'App' },
  { key: 'b2b', label: 'B2B & Custom Solution' },
];

const colorTones = ['c1', 'c2', 'c3', 'c4', 'c5'];

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function WorkPage() {
  useSEO('case-study');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    let m = true;
    setLoading(true);
    caseStudyAPI.getAllPublic(filter || undefined)
      .then((items) => {
        if (!m) return;
        const mapped = (Array.isArray(items) ? items : []).filter(Boolean).map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category || 'project',
          tags: toArrayField(p.tags),
          clientName: p.clientName || p.client || '',
          location: p.location || '',
          techStack: toArrayField(p.techStack || p.technologies),
          duration: p.duration || '',
          image: resolveImage(p.image),
        }));
        setProjects(mapped);
      })
      .catch(() => { if (m) setProjects([]); })
      .finally(() => { if (m) setLoading(false); });
    return () => { m = false; };
  }, [filter]);

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Case Study' }]}
          eyebrow="Case studies"
          title={<>Case <em>Studies.</em></>}
          description="A selection of recent brand, web, app and custom solution work shipped with our partners."
        />

        <section style={{ padding: '20px 0 100px' }}>
          <Container>
            <div className="filter-pills">
              {categories.map((c) => (
                <button
                  key={c.key || 'all'}
                  className={`filter-pill ${filter === c.key ? 'is-active' : ''}`}
                  onClick={() => setFilter(c.key)}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {loading ? (
              <SkeletonCards count={6} height={260} />
            ) : projects.length === 0 ? (
              <div className="empty-state">
                <h3>No projects in this category yet</h3>
                <p>Try another filter or <Link href="/contact">get in touch</Link> about a new engagement.</p>
              </div>
            ) : (
              <motion.div
                className="cs-list"
                key={filter || 'all'}
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
              >
                {projects.map((project, i) => (
                  <motion.article
                    key={i}
                    className={`cs-card ${i % 2 ? 'cs-card-alt' : ''}`}
                    variants={cardVariant}
                  >
                    <Link href={`/work/${project.id}`} className="cs-card-thumb">
                      {project.image ? (
                        <Image src={project.image} alt={project.title} width={860} height={620} />
                      ) : (
                        <span className="thumb-empty" aria-hidden />
                      )}
                      <span className="cs-card-arrow" aria-hidden>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7M17 7H8M17 7V16" />
                        </svg>
                      </span>
                      {project.category ? (
                        <span className="cs-card-cat">{project.category}</span>
                      ) : null}
                    </Link>

                    <div className="cs-card-body">
                      <span className="cs-index">{String(i + 1).padStart(2, '0')}</span>

                      {project.tags.length ? (
                        <div className="cs-tags">
                          {project.tags.slice(0, 3).map((t, ti) => (
                            <Tag key={t} tone={colorTones[ti % colorTones.length]} size="sm">{t}</Tag>
                          ))}
                        </div>
                      ) : null}

                      <h3 className="cs-title">{project.title}</h3>

                      {(project.clientName || project.location) ? (
                        <div className="cs-meta-tags">
                          {project.clientName ? <Tag size="sm">{project.clientName}</Tag> : null}
                          {project.location ? <Tag size="sm">{project.location}</Tag> : null}
                        </div>
                      ) : null}

                      {(project.techStack.length || project.duration) ? (
                        <div className="cs-specs">
                          {project.techStack.length ? (
                            <div>
                              <small>Tech Stack</small>
                              <span>{project.techStack.join(', ')}</span>
                            </div>
                          ) : null}
                          {project.duration ? (
                            <div>
                              <small>Duration</small>
                              <span>{project.duration}</span>
                            </div>
                          ) : null}
                        </div>
                      ) : null}

                      <Button href={`/work/${project.id}`} variant="accent" size="md">
                        Explore
                      </Button>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </Container>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
