'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Container from '@/components/ui/Container';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import Button from '@/components/ui/Button';
import MagneticButton from '@/components/ui/MagneticButton';
import Counter from '@/components/ui/Counter';

const stats = [
  { num: 600, suffix: '+', label: 'Projects Shipped' },
  { num: 50, suffix: '+', label: 'Industries Covered' },
  { num: 98, suffix: '%', label: 'Positive Feedback' },
  { num: 7, suffix: '+', label: 'Years of Craft' },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <section className="hero" ref={ref} id="home">
      <Container size="xl">
        <motion.div className="hero-inner" style={{ y, opacity }}>
          <div>
            <motion.span
              className="hero-tag"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="live-dot" />
              Booking Q3 — 2 slots remain
            </motion.span>

            <AnimatedHeading
              as="h1"
              text={['Design that', 'feels *inevitable.*']}
            />
          </div>

          <motion.div
            className="hero-body"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p>
              Illusio is a product design studio. We craft interfaces, brands
              and digital experiences for fintech, SaaS and DTC teams — from
              first sketch to engineered launch.
            </p>
            <div className="hero-actions">
              <MagneticButton strength={0.18}>
                <Button href="#work" variant="primary" size="md">
                  See our work
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.18}>
                <Button href="#contact" variant="ghost" size="md" icon={false}>
                  Start a project
                </Button>
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              className="hero-stat"
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <div className="num">
                <Counter value={s.num} suffix={s.suffix} />
              </div>
              <div className="lab">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="hero-mark" aria-hidden>
          <div className="ring">
            <svg viewBox="0 0 130 130">
              <defs>
                <path
                  id="hero-ring-path"
                  d="M65,65 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0"
                />
              </defs>
              <text fontSize="9">
                <textPath
                  href="#hero-ring-path"
                  startOffset="0"
                  textLength="314"
                  lengthAdjust="spacing"
                >
                  Illusio Designs · Since 2007 ·
                </textPath>
              </text>
            </svg>
          </div>
          <span>↓ Scroll</span>
        </div>
      </Container>
    </section>
  );
}
