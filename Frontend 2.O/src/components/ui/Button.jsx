'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M17 7H8M17 7V16" />
  </svg>
);

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  icon = true,
  className = '',
  onClick,
  type = 'button',
  ...rest
}) {
  const classes = `btn btn-${variant} btn-${size} ${className}`;
  const content = (
    <span className="btn-inner">
      <span className="btn-label">{children}</span>
      {icon ? (
        <span className="btn-icon">
          <ArrowIcon />
        </span>
      ) : null}
    </span>
  );

  if (href) {
    return (
      <motion.span whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 380, damping: 22 }}>
        <Link href={href} className={classes} {...rest}>
          {content}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      onClick={onClick}
      type={type}
      className={classes}
      {...rest}
    >
      {content}
    </motion.button>
  );
}
