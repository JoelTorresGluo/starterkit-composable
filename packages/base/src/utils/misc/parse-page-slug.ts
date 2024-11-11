/**
 *   If the slug is an array, join it with '/' to create a string. This supports deeply nested page route slugs
 *  @param { string | string[]} rawSlug - The slug to parse
 *  @returns {string} single string containing the url pathname for the route
 *  @example parsePageSlug(['sales', 'seasonal', 'shoes']) // 'sales/seasonal/shoes'
 *
 * @remarks Use this for generic content pages. Not needed in product or category pages as they don't have nested slugs
 *  */
export const parsePageSlug = (rawSlug?: string | string[]) => {
  return Array.isArray(rawSlug) ? rawSlug.join('/') : rawSlug
}
