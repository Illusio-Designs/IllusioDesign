import { buildPageMetadata } from '@/utils/seo';

export async function generateMetadata() {
  return buildPageMetadata('blog', {
    path: '/journal',
    title: 'Journal — Illusio Designs',
  });
}

export default function JournalLayout({ children }) {
  return children;
}
