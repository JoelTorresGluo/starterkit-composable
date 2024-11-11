import { ALGOLIA_BASE_INDEX } from '@modules/general'
import {
  BRAND_NAME,
  DEFAULT_QUERY_SUGGESTIONS_POSTFIX,
  DEFAULT_SORTBY,
} from '@oriuminc/algolia'
import {
  AlgoliaIndexNameResolver,
  AlgoliaQuerySuggestionsIndexNameResolver,
} from '@oriuminc/base'

// TODO: Refactor this, one resolve for multiple index name
export const algoliaIndexNameResolver: AlgoliaIndexNameResolver = ({
  locale,
  sortBy = DEFAULT_SORTBY,
}: {
  locale: string
  sortBy?: string | false
  isLoggedIn?: boolean
}) => {
  return sortBy === false
    ? `${ALGOLIA_BASE_INDEX}_${BRAND_NAME}_${locale}`
    : `${ALGOLIA_BASE_INDEX}_${BRAND_NAME}_${locale}_${sortBy}`
}

export const algoliaQuerySuggestionsIndexNameResolver: AlgoliaQuerySuggestionsIndexNameResolver =
  ({
    locale,
    sortBy = DEFAULT_SORTBY,
    querySuggestionsPostfix = DEFAULT_QUERY_SUGGESTIONS_POSTFIX,
  }) => {
    return `${ALGOLIA_BASE_INDEX}_${BRAND_NAME}_${locale}_${sortBy}_${querySuggestionsPostfix}`
  }
