'use client';

import { useEffect, useState } from 'react';
import Loader from '@/components/ui/Loader';

const SESSION_KEY = 'introLoaderShown';
const MIN_VISIBLE_MS = 600;   // avoid a jarring flash if the page is already ready
const SAFETY_CAP_MS = 6000;   // never let the loader stick

/**
 * First-load preloader — a centered, fullscreen loader shown while the page
 * and its initial data settle. Shown once per browser session, so navigating
 * back to the page within the app doesn't re-trigger it.
 */
export default function IntroLoader({ label = 'Loading' }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let alreadyShown = false;
    try { alreadyShown = sessionStorage.getItem(SESSION_KEY) === '1'; } catch {}
    if (alreadyShown) {
      setVisible(false);
      return;
    }

    const start = Date.now();
    let finished = false;
    let hideTimer;

    const finish = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - start));
      hideTimer = window.setTimeout(() => {
        setVisible(false);
        try { sessionStorage.setItem(SESSION_KEY, '1'); } catch {}
      }, wait);
    };

    const capTimer = window.setTimeout(finish, SAFETY_CAP_MS);

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    return () => {
      window.removeEventListener('load', finish);
      window.clearTimeout(capTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;
  return <Loader fullscreen label={label} />;
}
