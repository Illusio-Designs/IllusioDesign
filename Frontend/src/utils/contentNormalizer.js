/**
 * Normalizes HTML content by preserving all intentional spacing
 * Only removes truly excessive breaks (4+ consecutive <br> tags)
 * This preserves the exact spacing you see in the dashboard editor on public pages
 * 
 * @param {string} html - The HTML content to normalize
 * @returns {string} - Normalized HTML content
 */
export function normalizeBrTags(html) {
  if (!html || typeof html !== 'string') {
    return html || '';
  }
  
  // Preserve all intentional spacing (1, 2, or 3 <br> tags)
  // Only remove truly excessive breaks (4+ consecutive <br> tags) and replace with 2
  // This ensures spacing in dashboard matches spacing on public pages
  
  let normalized = html
    // Replace <br> or <br/> tags (case insensitive) with a placeholder
    .replace(/<br\s*\/?>/gi, '<BR_TAG>')
    // Replace 4 or more consecutive placeholders (with optional whitespace) with 2 placeholders
    // This preserves single, double, and triple breaks but removes excessive ones (4+)
    .replace(/(<BR_TAG>\s*){4,}/g, '<BR_TAG><BR_TAG>')
    // Replace the placeholder back with <br>
    .replace(/<BR_TAG>/g, '<br>');
  
  return normalized;
}

/**
 * Normalizes content before saving to database
 * Preserves intentional paragraph spacing (double <br> tags) while cleaning excessive breaks
 * This ensures the spacing you create in the dashboard is preserved on public pages
 * 
 * @param {string} content - The content to normalize
 * @returns {string} - Normalized content
 */
export function normalizeContentForSave(content) {
  if (!content || typeof content !== 'string') {
    return content || '';
  }
  
  // Don't normalize - preserve all spacing as-is to match dashboard display
  // The user wants the exact spacing they see in the editor
  return content;
}

/**
 * Normalizes content before displaying
 * Preserves intentional paragraph spacing (double <br> tags) while cleaning excessive breaks
 * This ensures the spacing matches what you see in the dashboard editor
 * 
 * @param {string} content - The content to normalize
 * @returns {string} - Normalized content
 */
export function normalizeContentForDisplay(content) {
  if (!content || typeof content !== 'string') {
    return content || '';
  }
  
  // Only remove excessive breaks (3+), preserve double breaks for paragraph spacing
  return normalizeBrTags(content);
}

