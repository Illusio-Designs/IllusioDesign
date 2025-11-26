import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata = {
  title: 'Illusio Designs',
  description: 'Creative Design Solutions',
  icons: {
    icon: '/images/IllusioDesignLogoicon.webp',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
