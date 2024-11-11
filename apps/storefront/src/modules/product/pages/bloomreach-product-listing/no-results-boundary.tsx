import { ReactNode } from 'react'
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
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useIntl } from 'react-intl'
import { useFilters } from './hooks'
import { RecommendedSearchesPlaceholder } from '../product-listing-shared'
import { useComposable } from '@modules/general'

interface NoResultsBoundaryProps {
  catchOn: 'unfiltered-search-only' | 'filtered-search-only'
  children: ReactNode
  popularProducts?: ReactNode | null
  query: string
  category?: string
}

export const NoResultsBoundary = ({
  catchOn,
  children,
  popularProducts,
  query,
}: NoResultsBoundaryProps) => {
  const intl = useIntl()
  const router = useRouter()
  const { isLoading, totalResults } = useFilters()
  const { path } = useComposable()
  const { checked } = useFilters()
  const checkedSize = Object.keys(checked || {}).length

  // TODO: get recommended searches from constructor.io
  const recommendedSearches = RecommendedSearchesPlaceholder
  /*
    There are two options for No Results Boundary:
    1. Show CMS controlled popular products when there are no results
    2. Show algolia popular products when there are no results
  */
  const isFiltered = checkedSize > 0
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

  if (totalResults === 0 && shouldCatch && !isLoading) {
    return (
      <>
        <Stack
          // TODO: Replace rem values with tokens.
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
                  { query: query }
                )}
              {catchOn === 'filtered-search-only' &&
                intl.formatMessage({
                  id: 'category.noResults.filtered.heading',
                })}
            </Heading>
            {/* Recommended Searches */}
            <Stack spacing='4'>
              <Text color='text'>
                {intl.formatMessage({
                  id: 'category.noResults.useFewerKeyWords',
                })}
              </Text>
              <Wrap spacing='2'>
                {recommendedSearches.map((item) => {
                  return (
                    <WrapItem key={`${item}`}>
                      <Button
                        variant='outline'
                        size='md'
                        aria-label={item}
                        onClick={(e) => {
                          e.preventDefault()
                          router.push(
                            path.getConstructorIoSearch({
                              query: encodeURIComponent(item),
                            })
                          )
                        }}
                        key={`${item}-button`}
                      >
                        {item}
                      </Button>
                    </WrapItem>
                  )
                })}
              </Wrap>
            </Stack>

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
