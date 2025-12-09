'use client';

import { useState, useEffect } from 'react';

export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const hasDarkClass = document.body.classList.contains('dark-theme');
      const savedTheme = localStorage.getItem('theme');
      setIsDark(hasDarkClass || savedTheme === 'dark');
    };

    // Check on mount
    checkTheme();

    // Watch for theme changes by observing body class changes
    const observer = new MutationObserver(() => {
      checkTheme();
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Also listen for storage changes (in case theme is changed in another tab)
    const handleStorageChange = () => {
      checkTheme();
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return isDark;
}

