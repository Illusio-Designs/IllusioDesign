import { seoAPI, resolveImage } from '@/services/api';

const SITE_NAME = 'Illusio Designs';
const DEFAULT_DESCRIPTION =
  'Illusio Designs is a creative and technology-driven agency building brands, web, mobile and custom B2B experiences — from strategy through launch.';

/**
 * Build a Next.js metadata object from the SEO API (server-side).
 * `pageKey` is the SEO record key (home, about, blog, case-study, career, contact).
 * `fallback` supplies defaults when the API has no record for the page.
 */
export async function buildPageMetadata(pageKey, fallback = {}) {
  let seo = null;
  try {
    seo = await seoAPI.getByPagePublic(pageKey);
  } catch {
    seo = null;
  }

  const title = seo?.title || fallback.title || SITE_NAME;
  const description = seo?.description || fallback.description || DEFAULT_DESCRIPTION;
  const keywords = seo?.keywords || fallback.keywords || undefined;
  const image = seo?.ogImage ? resolveImage(seo.ogImage) : fallback.image || undefined;
  const ogTitle = seo?.ogTitle || title;
  const ogDescription = seo?.ogDescription || description;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    ...(fallback.path ? { alternates: { canonical: fallback.path } } : {}),
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      siteName: SITE_NAME,
      type: fallback.type || 'website',
      ...(fallback.path ? { url: fallback.path } : {}),
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      ...(image ? { images: [image] } : {}),
    },
  };
}

/**
 * Build metadata for a single content item (blog post / case study).
 */
export function buildItemMetadata(item, { fallbackTitle, path } = {}) {
  if (!item) {
    return { title: `${fallbackTitle || SITE_NAME} — ${SITE_NAME}` };
  }
  const rawTitle = item.seoTitle || item.title || fallbackTitle || SITE_NAME;
  const title = `${rawTitle} — ${SITE_NAME}`;
  const description =
    item.metaDescription || item.excerpt || item.summary || DEFAULT_DESCRIPTION;
  const image = item.image ? resolveImage(item.image) : undefined;
  const keywords = item.seoKeywords || undefined;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    ...(path ? { alternates: { canonical: path } } : {}),
    openGraph: {
      title: rawTitle,
      description,
      siteName: SITE_NAME,
      type: 'article',
      ...(path ? { url: path } : {}),
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: rawTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
