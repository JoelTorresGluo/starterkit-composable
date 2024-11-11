import { NextRouter } from 'next/router'
import { DEFAULT_CONFIG } from '../../../../general/components/global-search-shared'
import {
  PLP_CONSTANT,
  CONSTRUCTOR_DEFAULT_CATEGORY,
} from '../../product-listing-shared'
import ConstructorIO from '@constructor-io/constructorio-client-javascript'

interface SearchResultsParameters {
  parameters: {
    filters: { [key: string]: string[] }
    sortBy?: string
    sortOrder?: string
  }
  query?: string
  key?: string
  filterName?: string
  filterValue?: string
  i?: string
  s?: string
  ui?: string
}

export const parseUrlParameters = (
  router: NextRouter
): SearchResultsParameters => {
  if (!router || !router.query) return {} as SearchResultsParameters
  const { query } = router
  const searchResultsParameters: SearchResultsParameters = {
    parameters: {
      filters: {},
      // sortBy: null,
      // sortOrder: null,
    },
  }

  for (const key of Object.keys(query)) {
    const value = query[key] as string
    if (!value) continue

    switch (key) {
      // Custom functionality - allows usage of cnstrc request urls in the search bar
      case 'i':
        searchResultsParameters.i = value
        break
      case 's':
        searchResultsParameters.s = value
        break
      case 'ui':
        searchResultsParameters.ui = value
        break
      case 'filterName':
        searchResultsParameters.filterName = value
        break
      case 'filterValue':
        searchResultsParameters.filterValue = value
        break
      case 'key':
        searchResultsParameters.key = value
        break

      // Standard functionality
      case 'query':
        searchResultsParameters.query = value
        break
      case 'sortBy':
        searchResultsParameters.parameters.sortBy = value
        break
      case 'sortOrder':
        searchResultsParameters.parameters.sortOrder = value
        break
      case 'group_id':
        // @ts-ignore
        searchResultsParameters.parameters.filters.group_id = value
        break

      default:
        // Handling filters separately because their keys have dynamic parts
        const filterMatch = key.match(/filters\[(\w+)\]/)
        if (filterMatch?.length) {
          const filterName = filterMatch[1]

          // Replace each ", " with "/_/"
          const tempValue = value.replace(/, /g, '/__temp__/')

          // Now split the values
          const splitValues = tempValue.split(',')

          // Replace back "/_/" to ", "
          const originalValues = splitValues.map((v) =>
            v.replace('/__temp__/', ', ')
          )

          searchResultsParameters.parameters.filters[filterName] =
            originalValues
        }

        break
    }
  }

  return searchResultsParameters
}

export const updateUrlParameters = (
  router: NextRouter,
  updatedParams: Partial<SearchResultsParameters>
) => {
  if (!router || !router.query) return

  const existingParams = parseUrlParameters(router)

  // Merge the existing parameters with the updated ones
  const newParams = {
    ...existingParams,
    ...updatedParams,
    parameters: {
      ...existingParams.parameters,
      ...updatedParams.parameters,
      filters: {
        ...updatedParams.parameters?.filters,
      },
    },
  }

  // Create a new query string from these parameters
  const newQueryString = new URLSearchParams()

  for (const [key, value] of Object.entries(newParams)) {
    switch (key) {
      case 'parameters':
        for (const [subKey, subValue] of Object.entries(value)) {
          if (subKey === 'filters') {
            for (const [filterKey, filterValue] of Object.entries(
              subValue as Record<string, string[]>
            )) {
              newQueryString.set(`filters[${filterKey}]`, filterValue.join(','))
            }
          } else {
            newQueryString.set(subKey, subValue as string)
          }
        }
        break
      default:
        newQueryString.set(key, value as string)
        break
    }
  }

  // return the new query string
  return newQueryString.toString()
}

export const fetchSearchResults = async (
  router: NextRouter,
  cioClient: ConstructorIO | undefined,
  hitsPerPage: number = PLP_CONSTANT.HITS_PER_PAGE
) => {
  const { query, parameters, filterName, filterValue } =
    parseUrlParameters(router)

  let response

  const newParameters = {
    ...parameters,
    resultsPerPage: hitsPerPage,
  }

  if (filterName && filterValue) {
    response = await cioClient?.browse.getBrowseResults(
      filterName,
      filterValue,
      newParameters
    )
  } else if (query) {
    response = await cioClient?.search.getSearchResults(query, newParameters)
  } else {
    response = await cioClient?.browse.getBrowseResults(
      CONSTRUCTOR_DEFAULT_CATEGORY.filterName,
      CONSTRUCTOR_DEFAULT_CATEGORY.filterValue,
      newParameters
    )
  }

  return response?.response
}

export const fetchAutoCompleteResults = (
  query: string,
  cioClient: ConstructorIO
) =>
  cioClient.autocomplete.getAutocompleteResults(query, {
    resultsPerSection: {
      Products: DEFAULT_CONFIG.hitsPerPage,
      'Search Suggestions': DEFAULT_CONFIG.hitsPerPage,
    },
  })

export const loadMoreSearchResults = async ({
  currentPage,
  totalResults,
  router,
  hitsPerPage = PLP_CONSTANT.HITS_PER_PAGE,
  cioClient,
}: {
  currentPage: number
  totalResults: number
  router: NextRouter
  hitsPerPage?: number
  cioClient: ConstructorIO | undefined
}) => {
  if (PLP_CONSTANT.HITS_PER_PAGE * (currentPage - 1) >= totalResults) {
    return false
  }
  const { query, parameters, filterName, filterValue } =
    parseUrlParameters(router)
  const newParameters = {
    ...parameters,
    resultsPerPage: hitsPerPage,
    page: currentPage + 1,
  }
  let response

  if (filterName && filterValue) {
    response = await cioClient?.browse.getBrowseResults(
      filterName,
      filterValue,
      newParameters
    )
  } else if (query) {
    response = await cioClient?.search.getSearchResults(query, newParameters)
  } else {
    response = await cioClient?.browse.getBrowseResults(
      CONSTRUCTOR_DEFAULT_CATEGORY.filterName,
      CONSTRUCTOR_DEFAULT_CATEGORY.filterValue,
      newParameters
    )
  }

  return response?.response
}

export const fetchBrowseReults = async (
  filterName: string,
  filterValue: string,
  router: NextRouter,
  cioClient: ConstructorIO | undefined
) => {
  const { parameters } = parseUrlParameters(router)
  const response = await cioClient?.browse.getBrowseResults(
    filterName,
    filterValue,
    parameters
  )

  return response?.response
}

export const getDisplayRange = ({
  name,
  range,
}: {
  name: string
  range: [number, number]
}) => {
  switch (name.toLocaleLowerCase()) {
    case 'rating':
      return [`${range[0]}`, `${range[1]}`]
    case 'price_cad':
    case 'price_usd':
      return [`$${Math.floor(range[0] / 100)}`, `$${Math.ceil(range[1] / 100)}`]
    default:
      return range
  }
}

export const capFirstLetter = (str: string) => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// export const fetchRecommendations = async (podId: string) => {
//   // To avoid zero results, we apply a filter to enable backfilling via "filtered_items" strategy
// const response = await cioClient.recommendations.getRecommendations(podId, {
//   numResults: DEFAULT_CONFIG.hitsPerPage,
//   filters: { group_id: 'AP01' },
// })

//   return response
// }
