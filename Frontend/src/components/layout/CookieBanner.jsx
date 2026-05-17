'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const STORAGE_KEY = 'illusio_cookie_consent';

export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      if (!value) setOpen(true);
    } catch {
      // ignore
    }
    const reopen = () => setOpen(true);
    window.addEventListener('illusio:cookie-settings', reopen);
    return () => window.removeEventListener('illusio:cookie-settings', reopen);
  }, []);

  const decide = (decision) => {
    try {
      localStorage.setItem(STORAGE_KEY, decision);
    } catch {
      // ignore
    }
    // Let analytics (and any other consent-aware code) react immediately.
    try {
      window.dispatchEvent(new Event('illusio:cookie-consent'));
    } catch {
      // ignore
    }
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          className="cookie-banner"
          role="dialog"
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="cookie-icon" aria-hidden>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 12a9 9 0 1 1-9-9c-1 2.5.5 4.5 3 5s4.5 2.5 4 5 1 4 2 4" />
              <circle cx="9" cy="10" r="0.8" fill="currentColor" />
              <circle cx="14" cy="14" r="0.8" fill="currentColor" />
              <circle cx="9.5" cy="15.5" r="0.8" fill="currentColor" />
            </svg>
          </div>

          <div className="cookie-body">
            <h4>We use cookies</h4>
            <p>
              We use cookies to improve your browsing experience and analyse
              site traffic. Read our{' '}
              <Link href="/privacy">Privacy Policy</Link> for more details.
            </p>
          </div>

          <div className="cookie-actions">
            <button className="btn btn-ghost btn-sm" onClick={() => decide('declined')}>
              Decline
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => decide('accepted')}>
              Accept all
            </button>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
