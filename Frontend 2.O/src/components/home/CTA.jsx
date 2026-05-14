'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import MagneticButton from '@/components/ui/MagneticButton';

export default function CTA() {
  return (
    <section className="cta" id="contact">
      <Container>
        <motion.div
          className="cta-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <h2>
            Have a project<br /> in <em>mind?</em>
          </h2>
          <p>
            We&apos;ll respond within one working day with next steps —
            timelines, scope, and what a kick-off looks like.
          </p>
          <div className="cta-actions">
            <MagneticButton strength={0.18}>
              <Button href="mailto:Info@illusiodesigns.agency" variant="light" size="lg">
                Info@illusiodesigns.agency
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.18}>
              <Button href="#contact" variant="ghost" size="lg" icon={false}>
                Book a call
              </Button>
            </MagneticButton>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
