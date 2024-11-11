'use client'

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  VisuallyHidden,
} from '@chakra-ui/react'
import {
  algoliaIndexNameResolver,
  algoliaQuerySuggestionsIndexNameResolver,
} from '@modules/general'
import { getStateMapping, useAlgoliaInsights } from '@oriuminc/algolia'
import { GridLayoutProvider } from '@oriuminc/base'
import { AlgoliaFilter, AlgoliaSortByOption } from '@oriuminc/cms-generic'
import { PageContainer } from '@oriuminc/templates/general'
import algoliasearch from 'algoliasearch/lite'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { ReactNode, useMemo } from 'react'
import { InstantSearchNext } from 'react-instantsearch-nextjs'
import { useIntl } from 'react-intl'
import {
  AlgoliaAnalytics,
  AlgoliaConfiguration,
  AlgoliaErrorBoundary,
  Breadcrumb,
  CategoryFilter,
  CurrentRefinements,
  Filters,
  FiltersModal,
  GridLayoutControls,
  InfiniteHits,
  ItemCount,
  NoResultsBoundary,
  SortBy,
} from './components'

const algoliaConfig = {
  appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  searchApiKey: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || '',
}

const searchClient = algoliasearch(
  algoliaConfig.appId,
  algoliaConfig.searchApiKey
)

export interface ProductListingProps {
  popularProducts?: ReactNode
  filters?: AlgoliaFilter[]
  sortByOptions?: AlgoliaSortByOption[]
}

export const ProductListing = ({
  popularProducts = null,
  filters,
  sortByOptions,
}: ProductListingProps) => {
  const intl = useIntl()
  const { useAlgoliaAutomaticInsights } = useAlgoliaInsights()
  const initialIndexName = algoliaIndexNameResolver({ locale: intl.locale })
  const querySuggestionsIndexName = algoliaQuerySuggestionsIndexNameResolver({
    locale: intl.locale,
  })
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const isSearchPage = pathname === '/search'
  const isCategoryPage = pathname.startsWith('/category/')
  const params = useParams()

  const query = `${searchParams.get('query') || params?.slug || ''}`

  const algoliaStateMapping = useMemo(() => {
    if (!filters) return undefined
    return getStateMapping({
      indexName: initialIndexName,
      locale: intl.locale,
      isSearchPage,
      ignorePaging: true,
      indexNameResolver: algoliaIndexNameResolver,
      filters,
      sortByOptions: sortByOptions ?? [],
    })
  }, [initialIndexName, filters, sortByOptions, intl.locale])

  return (
    <InstantSearchNext
      searchClient={searchClient}
      indexName={initialIndexName}
      routing={{
        stateMapping: algoliaStateMapping,
        router: { cleanUrlOnDispose: false },
      }}
      /**
       * There's a bug in react-instantsearch that causes duplicated view events after rerenders.
       * Until they fix it, keep insights disabled here,
       * and instead handle sending events using our useAlgoliaInsights hooks.
       *
       * Issue: https://github.com/algolia/instantsearch/issues/5442
       */
      insights={false}
      future={{
        preserveSharedStateOnUnmount: true,
      }}
    >
      <PageContainer>
        <GridLayoutProvider>
          <AlgoliaConfiguration query={query} isCategoryPage={isCategoryPage} />
          <AlgoliaAnalytics />

          <AlgoliaErrorBoundary>
            <NoResultsBoundary
              catchOn='unfiltered-search-only'
              popularProducts={popularProducts}
              searchClient={searchClient}
              querySuggestionsIndexName={querySuggestionsIndexName}
              query={query}
            >
              <Box mt={{ base: 6, lg: 16 }} mb={{ base: 2, lg: 3 }}>
                <Breadcrumb query={query} isSearchPage={isSearchPage} />
              </Box>

              <Heading
                as='h1'
                textStyle='heading-500'
                fontSize={{ base: '4xl', lg: '8xl' }}
                mb={{ base: 9, lg: 12 }}
                textTransform={isSearchPage ? 'none' : 'capitalize'}
              >
                {isSearchPage
                  ? intl.formatMessage(
                      { id: 'category.search.resultsFor' },
                      { query }
                    )
                  : intl.formatMessage(
                      { id: 'category.search.shop' },
                      { query }
                    )}
              </Heading>

              <Flex
                direction={{ base: 'column', lg: 'row' }}
                gap={{ base: 0, lg: 6 }}
                alignItems='stretch'
              >
                <Box
                  flexBasis='72'
                  flexShrink='0'
                  display={{ base: 'none', lg: 'block' }}
                >
                  <CategoryFilter />
                  <Heading as='h2' fontSize='xl' fontWeight='extraBold' mb='3'>
                    {intl.formatMessage({ id: 'category.filters.refineBy' })}
                  </Heading>
                  {filters && <Filters filters={filters} />}
                </Box>

                <Flex direction='column' w='full' mt='0'>
                  <Flex align='center' alignItems='end'>
                    <ItemCount />
                    <Spacer />
                    <GridLayoutControls />

                    <Box ml='8' display={{ base: 'none', lg: 'block' }}>
                      {sortByOptions && (
                        <SortBy
                          items={sortByOptions}
                          indexNameResolver={algoliaIndexNameResolver}
                        />
                      )}
                    </Box>
                  </Flex>

                  <Grid
                    id='mobileView'
                    mt='5'
                    display={{ base: 'grid', lg: 'none' }}
                    gap='4'
                    gridTemplateColumns='repeat(2, 1fr)'
                  >
                    <GridItem display='flex' flexDir='column'>
                      {filters && <FiltersModal filters={filters} />}
                    </GridItem>
                    <GridItem>
                      {sortByOptions && (
                        <SortBy
                          prefix='mobileView'
                          items={sortByOptions}
                          indexNameResolver={algoliaIndexNameResolver}
                        />
                      )}
                    </GridItem>
                  </Grid>

                  <CurrentRefinements />

                  <Box mt={{ base: 8, lg: 10 }} mb='6'>
                    <VisuallyHidden as='h2'>
                      {intl.formatMessage({ id: 'category.filters.listTitle' })}
                    </VisuallyHidden>
                    <NoResultsBoundary
                      catchOn='filtered-search-only'
                      searchClient={searchClient}
                      querySuggestionsIndexName={querySuggestionsIndexName}
                    >
                      <InfiniteHits />
                    </NoResultsBoundary>
                  </Box>
                </Flex>
              </Flex>
            </NoResultsBoundary>
          </AlgoliaErrorBoundary>
        </GridLayoutProvider>
      </PageContainer>
    </InstantSearchNext>
  )
}
