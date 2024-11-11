import { useMemo } from 'react'
import {
  createRecentSearchesPlugin,
  search,
} from '@algolia/autocomplete-plugin-recent-searches'

import { LOCAL_STORAGE_KEY } from '@oriuminc/algolia'
import { createLocalStorage } from '../utils'
import { DEFAULT_CONFIG } from '../../shared'

export const useRecentSearchesPlugin = () => {
  const { getAll, onAdd, onRemove } = useMemo(() => {
    return createLocalStorage<any>({
      key: LOCAL_STORAGE_KEY,
      limit: DEFAULT_CONFIG.hitsPerPage,
      search,
    })
  }, [])

  const recentSearchesPlugin = useMemo(
    () =>
      createRecentSearchesPlugin({
        storage: {
          getAll,
          onAdd,
          onRemove,
        },
      }),
    []
  )

  const updateRecentSearch = (query: string) => {
    if (query) {
      onRemove(query)
      onAdd({ id: query, label: query })
    }
  }

  return {
    updateRecentSearch,
    onRemove,
    recentSearchesPlugin,
  }
}
