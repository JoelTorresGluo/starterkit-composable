import { Suggestion } from '@commercetools/platform-sdk'
import { PLUGINS } from '../../global-search-shared'
import { slugify } from './slugify'

export const buildSearchCollections = ({
  suggestions,
  recentSearches,
  query,
}: {
  suggestions: Suggestion[]
  recentSearches: { id: string; label: string }[]
  query: string
}) => {
  const _recentSearches = recentSearches.map(
    (item: { id: string; label: string }) => {
      return {
        objectID: item.id,
        name: item.label,
        label: item.label,
      }
    }
  )

  const _searchSuggestions = suggestions.map(({ text }, index) => ({
    objectID: `${slugify(text)}_${index}`,
    name: text,
    label: text,
  }))

  return {
    collections: [
      {
        items: _recentSearches,
        source: {
          sourceId: PLUGINS.RECENT_SEARCHES_PLUGIN,
        },
      },
      {
        items: _searchSuggestions,
        source: {
          sourceId: PLUGINS.SEARCH_SUGGESTIONS_PLUGIN,
        },
      },
    ],
    completion: null,
    context: {},
    isOpen: true,
    query: query,
    activeItemId: null,
    status: 'idle',
  }
}
