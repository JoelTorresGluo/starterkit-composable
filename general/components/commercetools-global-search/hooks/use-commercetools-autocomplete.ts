import { ProductProjection, Suggestion } from '@commercetools/platform-sdk'
import { LocaleAndCurrency, useComposable } from '@oriuminc/base'
import { useEffect, useRef, useState } from 'react'
import { DEFAULT_CONFIG } from '../../global-search-shared'
import { SdkClient } from '../shared'
import { createSdkClient } from '../utils'

interface SearchProps extends LocaleAndCurrency {
  client: SdkClient
  query: string
  customerGroupId?: string
  limit?: number
  offset?: number
  priceChannel?: string
}

export function useCtAutocomplete({ channelId }: { channelId?: string }) {
  const clientRef = useRef<SdkClient>()
  const { locale, currency } = useComposable()
  const [query, setQuery] = useState('')
  const [hits, setHits] = useState<ProductProjection[]>([])
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

  if (!clientRef.current) {
    clientRef.current = createSdkClient()
  }

  useEffect(() => {
    const search = async () => {
      const _hits = await fetchSearchHit({
        client: clientRef.current!,
        priceChannel: channelId,
        query,
        locale,
        currency,
      })

      const _suggestions = await fetchSuggestions({
        client: clientRef.current!,
        query,
        locale,
        currency,
      })

      setSuggestions(_suggestions)
      setHits(_hits)
    }

    search()
  }, [channelId, currency, locale, query])

  return { query, setQuery, hits, suggestions }
}

const fetchSearchHit = async ({
  client,
  locale,
  query,
  limit = DEFAULT_CONFIG.hitsPerPage,
  offset,
  customerGroupId,
  currency,
  priceChannel,
}: SearchProps) => {
  const response = await client
    .productProjections()
    .search()
    .get({
      queryArgs: {
        locale,
        limit,
        offset,
        [`text.${locale}`]: query,
        priceChannel,
        priceCustomerGroup: customerGroupId,
        priceCurrency: currency,
        fuzzy: true,
        expand: ['categories[*]'],
      },
    })
    .execute()

  return response.body.results
}

const fetchSuggestions = async ({
  client,
  locale,
  query,
  limit = DEFAULT_CONFIG.hitsPerPage,
  offset,
  customerGroupId,
  currency,
}: Omit<SearchProps, 'priceChannel'>) => {
  const response = await client
    .productProjections()
    .suggest()
    .get({
      queryArgs: {
        limit,
        offset,
        [`searchKeywords.${locale}`]: query,
        priceCustomerGroup: customerGroupId,
        priceCurrency: currency,
        fuzzy: true,
      },
    })
    .execute()

  return response.body[`searchKeywords.${locale}`] ?? []
}
