'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import MagneticButton from '@/components/ui/MagneticButton';
import Modal from '@/components/ui/Modal';
import { contactAPI } from '@/services/api';
import { useToast } from '@/components/providers/Toaster';
import PhoneInput, { dialFor } from '@/components/ui/PhoneInput';
import { runValidation, required, email, phone, minLen } from '@/utils/validators';

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

export default function CTA() {
  const { push } = useToast();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', mobile: '', message: '' });
  const [country, setCountry] = useState('in');
  const [errors, setErrors] = useState({});
  const change = (k) => (e) => {
    setForm((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: '' }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = runValidation(form, {
      name: [required('Name')],
      email: [required('Email'), email],
      mobile: [phone],
      message: [required('Message'), minLen(10, 'Message')],
    });
    setErrors(found);
    if (Object.keys(found).length) return;
    setSubmitting(true);
    try {
      await contactAPI.create({ ...form, mobile: `${dialFor(country)} ${form.mobile}`.trim(), subject: 'Free website review request' });
      push({ tone: 'success', title: 'Request sent', body: 'We will reach out within one working day.' });
      setForm({ name: '', email: '', mobile: '', message: '' });
      setErrors({});
      setOpen(false);
    } catch {
      push({ tone: 'error', title: 'Could not send', body: 'Please try again in a moment.' });
    } finally {
      setSubmitting(false);
    }
  };

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
            Ready to <em>Start?</em>
          </h2>
          <p>Let&apos;s craft your next digital success story.</p>
          <div className="cta-actions">
            <MagneticButton strength={0.18}>
              <Button variant="light" size="lg" icon={false} onClick={() => setOpen(true)}>
                Get a Free Website Review
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.18}>
              <Button href="mailto:Info@illusiodesigns.agency" variant="ghost" size="lg" icon={false}>
                Info@illusiodesigns.agency
              </Button>
            </MagneticButton>
          </div>
        </motion.div>
      </Container>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Get a free website review"
        description="Tell us a little about your project — we reply within one working day."
        size="md"
      >
        <form className="review-form" onSubmit={submit} noValidate>
          <div className="field-row">
            <div className="field">
              <label>Your name</label>
              <input
                className={errors.name ? 'is-invalid' : ''}
                value={form.name}
                onChange={change('name')}
                placeholder="Jane Doe"
              />
              <FieldError msg={errors.name} />
            </div>
            <div className="field">
              <label>Email address</label>
              <input
                className={errors.email ? 'is-invalid' : ''}
                type="email"
                value={form.email}
                onChange={change('email')}
                placeholder="you@brand.com"
              />
              <FieldError msg={errors.email} />
            </div>
          </div>
          <div className="field">
            <label>Mobile number</label>
            <PhoneInput
              country={country}
              number={form.mobile}
              error={errors.mobile}
              placeholder="Your mobile number*"
              onCountryChange={setCountry}
              onNumberChange={(n) => {
                setForm((p) => ({ ...p, mobile: n }));
                setErrors((p) => ({ ...p, mobile: '' }));
              }}
            />
            <FieldError msg={errors.mobile} />
          </div>
          <div className="field">
            <label>What do you need?</label>
            <textarea
              className={errors.message ? 'is-invalid' : ''}
              value={form.message}
              onChange={change('message')}
              placeholder="A few lines about your project, timeline and goals."
            />
            <FieldError msg={errors.message} />
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <Button variant="ghost" size="md" icon={false} onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" size="md" type="submit" icon={false}>
              {submitting ? 'Sending…' : 'Request website review'}
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
