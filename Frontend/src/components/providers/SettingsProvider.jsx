'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { settingsAPI } from '@/services/api';

const SettingsContext = createContext({ settings: {}, loaded: false });

/**
 * Fetches the public platform settings once and provides them to the app.
 * Settings come from the `settings` table (contact details, social links,
 * analytics IDs) and are managed from the dashboard Settings page.
 */
export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let m = true;
    settingsAPI.getPublic()
      .then((data) => {
        if (m && data && typeof data === 'object') setSettings(data);
      })
      .catch(() => {})
      .finally(() => { if (m) setLoaded(true); });
    return () => { m = false; };
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loaded }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
