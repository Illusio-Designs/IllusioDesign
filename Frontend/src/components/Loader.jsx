'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import '@/styles/components/Loader.css';

export default function Loader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Minimum display time for loader (2 seconds)
    const minDisplayTime = setTimeout(() => {
      setProgress(100);
      clearInterval(progressInterval);
      setIsAnimating(false);
      // Fade out animation
      setTimeout(() => {
        setIsVisible(false);
        if (onComplete) {
          onComplete();
        }
      }, 600); // Fade out duration
    }, 2000);

    return () => {
      clearTimeout(minDisplayTime);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`loader-overlay ${isAnimating ? 'is-loading' : 'is-fading'}`}>
      {/* Animated background gradient */}
      <div className="loader-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Floating particles */}
      <div className="particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>

      <div className="loader-container">
        {/* Rotating rings */}
        <div className="loader-rings">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
          <div className="ring ring-3"></div>
        </div>

        {/* Logo with glow effect */}
        <div className="loader-logo-wrapper">
          <div className="logo-glow"></div>
          <Image
            src="/images/IllusioDesignLogoicon.webp"
            alt="Illusio Design Logo"
            width={80}
            height={80}
            className="loader-logo"
            priority
          />
        </div>

        {/* Progress bar */}
        <div className="loader-progress-container">
          <div className="loader-progress-bar">
            <div 
              className="loader-progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="loader-progress-text">{progress}%</span>
        </div>

        {/* Loading text */}
        <div className="loader-text">
          <span className="loader-text-char">L</span>
          <span className="loader-text-char">o</span>
          <span className="loader-text-char">a</span>
          <span className="loader-text-char">d</span>
          <span className="loader-text-char">i</span>
          <span className="loader-text-char">n</span>
          <span className="loader-text-char">g</span>
          <span className="loader-text-char">.</span>
          <span className="loader-text-char">.</span>
          <span className="loader-text-char">.</span>
        </div>
      </div>
    </div>
  );
}

