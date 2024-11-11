export const getSlug = (productName: string) => {
  return productName
    .trim()
    .toLocaleLowerCase()
    .replace('&', 'and')
    .replace(/\s/g, '-')
    .replace(/[^\w-]/g, '-')
}
