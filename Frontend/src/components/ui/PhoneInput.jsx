'use client';

import { useEffect, useRef, useState } from 'react';

export const COUNTRIES = [
  { code: 'in', dial: '+91', name: 'India' },
  { code: 'us', dial: '+1', name: 'United States' },
  { code: 'gb', dial: '+44', name: 'United Kingdom' },
  { code: 'ae', dial: '+971', name: 'United Arab Emirates' },
  { code: 'ca', dial: '+1', name: 'Canada' },
  { code: 'au', dial: '+61', name: 'Australia' },
  { code: 'sg', dial: '+65', name: 'Singapore' },
  { code: 'de', dial: '+49', name: 'Germany' },
  { code: 'fr', dial: '+33', name: 'France' },
  { code: 'nl', dial: '+31', name: 'Netherlands' },
  { code: 'jp', dial: '+81', name: 'Japan' },
  { code: 'sa', dial: '+966', name: 'Saudi Arabia' },
  { code: 'za', dial: '+27', name: 'South Africa' },
  { code: 'nz', dial: '+64', name: 'New Zealand' },
  { code: 'ie', dial: '+353', name: 'Ireland' },
  { code: 'es', dial: '+34', name: 'Spain' },
  { code: 'it', dial: '+39', name: 'Italy' },
  { code: 'br', dial: '+55', name: 'Brazil' },
];

export default function PhoneInput({
  country = 'in',
  number = '',
  onCountryChange,
  onNumberChange,
  error,
  id = 'phone',
  placeholder = 'Phone number',
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapRef = useRef(null);

  const selected = COUNTRIES.find((c) => c.code === country) || COUNTRIES[0];

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.dial.includes(query),
  );

  return (
    <div className={`phone-input ${error ? 'has-error' : ''}`} ref={wrapRef}>
      <div className="phone-input-shell">
        <button
          type="button"
          className="phone-country"
          onClick={() => setOpen((v) => !v)}
          aria-label="Select country"
          aria-expanded={open}
        >
          <img
            src={`https://flagcdn.com/w40/${selected.code}.png`}
            alt={selected.name}
            width={22}
            height={16}
          />
          <span>{selected.dial}</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <input
          id={id}
          type="tel"
          inputMode="numeric"
          className="phone-number"
          value={number}
          placeholder={placeholder}
          onChange={(e) => onNumberChange?.(e.target.value.replace(/[^\d\s-]/g, ''))}
        />
      </div>

      {open ? (
        <div className="phone-dropdown">
          <input
            className="phone-search"
            placeholder="Search country…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <ul>
            {filtered.map((c) => (
              <li key={`${c.code}-${c.dial}`}>
                <button
                  type="button"
                  className={c.code === country ? 'is-active' : ''}
                  onClick={() => {
                    onCountryChange?.(c.code);
                    setOpen(false);
                    setQuery('');
                  }}
                >
                  <img
                    src={`https://flagcdn.com/w40/${c.code}.png`}
                    alt=""
                    width={22}
                    height={16}
                  />
                  <span className="phone-c-name">{c.name}</span>
                  <span className="phone-c-dial">{c.dial}</span>
                </button>
              </li>
            ))}
            {filtered.length === 0 ? (
              <li className="phone-empty">No match</li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export const dialFor = (code) =>
  (COUNTRIES.find((c) => c.code === code) || COUNTRIES[0]).dial;
