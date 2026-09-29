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
// Each element observes the viewport itself — no nested variant propagation.
const VIEWPORT = { once: true, amount: 0.15 };

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

        <div className="roadmap-track">
          <motion.span
            className="roadmap-rail"
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 1, ease: EASE }}
          />

          {milestones.map((m, i) => {
            const delay = 0.25 + i * 0.16;
            return (
              <div
                key={m.id ?? i}
                className={`roadmap-node ${i % 2 === 0 ? 'is-below' : 'is-above'}`}
              >
                <motion.span
                  className="roadmap-dot"
                  aria-hidden
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={VIEWPORT}
                  transition={{ delay, type: 'spring', stiffness: 320, damping: 18 }}
                />
                <motion.span
                  className="roadmap-connector"
                  aria-hidden
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={VIEWPORT}
                  transition={{ delay: delay + 0.12, duration: 0.35, ease: 'easeOut' }}
                />
                <motion.div
                  className="roadmap-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ delay: delay + 0.18, duration: 0.5, ease: EASE }}
                >
                  <span className="roadmap-label">{m.label}</span>
                  <h3 className="roadmap-title">{m.title}</h3>
                  {m.description ? <p className="roadmap-desc">{m.description}</p> : null}
                </motion.div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
