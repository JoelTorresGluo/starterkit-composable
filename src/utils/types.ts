import { AlgoliaProduct } from '../types'
import {
  UseNumericMenuProps,
  UseRefinementListProps,
  UseRangeProps,
} from 'react-instantsearch'
import { AlgoliaFilterBase } from '@oriuminc/cms-generic'

/**
 * This type MUST correspond to the postfix name of an index in Algolia, ex [BASE_INDEX_NAME]_[SortByOption]
 */
export type SortByOption = 'newest' | 'priceAsc' | 'priceDesc' | 'nameAsc'

export type AlgoliaCategoyFilter = {
  attributes: string[]
  limit: number
  showMore: boolean
}

export interface NumericMenuProps
  extends UseNumericMenuProps,
    AlgoliaFilterBase {}
export interface RefinementListProps
  extends UseRefinementListProps,
    AlgoliaFilterBase {}
export interface RangeProps extends UseRangeProps, AlgoliaFilterBase {}

export type StarterKitAlgoliaProduct = AlgoliaProduct & {
  //custom typings go here
  attributes: {
    normalized: {
      brand: string
      rating: number
    }
    raw: {
      brand: string
      rating: number
    }
  }
}
