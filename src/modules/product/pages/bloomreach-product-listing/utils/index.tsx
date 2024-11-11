import { NextRouter } from 'next/router'
import {
  PLP_CONSTANT,
  BLOOMREACH_DEFAULT_FIELDS,
} from '../../product-listing-shared'
import { BloomreachSearchParams } from '../types'
import { getSortValue, parseUrlParameters } from './helpers'
import {
  BLOOMREACH_ACCOUNT_ID,
  generateBloomreachCatalogName,
} from '@modules/general/components/search/bloomreach-global-search/shared/constants'
import { fetchSearchHit } from '@modules/general/components/search/bloomreach-global-search/utils/bloomreachClient'

export * from './helpers'

export const fetchSearchResults = async (
  queryParams: URLSearchParams,
  hitsPerPage: number = PLP_CONSTANT.HITS_PER_PAGE,
  locale: string
) => {
  const {
    query,
    parameters,
    parameters: { filters: filters },
  } = parseUrlParameters(queryParams)

  let response
  const newParameters = {
    ...parameters,
    resultsPerPage: hitsPerPage,
  }

  const catalog = generateBloomreachCatalogName(locale)

  const { sortBy, sortOrder } = newParameters

  let searchParams: BloomreachSearchParams = {
    q: query ?? '',
    domain_key: catalog,
    fl: 'pid,title,brand,price,thumb_image,url',
    search_type: 'bestseller',
    account_id: BLOOMREACH_ACCOUNT_ID,
    catalog_views: catalog,
    rows: PLP_CONSTANT.HITS_PER_PAGE,
    sort: getSortValue(sortBy, sortOrder),
  }

  response = await fetchSearchHit(
    {
      ...searchParams,
    },
    (params) => {
      if (Object.keys(filters).length > 0) {
        Object.keys(filters)
          .filter((el) => el !== 'price' && el !== 'rating')
          .forEach((el) => {
            params.append(
              'fq',
              `${el.toLowerCase()}:${filters[el]
                .map((el) => `"${el}"`)
                .join(' OR ')}`
            )
          })

        Object.keys(filters)
          .filter((el) => el === 'price' || el === 'rating')
          .forEach((el) => {
            params.append(
              'fq',
              `${el.toLowerCase()}:[${filters[el][0].split('-').join(' TO ')}]`
            )
          })
      }
      params.append('facet.range', 'rating')
      params.append('facet.range', 'price')
      return params
    }
  )

  return response
}

export const loadMoreSearchResults = async ({
  currentPage,
  totalResults,
  queryParams,
  hitsPerPage = PLP_CONSTANT.HITS_PER_PAGE,
  locale,
}: {
  currentPage: number
  totalResults: number
  queryParams: URLSearchParams
  hitsPerPage?: number
  locale: string
}) => {
  if (PLP_CONSTANT.HITS_PER_PAGE * (currentPage - 1) >= totalResults) {
    return false
  }
  const {
    query,
    parameters,
    parameters: { filters: filters },
  } = parseUrlParameters(queryParams)
  const newParameters = {
    ...parameters,
    resultsPerPage: hitsPerPage,
    page: currentPage + 1,
  }

  const { sortBy, sortOrder } = newParameters

  const catalog = generateBloomreachCatalogName(locale)

  let response
  const startCurrent = PLP_CONSTANT.HITS_PER_PAGE * currentPage

  let searchParams: BloomreachSearchParams = {
    q: queryParams.get('query') ?? '',
    fl: BLOOMREACH_DEFAULT_FIELDS.fields,
    search_type: 'bestseller',
    domain_key: catalog,
    account_id: BLOOMREACH_ACCOUNT_ID,
    catalog_views: catalog,
    rows: PLP_CONSTANT.HITS_PER_PAGE,
    sort: getSortValue(sortBy, sortOrder),
    start: startCurrent,
  }

  response = await fetchSearchHit(
    {
      ...searchParams,
    },
    (params) => {
      if (Object.keys(filters).length > 0) {
        Object.keys(filters)
          .filter((el) => el !== 'price' && el !== 'rating')
          .forEach((el) => {
            params.append(
              'fq',
              `${el.toLowerCase()}:${filters[el]
                .map((el) => `"${el}"`)
                .join(' OR ')}`
            )
          })

        Object.keys(filters)
          .filter((el) => el === 'price' || el === 'rating')
          .forEach((el) => {
            params.append(
              'fq',
              `${el.toLowerCase()}:[${filters[el][0].split('-').join(' TO ')}]`
            )
          })
      }
      params.append('facet.range', 'rating')
      params.append('facet.range', 'price')
      return params
    }
  )

  return response?.response
}
