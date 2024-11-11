import { StarterKitProduct } from '../product-listing-shared'

export type { SortOptionUI } from '../product-listing-shared'

export interface Facet {
  model: {
    terms: {
      path: string
      alias: string
      countProducts: boolean
    }
  }
}

export interface RefinementBase {
  attribute: string
  label: string
  hidden: boolean
}

export interface RefinementRangeItem extends RefinementBase {
  type: 'range'
  min: number
  max: number
}

export interface RefinementListItem extends RefinementBase {
  type: 'list'
  items: Array<{
    label: string
    value: string
    count: number
  }>
}

export interface RefinementNumericItem extends RefinementBase {
  type: 'numeric'
  items: Array<{
    label: string
    value: string
    count: number
  }>
}

export type CommercetoolsRefinement =
  | RefinementRangeItem
  | RefinementListItem
  | RefinementNumericItem

export interface SearchResult {
  loading?: boolean
  items: StarterKitProduct[]
  total: number
  refinements: CommercetoolsRefinement[]
}

interface SearchFilterBase {
  missing?: {
    path: string
  }
  exists?: {
    path: string
  }
  tree?: {
    path: string
    rootValues: string[]
    subTreeValues: string[]
  }
}
interface SearchFilterRange extends SearchFilterBase {
  model: {
    range: {
      path: string
      ranges: Array<{ from: string; to: string }>
    }
  }
}

interface SearchFilterValue extends SearchFilterBase {
  model: {
    value: {
      path: string
      values: string[]
    }
  }
}

interface SearchFilterString {
  string: string
}

export type SearchFilter =
  | SearchFilterValue
  | SearchFilterRange
  | SearchFilterString
