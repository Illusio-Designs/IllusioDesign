'use client';

import { useEffect, useRef, useState } from 'react';
import '@/styles/components/SplitText.css';

const SplitText = ({
  children,
  splitBy = 'words', // 'words' or 'chars'
  animation = 'fadeUp', // 'fadeUp', 'fadeIn', 'slideUp', 'scale'
  delay = 0.05, // delay between each segment
  duration = 0.6, // animation duration
  className = '',
  as = 'span', // HTML element type
  trigger = 'onMount', // 'onMount' or 'onScroll'
  once = true, // animate only once
  threshold = 0.1, // observer threshold
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(trigger === 'onMount');
  const [segments, setSegments] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!children) return;

    const text = typeof children === 'string' ? children : children.toString();
    
    if (splitBy === 'words') {
      const words = text.split(/(\s+)/).filter(segment => segment.trim() !== '');
      setSegments(words);
    } else {
      const chars = text.split('');
      setSegments(chars);
    }
  }, [children, splitBy]);

  useEffect(() => {
    if (trigger !== 'onScroll' || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [trigger, once, threshold]);

  const Component = as;

  return (
    <Component
      ref={containerRef}
      className={`split-text ${className}`}
      data-animation={animation}
      data-split-by={splitBy}
      data-visible={isVisible}
      {...props}
    >
      {segments.map((segment, index) => {
        const isWhitespace = /^\s+$/.test(segment);
        
        return (
          <span
            key={index}
            className={`split-text-segment ${isWhitespace ? 'whitespace' : ''}`}
            style={{
              '--delay': `${index * delay}s`,
              '--duration': `${duration}s`,
            }}
          >
            {segment}
          </span>
        );
      })}
    </Component>
  );
};

export default SplitText;

