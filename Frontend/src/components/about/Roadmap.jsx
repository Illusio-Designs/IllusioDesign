'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { milestoneAPI } from '@/services/api';

// Used until the API responds (and if it returns nothing / errors).
const fallbackMilestones = [
  { id: 'f1', label: '2015', title: 'Founded as a branding agency', description: 'Illusio Designs began as a branding agency — crafting brand identities and visual systems.' },
  { id: 'f2', label: '2017', title: 'Expanded into development', description: 'We grew into a full development agency, adding web and product engineering to our craft.' },
  { id: 'f3', label: '2019', title: '100 development projects', description: 'Reached a major milestone — 100 development projects designed, built and delivered.' },
];

const EASE = [0.22, 1, 0.36, 1];

const trackVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};
const railVariants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease: EASE } },
};
const nodeVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const dotVariants = {
  hidden: { scale: 0 },
  show: { scale: 1, transition: { type: 'spring', stiffness: 340, damping: 18 } },
};
const connectorVariants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.35, ease: 'easeOut' } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function Roadmap() {
  const [milestones, setMilestones] = useState(fallbackMilestones);

  useEffect(() => {
    let active = true;
    milestoneAPI.getAllPublic()
      .then((items) => {
        if (!active) return;
        const list = (Array.isArray(items) ? items : []).filter(Boolean);
        if (list.length) setMilestones(list);
      })
      .catch(() => {
        // Keep the fallback milestones on failure.
      });
    return () => { active = false; };
  }, []);

  return (
    <section className="roadmap">
      <Container>
        <div className="roadmap-head">
          <span className="page-eyebrow">Our journey</span>
          <h2 className="section-title">Milestones that shaped Illusio Designs.</h2>
        </div>

        <motion.div
          className="roadmap-track"
          variants={trackVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span className="roadmap-rail" variants={railVariants} aria-hidden />

          {milestones.map((m, i) => (
            <motion.div
              key={m.id ?? i}
              className={`roadmap-node ${i % 2 === 0 ? 'is-below' : 'is-above'}`}
              variants={nodeVariants}
            >
              <motion.span className="roadmap-dot" variants={dotVariants} aria-hidden />
              <motion.span className="roadmap-connector" variants={connectorVariants} aria-hidden />
              <motion.div className="roadmap-card" variants={cardVariants}>
                <span className="roadmap-label">{m.label}</span>
                <h3 className="roadmap-title">{m.title}</h3>
                {m.description ? <p className="roadmap-desc">{m.description}</p> : null}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
