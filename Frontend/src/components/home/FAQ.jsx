'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const items = [
  {
    q: 'What services does Illusio Designs offer?',
    a: 'We provide complete digital solutions including Branding & Design, Web & App Development, Digital Marketing, and B2B & Custom Solutions tailored for startups, businesses, and enterprises.',
  },
  {
    q: 'How long does it take to complete a project?',
    a: 'Project timelines vary based on scope and complexity. A simple website might take 4–6 weeks, while comprehensive projects with custom development can take 2–4 months. We provide detailed timelines during the initial consultation.',
  },
  {
    q: 'Do you also handle branding from scratch?',
    a: 'Yes! We create full brand identities — logo, typography, color palette, packaging, brand guidelines, and everything needed to launch or refresh your brand.',
  },
  {
    q: 'Will my website / app be fully responsive?',
    a: 'Yes, all our websites and apps are fully responsive and optimized for all devices. We ensure seamless user experience across desktops, tablets, and mobile phones.',
  },
  {
    q: 'Can you work with international clients?',
    a: 'Yes, we work with clients across the globe. Communication is managed via WhatsApp, email, Zoom, or Google Meet.',
  },
  {
    q: 'How do I get started with Illusio Designs?',
    a: 'It’s simple! Just reach out to us through WhatsApp, email, or our contact form. We’ll schedule a free consultation to discuss your project and explore how we can help you achieve your digital goals.',
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="faq" id="faq">
      <Container>
        <SectionHeader
          eyebrow="FAQs"
          index="07"
          align="center"
          title={<>Frequently <em>asked topics.</em></>}
          description="Quick answers to the questions we get most. Still curious? Get in touch — we love a good design conversation."
        />

        <div className="faq-list">
          {items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div
                key={item.q}
                className={`faq-item ${isOpen ? 'is-open' : ''}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              >
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-num">0{i + 1}</span>
                  <span className="faq-q">{item.q}</span>
                  <span className="faq-toggle" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
