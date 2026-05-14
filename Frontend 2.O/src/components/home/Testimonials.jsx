'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import { reviewAPI } from '@/services/api';

const fallback = [
  {
    id: 't1',
    rating: 5,
    quote:
      'Working with Illusio felt like having an in-house product team. They mapped the journey, redesigned every touchpoint, and shipped on time.',
    client: 'Henry Arthur',
    role: 'CTO, Food Express',
  },
  {
    id: 't2',
    rating: 5,
    quote:
      'The new brand and landing page lifted our demo bookings within the first month. Easy to work with and incredibly detail-oriented.',
    client: 'Joshua Singh',
    role: 'CEO, FX Charger',
  },
  {
    id: 't3',
    rating: 5,
    quote:
      'Best agency partnership we have had. Strategy, design and execution all clicked into place from day one.',
    client: 'Priya Nair',
    role: 'Founder, Aicumen',
  },
  {
    id: 't4',
    rating: 5,
    quote:
      'Our dashboard finally feels like a product, not a tool. The team translated complex flows into something operators enjoy.',
    client: 'Daniel Ross',
    role: 'Head of Ops, Crosscoin',
  },
];

const initial = (name = '') =>
  name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Testimonials() {
  const [reviews, setReviews] = useState(fallback);

  useEffect(() => {
    let mounted = true;
    reviewAPI
      .getAllPublic()
      .then((items) => {
        if (!mounted || !items?.length) return;
        const mapped = items
          .filter(Boolean)
          .slice(0, 4)
          .map((r, i) => ({
            id: r.id || `r-${i}`,
            rating: r.rating || 5,
            quote: r.quote || r.review || r.message,
            client: r.client || r.name,
            role: r.role || r.position || '',
          }));
        if (mapped.length) setReviews(mapped);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="testimonials" id="testimonials">
      <Container>
        <SectionHeader
          eyebrow="Kind words"
          index="05"
          title={<>What partners say<br /> about <em>working with us.</em></>}
          align="center"
          description="Real outcomes from founders, product teams and operators who&apos;ve trusted us with their next move."
        />

        <motion.div
          className="testimonials-track"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {reviews.map((r) => (
            <motion.article key={r.id} className="testimonial-card" variants={cardVariant}>
              <div className="stars" aria-label={`${r.rating} out of 5`}>
                {'★'.repeat(Math.min(5, r.rating))}
              </div>
              <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
              <div className="author">
                <span className="avatar-init">{initial(r.client)}</span>
                <div>
                  <h4>{r.client}</h4>
                  <span>{r.role}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
