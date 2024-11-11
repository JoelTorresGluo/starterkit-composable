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
import NextRouter, { useRouter } from 'next/router'
import {
  AlgoliaIndexNameResolver,
  AlgoliaQuerySuggestionsIndexNameResolver,
  GridLayoutProvider,
  useComposable,
} from '@oriuminc/base'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch'
import { useIntl } from 'react-intl'
import { getStateMapping, useAlgoliaInsights } from '@oriuminc/algolia'
import { PageContainer } from '../../../general'
import {
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
import { ReactNode, useMemo } from 'react'
import { createInstantSearchRouterNext } from 'react-instantsearch-router-nextjs'
import { AlgoliaFilter, AlgoliaSortByOption } from '@oriuminc/cms-generic'

const algoliaConfig = {
  appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  searchApiKey: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || '',
}

const searchClient = algoliasearch(
  algoliaConfig.appId,
  algoliaConfig.searchApiKey
)

export interface ProductListingPageProps {
  algoliaIndexNameResolver: AlgoliaIndexNameResolver
  algoliaQuerySuggestionsIndexNameResolver: AlgoliaQuerySuggestionsIndexNameResolver
  popularProducts?: ReactNode
  filters?: AlgoliaFilter[]
  sortByOptions?: AlgoliaSortByOption[]
}

export const ProductListingPage = ({
  algoliaIndexNameResolver,
  algoliaQuerySuggestionsIndexNameResolver,
  popularProducts = null,
  filters,
  sortByOptions,
}: ProductListingPageProps) => {
  const intl = useIntl()
  const { locale } = useComposable()
  const { useAlgoliaAutomaticInsights } = useAlgoliaInsights()
  const initialIndexName = algoliaIndexNameResolver({ locale })
  const querySuggestionsIndexName = algoliaQuerySuggestionsIndexNameResolver({
    locale,
  })
  const router = useRouter()
  const isSearchPage = router.pathname === '/search'
  const isCategoryPage = router.pathname === '/category/[slug]'
  const query = `${router.query?.query || router.query?.slug || ''}`

  const algoliaStateMapping = useMemo(() => {
    if (!filters) return undefined
    return getStateMapping({
      indexName: initialIndexName,
      locale,
      isSearchPage,
      ignorePaging: true,
      indexNameResolver: algoliaIndexNameResolver,
      filters,
      sortByOptions: sortByOptions ?? [],
    })
  }, [initialIndexName, filters, sortByOptions, locale])

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={initialIndexName}
      routing={{
        router: createInstantSearchRouterNext({
          singletonRouter: NextRouter,
        }),
        stateMapping: algoliaStateMapping,
      }}
      insights={useAlgoliaAutomaticInsights}
      future={{
        preserveSharedStateOnUnmount: true,
      }}
    >
      <PageContainer>
        <GridLayoutProvider>
          <AlgoliaConfiguration query={query} isCategoryPage={isCategoryPage} />

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
                gap={{ base: 'none', lg: 6 }}
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

                <Flex direction='column' w='full' mt='none'>
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
    </InstantSearch>
  )
}
