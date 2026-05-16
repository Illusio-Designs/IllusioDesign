'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ToastContext = createContext({ push: () => {} });

export const useToast = () => useContext(ToastContext);

let _idCounter = 0;

export default function Toaster({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((toast) => {
    const id = ++_idCounter;
    const payload = { id, tone: 'info', duration: 4500, ...toast };
    setToasts((list) => [...list, payload]);
    return id;
  }, []);

  const remove = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    if (!toasts.length) return undefined;
    const timers = toasts.map((t) =>
      setTimeout(() => remove(t.id), t.duration),
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts, remove]);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="toaster" aria-live="polite" aria-atomic="true">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              className={`toast toast-${t.tone}`}
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              role="status"
            >
              <span className="toast-dot" />
              <div>
                {t.title ? <strong>{t.title}</strong> : null}
                {t.body ? <span>{t.body}</span> : null}
              </div>
              <button onClick={() => remove(t.id)} aria-label="Dismiss" type="button">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
