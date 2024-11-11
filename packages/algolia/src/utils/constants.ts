import { AlgoliaCategoyFilter } from './types'
import { AlgoliaFilter } from '@oriuminc/cms-generic'

export const DEFAULT_SORTBY = 'newest'
export const DEFAULT_QUERY_SUGGESTIONS_POSTFIX = 'query_suggestions'
export const DEFAULT_INITIAL_REFINEMENTS_LIMIT = 6
export const DEFAULT_SHOW_MORE_REFINEMENTS_LIMIT = 10
export const ALGOLIA_BASE_INDEX =
  process.env.NEXT_PUBLIC_ALGOLIA_BASE_INDEX ?? ''
export const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME ?? ''
export const LOCAL_STORAGE_KEY = 'AUTOCOMPLETE_RECENT_SEARCHES'
export const LOCAL_STORAGE_KEY_TEST =
  '__AUTOCOMPLETE_RECENT_SEARCHES_PLUGIN_TEST_KEY__'
export const ALGOLIA_CATEGORY: AlgoliaCategoyFilter = {
  attributes: [
    'hierarchicalCategories.lvl0',
    'hierarchicalCategories.lvl1',
    'hierarchicalCategories.lvl2',
  ],
  limit: 5,
  showMore: true,
}

export const LOCALES = [
  { languageCode: 'en', countryLanguageCode: 'en-US', currency: 'USD' },
  { languageCode: 'en', countryLanguageCode: 'en-CA', currency: 'CAD' },
  { languageCode: 'fr', countryLanguageCode: 'fr-CA', currency: 'CAD' },
  { languageCode: 'es', countryLanguageCode: 'es-MX', currency: 'MXN' },
] as const

export const DEFAULT_RANKING_OPTIONS = [
  'typo',
  'geo',
  'words',
  'filters',
  'proximity',
  'attribute',
  'exact',
]

export const PRIMARY_INDEX_SETTINGS = {
  attributesForFaceting: [
    'categories',
    'attributes.normalized.brand',
    'attributes.normalized.rating',
    'attributes.normalized.region',
    'attributes.normalized.terroir',
    'attributes.normalized.seller',
    'attributes.normalized.classification',
    'attributes.normalized.varietals',
  ],
  searchableAttributes: [
    'name',
    'categories',
    'attributes.normalized.brand',
    'attributes.normalized.region',
    'attributes.normalized.terroir',
    'attributes.normalized.seller',
    'attributes.normalized.classification',
    'attributes.normalized.varietals',
  ],
  ranking: [...DEFAULT_RANKING_OPTIONS, 'desc(timestampCreated)'],
}

export const REPLICAS = [
  {
    name: 'newest',
    ranking: 'desc(timestampCreated)',
  },
  {
    name: 'priceDesc',
    ranking: 'desc(price.centAmount)',
  },
  {
    name: 'priceAsc',
    ranking: 'asc(price.centAmount)',
  },
  {
    name: 'nameAsc',
    ranking: 'asc(name)',
  },
]
