'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Container from '@/components/ui/Container';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import Button from '@/components/ui/Button';
import MagneticButton from '@/components/ui/MagneticButton';
import Counter from '@/components/ui/Counter';
import BackgroundRipple from '@/components/ui/BackgroundRipple';

const stats = [
  { num: 883, suffix: '', label: 'Project Completed' },
  { num: 19, suffix: '+', label: 'Total Top Services' },
  { num: 98, suffix: '%', label: 'Positive Feedback' },
  { num: 7, suffix: '+', label: 'Years of Experience' },
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
      <BackgroundRipple bare rows={9} cols={28} cellSize={66} className="hero-ripple" />
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
              Illusio Designs · Since 2007
            </motion.span>

            <AnimatedHeading
              as="h1"
              text={['Designate Illusio thoughts', 'to flow into *magic.*']}
            />
          </div>

          <motion.div
            className="hero-body"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p>
              Illusio Designs is a creative and technology-driven agency
              building brands, web, mobile and custom B2B experiences that
              leave a lasting impression — from strategy through launch.
            </p>
            <div className="hero-actions">
              <MagneticButton strength={0.18}>
                <Button href="/work" variant="primary" size="md">
                  See our work
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.18}>
                <Button href="/contact" variant="ghost" size="md" icon={false}>
                  Let&apos;s Engage
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
            <svg viewBox="0 0 132 132">
              <defs>
                <path
                  id="hero-ring-path"
                  d="M66,66 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0"
                />
              </defs>
              <text fontSize="8.6">
                <textPath
                  href="#hero-ring-path"
                  startOffset="0"
                  textLength="295"
                  lengthAdjust="spacing"
                >
                  ILLUSIO DESIGNS&#160;&#160;&#8226;&#160;&#160;SINCE 2007&#160;&#160;&#8226;&#160;&#160;
                </textPath>
              </text>
            </svg>
          </div>
          <span className="hero-mark-cue">
            <svg className="hero-mark-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
            <span className="hero-mark-label">Scroll</span>
          </span>
        </div>
      </Container>
    </section>
  );
}
