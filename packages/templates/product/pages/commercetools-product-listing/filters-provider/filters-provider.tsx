'use client'

import { FacetResults, ProductProjection } from '@commercetools/platform-sdk'
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { SortOptionAPI } from '../types'

interface FiltersContextProps {
  checked: { [key: string]: boolean }
  facets: any[]
  isLoading: boolean
  items: ProductProjection[] | null
  page: number
  setChecked: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
  setFacets: React.Dispatch<React.SetStateAction<any[]>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setItems: React.Dispatch<React.SetStateAction<any>>
  setPage: React.Dispatch<React.SetStateAction<number>>
  setSortOptions: React.Dispatch<React.SetStateAction<SortOptionAPI[]>>
  setTotalResults: React.Dispatch<React.SetStateAction<number | null>>
  sortOptions: SortOptionAPI[]
  selectSortOption: (sortBy: string, sortOrder: string) => void
  totalResults: number | null
}

export const FiltersContext = createContext<FiltersContextProps | undefined>(
  undefined
)

export const FiltersProvider = ({ children }: PropsWithChildren) => {
  const [checked, setChecked] = useState({})
  const [facets, setFacets] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState<ProductProjection[] | null>(null)
  const [page, setPage] = useState(1)
  const [sortOptions, setSortOptions] = useState<SortOptionAPI[]>([
    {
      sort_by: '',
      display_name: 'Relevance',
      sort_order: '',
      status: '',
    },
    {
      sort_by: 'name',
      display_name: 'Name A-Z',
      sort_order: 'asc',
      status: '',
    },
    {
      sort_by: 'name',
      display_name: 'Name Z-A',
      sort_order: 'desc',
      status: '',
    },
    {
      sort_by: 'price',
      display_name: 'Price (Low to High)',
      sort_order: 'asc',
      status: '',
    },
    {
      sort_by: 'price',
      display_name: 'Price (High to Low)',
      sort_order: 'desc',
      status: '',
    },
  ])
  const [totalResults, setTotalResults] = useState<number | null>(null)

  const selectSortOption = useCallback(
    (sortBy: string, sortOrder: string) => {
      setSortOptions(
        Object.values(sortOptions).map((option) => ({
          ...option,
          status:
            option.sort_by === sortBy && option.sort_order === sortOrder
              ? 'selected'
              : '',
        }))
      )
    },
    [sortOptions]
  )

  const filtersContextValues: FiltersContextProps = useMemo(
    () => ({
      checked,
      facets,
      isLoading,
      items,
      page,
      sortOptions,
      totalResults,
      setChecked,
      setFacets,
      setIsLoading,
      setItems,
      setPage,
      setSortOptions,
      setTotalResults,
      selectSortOption,
    }),
    [
      checked,
      facets,
      isLoading,
      items,
      page,
      selectSortOption,
      sortOptions,
      totalResults,
    ]
  )

  return (
    <FiltersContext.Provider value={filtersContextValues}>
      {children}
    </FiltersContext.Provider>
  )
}
