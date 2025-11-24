'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import '@/styles/components/Counter.css';

function Number({ mv, number, height }) {
  let y = useTransform(mv, latest => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });
  return (
    <motion.span className="counter-number" style={{ y }}>
      {number}
    </motion.span>
  );
}

function Digit({ place, value, height, digitStyle }) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace, {
    stiffness: 100,
    damping: 30
  });
  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);
  return (
    <div className="counter-digit" style={{ height, ...digitStyle }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

export default function Counter({
  value,
  fontSize = 100,
  padding = 0,
  places,
  gap = 8,
  borderRadius = 4,
  horizontalPadding = 8,
  textColor = '#EC691F',
  fontWeight = 700,
  containerStyle,
  counterStyle,
  digitStyle,
  gradientHeight = 16,
  gradientFrom = 'transparent',
  gradientTo = 'transparent',
  topGradientStyle,
  bottomGradientStyle,
  startOnMount = false,
  className = ''
}) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const counterRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(startOnMount);

  // Calculate places based on value if not provided
  const calculatedPlaces = places || (() => {
    const digits = Math.floor(value).toString().length;
    const placeArray = [];
    for (let i = digits - 1; i >= 0; i--) {
      placeArray.push(Math.pow(10, i));
    }
    return placeArray.length > 0 ? placeArray : [1];
  })();

  useEffect(() => {
    if (startOnMount) {
      setAnimatedValue(value);
      setHasAnimated(true);
      return;
    }

    // Check if element is already visible on mount
    if (counterRef.current) {
      const rect = counterRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible && !hasAnimated) {
        setHasAnimated(true);
        setAnimatedValue(value);
        return;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            setAnimatedValue(value);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [startOnMount, hasAnimated, value]);

  const height = fontSize + padding;
  const defaultCounterStyle = {
    fontSize,
    gap: gap,
    borderRadius: borderRadius,
    paddingLeft: horizontalPadding,
    paddingRight: horizontalPadding,
    color: textColor,
    fontWeight: fontWeight
  };
  const defaultTopGradientStyle = {
    height: gradientHeight,
    background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`
  };
  const defaultBottomGradientStyle = {
    height: gradientHeight,
    background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`
  };
  
  return (
    <div className={`counter-container ${className}`} ref={counterRef} style={containerStyle}>
      <div className="counter-counter" style={{ ...defaultCounterStyle, ...counterStyle }}>
        {calculatedPlaces.map(place => (
          <Digit key={place} place={place} value={animatedValue} height={height} digitStyle={digitStyle} />
        ))}
      </div>
      <div className="gradient-container">
        <div className="top-gradient" style={topGradientStyle ? topGradientStyle : defaultTopGradientStyle}></div>
        <div
          className="bottom-gradient"
          style={bottomGradientStyle ? bottomGradientStyle : defaultBottomGradientStyle}
        ></div>
      </div>
    </div>
  );
}
