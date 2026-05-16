'use client';

import { motion } from 'framer-motion';

const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: '0.5em' },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.04, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
  },
  fadeIn: {
    hidden: { opacity: 0 },
    show: (i) => ({
      opacity: 1,
      transition: { delay: i * 0.03, duration: 0.5 },
    }),
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    show: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.04, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    }),
  },
};

export default function SplitText({
  text = '',
  splitBy = 'words',
  animation = 'fadeUp',
  trigger = 'onScroll',
  className = '',
  as: Tag = 'span',
}) {
  const tokens =
    splitBy === 'chars' ? Array.from(String(text)) : String(text).split(' ');
  const v = variants[animation] || variants.fadeUp;
  const animateProps =
    trigger === 'onScroll'
      ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-80px' } }
      : { initial: 'hidden', animate: 'show' };

  return (
    <Tag className={`split-text split-${splitBy} ${className}`}>
      {tokens.map((token, i) => (
        <span key={i} className="split-token">
          <motion.span
            className="split-inner"
            custom={i}
            variants={v}
            {...animateProps}
          >
            {token}
            {splitBy === 'words' && i < tokens.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
