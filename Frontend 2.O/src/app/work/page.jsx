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
import { caseStudyAPI, resolveImage } from '@/services/api';

const fallback = [
  { id: '1', slug: 'amrut-app', title: 'Amrut App', category: 'Mobile App', body: 'A heritage jewellery brand made shoppable on mobile.', image: '/images/Amrut App.webp' },
  { id: '2', slug: 'aicumen-ai', title: 'Aicumen AI', category: 'SaaS', body: 'An AI workspace built for analyst teams.', image: '/images/aicumen-ai.webp' },
  { id: '3', slug: 'crosscoin', title: 'Crosscoin', category: 'Fintech', body: 'Cross-border payments redesigned end-to-end.', image: '/images/crosscoin.webp' },
  { id: '4', slug: 'flowline', title: 'Flowline', category: 'Dashboard', body: 'A logistics ops dashboard that feels like a product.', image: '/images/flowline.webp' },
  { id: '5', slug: 'nanak-finserv', title: 'Nanak Finserv', category: 'Branding', body: 'A new identity for a 30-year-old finance brand.', image: '/images/nanak-finserv.webp' },
  { id: '6', slug: 'vivera-lighting', title: 'Vivera Lighting', category: 'E-commerce', body: 'A premium lighting brand brought online.', image: '/images/vivera-lighting.webp' },
  { id: '7', slug: 'radhe-consultancy', title: 'Radhe Consultancy', category: 'Branding', body: 'A consultancy site engineered for trust.', image: '/images/radhe-consultancy.webp' },
  { id: '8', slug: 'immune-protector', title: 'Immune Protector', category: 'D2C', body: 'A wellness brand built for ritual.', image: '/images/immune-protector.webp' },
];

const categories = ['All', 'Mobile App', 'SaaS', 'Fintech', 'Dashboard', 'Branding', 'E-commerce', 'D2C'];

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function WorkPage() {
  const [projects, setProjects] = useState(fallback);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    let m = true;
    caseStudyAPI.getAllPublic().then((items) => {
      if (!m || !items?.length) return;
      const mapped = items.filter(Boolean).map((p) => ({
        id: p.id,
        slug: p.seoUrl || p.slug || p.id,
        title: p.title,
        category: p.category || 'Case Study',
        body: p.summary || p.description || '',
        image: resolveImage(p.image) || fallback[0].image,
      }));
      if (mapped.length) setProjects(mapped);
    }).catch(() => {});
    return () => { m = false; };
  }, []);

  const filtered = filter === 'All' ? projects : projects.filter((p) => (p.category || '').toLowerCase() === filter.toLowerCase());

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Work' }]}
          eyebrow="Selected work"
          title={<>Recent projects we&apos;re <em>proud of.</em></>}
          description="A selection of recent product, brand and growth work shipped with our partners."
        />

        <section style={{ padding: '20px 0 100px' }}>
          <Container>
            <div className="filter-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-pill ${filter === cat ? 'is-active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <motion.div
              className="work-list"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
              key={filter}
            >
              {filtered.map((project, i) => (
                <motion.div key={project.id} variants={cardVariant}>
                  <Link href={`/work/${project.slug}`} className="work-list-card">
                    <div className="work-list-thumb">
                      <Image src={project.image} alt={project.title} width={720} height={520} />
                    </div>
                    <div className="work-list-meta">
                      <span className="tag">{project.category}</span>
                      <h3>{project.title}</h3>
                      {project.body ? <p>{project.body}</p> : null}
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
