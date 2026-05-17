'use client';

import { motion } from 'framer-motion';

const variants = {
  up: {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    show: { opacity: 1, scale: 1 },
  },
};

export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 0.7,
  className = '',
  as = 'div',
  once = true,
  margin = '-80px',
}) {
  const Tag = motion[as] || motion.div;
  const v = variants[variant] || variants.up;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin }}
      variants={v}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
