import { caseStudyAPI } from '@/services/api';
import { buildItemMetadata } from '@/utils/seo';

export async function generateMetadata({ params }) {
  let project = null;
  try {
    project = await caseStudyAPI.getByIdPublic(params.slug);
  } catch {
    project = null;
  }
  return buildItemMetadata(project, {
    fallbackTitle: 'Work',
    path: `/work/${params.slug}`,
  });
}

export default function WorkDetailLayout({ children }) {
  return children;
}
