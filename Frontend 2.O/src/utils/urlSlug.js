export const toSlug = (str = '') =>
  String(str)
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');

const serviceSlugMap = {
  'Branding & Design': 'branding-design',
  'Web & App Development': 'web-app-development',
  'Digital Marketing': 'digital-marketing',
  'UI/UX Design': 'ui-ux-design',
  'UI / UX Design': 'ui-ux-design',
  'B2B & Custom Solutions': 'b2b-solutions',
};

export const serviceNameToSlug = (name = '') =>
  serviceSlugMap[name] || toSlug(name);

export const slugToServiceName = (slug = '') => {
  const entry = Object.entries(serviceSlugMap).find(([, v]) => v === slug);
  if (entry) return entry[0];
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
};
