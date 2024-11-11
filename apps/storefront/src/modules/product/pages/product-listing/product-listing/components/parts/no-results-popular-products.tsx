import {
  AutocompleteState,
  BaseItem,
  createAutocomplete,
} from '@algolia/autocomplete-core'
import { Button, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { useComposable } from '@modules/general'
import { usePopularPlugin } from '@modules/general/components/search/global-search/hooks'
import {
  CollectionItemProps,
  DEFAULT_AUTOCOMPLETE_STATE,
  DEFAULT_CONFIG,
} from '@oriuminc/templates/general/components/global-search-shared'
import type { SearchClient } from 'algoliasearch/lite'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

interface NoResultsPopularProductsProps {
  searchClient: SearchClient
  querySuggestionsIndexName: string
}

export const NoResultsPopularProducts = ({
  searchClient,
  querySuggestionsIndexName,
}: NoResultsPopularProductsProps) => {
  const intl = useIntl()
  const router = useRouter()
  const { path } = useComposable()
  const [autocompleteState, setAutocompleteState] = useState<
    AutocompleteState<BaseItem>
  >(DEFAULT_AUTOCOMPLETE_STATE)
  const { popularPlugin } = usePopularPlugin({
    searchClient,
    querySuggestionsIndexName,
  })
  const autocomplete = createAutocomplete({
    plugins: [popularPlugin],
    onStateChange({ state }) {
      setAutocompleteState(state)
    },
  })

  useEffect(() => {
    const loadDefaultQuery = async () => {
      autocomplete.setQuery(DEFAULT_CONFIG.popularQuery)
      await autocomplete.refresh()
    }
    const init = setTimeout(loadDefaultQuery, 0)
    return () => clearTimeout(init)
  }, [])

  return (
    <>
      {autocompleteState?.collections.map((collection, index) => {
        if (!collection.items.length) return null
        return (
          <Stack spacing='4' key={`${collection.source.sourceId}${index}`}>
            <Text color='text'>
              {intl.formatMessage({
                id: 'category.noResults.useFewerKeyWords',
              })}
            </Text>
            <Wrap spacing='2'>
              {(collection.items as CollectionItemProps[]).map((item) => {
                return (
                  <WrapItem key={`${item.query}`}>
                    <Button
                      variant='outline'
                      size='md'
                      aria-label={item.query}
                      onClick={(e) => {
                        e.preventDefault()
                        router.push(
                          path.getSearch({
                            query: encodeURIComponent(item.query),
                          })
                        )
                      }}
                      key={`${item.index}${item.query}`}
                    >
                      {item.query}
                    </Button>
                  </WrapItem>
                )
              })}
            </Wrap>
          </Stack>
        )
      })}
    </>
  )
}
