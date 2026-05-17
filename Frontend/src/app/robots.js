const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://illusiodesigns.agency';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/login', '/register', '/ui-kit'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
