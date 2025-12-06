'use client';

import '@/styles/components/common/Loader.css';

export default function Loader({ size = 'medium', className = '' }) {
  return (
    <div className={`loader-wrapper ${className}`}>
      <div className={`loader-spinner loader-${size}`}>
        <div className="loader-circle"></div>
      </div>
    </div>
  );
}

