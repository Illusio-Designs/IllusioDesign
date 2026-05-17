'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * UI-kit dropdown — a styled trigger that opens a portaled menu.
 * Two modes:
 *  - option list: pass `options` ([{ value, label, style }]) + `onSelect`
 *  - custom panel: pass `panel` (a render fn receiving `close`)
 */
export default function Dropdown({
  options,
  value,
  placeholder = 'Select',
  onSelect,
  panel,
  trigger,
  triggerClassName = '',
  triggerStyle,
  title,
  onOpen,
  width,
  menuWidth = 180,
}) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState(null);
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => setMounted(true), []);

  const place = useCallback(() => {
    const r = btnRef.current?.getBoundingClientRect();
    if (r) setRect(r);
  }, []);

  const toggle = () => {
    if (!open) {
      onOpen?.();
      place();
    }
    setOpen((o) => !o);
  };

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => {
      if (btnRef.current?.contains(e.target) || menuRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [open, place]);

  const current = options?.find((o) => o.value === value);
  const triggerLabel = current ? current.label : placeholder;

  const below = !rect || rect.bottom < window.innerHeight * 0.62;
  const menuStyle = rect
    ? {
        left: rect.left,
        minWidth: Math.max(menuWidth, rect.width),
        ...(below
          ? { top: rect.bottom + 6 }
          : { bottom: window.innerHeight - rect.top + 6 }),
      }
    : {};

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        title={title}
        className={`${triggerClassName || 'kit-dd-trigger'} ${open ? 'is-open' : ''}`}
        style={{ ...(width ? { width } : {}), ...triggerStyle }}
        onMouseDown={(e) => e.preventDefault()}
        onClick={toggle}
      >
        {trigger || (
          <>
            <span className="kit-dd-label">{triggerLabel}</span>
            <svg className="kit-dd-caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </>
        )}
      </button>

      {mounted && open && rect
        ? createPortal(
            <div
              ref={menuRef}
              className={`kit-dd-menu ${below ? '' : 'is-up'}`}
              style={menuStyle}
            >
              {panel
                ? panel(close)
                : options?.map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      className={`kit-dd-opt ${o.value === value ? 'is-active' : ''}`}
                      style={o.style}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => { onSelect?.(o.value); setOpen(false); }}
                    >
                      <span>{o.label}</span>
                      {o.value === value ? (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      ) : null}
                    </button>
                  ))}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
