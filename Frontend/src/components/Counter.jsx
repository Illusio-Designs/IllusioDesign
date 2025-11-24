'use client';

import { useEffect, useRef, useState } from 'react';
import '@/styles/components/Counter.css';

const Counter = ({
  value,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
  startOnMount = false,
  className = '',
  ...props
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(startOnMount);
  const counterRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (startOnMount) {
      animateCounter();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounter();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [startOnMount, hasAnimated]);

  const animateCounter = () => {
    const startTime = performance.now();
    const startValue = 0;
    const endValue = parseFloat(value);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOut;

      setCount(currentValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const formatNumber = (num) => {
    return num.toFixed(decimals);
  };

  const displayValue = formatNumber(count);

  return (
    <span
      ref={counterRef}
      className={`counter ${className}`}
      {...props}
    >
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};

export default Counter;

