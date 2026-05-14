'use client';

import { motion } from 'framer-motion';

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  index,
  className = '',
  inverted = false,
}) {
  return (
    <motion.header
      className={`section-header section-header-${align} ${inverted ? 'is-inverted' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow ? (
        <span className="section-eyebrow">
          {index ? <em>{index}</em> : null}
          {eyebrow}
        </span>
      ) : null}
      {title ? <h2 className="section-title">{title}</h2> : null}
      {description ? <p className="section-description">{description}</p> : null}
    </motion.header>
  );
}
