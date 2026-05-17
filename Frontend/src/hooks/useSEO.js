'use client';

import { useEffect } from 'react';
import { seoAPI } from '@/services/api';

const setMeta = (selector, attrs) => {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    Object.entries(attrs.create || {}).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  if (attrs.content != null) el.setAttribute('content', attrs.content);
};

export default function useSEO(page) {
  useEffect(() => {
    if (!page) return;
    let mounted = true;
    seoAPI
      .getByPagePublic(page)
      .then((seo) => {
        if (!mounted || !seo) return;
        if (seo.title) document.title = seo.title;
        if (seo.description) {
          setMeta('meta[name="description"]', {
            create: { name: 'description' },
            content: seo.description,
          });
        }
        if (seo.keywords) {
          setMeta('meta[name="keywords"]', {
            create: { name: 'keywords' },
            content: seo.keywords,
          });
        }
        if (seo.ogTitle) {
          setMeta('meta[property="og:title"]', {
            create: { property: 'og:title' },
            content: seo.ogTitle,
          });
        }
        if (seo.ogDescription) {
          setMeta('meta[property="og:description"]', {
            create: { property: 'og:description' },
            content: seo.ogDescription,
          });
        }
        if (seo.ogImage) {
          setMeta('meta[property="og:image"]', {
            create: { property: 'og:image' },
            content: seo.ogImage,
          });
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [page]);
}
