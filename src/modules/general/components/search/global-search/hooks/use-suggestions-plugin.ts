import { useMemo } from 'react'
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions'
import type { SearchClient } from 'algoliasearch/lite'
import type { AutocompletePlugin } from '@algolia/autocomplete-core'
import type { RecentSearchesPluginData } from '@algolia/autocomplete-plugin-recent-searches'
import { DEFAULT_CONFIG } from '../../shared'

export const useSuggestionsPlugin = ({
  querySuggestionsIndexName,
  recentSearchesPlugin,
  searchClient,
}: {
  querySuggestionsIndexName: string
  recentSearchesPlugin: AutocompletePlugin<any, RecentSearchesPluginData<any>>
  searchClient: SearchClient
}) => {
  const suggestionsPlugin = useMemo(() => {
    return createQuerySuggestionsPlugin({
      searchClient,
      indexName: querySuggestionsIndexName,
      getSearchParams() {
        return recentSearchesPlugin.data!.getAlgoliaSearchParams({
          hitsPerPage: DEFAULT_CONFIG.hitsPerPage,
        })
      },
    })
  }, [searchClient, querySuggestionsIndexName, recentSearchesPlugin])

  return {
    suggestionsPlugin,
  }
}
