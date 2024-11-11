import { Section } from '@constructor-io/constructorio-ui-autocomplete'
import {
  CONSTRUCTOR_CONSTANT,
  DEFAULT_CONFIG,
  PLUGINS,
} from '../../global-search-shared'

export const buildSearchCollections = ({
  sections,
  recentSearches,
  query,
}: {
  sections: Section[]
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
  const _searchSuggestions = (
    sections.find(
      (section) =>
        (section as any).identifier ===
        CONSTRUCTOR_CONSTANT.SECTION_ID.SEARCH_SUGGESTIONS
    )?.data ?? []
  )
    .map((item) => {
      return {
        objectID: item.id,
        name: item.value,
        label: item.value,
      }
    })
    .slice(0, DEFAULT_CONFIG.hitsPerPage)

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
