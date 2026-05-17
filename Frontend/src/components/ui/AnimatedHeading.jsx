'use client';

import { motion } from 'framer-motion';

const wordVariants = {
  hidden: { y: '120%', opacity: 0 },
  show: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function AnimatedHeading({
  text,
  as: Tag = 'h1',
  className = '',
  delay = 0,
}) {
  const lines = Array.isArray(text) ? text : [text];

  return (
    <Tag className={`animated-heading ${className}`} aria-label={lines.join(' ')}>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="ah-line">
          {String(line)
            .split(' ')
            .map((word, wordIdx) => {
              const isAccent = word.startsWith('*') && word.endsWith('*');
              const cleaned = isAccent ? word.slice(1, -1) : word;
              return (
                <span key={`${lineIdx}-${wordIdx}`} className="ah-word-wrap">
                  <motion.span
                    custom={lineIdx * 5 + wordIdx + delay * 10}
                    variants={wordVariants}
                    initial="hidden"
                    animate="show"
                    className={`ah-word ${isAccent ? 'is-accent' : ''}`}
                  >
                    {cleaned}
                  </motion.span>
                </span>
              );
            })}
        </span>
      ))}
    </Tag>
  );
}
