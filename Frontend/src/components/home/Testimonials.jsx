'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import { StarRating, StarRatingInput } from '@/components/ui/StarRating';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { SkeletonCards } from '@/components/ui/Skeleton';
import { reviewAPI, cleanText } from '@/services/api';
import { useToast } from '@/components/providers/Toaster';
import { runValidation, required, minLen } from '@/utils/validators';

const FieldError = ({ msg }) =>
  msg ? (
    <span className="field-error">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
      {msg}
    </span>
  ) : null;

const initial = (n = '') => n.split(' ').map((p) => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ author: '', company: '', rating: 5, comment: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { push } = useToast();

  const load = () => {
    reviewAPI
      .getAllPublic()
      .then((items) => {
        const mapped = (Array.isArray(items) ? items : []).filter(Boolean).map((r) => ({
          id: r.id,
          rating: Number(r.rating) || 5,
          comment: cleanText(r.comment || r.quote || r.message),
          author: cleanText(r.author || r.client || r.name),
          company: cleanText(r.company || r.role || r.position || ''),
        }));
        setReviews(mapped);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) load();
    return () => { mounted = false; };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const found = runValidation(form, {
      author: [required('Name')],
      comment: [required('Comment'), minLen(10, 'Comment')],
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setSubmitting(true);
    try {
      await reviewAPI.submit(form);
      push({ tone: 'success', title: 'Thanks!', body: 'Your review is under review and will appear shortly.' });
      setForm({ author: '', company: '', rating: 5, comment: '' });
      setErrors({});
      setOpen(false);
      load();
    } catch {
      push({ tone: 'error', title: 'Could not send', body: 'Try again in a moment.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container" id="testimonials">
      <div className="testimonials">
        <SectionHeader
          inverted
          eyebrow="Kind words"
          index="05"
          title={<>What partners say<br /> about <em>working with us.</em></>}
          align="center"
          description="Real outcomes from founders, product teams and operators who've trusted us with their next move."
        />

        {loading ? (
          <SkeletonCards count={2} height={150} />
        ) : reviews.length === 0 ? (
          <div className="testimonials-empty">
            <p>No reviews yet — be the first to share your experience.</p>
          </div>
        ) : (
          <motion.div
            className="testimonials-track"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            {reviews.slice(0, 4).map((r, i) => (
              <motion.article key={i} className="testimonial-card" variants={cardVariant}>
                <div className="stars-row">
                  <StarRating value={r.rating} />
                </div>
                <blockquote>&ldquo;{r.comment}&rdquo;</blockquote>
                <div className="author">
                  <span className="avatar-init">{initial(r.author)}</span>
                  <div>
                    <h4>{r.author}</h4>
                    <span>{r.company}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', marginTop: 28 }}>
          <Button variant="accent" size="md" onClick={() => setOpen(true)} icon={false}>
            Share your experience
          </Button>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Share your experience"
        description="Help others choose Illusio Designs with confidence."
        size="md"
      >
        <form className="review-form" onSubmit={submit} noValidate>
          <div className="field-row">
            <div className="field">
              <label>Your name</label>
              <input
                className={errors.author ? 'is-invalid' : ''}
                value={form.author}
                onChange={(e) => { setForm({ ...form, author: e.target.value }); setErrors((p) => ({ ...p, author: '' })); }}
                placeholder="Jane Doe"
              />
              <FieldError msg={errors.author} />
            </div>
            <div className="field">
              <label>Company / role</label>
              <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="CTO, Brand Inc." />
            </div>
          </div>
          <div className="field">
            <label>Rating</label>
            <StarRatingInput value={form.rating} onChange={(n) => setForm({ ...form, rating: n })} />
          </div>
          <div className="field">
            <label>Comment</label>
            <textarea
              className={errors.comment ? 'is-invalid' : ''}
              value={form.comment}
              onChange={(e) => { setForm({ ...form, comment: e.target.value }); setErrors((p) => ({ ...p, comment: '' })); }}
              placeholder="What was working with us like?"
            />
            <FieldError msg={errors.comment} />
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <Button variant="ghost" size="md" icon={false} onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" size="md" type="submit" icon={false}>
              {submitting ? 'Sending…' : 'Submit review'}
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
