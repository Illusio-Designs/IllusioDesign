import { blogAPI, caseStudyAPI } from '@/services/api';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://illusiodesigns.agency';

const STATIC_PATHS = [
  { path: '', priority: 1, freq: 'weekly' },
  { path: '/about', priority: 0.8, freq: 'monthly' },
  { path: '/services', priority: 0.9, freq: 'monthly' },
  { path: '/work', priority: 0.9, freq: 'weekly' },
  { path: '/journal', priority: 0.8, freq: 'weekly' },
  { path: '/careers', priority: 0.7, freq: 'weekly' },
  { path: '/contact', priority: 0.7, freq: 'monthly' },
  { path: '/privacy', priority: 0.3, freq: 'yearly' },
  { path: '/terms', priority: 0.3, freq: 'yearly' },
];

const safeDate = (v, fallback) => {
  if (!v) return fallback;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? fallback : d;
};

export default async function sitemap() {
  const now = new Date();

  const base = STATIC_PATHS.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));

  let dynamic = [];
  try {
    const [blogs, projects] = await Promise.all([
      blogAPI.getAllPublic().catch(() => []),
      caseStudyAPI.getAllPublic().catch(() => []),
    ]);

    const blogUrls = (Array.isArray(blogs) ? blogs : [])
      .filter((b) => b && (b.slug || b.id))
      .map((b) => ({
        url: `${SITE_URL}/journal/${b.slug || b.id}`,
        lastModified: safeDate(b.updatedAt || b.publishDate, now),
        changeFrequency: 'monthly',
        priority: 0.6,
      }));

    const projectUrls = (Array.isArray(projects) ? projects : [])
      .filter((p) => p && p.id)
      .map((p) => ({
        url: `${SITE_URL}/work/${p.id}`,
        lastModified: safeDate(p.updatedAt, now),
        changeFrequency: 'monthly',
        priority: 0.6,
      }));

    dynamic = [...blogUrls, ...projectUrls];
  } catch {
    dynamic = [];
  }

  return [...base, ...dynamic];
}
