type AutocompleteStatus = 'idle' | 'loading' | 'stalled' | 'error'
export const DEFAULT_AUTOCOMPLETE_STATE = {
  collections: [],
  completion: null,
  context: {},
  isOpen: true,
  query: '',
  activeItemId: null,
  status: 'idle' as AutocompleteStatus,
}
export const PLUGINS = {
  RECENT_SEARCHES_PLUGIN: 'recentSearchesPlugin',
  POPULAR_SEARCHES_PLUGIN: 'popularSearchesPlugin',
  SEARCH_SUGGESTIONS_PLUGIN: 'querySuggestionsPlugin',
}
export const SOURCE_ID_TO_TRANSLATION_ID: Record<string, string> = {
  recentSearchesPlugin: 'text.recentSearches',
  popularSearchesPlugin: 'text.popularSearches',
  querySuggestionsPlugin: 'text.suggestions',
}
export const DEFAULT_CONFIG = {
  hitsPerPage: 5,
  /**
   * Used when there's no query (empty input, usually when the search component loads)
   * the query to the Algolia query suggestions index needs to be done with at least
   * a space character for it to return some results.
   * */
  popularQuery: ' ',
}
export const DEBOUNCE_TIME = 300
export const Z_INDEX = {
  INPUT_GROUP: 999,
  RESULTS: 998,
  OVERLAY: 997,
}
export const CONSTRUCTOR_CONSTANT = {
  SECTION_ID: {
    PRODUCTS: 'Products',
    SEARCH_SUGGESTIONS: 'Search Suggestions',
  },
  RECENT_SEARCHES_KEY: 'CONSTRUCTOR_RECENT_SEARCHES_KEY',
  LOCAL_STORAGE_KEY_TEST: '__AUTOCOMPLETE_RECENT_SEARCHES_TEST_KEY__',
}

export const BLOOMREACH_CONSTANT = {
  SECTION_ID: {
    PRODUCTS: 'Products',
    SEARCH_SUGGESTIONS: 'Search Suggestions',
  },
  RECENT_SEARCHES_KEY: 'BLOOMREACH_RECENT_SEARCHES_KEY',
  LOCAL_STORAGE_KEY_TEST: '__AUTOCOMPLETE_RECENT_SEARCHES_TEST_KEY__',
}

export const COMMERCETOOLS_CONSTANT = {
  SECTION_ID: {
    PRODUCTS: 'Products',
    SEARCH_SUGGESTIONS: 'Search Suggestions',
  },
  RECENT_SEARCHES_KEY: 'COMMERCETOOLS_RECENT_SEARCHES_KEY',
  LOCAL_STORAGE_KEY_TEST: '__AUTOCOMPLETE_RECENT_SEARCHES_TEST_KEY__',
}
