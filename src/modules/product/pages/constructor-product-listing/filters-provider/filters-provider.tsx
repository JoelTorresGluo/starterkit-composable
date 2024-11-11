'use client'

import React, { createContext, useState, useEffect, useMemo } from 'react'
import { SortOptionAPI, FacetAPI } from '../types'
import { Product } from '@constructor-io/constructorio-ui-autocomplete'

interface FiltersContextProps {
  checked: { [key: string]: boolean }
  facets: FacetAPI[]
  isLoading: boolean
  items: Product[] | null
  page: number
  setChecked: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
  setFacets: React.Dispatch<React.SetStateAction<FacetAPI[]>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setItems: React.Dispatch<React.SetStateAction<Product[] | null>>
  setPage: React.Dispatch<React.SetStateAction<number>>
  setSortOptions: React.Dispatch<React.SetStateAction<SortOptionAPI[]>>
  setTotalResults: React.Dispatch<React.SetStateAction<number | null>>
  sortOptions: SortOptionAPI[]
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
  const [facets, setFacets] = useState<FacetAPI[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState<Product[] | null>(null)
  const [page, setPage] = useState(1)
  const [sortOptions, setSortOptions] = useState<SortOptionAPI[]>([])
  const [totalResults, setTotalResults] = useState<number | null>(null)

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
    }),
    [checked, facets, isLoading, items, page, sortOptions, totalResults]
  )

  useEffect(() => {}, [])

  return (
    <FiltersContext.Provider value={filtersContextValues}>
      {children}
    </FiltersContext.Provider>
  )
}
