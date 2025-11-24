'use client';

import { useEffect, useRef, useState } from 'react';
import '@/styles/components/ScrollReveal.css';

const ScrollReveal = ({
  children,
  animation = 'fadeUp', // 'fadeUp', 'fadeIn', 'fadeDown', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'scale', 'rotate'
  delay = 0, // delay before animation starts
  duration = 0.6, // animation duration
  distance = 50, // distance for slide animations (in px)
  threshold = 0.1, // intersection observer threshold (0-1)
  className = '',
  as = 'div', // HTML element type
  once = true, // animate only once or every time it enters viewport
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.disconnect();
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
  }, [threshold, once]);

  const Component = as;

  return (
    <Component
      ref={containerRef}
      className={`scroll-reveal scroll-reveal-${animation} ${className}`}
      style={{
        '--delay': `${delay}s`,
        '--duration': `${duration}s`,
        '--distance': `${distance}px`,
        animationPlayState: isVisible ? 'running' : 'paused',
      }}
      data-visible={isVisible}
      {...props}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;

