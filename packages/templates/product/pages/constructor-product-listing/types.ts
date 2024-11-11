export interface SortOptionAPI {
  sort_by: string
  display_name: string
  sort_order: string
  status: 'selected' | ''
}

export interface FacetsOption<T = Record<string, any>> {
  status: string
  count: number
  display_name: string
  value: string
  data: T
}

interface BaseFacetAPI<T = Record<string, any>> {
  data: T
  display_name: string
  hidden: boolean
  name: string
  options: FacetsOption<T>[]
}

interface RangeFacetAPI<T = Record<string, any>> extends BaseFacetAPI<T> {
  type: 'range'
  min: number
  max: number
}

interface MultipleFacetAPI<T = Record<string, any>> extends BaseFacetAPI<T> {
  type: 'multiple'
}

export type FacetAPI<T = Record<string, any>> =
  | RangeFacetAPI<T>
  | MultipleFacetAPI<T>
