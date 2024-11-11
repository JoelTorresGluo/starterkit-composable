'use client'

import { ReactNode, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  Wrap,
  WrapItem,
  useToken,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useComposable } from '@oriuminc/base'
import {
  AutocompleteState,
  BaseItem,
  createAutocomplete,
} from '@algolia/autocomplete-core'
import { useInstantSearch } from 'react-instantsearch'
import { useIntl } from 'react-intl'
import type { SearchClient } from 'algoliasearch/lite'
import { usePopularPlugin } from '../../../../../general/components/global-search/hooks'
import { CollectionItemProps } from '../../../../../general/components/global-search-shared/types'
import {
  DEFAULT_CONFIG,
  DEFAULT_AUTOCOMPLETE_STATE,
} from '../../../../../general/components/global-search-shared/constants'

interface NoResultsBoundaryProps {
  catchOn: 'unfiltered-search-only' | 'filtered-search-only'
  children: ReactNode
  searchClient: SearchClient
  querySuggestionsIndexName: string
  popularProducts?: ReactNode | null
  query?: string
}

export const NoResultsBoundary = ({
  catchOn,
  children,
  popularProducts,
  searchClient,
  querySuggestionsIndexName,
  query,
}: NoResultsBoundaryProps) => {
  const [size1, size2, size4] = useToken('sizes', [
    'size.1',
    'sizes.2',
    'sizes.4',
  ])

  const intl = useIntl()
  const router = useRouter()
  const { path } = useComposable()
  const { results, indexUiState } = useInstantSearch()
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
  /*
    There are two options for No Results Boundary:
    1. Show CMS controlled popular products when there are no results
    2. Show algolia popular products when there are no results
  */
  useEffect(() => {
    const loadDefaultQuery = async () => {
      autocomplete.setQuery(DEFAULT_CONFIG.popularQuery)
      await autocomplete.refresh()
    }
    const init = setTimeout(loadDefaultQuery, 0)
    return () => clearTimeout(init)
  }, [])

  // get refinements from the indexUiState, the useCurrentRefinements hooks is not SSR ready
  const hasRefinementListRefinements =
    Object.entries(indexUiState?.refinementList ?? {}).length > 0
  const hasNumericMenuRefinements =
    Object.entries(indexUiState?.numericMenu ?? {}).length > 0
  const isFiltered = hasRefinementListRefinements || hasNumericMenuRefinements

  const isLoading = results.__isArtificial
  const noResults = results.nbHits === 0
  const shouldCatch =
    (catchOn === 'unfiltered-search-only' && !isFiltered) ||
    (catchOn === 'filtered-search-only' && isFiltered)

  const content = {
    searchTipsHeader: intl.formatMessage({
      id: 'category.noResults.searchTipsHeader',
    }),
    searchTips: [
      intl.formatMessage({
        id: 'category.noResults.searchTips.line1',
      }),
      intl.formatMessage({
        id: 'category.noResults.searchTips.line2',
      }),
      intl.formatMessage({
        id: 'category.noResults.searchTips.line3',
      }),
      intl.formatMessage({
        id: 'category.noResults.searchTips.line4',
      }),
    ],
    assistanceHeader: intl.formatMessage({
      id: 'category.noResults.assistanceHeader',
    }),
    assistanceItems: [
      intl.formatMessage({
        id: 'category.noResults.assistance.line1',
      }),
      intl.formatMessage({
        id: 'category.noResults.assistance.line2',
      }),
      intl.formatMessage({
        id: 'category.noResults.assistance.line3',
      }),
    ],
  }

  if (noResults && shouldCatch && !isLoading) {
    return (
      <>
        <Stack
          // TODO: Replace rem values with pixels.
          mx={{ base: 'none', lg: '3.125rem' }}
          my={{ base: '1.625rem', lg: '3.875rem' }}
          spacing={{ base: 10, lg: 12 }}
        >
          <Box>
            <Heading
              as='h2'
              fontWeight='bold'
              textStyle={{ base: 'mobile-400', lg: 'desktop-500' }}
              mb={{ base: 10, lg: 6 }}
            >
              {catchOn === 'unfiltered-search-only' &&
                intl.formatMessage(
                  { id: 'category.noResults.unfiltered.heading' },
                  {
                    query: results.query || query,
                  }
                )}
              {catchOn === 'filtered-search-only' &&
                intl.formatMessage({
                  id: 'category.noResults.filtered.heading',
                })}
            </Heading>
            {autocompleteState?.collections.map((collection, index) => {
              if (!collection.items.length) return null
              return (
                <Stack
                  spacing={size4}
                  key={`${collection.source.sourceId}${index}`}
                >
                  <Text color={'text'}>
                    {intl.formatMessage({
                      id: 'category.noResults.useFewerKeyWords',
                    })}
                  </Text>
                  <Wrap spacing={size2}>
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
            <Text>
              {catchOn === 'filtered-search-only' &&
                intl.formatMessage({ id: 'category.noResults.filtered.text' })}
            </Text>
          </Box>

          <Flex
            direction={{ base: 'column', lg: 'row' }}
            justifyContent={'space-between'}
            gap={'2.5rem'}
          >
            <Box>
              <Text as='h2' textStyle={'desktop-300'}>
                {content.searchTipsHeader}
              </Text>
              <UnorderedList textStyle={'blockquote-100'} paddingLeft='0.5rem'>
                {content.searchTips.map((tip, index) => (
                  <ListItem key={index}>{tip}</ListItem>
                ))}
              </UnorderedList>
            </Box>
            <Box>
              <Text as='h2' textStyle={'desktop-300'}>
                {content.assistanceHeader}
              </Text>
              <UnorderedList textStyle={'blockquote-100'} paddingLeft='0.5rem'>
                {content.assistanceItems.map((item, index) => {
                  if (
                    item === 'Send us a message' ||
                    item === 'Online Customer Service'
                  ) {
                    return (
                      <ListItem key={index}>
                        <Link
                          textDecoration={'underline'}
                          textUnderlineOffset={size1}
                          href='mailto:yourEmail@example.com'
                          isExternal
                        >
                          {item}
                        </Link>
                      </ListItem>
                    )
                  }
                  return <ListItem key={index}>{item}</ListItem>
                })}
              </UnorderedList>
            </Box>
          </Flex>
          <>{popularProducts}</>
        </Stack>
        <Box display='none'>{children}</Box>
      </>
    )
  }

  return <>{children}</>
}
