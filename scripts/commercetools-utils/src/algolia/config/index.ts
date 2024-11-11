import env from 'dotenv'
env.config()

export const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || ''
export const ALGOLIA_WRITE_API_KEY = process.env.ALGOLIA_WRITE_API_KEY || ''
export const ALGOLIA_BASE_INDEX = process.env.ALGOLIA_BASE_INDEX || ''

export const EXTENDED_ATTRIBUTES_TARGET = {
  brand: {},
  region: {},
  terroir: {},
  rating: { normalizeFn: Math.ceil },
  seller: {
    normalizeFn: (val: string) => val.split(','),
  },
  classification: {
    normalizeFn: (val: string) => val.split(','),
  },
  varietals: {
    normalizeFn: (val: string) => val.split(','),
  },
}
