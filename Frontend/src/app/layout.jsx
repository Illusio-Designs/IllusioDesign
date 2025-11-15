export const metadata = {
  title: 'Next.js App',
  description: 'Created with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
