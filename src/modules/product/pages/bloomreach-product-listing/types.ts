export interface Product {
  url: string
  data: any
  thumb_image: string
  price: any
  pid: string
  title: string
  brand: string
  description: string
}

export interface BloomreachSearchParams {
  q: string[] | string | undefined
  domain_key: string | undefined
  account_id: string | undefined
  catalog_views: string | undefined
  fl: string
  search_type: string
  rows: number
  fq?: { [key: string]: string }[]
  sort?: string
  start?: number
}

export interface BloomreachSuggestionParams {
  q: string
  domain_key: string
  request_type: string
  search_type: string
  account_id: string
  catalog_views: string
}

export interface SortOptionAPI {
  sort_by: string
  display_name: string
  sort_order: string
  status: 'selected' | ''
}

interface RangeFacetAPI<T = Record<string, any>> extends BaseFacetAPI<T> {
  type: 'range'
  min: number
  max: number
}

interface BaseFacetAPI<T = Record<string, any>> {
  display_name: string
  count: number
  hidden: boolean
  name: string
}

export type FacetAPI<T = Record<string, any>> =
  | RangeFacetAPI<T>
  | BaseFacetAPI<T>

export interface FacetGroup {
  label: string
  hidden: boolean
  values: Facet[] | RangeFacet
  content: JSX.Element[]
  type: FacetType
}

export enum FacetType {
  Select,
  Range,
}

interface BloomreachFacetBase {
  count: number
  selected: boolean
}

export interface Facet extends BloomreachFacetBase {
  cat_id: string
  name: string
  crumb: string
  tree_path: string
  parent: string
}

export interface RangeFacet extends BloomreachFacetBase {
  start: number
  end: number
}

export interface SearchResultsParameters {
  parameters: {
    filters: { [key: string]: string[] }
    sortBy?: string | undefined | null
    sortOrder?: string | undefined | null
  }
  query?: string
  filterName?: string
  filterValue?: string
}
