export enum SearchDataType {
  COLLECTION = 'collection',
  HIT = 'hit',
}
export type BaseItem = Record<string, unknown>
export interface AutocompleteState {
  activeItemId: number | null
  query: string
  completion: string | null
  collections: {
    source: {
      sourceId: string
    }
    items: BaseItem[]
  }[]
  isOpen: boolean
  status: 'idle' | 'loading' | 'stalled' | 'error' | string
  context?: any
}

export interface CollectionItemProps {
  index: number
  name: string
  slug: null
  subType: string
  type: SearchDataType.COLLECTION
  [key: string]: any // to include any other properties from item
}
export interface HitItem {
  index: number
  name: string
  slug: string
  subType: 'product'
  type: SearchDataType.HIT
  [key: string]: any // to include any other properties from hit
}
export interface BaseHitProps {
  [key: string]: any
}
