'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const services = [
  {
    num: '01',
    title: 'Branding & Design',
    body: 'Logo systems, identity guidelines and visual language that make founders proud and customers loyal.',
    tags: ['Identity', 'Naming', 'Guidelines', 'Packaging'],
    variant: '',
  },
  {
    num: '02',
    title: 'Web & App Development',
    body: 'Next.js, React Native and headless stacks shipped with care — performance, accessibility and SEO built in.',
    tags: ['Next.js', 'React Native', 'Headless CMS', 'CI/CD'],
    variant: 'accent',
  },
  {
    num: '03',
    title: 'Digital Marketing',
    body: 'Landing pages, paid creative and lifecycle programs that turn traffic into qualified pipeline.',
    tags: ['CRO', 'SEO', 'Paid Social', 'Lifecycle'],
    variant: 'light',
  },
  {
    num: '04',
    title: 'B2B & Custom Solutions',
    body: 'Dashboards, internal tools and bespoke B2B platforms designed for the people who actually run the business.',
    tags: ['Dashboards', 'Workflows', 'Integrations', 'Tools'],
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
          title={<>Four capabilities,<br /> one senior team.</>}
          description="Every engagement is scoped around the outcome you actually want — not a list of deliverables."
        />

        <motion.div
          className="services-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {services.map((s) => (
            <motion.article
              key={s.num}
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
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
