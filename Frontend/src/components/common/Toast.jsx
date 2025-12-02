'use client';

import { useEffect } from 'react';
import '@/styles/components/common/Toast.css';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <span>{message}</span>
        <button className="toast-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
}

