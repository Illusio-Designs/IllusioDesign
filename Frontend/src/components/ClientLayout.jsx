'use client';

import { useEffect } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClientLayout({ children }) {
  useEffect(() => {
    // Prevent zoom with keyboard shortcuts (Ctrl/Cmd + Plus/Minus/0)
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
        e.preventDefault();
        return false;
      }
    };

    // Prevent zoom with mouse wheel + Ctrl
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        return false;
      }
    };

    // Prevent pinch zoom on touch devices (only when multiple touches)
    const handleTouchStart = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Prevent gesture zoom (IE/Edge)
    const handleGestureStart = (e) => {
      e.preventDefault();
    };

    // Set viewport meta tag dynamically
    const setViewport = () => {
      let viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        document.getElementsByTagName('head')[0].appendChild(viewport);
      }
      viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no';
    };

    setViewport();

    // Prevent zoom
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('gesturestart', handleGestureStart);
    document.addEventListener('gesturechange', handleGestureStart);
    document.addEventListener('gestureend', handleGestureStart);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('gesturestart', handleGestureStart);
      document.removeEventListener('gesturechange', handleGestureStart);
      document.removeEventListener('gestureend', handleGestureStart);
    };
  }, []);

  return (
    <AuthProvider>
      {children}
      <ThemeToggle />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthProvider>
  );
}

