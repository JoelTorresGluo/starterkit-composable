'use client'

import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import { SortOptionAPI, FacetAPI, Product, Facet, FacetGroup } from '../types'
//import { Product } from '@constructor-io/constructorio-ui-autocomplete'

interface FiltersContextProps {
  checked: { [key: string]: boolean }
  facets: FacetGroup[]
  isLoading: boolean
  items: Product[] | null
  page: number
  setChecked: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
  setFacets: React.Dispatch<React.SetStateAction<FacetGroup[]>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setItems: React.Dispatch<React.SetStateAction<Product[] | null>>
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

export interface FiltersProvider {
  children: React.ReactElement
}
export const FiltersProvider = ({ children }: FiltersProvider) => {
  const [checked, setChecked] = useState({})
  const [facets, setFacets] = useState<FacetGroup[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState<Product[] | null>(null)
  const [page, setPage] = useState(1)
  const [sortOptions, setSortOptions] = useState<SortOptionAPI[]>([
    {
      sort_by: '',
      display_name: 'Relevance',
      sort_order: '',
      status: '',
    },
    {
      sort_by: 'title',
      display_name: 'Name A-Z',
      sort_order: 'asc',
      status: '',
    },
    {
      sort_by: 'title',
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
      sortOptions,
      totalResults,
      selectSortOption,
    ]
  )

  useEffect(() => {}, [])

  return (
    <FiltersContext.Provider value={filtersContextValues}>
      {children}
    </FiltersContext.Provider>
  )
}
