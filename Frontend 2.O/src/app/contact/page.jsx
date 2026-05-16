'use client';

import { useState } from 'react';
import { FaInstagram, FaLinkedinIn, FaFacebookF } from 'react-icons/fa6';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import PhoneInput, { dialFor } from '@/components/ui/PhoneInput';
import useSEO from '@/hooks/useSEO';
import { contactAPI } from '@/services/api';
import { useToast } from '@/components/providers/Toaster';
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

export default function ContactPage() {
  useSEO('contact');
  const { push } = useToast();
  const [form, setForm] = useState({ name: '', email: '', mobile: '', subject: '', message: '' });
  const [country, setCountry] = useState('in');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const change = (k) => (e) => {
    setForm((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: '' }));
  };

  const rules = {
    name: [required('Name')],
    email: [required('Email'), email],
    mobile: [phone],
    subject: [required('Subject')],
    message: [required('Message'), minLen(10, 'Message')],
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = runValidation(form, rules);
    setErrors(found);
    if (Object.keys(found).length) {
      push({ tone: 'error', title: 'Check the form', body: 'Please fix the highlighted fields.' });
      return;
    }
    setSubmitting(true);
    try {
      await contactAPI.create({ ...form, mobile: `${dialFor(country)} ${form.mobile}`.trim() });
      push({ tone: 'success', title: 'Message sent', body: 'We reply within one working day.' });
      setForm({ name: '', email: '', mobile: '', subject: '', message: '' });
      setCountry('in');
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'Lead');
      }
    } catch {
      push({ tone: 'error', title: 'Could not send', body: 'Please try again in a moment.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]}
          eyebrow="Get in touch"
          title={<>Vision in Mind? <em>Talk Now!</em></>}
          description="Convert your ideas into a successful business. Tell us a little about the project — we reply within one working day."
        />

        <section style={{ padding: '20px 0 100px' }}>
          <Container>
            <div className="contact-grid">
              <div className="contact-info">
                <div className="contact-info-card">
                  <small>Phone</small>
                  <a href="tel:+917600048416">+91 76000 48416</a>
                </div>
                <div className="contact-info-card">
                  <small>Email</small>
                  <a href="mailto:Info@illusiodesigns.agency">Info@illusiodesigns.agency</a>
                </div>
                <div className="contact-info-card">
                  <small>Address</small>
                  <span>211-212 2nd Floor, Runway Heights, Ayodhya chowk, 150ft Ring Road, Rajkot 360001</span>
                </div>
                <div className="contact-info-card">
                  <small>Office hours</small>
                  <span>Mon — Fri · 10:00 to 19:00 IST</span>
                </div>
                <div className="contact-socials">
                  <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
                  <a href="#" aria-label="Instagram"><FaInstagram /></a>
                  <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                </div>
              </div>

              <form className="form-card" onSubmit={submit} noValidate>
                <h3>Convert your ideas into a successful business</h3>
                <div className="field-row">
                  <div className="field">
                    <label>Your name</label>
                    <input
                      className={errors.name ? 'is-invalid' : ''}
                      value={form.name}
                      onChange={change('name')}
                      placeholder="Your name*"
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
                      placeholder="Your email address*"
                    />
                    <FieldError msg={errors.email} />
                  </div>
                </div>
                <div className="field-row">
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
                    <label>Subject</label>
                    <input
                      className={errors.subject ? 'is-invalid' : ''}
                      value={form.subject}
                      onChange={change('subject')}
                      placeholder="Your subject*"
                    />
                    <FieldError msg={errors.subject} />
                  </div>
                </div>
                <div className="field">
                  <label>Message</label>
                  <textarea
                    className={errors.message ? 'is-invalid' : ''}
                    value={form.message}
                    onChange={change('message')}
                    placeholder="Your message*"
                  />
                  <FieldError msg={errors.message} />
                </div>
                <Button type="submit" variant="primary" size="md" icon={false}>
                  {submitting ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
