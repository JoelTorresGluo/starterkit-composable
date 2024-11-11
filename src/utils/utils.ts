import { IndexUiState } from 'instantsearch.js/es/types'
import { ALGOLIA_CATEGORY } from './constants'
import { AlgoliaFilter, AlgoliaSortByOption } from '@oriuminc/cms-generic'

export const getSortByFromIndex = ({
  indexName,
  locale,
  indexNameResolver,
  sortByOptions,
}: {
  indexName: string
  locale: string
  indexNameResolver?: (props: {
    locale: string
    sortBy?: string
    isLoggedIn?: boolean
  }) => string
  sortByOptions: AlgoliaSortByOption[]
}) => {
  return sortByOptions.reduce<string | undefined>((acc, { value: sortBy }) => {
    return indexNameResolver?.({ locale, sortBy }) === indexName ? sortBy : acc
  }, undefined)
}

export const getRouteFilters = (
  algoliaStateFilters:
    | IndexUiState['refinementList']
    | IndexUiState['numericMenu']
    | IndexUiState['range'],
  filtersConfig: AlgoliaFilter[]
) => {
  return Object.entries(algoliaStateFilters || {}).reduce<
    Record<string, string>
  >((acc, [filter, values]) => {
    const filterAlias = getFilterAttributeUrlAlias(filter, filtersConfig)
    if (filterAlias) {
      return {
        ...acc,
        [filterAlias]: values,
      }
    }
    return acc
  }, {})
}

export const getRouteHierarchicalMenu = (hierarchicalMenu?: {
  [rootAttribute: string]: string[]
}) => {
  // this function is not needed, but keeping it for sake of following same pattern
  return hierarchicalMenu
}

interface FilterState {
  numericMenu?: {
    [attribute: string]: string
  }
  refinementList?: {
    [attribute: string]: string[]
  }
  range?: {
    [attribute: string]: string
  }
}

export const getAlgoliaHierarchicalMenu = (filters: Record<string, string>) => {
  let hierarchicalMenu: any = {}
  ALGOLIA_CATEGORY?.attributes.forEach((attribute: string) => {
    if (filters[attribute]) {
      hierarchicalMenu[attribute] = filters[attribute]
    }
  })
  return {
    hierarchicalMenu,
  }
}

export const getAlgoliaStateFilters = (
  filters: Record<string, string>,
  filtersConfig: AlgoliaFilter[]
) => {
  return Object.entries(filters || {}).reduce<FilterState>(
    (acc, [filterAlias, value]) => {
      const fullAttribute = getFilterRawAttribute(filterAlias, filtersConfig)
      if (!fullAttribute) return acc
      const { attribute, type } = fullAttribute
      switch (type) {
        case 'list':
          const previousValue = acc.refinementList?.[attribute] || []
          return {
            ...acc,
            refinementList: {
              ...acc.refinementList,
              // @ts-ignore
              [attribute]: [
                ...previousValue,
                ...(Array.isArray(value) ? value : [value]),
              ],
            },
          }
        case 'numeric':
          return {
            ...acc,
            numericMenu: {
              ...acc.numericMenu,
              [attribute]: value,
            },
          }
        case 'range':
          return {
            ...acc,
            range: {
              ...acc.range,
              [attribute]: value,
            },
          }
      }
    },
    {}
  )
}

export const getFacetFilterFromParams = (params: string): string => {
  const match = params.match(/facetFilters=\["categories: (.*?)"\]/)
  return match ? match[1] : ''
}

const getFilterAttributeUrlAlias = (
  rawAttribute: string,
  filters: AlgoliaFilter[]
) => {
  const filter = filters.find((filter) => filter.attribute === rawAttribute)
  return filter?.urlAlias || filter?.attribute
}

const getFilterRawAttribute = (
  attributeAlias: string,
  filters: AlgoliaFilter[]
) => {
  return filters.find(
    (filter) =>
      filter.urlAlias === attributeAlias || filter.attribute === attributeAlias
  )
}
