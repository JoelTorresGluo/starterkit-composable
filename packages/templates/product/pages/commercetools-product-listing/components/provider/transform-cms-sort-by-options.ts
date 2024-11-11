import { SearchSortByOption } from '@oriuminc/cms-generic'
import { SortOptionUI } from '../../types'

interface TransformSearchSortByOptions {
  isLoggedIn: boolean
  sortByOptions?: SearchSortByOption[]
}

export const transformSearchSortByOptions = ({
  isLoggedIn,
  sortByOptions,
}: TransformSearchSortByOptions) => {
  return (
    (sortByOptions ?? [])
      .filter((option) => (isLoggedIn ? true : !option.value.includes('price')))
      .map<SortOptionUI>((option) => ({
        ...option,
        id: option.value,
        status: '',
      })) ?? []
  )
}
