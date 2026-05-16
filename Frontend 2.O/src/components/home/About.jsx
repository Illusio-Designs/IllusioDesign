'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import MagneticButton from '@/components/ui/MagneticButton';
import Counter from '@/components/ui/Counter';
import { StarRating } from '@/components/ui/StarRating';

export default function About() {
  return (
    <section className="about" id="about">
      <Container>
        <div className="about-grid">
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="about-portrait">
              <Image
                src="/images/founder.webp"
                alt="Founder, Illusio Designs"
                width={800}
                height={1000}
                priority={false}
              />
            </div>
            <motion.div
              className="about-floating tl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="num"><Counter value={4.9} suffix="" duration={1.8} /></div>
              <div className="lab"><StarRating value={5} size={11} /> rating</div>
            </motion.div>
            <motion.div
              className="about-floating br"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="num"><Counter value={120} suffix="+" /></div>
              <div className="lab">Happy clients</div>
            </motion.div>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-eyebrow"><em>03</em> About the studio</span>
            <h2 className="section-title" style={{ marginTop: 18 }}>
              We design with rigour,<br /> ship with <em>craft.</em>
            </h2>
            <p>
              Illusio is a senior product design studio. We partner with founders
              and product teams to ship interfaces, brands and digital experiences
              that actually move the needle.
            </p>
            <p>
              Every engagement is run like an embedded team: weekly demos, clear
              scope, no surprises — just outcomes you can put on a board deck.
            </p>

            <div className="about-stats">
              <div>
                <span><Counter value={600} suffix="+" /></span>
                <small>Projects Completed</small>
              </div>
              <div>
                <span><Counter value={50} suffix="+" /></span>
                <small>Industries Covered</small>
              </div>
            </div>

            <MagneticButton strength={0.18}>
              <Button href="#contact" variant="primary" size="md">
                Work with us
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
