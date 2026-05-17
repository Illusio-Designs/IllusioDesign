import { buildPageMetadata } from '@/utils/seo';

export async function generateMetadata() {
  return buildPageMetadata('about', {
    path: '/about',
    title: 'About — Illusio Designs',
  });
}

export default function AboutLayout({ children }) {
  return children;
}
