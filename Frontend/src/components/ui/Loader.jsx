'use client';

import { motion } from 'framer-motion';

export default function Loader({ label = 'Loading', fullscreen = false }) {
  return (
    <div className={`loader ${fullscreen ? 'loader-full' : ''}`} role="status" aria-live="polite">
      <motion.span
        className="loader-disc"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.6, ease: 'linear', repeat: Infinity }}
      />
      <span className="loader-label">{label}…</span>
    </div>
  );
}

export function Spinner({ size = 18 }) {
  return (
    <motion.span
      className="loader-spin"
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1.2, ease: 'linear', repeat: Infinity }}
    />
  );
}
