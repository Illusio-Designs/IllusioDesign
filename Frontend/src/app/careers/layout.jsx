import { buildPageMetadata } from '@/utils/seo';

export async function generateMetadata() {
  return buildPageMetadata('career', {
    path: '/careers',
    title: 'Careers — Illusio Designs',
  });
}

export default function CareersLayout({ children }) {
  return children;
}
