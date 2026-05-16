import '@/styles/globals.css';
import SmoothScroll from '@/components/providers/SmoothScroll';
import Toaster from '@/components/providers/Toaster';
import CookieBanner from '@/components/layout/CookieBanner';
import ScrollTop from '@/components/layout/ScrollTop';

export const metadata = {
  title: 'Illusio Designs — Product design studio',
  description:
    'Illusio Designs is a product design studio crafting UI/UX, brands and digital experiences for fintech, SaaS and DTC teams.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'Illusio Designs',
    description: 'Product design studio crafting interfaces, brands and digital experiences.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster>
          <SmoothScroll>{children}</SmoothScroll>
          <ScrollTop />
          <CookieBanner />
        </Toaster>
      </body>
    </html>
  );
}
