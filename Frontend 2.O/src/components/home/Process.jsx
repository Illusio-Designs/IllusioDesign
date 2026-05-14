'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const steps = [
  {
    num: '01',
    title: 'Discover',
    body: 'Workshops, user interviews and a written brief. We agree on the outcome before we touch a pixel.',
  },
  {
    num: '02',
    title: 'Design',
    body: 'Flows, wireframes and hi-fi screens. Weekly demos so feedback is cheap and direction stays clear.',
  },
  {
    num: '03',
    title: 'Build',
    body: 'Pixel-precise engineering with Next.js, React Native and headless stacks. Tested, accessible, fast.',
  },
  {
    num: '04',
    title: 'Launch',
    body: 'Go-live, handover docs, and 30 days of free support — so nothing falls through the cracks.',
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Process() {
  return (
    <section id="process" style={{ padding: '0 var(--gutter)' }}>
      <div className="process">
        <Container>
          <SectionHeader
            inverted
            eyebrow="How we work"
            index="04"
            title={<>A clear path<br /> from brief to <em>launch.</em></>}
            description="Four short phases. Weekly demos. No mystery — and no scope creep."
          />

          <motion.div
            className="process-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            {steps.map((s) => (
              <motion.article key={s.num} className="process-card" variants={cardVariant}>
                <div className="process-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
