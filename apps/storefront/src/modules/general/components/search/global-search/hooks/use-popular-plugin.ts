import { useMemo } from 'react'
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions'
import type { SearchClient } from 'algoliasearch/lite'
import { DEFAULT_CONFIG, PLUGINS } from '../../shared/constants'

export const usePopularPlugin = ({
  searchClient,
  querySuggestionsIndexName,
}: {
  querySuggestionsIndexName: string
  searchClient: SearchClient
}) => {
  const popularPlugin = useMemo(() => {
    return createQuerySuggestionsPlugin({
      searchClient,
      indexName: querySuggestionsIndexName,
      getSearchParams() {
        return {
          query: DEFAULT_CONFIG.popularQuery,
          hitsPerPage: DEFAULT_CONFIG.hitsPerPage,
        }
      },
      transformSource({ source }) {
        return {
          ...source,
          sourceId: PLUGINS.POPULAR_SEARCHES_PLUGIN,
        }
      },
    })
  }, [searchClient, querySuggestionsIndexName])

  return {
    popularPlugin,
  }
}
