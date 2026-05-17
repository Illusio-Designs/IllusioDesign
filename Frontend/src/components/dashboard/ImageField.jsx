'use client';

import { useEffect, useRef, useState } from 'react';
import { resolveImage } from '@/services/api';

/**
 * Cover-image upload field with live preview.
 * `value` is a File (new upload) or null; `existing` is a previously saved URL.
 */
export default function ImageField({ label = 'Cover image', value, existing, onChange, hint }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreview('');
    return undefined;
  }, [value]);

  const shown = preview || (existing ? resolveImage(existing) : '');

  return (
    <div className="field">
      <label>{label}</label>
      <div className="img-field">
        {shown ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={shown} alt="" className="img-field-preview" />
        ) : (
          <div className="img-field-empty" aria-hidden>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
        <div className="img-field-actions">
          <button type="button" className="dash-row-action" onClick={() => inputRef.current?.click()}>
            {shown ? 'Change image' : 'Upload image'}
          </button>
          {value ? (
            <button type="button" className="dash-row-action" onClick={() => onChange(null)}>Remove</button>
          ) : null}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; if (f) onChange(f); }}
        />
      </div>
      {hint ? <span className="field-hint">{hint}</span> : null}
    </div>
  );
}
