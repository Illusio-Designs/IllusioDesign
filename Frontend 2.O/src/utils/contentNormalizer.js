// Trim runs of 4+ <br> tags down to 3 to avoid huge gaps from CMS content.
export const normalizeBrTags = (html = '') =>
  String(html).replace(/(?:<br\s*\/?>\s*){4,}/gi, '<br><br><br>');

export const normalizeContentForDisplay = (html = '') => normalizeBrTags(html);
