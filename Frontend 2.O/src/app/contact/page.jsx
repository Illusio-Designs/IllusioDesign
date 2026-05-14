'use client';

import { useState } from 'react';
import { FaXTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import { contactAPI } from '@/services/api';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', budget: '', message: '' });
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const change = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('');
    try {
      await contactAPI.create({ ...form, source: 'frontend-2.0-contact' });
      setStatus('Thanks — we will reply within one working day.');
      setForm({ name: '', email: '', phone: '', budget: '', message: '' });
    } catch {
      setStatus('Could not send right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
          eyebrow="Get in touch"
          title={<>Have an idea? <em>Let&apos;s build it.</em></>}
          description="Tell us a little about the project. We reply within one working day with next steps."
        />

        <section style={{ padding: '20px 0 100px' }}>
          <Container>
            <div className="contact-grid">
              <div className="contact-info">
                <div className="contact-info-card">
                  <small>Email</small>
                  <a href="mailto:Info@illusiodesigns.agency">Info@illusiodesigns.agency</a>
                </div>
                <div className="contact-info-card">
                  <small>Phone</small>
                  <a href="tel:+910000000000">+91 00000 00000</a>
                </div>
                <div className="contact-info-card">
                  <small>Studio</small>
                  <span>Rajkot, India · Remote-first</span>
                </div>
                <div className="contact-info-card">
                  <small>Office hours</small>
                  <span>Mon – Fri · 10:00 to 19:00 IST</span>
                </div>
                <div className="contact-socials">
                  <a href="#" aria-label="X"><FaXTwitter /></a>
                  <a href="#" aria-label="Instagram"><FaInstagram /></a>
                  <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
                  <a href="#" aria-label="YouTube"><FaYoutube /></a>
                </div>
              </div>

              <form className="form-card" onSubmit={submit}>
                <h3>Project enquiry</h3>
                <div className="field-row">
                  <div className="field">
                    <label>Name</label>
                    <input required value={form.name} onChange={change('name')} placeholder="Your full name" />
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input required type="email" value={form.email} onChange={change('email')} placeholder="you@brand.com" />
                  </div>
                </div>
                <div className="field-row">
                  <div className="field">
                    <label>Phone (optional)</label>
                    <input value={form.phone} onChange={change('phone')} placeholder="+91 00000 00000" />
                  </div>
                  <div className="field">
                    <label>Budget (USD)</label>
                    <select value={form.budget} onChange={change('budget')}>
                      <option value="">Select budget</option>
                      <option>Under $10k</option>
                      <option>$10k – $25k</option>
                      <option>$25k – $50k</option>
                      <option>$50k +</option>
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label>Project brief</label>
                  <textarea required value={form.message} onChange={change('message')} placeholder="Tell us about your product, timeline and goals." />
                </div>
                <button type="submit" className="btn btn-primary btn-md" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send enquiry'}
                </button>
                {status ? <div className="form-status">{status}</div> : null}
              </form>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
