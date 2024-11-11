import { useContext } from 'react'
import { FiltersContext } from '../filters-provider'

export const useFilters = () => {
  const filtersContext = useContext(FiltersContext)
  if (filtersContext === undefined) {
    throw new Error('useFilters must be used within a FiltersProvider')
  }

  return {
    ...filtersContext,
  }
}
