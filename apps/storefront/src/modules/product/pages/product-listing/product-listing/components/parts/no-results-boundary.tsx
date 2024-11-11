'use client'

import {
  Box,
  Flex,
  Heading,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import type { SearchClient } from 'algoliasearch/lite'
import { ReactNode } from 'react'
import { useInstantSearch } from 'react-instantsearch'
import { useIntl } from 'react-intl'
import { NoResultsPopularProducts } from './no-results-popular-products'

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
  const intl = useIntl()
  const { results, indexUiState } = useInstantSearch()

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

  /*
      There are two options for No Results Boundary:
      1. Show CMS controlled popular products when there are no results
      2. Show algolia popular products when there are no results
    */

  if (noResults && shouldCatch && !isLoading) {
    return (
      <>
        <Stack
          // TODO: See if we can replace these odd values with tokens.
          mx={{ base: 0, lg: '3.125rem' }}
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
            <NoResultsPopularProducts
              searchClient={searchClient}
              querySuggestionsIndexName={querySuggestionsIndexName}
            />
            <Text>
              {catchOn === 'filtered-search-only' &&
                intl.formatMessage({ id: 'category.noResults.filtered.text' })}
            </Text>
          </Box>

          <Flex
            direction={{ base: 'column', lg: 'row' }}
            justifyContent='space-between'
            gap='10'
          >
            <Box>
              <Text as='h2' textStyle='desktop-300'>
                {content.searchTipsHeader}
              </Text>
              <UnorderedList textStyle='blockquote-100' pl='2'>
                {content.searchTips.map((tip, index) => (
                  <ListItem key={index}>{tip}</ListItem>
                ))}
              </UnorderedList>
            </Box>
            <Box>
              <Text as='h2' textStyle='desktop-300'>
                {content.assistanceHeader}
              </Text>
              <UnorderedList textStyle='blockquote-100' pl='2'>
                {content.assistanceItems.map((item, index) => {
                  if (
                    item === 'Send us a message' ||
                    item === 'Online Customer Service'
                  ) {
                    return (
                      <ListItem key={index}>
                        <Link
                          textDecoration='underline'
                          textUnderlineOffset='1'
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
