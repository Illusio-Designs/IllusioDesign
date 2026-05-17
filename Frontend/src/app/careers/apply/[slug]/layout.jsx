import { positionAPI } from '@/services/api';

export async function generateMetadata({ params }) {
  let position = null;
  try {
    position = await positionAPI.getBySlugPublic(params.slug);
  } catch {
    position = null;
  }
  const title = position?.title
    ? `Apply: ${position.title} — Illusio Designs`
    : 'Apply — Illusio Designs';
  const description = position?.description
    ? String(position.description).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160)
    : 'Apply for a role at Illusio Designs.';
  return {
    title,
    description,
    alternates: { canonical: `/careers/apply/${params.slug}` },
    robots: { index: false },
  };
}

export default function ApplyLayout({ children }) {
  return children;
}
