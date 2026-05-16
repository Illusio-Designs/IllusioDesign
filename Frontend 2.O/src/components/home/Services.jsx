'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const services = [
  {
    num: '01',
    slug: 'branding',
    title: 'Branding & Design',
    body: 'Build a brand that stands out with identity systems, visual guidelines, and impactful creatives tailored to your audience.',
    tags: ['Logo', 'Identity', 'Guidelines', 'Packaging'],
    variant: '',
  },
  {
    num: '02',
    slug: 'web-app',
    title: 'Web & App Development',
    body: 'Fast, scalable, and user-friendly digital products — from websites to mobile apps — crafted for real-world performance.',
    tags: ['React', 'Next.js', 'React Native', 'Shopify'],
    variant: 'accent',
  },
  {
    num: '03',
    slug: 'marketing',
    title: 'Digital Marketing',
    body: 'Grow your business with performance-driven strategies across SEO, social media, ads, automation, and content.',
    tags: ['SEO', 'Meta Ads', 'Google Ads', 'Lifecycle'],
    variant: 'accent',
  },
  {
    num: '04',
    slug: 'b2b',
    title: 'B2B & Custom Solutions',
    body: 'Custom-built portals, internal tools, automated workflows and enterprise solutions that streamline operations.',
    tags: ['Portals', 'CRM', 'ERP', 'Dashboards'],
    variant: '',
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Services() {
  return (
    <section className="services" id="services">
      <Container>
        <SectionHeader
          eyebrow="What we do"
          index="01"
          title={<>Services <em>we offer.</em></>}
          description="Four focused capabilities. One senior team. Every engagement is scoped around the outcome you actually want."
        />

        <motion.div
          className="services-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {services.map((s) => (
            <motion.a
              key={s.num}
              href={`/services/${s.slug}`}
              className={`service-card ${s.variant ? `service-card-${s.variant}` : ''}`}
              variants={cardVariant}
            >
              <div className="service-num">{s.num} ✦</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="service-tags">
                {s.tags.map((t) => (
                  <span key={t} className="service-tag">{t}</span>
                ))}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
