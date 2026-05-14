'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';

const labels = {
  'senior-product-designer': 'Senior Product Designer',
  'frontend-engineer': 'Frontend Engineer (Next.js)',
  'brand-designer': 'Brand Designer',
  'design-intern': 'Design Intern',
};

const titleCase = (s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export default function PositionApplyPage({ params }) {
  const slug = params?.slug;
  const label = labels[slug] || (slug ? titleCase(slug) : 'Position');

  const [form, setForm] = useState({ name: '', email: '', phone: '', portfolio: '', cover: '' });
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const change = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('');
    setTimeout(() => {
      setStatus('Thanks — we have your application. We reply within 7 days.');
      setForm({ name: '', email: '', phone: '', portfolio: '', cover: '' });
      setSubmitting(false);
    }, 700);
  };

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Careers', href: '/careers' }, { label }]}
          eyebrow="Apply"
          title={label}
          description="Tell us a little about you and share work you're proud of. We read every application — usually within the same week."
        />

        <section style={{ padding: '20px 0 80px' }}>
          <Container size="sm">
            <form className="form-card" onSubmit={submit}>
              <h3>Application form</h3>
              <div className="field-row">
                <div className="field">
                  <label>Full name</label>
                  <input required value={form.name} onChange={change('name')} placeholder="Jane Doe" />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input required type="email" value={form.email} onChange={change('email')} placeholder="jane@studio.com" />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Phone</label>
                  <input value={form.phone} onChange={change('phone')} placeholder="+91 00000 00000" />
                </div>
                <div className="field">
                  <label>Portfolio URL</label>
                  <input value={form.portfolio} onChange={change('portfolio')} placeholder="dribbble.com / personal site" />
                </div>
              </div>
              <div className="field">
                <label>Why this role?</label>
                <textarea value={form.cover} onChange={change('cover')} placeholder="A few lines about what excites you about this position." />
              </div>
              <button type="submit" className="btn btn-primary btn-md" disabled={submitting}>
                {submitting ? 'Sending…' : 'Submit application'}
              </button>
              {status ? <div className="form-status">{status}</div> : null}
            </form>
            <p style={{ marginTop: 18 }}>
              <Link href="/careers" className="btn btn-ghost btn-sm">← Back to all positions</Link>
            </p>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
