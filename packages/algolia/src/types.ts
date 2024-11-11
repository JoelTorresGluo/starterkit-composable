type Image = {
  url: string
  dimensions?: { w: number; h: number }
  label?: string
}

//This exists to satisfy Algolia's generics expectations
type BaseHit = Record<string, unknown>

export interface AlgoliaProduct extends BaseHit {
  objectID: string
  key?: string
  slug: string
  name: string
  description?: string
  categories: Array<string>
  attributes?: Record<string, Record<string, string | number>>
  image?: Image
  price: {
    centAmount: number
    currency: Locale['currency']
  }
  timestampCreated: number
}

export type Locale = {
  languageCode: 'en' | 'fr' | 'es'
  countryLanguageCode: 'en-US' | 'en-CA' | 'fr-CA' | 'es-MX'
  currency: 'USD' | 'CAD' | 'MXN'
}
