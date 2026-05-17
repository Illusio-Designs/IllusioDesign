import { buildPageMetadata } from '@/utils/seo';

export async function generateMetadata() {
  return buildPageMetadata('case-study', {
    path: '/work',
    title: 'Work — Illusio Designs',
  });
}

export default function WorkLayout({ children }) {
  return children;
}
