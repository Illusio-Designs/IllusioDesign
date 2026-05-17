import { buildPageMetadata } from '@/utils/seo';

export async function generateMetadata() {
  return buildPageMetadata('contact', {
    path: '/contact',
    title: 'Contact — Illusio Designs',
  });
}

export default function ContactLayout({ children }) {
  return children;
}
