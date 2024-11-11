export const PLP_CONSTANT = {
  HITS_PER_PAGE: 6,
  REFINEMENTS_SHOW_LIMIT: 6,
}
export const RecommendedSearchesPlaceholder = [
  'wine',
  'accessories',
  'wine set',
  'accessories set',
]

export const CONSTRUCTOR_DEFAULT_CATEGORY = {
  filterName: 'type',
  filterValue: process.env.NEXT_PUBLIC_CONSTRUCTOR_DEFAULT_CATEGORY ?? 'wine',
}
export const BLOOMREACH_DEFAULT_CATEGORY = {
  filterName: 'category',
  filterValue: process.env.NEXT_PUBLIC_CONSTRUCTOR_DEFAULT_CATEGORY ?? 'wine',
}
export const BLOOMREACH_DEFAULT_SORT = {
  sortBy: 'title',
  sortOrder: 'asc',
}
export const BLOOMREACH_DEFAULT_FIELDS = {
  fields: 'pid,title,brand,price,thumb_image,url',
}

export const BLOOMREACH_DEFAULT_QUERY = {
  searchType: 'suggestion',
  searchValue: process.env.NEXT_PUBLIC_BLOOMREACH_DEFAULT_QUERY_SUGGESTION,
}

export const COMMERCETOOLS_DEFAULT_CATEGORY = {
  filterName: 'type',
  filterValue: process.env.NEXT_PUBLIC_COMMERCETOOLS_DEFAULT_CATEGORY ?? 'wine',
}

export const HEADER_SEARCH_ROWS = 5
