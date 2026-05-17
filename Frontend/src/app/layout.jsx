import '@/styles/globals.css';
import SmoothScroll from '@/components/providers/SmoothScroll';
import Toaster from '@/components/providers/Toaster';
import Analytics from '@/components/providers/Analytics';
import CookieBanner from '@/components/layout/CookieBanner';
import ScrollTop from '@/components/layout/ScrollTop';
import { buildPageMetadata } from '@/utils/seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://illusiodesigns.agency';

export async function generateMetadata() {
  const meta = await buildPageMetadata('home', {
    path: '/',
    title: 'Illusio Designs — Creative & technology-driven agency',
  });
  return {
    metadataBase: new URL(SITE_URL),
    icons: { icon: '/favicon.ico' },
    ...meta,
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster>
          <SmoothScroll>{children}</SmoothScroll>
          <ScrollTop />
          <CookieBanner />
        </Toaster>
        <Analytics />
      </body>
    </html>
  );
}
