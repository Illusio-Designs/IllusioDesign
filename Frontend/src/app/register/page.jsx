'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { authAPI } from '@/services/api';
import { useToast } from '@/components/providers/Toaster';
import { runValidation, required, email as emailRule, minLen } from '@/utils/validators';

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

export default function RegisterPage() {
  const router = useRouter();
  const { push } = useToast();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem('auth_token')) router.replace('/dashboard');
    } catch {
      // ignore
    }
  }, [router]);

  const change = (k) => (e) => {
    setForm((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: '' }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = runValidation(form, {
      username: [required('Name')],
      email: [required('Email'), emailRule],
      password: [required('Password'), minLen(6, 'Password')],
      confirm: [required('Confirm password')],
    });
    if (!found.confirm && form.confirm !== form.password) {
      found.confirm = 'Passwords do not match.';
    }
    setErrors(found);
    if (Object.keys(found).length) return;

    setSubmitting(true);
    try {
      const data = await authAPI.register(form.username, form.email, form.password);
      const token = data?.token || data?.accessToken || data?.data?.token;
      if (token) {
        localStorage.setItem('auth_token', token);
        if (data?.user) localStorage.setItem('auth_user', JSON.stringify(data.user));
        push({ tone: 'success', title: 'Account created', body: 'Welcome to the dashboard.' });
        router.replace('/dashboard');
      } else {
        push({ tone: 'success', title: 'Account created', body: 'You can now sign in.' });
        router.replace('/login');
      }
    } catch (err) {
      push({
        tone: 'error',
        title: 'Could not create account',
        body: err?.message || 'Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link href="/" className="auth-logo" aria-label="Illusio Designs">
          <Image src="/images/IllusioDesignfulllogo.webp" alt="Illusio Designs" width={200} height={48} />
        </Link>

        <div className="auth-head">
          <span className="page-eyebrow">Dashboard</span>
          <h1>Create an account</h1>
          <p>Set up an admin account to access the studio dashboard.</p>
        </div>

        <form className="auth-form" onSubmit={submit} noValidate>
          <div className="field">
            <label>Name</label>
            <input
              className={errors.username ? 'is-invalid' : ''}
              value={form.username}
              onChange={change('username')}
              placeholder="Your name"
              autoComplete="name"
            />
            <FieldError msg={errors.username} />
          </div>

          <div className="field">
            <label>Email address</label>
            <input
              className={errors.email ? 'is-invalid' : ''}
              type="email"
              value={form.email}
              onChange={change('email')}
              placeholder="you@illusiodesigns.agency"
              autoComplete="email"
            />
            <FieldError msg={errors.email} />
          </div>

          <div className="field">
            <label>Password</label>
            <div className="auth-pass">
              <input
                className={errors.password ? 'is-invalid' : ''}
                type={show ? 'text' : 'password'}
                value={form.password}
                onChange={change('password')}
                placeholder="At least 6 characters"
                autoComplete="new-password"
              />
              <button type="button" className="auth-pass-toggle" onClick={() => setShow((v) => !v)} aria-label="Toggle password">
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
            <FieldError msg={errors.password} />
          </div>

          <div className="field">
            <label>Confirm password</label>
            <input
              className={errors.confirm ? 'is-invalid' : ''}
              type={show ? 'text' : 'password'}
              value={form.confirm}
              onChange={change('confirm')}
              placeholder="Re-enter password"
              autoComplete="new-password"
            />
            <FieldError msg={errors.confirm} />
          </div>

          <Button type="submit" variant="primary" size="md" icon={false} className="auth-submit">
            {submitting ? 'Creating account…' : 'Create account'}
          </Button>
        </form>

        <p className="auth-alt">
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </motion.div>
    </main>
  );
}
