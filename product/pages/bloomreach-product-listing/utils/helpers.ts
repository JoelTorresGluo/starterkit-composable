import { NextRouter } from 'next/router'
import {
  BloomreachSearchParams,
  FacetGroup,
  FacetType,
  SearchResultsParameters,
} from '../types'

export const parseFacets = (facet_counts: {
  [key: string]: { [key: string]: any | any[] }
}): FacetGroup[] => {
  let { facets } = facet_counts

  let result = (facets as any[])?.reduce?.((prev, current) => {
    let values = []
    let type =
      current.type === 'number_stats' ? FacetType.Range : FacetType.Select

    if (type === FacetType.Select) {
      values = (current?.value as any[])?.map?.((value) => ({
        ...value,
        ...(value.cat_id ? { name: value.cat_name } : {}),
      }))
    } else {
      values = current?.value
    }

    return [
      ...prev,
      {
        label: capFirstLetter(current.name),
        hidden: false,
        type,
        values,
      },
    ]
  }, [] as FacetGroup[])

  return result
}

export const parseUrlParameters = (
  router: NextRouter
): SearchResultsParameters => {
  if (!router || !router.query) return {} as SearchResultsParameters
  const { query } = router
  const searchResultsParameters: SearchResultsParameters = {
    parameters: {
      filters: {},
      sortBy: null,
      sortOrder: null,
    },
  }

  for (const key of Object.keys(query)) {
    const value = query[key] as string
    if (!value) continue

    switch (key) {
      // Custom functionality - allows usage of cnstrc request urls in the search bar
      case 'filters':
        searchResultsParameters.filterName = value
        break
      case 'filterValue':
        searchResultsParameters.filterValue = value
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

export const getSortValue = (
  sortBy: string | null | undefined,
  sortOrder: string | null | undefined
) => {
  if (
    sortBy !== 'null' &&
    sortOrder !== 'null' &&
    sortBy !== null &&
    sortOrder !== null
  ) {
    return sortBy + ' ' + sortOrder
  } else {
    return ''
  }
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
