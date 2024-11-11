export const slugify = (text: string, separator: string = '-'): string =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, separator)
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, separator)
