import { SearchFilter, SearchSortByOption } from '@oriuminc/cms-generic'
import { useSearchParams } from 'next/navigation'
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { transformSearchSortByOptions } from './transform-cms-sort-by-options'

import type { Facet, SearchResult, SortOptionUI } from '../../types'
import { INVALID_REFINEMENT_KEYS } from '../../constants'
import { useComposable } from '@oriuminc/base'

interface CommercetoolsSearchContextProps {
  checked: Record<string, boolean>
  facets: Facet[]
  searchResult: SearchResult
  sortOptions: SortOptionUI[]
  setSearchResult: Dispatch<SetStateAction<SearchResult>>
  setSortOptions: (selectedItem: string) => void
}

interface CommercetoolsSearchProviderProps {
  isLoggedIn: boolean
  filters?: SearchFilter[]
  sortByOptions?: SearchSortByOption[]
}

const CommercetoolsSearchContext = createContext<
  CommercetoolsSearchContextProps | undefined
>(undefined)

export const CommercetoolsSearchProvider = ({
  children,
  filters,
  sortByOptions,
  isLoggedIn,
}: PropsWithChildren<CommercetoolsSearchProviderProps>) => {
  const searchParams = useSearchParams()
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [searchResult, setSearchResult] = useState<SearchResult>({
    loading: true,
    items: [],
    total: 0,
    refinements: [],
  })
  const [sortOptions, setSortOptions] = useState<SortOptionUI[]>(() =>
    transformSearchSortByOptions({ isLoggedIn, sortByOptions })
  )

  useEffect(() => {
    const tmpChecked: Record<string, boolean> = {}

    for (const [param, value] of searchParams.entries()) {
      if (INVALID_REFINEMENT_KEYS.includes(param)) {
        continue
      }

      tmpChecked[`${param}|${value}`] = true
    }

    setChecked(tmpChecked)
  }, [searchParams])

  const facets = useMemo(
    () =>
      filters?.map<Facet>((filter) => {
        const aliasFallback = filter.attribute.split('.').pop()

        return {
          model: {
            terms: {
              path: filter.attribute,
              alias: filter.urlAlias ?? aliasFallback ?? '',
              countProducts: true,
            },
          },
        }
      }) ?? [],
    [filters]
  )

  const _setSortOptions = useCallback(
    (selectedItem: string) => {
      setSortOptions((prev) =>
        prev.map((option) => ({
          ...option,
          status: option.value === selectedItem ? 'selected' : '',
        }))
      )
    },
    [setSortOptions]
  )

  const value: CommercetoolsSearchContextProps = useMemo(() => {
    return {
      checked,
      facets,
      searchResult,
      sortOptions,
      setSearchResult,
      setSortOptions: _setSortOptions,
    }
  }, [checked, facets, searchResult, sortOptions])

  return (
    <CommercetoolsSearchContext.Provider value={value}>
      {children}
    </CommercetoolsSearchContext.Provider>
  )
}

export const useCommercetoolsSearch = () => {
  const context = useContext(CommercetoolsSearchContext)

  if (!context) {
    throw new Error(
      'useCommercetoolsSearch must be used within a <CommercetoolsSearchProvider />'
    )
  }

  return context
}
