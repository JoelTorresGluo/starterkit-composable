export enum SearchItemType {
  HitItem = 0,
  SuggestionItem = 1,
  RecentSearchItem = 2,
}

export interface HitItem {
  index: number
  pId: string
  label: string
  slug: string
  thumb_image?: string
  type: SearchItemType.HitItem
  [key: string]: any
}
export interface SuggestionItem {
  index: number
  label: string
  type: SearchItemType.SuggestionItem
}
export interface RecentSearchItem {
  index: number
  id: string
  label: string
  type: SearchItemType.RecentSearchItem
}

export interface BrPixelProps {
  pageType: string
  pageLabels?: string
  type?: string
  searchTerm?: string
  title?: string
  viewId?: string
  userId?: string
  categoryId?: string
  prodId?: string
  prodName?: string
  sku?: string
}
