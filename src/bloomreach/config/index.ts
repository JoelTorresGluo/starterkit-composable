import env from 'dotenv'
env.config()

export const LOCAL_CURRENCY: { [key: string]: string } = {
  'en-US': 'USD',
  'en-CA': 'CAD',
  'fr-CA': 'CAD',
  'es-MX': 'MXN',
}

export const BLOOMREACH_HOST_PROD = process.env.BLOOMREACH_HOST_PROD ?? ''
export const BLOOMREACH_HOST_STAGING = process.env.BLOOMREACH_HOST_STAGING ?? ''

export const BLOOMREACH_BRAND1 = process.env.BLOOMREACH_BRAND1 ?? ''
export const BLOOMREACH_BRAND2 = process.env.BLOOMREACH_BRAND2 ?? ''

export const BLOOMREACH_BRAND1_ACCOUNT_ID =
  process.env.BLOOMREACH_BRAND1_ACCOUNT_ID ?? ''
export const BLOOMREACH_BRAND1_BASE_CATALOG_NAME =
  process.env.BLOOMREACH_BRAND1_BASE_CATALOG_NAME ?? ''
export const BLOOMREACH_BRAND1_API_KEY =
  process.env.BLOOMREACH_BRAND1_API_KEY ?? ''

export const BLOOMREACH_BRAND2_ACCOUNT_ID =
  process.env.BLOOMREACH_BRAND2_ACCOUNT_ID ?? ''
export const BLOOMREACH_BRAND2_BASE_CATALOG_NAME =
  process.env.BLOOMREACH_BRAND2_BASE_CATALOG_NAME ?? ''
export const BLOOMREACH_BRAND2_API_KEY =
  process.env.BLOOMREACH_BRAND2_API_KEY ?? ''

export interface BloomreachBrandConfig {
  accountId: string
  apiKey: string
  baseCatalogName: string
}

interface BloomreachConfiguration {
  [key: string]: BloomreachBrandConfig
}
export const getBloomreachConfiguration = () => {
  const config: BloomreachConfiguration = {
    [BLOOMREACH_BRAND1]: {
      accountId: BLOOMREACH_BRAND1_ACCOUNT_ID,
      apiKey: BLOOMREACH_BRAND1_API_KEY,
      baseCatalogName: BLOOMREACH_BRAND1_BASE_CATALOG_NAME,
    },
    [BLOOMREACH_BRAND2]: {
      accountId: BLOOMREACH_BRAND2_ACCOUNT_ID,
      apiKey: BLOOMREACH_BRAND2_API_KEY,
      baseCatalogName: BLOOMREACH_BRAND2_BASE_CATALOG_NAME,
    },
  }

  return config
}
