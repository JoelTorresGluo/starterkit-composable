import { useCallback, useEffect, useState } from 'react'
import {
  BLOOMREACH_AUTO_SUGGEST_HOST,
  BLOOMREACH_ACCOUNT_ID,
  BLOOMREACH_SEARCH_HOST,
  generateBloomreachCatalogName,
} from '../shared/constants'
import { useIntl } from 'react-intl'
import {
  BloomreachSearchParams,
  BloomreachSuggestionParams,
} from '@oriuminc/templates/product/pages/bloomreach-product-listing/types'
import { HEADER_SEARCH_ROWS } from '@modules/product/pages/product-listing-shared'

export interface BloomreachConfig {
  accountId: number
  catalogViews: string
  url: string
  refUrl: string
  _br_uid_2: string
}

export interface BloomreachProductList {
  pid: string
  brand: string
  price: number
  url: string
  title: string
  thumb_image?: string
}

export interface BloomreachSearchSuggestResponse {
  queryContext: {
    originalQuery: string
  }
  suggestionGroups: {
    catalogName: string
    view: string
    querySuggestions: {
      query: string
      displayText: string
    }[]
  }[]
}

export const fetchSuggestions = (
  params: BloomreachSuggestionParams
): Promise<any> => {
  const searchParams = new URLSearchParams(params as any)
  return fetch(
    `${BLOOMREACH_AUTO_SUGGEST_HOST}?${searchParams.toString()}`
  ).then((res) => res.json())
}

export const fetchSearchHit = (
  params: BloomreachSearchParams,
  prefetch?: (params: URLSearchParams) => URLSearchParams
): Promise<any> => {
  let searchParams = new URLSearchParams({
    ...params,
    url: window.location.href,
    ref_url: window.location.origin,
    request_type: 'search',
  } as any)

  searchParams = prefetch?.(searchParams) ?? searchParams

  return fetch(`${BLOOMREACH_SEARCH_HOST}?${searchParams.toString()}`).then(
    (res) => res.json()
  )
}

export function useBloomreachAutoComplete(): {
  setQuery: any
  suggestionGroups: {
    bloomReachSuggestResponse: BloomreachSearchSuggestResponse
    bloomReachSearchResponse: BloomreachProductList[]
  }
} {
  const { locale } = useIntl()
  const [_query, _setQuery] = useState('')
  const [_suggestionGroups, _setSuggestionGroups] = useState<
    BloomreachSearchSuggestResponse | {}
  >({})
  const [_searchHits, _setSearchHits] = useState<any>({})
  const abortController = new AbortController()

  const setQuery = useCallback((query: string) => {
    abortController.abort()
    _setQuery(query)
  }, [])

  useEffect(() => {
    const asyncCall = async () => {
      try {
        const catalogName = generateBloomreachCatalogName(locale)
        let searchParams: BloomreachSearchParams = {
          q: _query ?? '',
          fl: 'pid,title,brand,price,thumb_image,url',
          search_type: _query ? 'keyword' : 'bestseller',
          domain_key: catalogName,
          account_id: BLOOMREACH_ACCOUNT_ID,
          catalog_views: catalogName,
          rows: HEADER_SEARCH_ROWS,
        }

        let suggestionParams: BloomreachSuggestionParams = {
          q: _query ?? '',
          request_type: 'suggest',
          search_type: 'suggest',
          domain_key: catalogName,
          account_id: BLOOMREACH_ACCOUNT_ID,
          catalog_views: catalogName,
        }

        const suggestions = await fetchSuggestions(suggestionParams)
        const hits = await fetchSearchHit(searchParams)
        _setSuggestionGroups(suggestions)
        _setSearchHits(hits)
      } catch (error: any) {
        if (
          process.env.NODE_ENV === 'development' &&
          error.name === 'AbortError'
        ) {
          console.warn('Fetch Bloomreach Suggestions aborted')
        }
      }
    }

    asyncCall()
  }, [_query, locale])

  return {
    setQuery,
    suggestionGroups: {
      bloomReachSuggestResponse:
        _suggestionGroups as BloomreachSearchSuggestResponse,
      bloomReachSearchResponse: _searchHits?.response
        ?.docs as BloomreachProductList[],
    },
  }
}
