'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Loader from '@/components/ui/Loader';
import Button from '@/components/ui/Button';
import Tag from '@/components/ui/Tag';
import PhoneInput, { dialFor } from '@/components/ui/PhoneInput';
import { positionAPI, applicationAPI } from '@/services/api';
import { useToast } from '@/components/providers/Toaster';
import { runValidation, required, email, phone, url, minLen } from '@/utils/validators';

const titleCase = (s = '') => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

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

export default function PositionApplyPage({ params }) {
  const slug = params?.slug;
  const { push } = useToast();
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef(null);
  const [resumeName, setResumeName] = useState('');
  const [country, setCountry] = useState('in');
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: '', email: '', phone: '', portfolio: '', cover: '' });
  const change = (k) => (e) => {
    setForm((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: '' }));
  };

  useEffect(() => {
    let m = true;
    positionAPI.getBySlugPublic(slug)
      .then((d) => { if (m && d) setPosition(d); })
      .catch(() => {})
      .finally(() => { if (m) setLoading(false); });
    return () => { m = false; };
  }, [slug]);

  const rules = {
    name: [required('Full name')],
    email: [required('Email'), email],
    phone: [phone],
    portfolio: [required('Portfolio URL'), url],
    cover: [required('This answer'), minLen(20, 'This answer')],
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = runValidation(form, rules);
    if (!fileRef.current?.files?.[0]) found.resume = 'Please attach your resume.';
    setErrors(found);
    if (Object.keys(found).length) {
      push({ tone: 'error', title: 'Check the form', body: 'Please fix the highlighted fields.' });
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('positionId', position?.id || '');
      fd.append('positionSlug', slug || '');
      fd.append('positionTitle', position?.title || titleCase(slug || ''));
      fd.append('name', form.name);
      fd.append('email', form.email);
      fd.append('phone', `${dialFor(country)} ${form.phone}`.trim());
      fd.append('portfolio', form.portfolio);
      fd.append('cover', form.cover);
      const file = fileRef.current?.files?.[0];
      if (file) fd.append('resume', file);
      await applicationAPI.create(fd);
      push({ tone: 'success', title: 'Application sent', body: 'We reply within 7 days.' });
      setForm({ name: '', email: '', phone: '', portfolio: '', cover: '' });
      setCountry('in');
      setResumeName('');
      setErrors({});
      if (fileRef.current) fileRef.current.value = '';
    } catch {
      push({ tone: 'error', title: 'Could not send', body: 'Please try again in a moment.' });
    } finally {
      setSubmitting(false);
    }
  };

  const label = position?.title || (slug ? titleCase(slug) : 'Position');

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Careers', href: '/careers' }, { label }]}
          eyebrow="Apply"
          title={label}
          description="Tell us about you and share work you're proud of. We read every application — usually within the same week."
        />

        <section style={{ padding: '20px 0 80px' }}>
          <Container size="md">
            {loading ? <Loader label="Loading position" /> : null}

            {position?.description ? (
              <div className="apply-summary">
                <h3>About the role</h3>
                <p>{position.description}</p>
                <div className="apply-meta">
                  {position.department ? <Tag tone="soft" size="sm">{position.department}</Tag> : null}
                  {position.location ? <Tag tone="soft" size="sm">{position.location}</Tag> : null}
                  {position.salary ? <Tag tone="soft" size="sm">{position.salary}</Tag> : null}
                </div>
              </div>
            ) : null}

            <form className="form-card" onSubmit={submit} style={{ marginTop: 28 }} noValidate>
              <h3>Application form</h3>
              <div className="field-row">
                <div className="field">
                  <label>Full name</label>
                  <input
                    className={errors.name ? 'is-invalid' : ''}
                    value={form.name}
                    onChange={change('name')}
                    placeholder="Jane Doe"
                  />
                  <FieldError msg={errors.name} />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input
                    className={errors.email ? 'is-invalid' : ''}
                    type="email"
                    value={form.email}
                    onChange={change('email')}
                    placeholder="jane@studio.com"
                  />
                  <FieldError msg={errors.email} />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Phone</label>
                  <PhoneInput
                    country={country}
                    number={form.phone}
                    error={errors.phone}
                    placeholder="Phone number"
                    onCountryChange={setCountry}
                    onNumberChange={(n) => {
                      setForm((p) => ({ ...p, phone: n }));
                      setErrors((p) => ({ ...p, phone: '' }));
                    }}
                  />
                  <FieldError msg={errors.phone} />
                </div>
                <div className="field">
                  <label>Portfolio URL</label>
                  <input
                    className={errors.portfolio ? 'is-invalid' : ''}
                    value={form.portfolio}
                    onChange={change('portfolio')}
                    placeholder="dribbble.com / personal site"
                  />
                  <FieldError msg={errors.portfolio} />
                </div>
              </div>
              <div className="field">
                <label>Why this role?</label>
                <textarea
                  className={errors.cover ? 'is-invalid' : ''}
                  value={form.cover}
                  onChange={change('cover')}
                  placeholder="A few lines about what excites you about this position."
                />
                <FieldError msg={errors.cover} />
              </div>
              <div className="field">
                <label>Resume (PDF)</label>
                <div className="file-field">
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      setResumeName(e.target.files?.[0]?.name || '');
                      setErrors((p) => ({ ...p, resume: '' }));
                    }}
                    id="resume"
                  />
                  <label htmlFor="resume" className="file-trigger">
                    <span>Choose file</span>
                    <em>{resumeName || 'No file selected'}</em>
                  </label>
                </div>
                <FieldError msg={errors.resume} />
              </div>
              <Button type="submit" variant="primary" size="md" icon={false}>
                {submitting ? 'Sending…' : 'Submit application'}
              </Button>
            </form>

            <p style={{ marginTop: 18 }}>
              <Button href="/careers" variant="ghost" size="sm" icon={false}>← Back to all positions</Button>
            </p>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
