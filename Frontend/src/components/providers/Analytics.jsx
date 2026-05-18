'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { settingsAPI } from '@/services/api';

const ENV_GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';
const ENV_FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';
const CONSENT_KEY = 'illusio_cookie_consent';

/**
 * Loads Google Analytics 4 and the Meta (Facebook) Pixel — but only after the
 * visitor accepts cookies.
 *
 * The GA / Pixel IDs come from the platform settings managed in the dashboard
 * (`ga_measurement_id`, `facebook_pixel_id`), falling back to the build-time
 * env vars NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_FB_PIXEL_ID if a setting is empty.
 */
export default function Analytics() {
  const [consented, setConsented] = useState(false);
  const [gaId, setGaId] = useState(ENV_GA_ID);
  const [fbPixelId, setFbPixelId] = useState(ENV_FB_PIXEL_ID);

  // Resolve the analytics IDs from platform settings.
  useEffect(() => {
    let active = true;
    settingsAPI.getPublic()
      .then((settings) => {
        if (!active || !settings) return;
        if (settings.ga_measurement_id) setGaId(settings.ga_measurement_id);
        if (settings.facebook_pixel_id) setFbPixelId(settings.facebook_pixel_id);
      })
      .catch(() => {
        // Keep the env-var fallback values on failure.
      });
    return () => { active = false; };
  }, []);

  // Track cookie consent.
  useEffect(() => {
    const read = () => {
      try {
        setConsented(localStorage.getItem(CONSENT_KEY) === 'accepted');
      } catch {
        setConsented(false);
      }
    };
    read();
    window.addEventListener('storage', read);
    window.addEventListener('illusio:cookie-consent', read);
    return () => {
      window.removeEventListener('storage', read);
      window.removeEventListener('illusio:cookie-consent', read);
    };
  }, []);

  if (!consented || (!gaId && !fbPixelId)) return null;

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}

      {fbPixelId ? (
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${fbPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}
    </>
  );
}
