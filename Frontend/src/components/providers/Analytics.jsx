'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const CONSENT_KEY = 'illusio_cookie_consent';

/**
 * Loads Google Analytics 4 and the Meta (Facebook) Pixel — but only after the
 * visitor accepts cookies, and only when the corresponding env var is set:
 *   NEXT_PUBLIC_GA_ID         e.g. G-XXXXXXXXXX
 *   NEXT_PUBLIC_FB_PIXEL_ID   e.g. 1234567890
 */
export default function Analytics() {
  const [consented, setConsented] = useState(false);

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

  if (!consented || (!GA_ID && !FB_PIXEL_ID)) return null;

  return (
    <>
      {GA_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}

      {FB_PIXEL_ID ? (
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
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}
    </>
  );
}
