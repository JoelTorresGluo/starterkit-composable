export const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME ?? ''
export const BLOOMREACH_AUTO_SUGGEST_HOST =
  process.env.NEXT_PUBLIC_BLOOMREACH_AUTO_SUGGEST_HOST ?? ''
export const BLOOMREACH_SEARCH_HOST =
  process.env.NEXT_PUBLIC_BLOOMREACH_SEARCH_HOST ?? ''

export const BLOOMREACH_ACCOUNT_ID =
  process.env.NEXT_PUBLIC_BLOOMREACH_ACCOUNT_ID ?? ''

export const BLOOMREACH_BASE_CATALOG_NAME =
  process.env.NEXT_PUBLIC_BLOOMREACH_BASE_CATALOG_NAME ?? ''

export const generateBloomreachCatalogName = (locale: string) => {
  if (!BLOOMREACH_BASE_CATALOG_NAME) {
    throw Error(
      'generateBloomreachCatalogName: Unable to initiate Bloomreach. Ensure environment variable NEXT_PUBLIC_BLOOMREACH_BASE_CATALOG_NAME .'
    )
  }
  if (!locale) {
    throw Error(
      'generateBloomreachCatalogName: Unable to initiate Bloomreach. Locale is undefined.'
    )
  }
  return `${BLOOMREACH_BASE_CATALOG_NAME}_${locale
    .replace('-', '_')
    .toLowerCase()}`
}
