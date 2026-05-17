import { blogAPI } from '@/services/api';
import { buildItemMetadata } from '@/utils/seo';

export async function generateMetadata({ params }) {
  let post = null;
  try {
    post = await blogAPI.getBySlugPublic(params.slug);
  } catch {
    post = null;
  }
  return buildItemMetadata(post, {
    fallbackTitle: 'Journal',
    path: `/journal/${params.slug}`,
  });
}

export default function JournalPostLayout({ children }) {
  return children;
}
