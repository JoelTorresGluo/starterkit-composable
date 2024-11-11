'use client'

import { ReactNode, useEffect, useState } from 'react'
import { Box, Flex, Heading, Spacer } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'

import { useGridLayout } from '@oriuminc/base'
import { Breadcrumb, GridLayoutControls } from '../product-listing/components'
import { PageContainer } from '../../../general'

import {
  BLOOMREACH_DEFAULT_CATEGORY,
  ItemCount,
  SortBy,
  SortOptionUI,
} from '../product-listing-shared'
import {
  FacetFilters,
  CurrentRefinements,
  FacetFiltersModal,
  InfiniteHits,
} from './filters'
import { useFilters } from './hooks'
import { SortOptionAPI } from './types'
import { NoResultsBoundary } from './no-results-boundary'
import {
  fetchSearchResults,
  parseFacets,
  parseUrlParameters,
  updateUrlParameters,
} from './utils'
interface BloomreachProductListingProps {
  popularProducts?: ReactNode
  customerId?: string
}

export const BloomreachProductListing = ({
  popularProducts = null,
  customerId,
}: BloomreachProductListingProps) => {
  const { locale, formatMessage } = useIntl()
  const router = useRouter()
  const { hitsPerPage } = useGridLayout()
  const {
    setFacets,
    setItems,
    setPage,
    setSortOptions,
    setTotalResults,
    sortOptions,
    totalResults,
    setIsLoading,
    selectSortOption,
  } = useFilters()

  const { parameters, ...restParams } = parseUrlParameters(router)
  const query = (router.query?.query as string) || ''
  const category =
    router.isReady &&
    router.query?.filterName === 'type' &&
    router.query.filterValue
      ? (router.query.filterValue as string)
      : BLOOMREACH_DEFAULT_CATEGORY.filterValue
  const isSearchPage = Boolean(query)
  const MOBILE_PREFIX = 'mobileView'

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const sortBy = urlParams.get('sortBy') ?? ''
    const sortOrder = urlParams.get('sortOrder') ?? ''
    selectSortOption(sortBy, sortOrder)
  }, [])

  useEffect(() => {
    if (!router.isReady) return
    const fetchSearchResultsFromAPI = async () => {
      setIsLoading(true)

      try {
        const { response, facet_counts } = await fetchSearchResults(
          router,
          hitsPerPage,
          locale
        )
        if (response) {
          setItems(response.docs)
          setPage(1)
          setFacets(parseFacets(facet_counts))
          setTotalResults(response.numFound)
        }
      } catch (e) {
        console.error(e)
      }
      setIsLoading(false)
    }

    fetchSearchResultsFromAPI()
  }, [router.isReady, router.asPath, router.query?.query, hitsPerPage])

  const getSortOptionId = ({
    sort_by,
    order_by,
  }: {
    sort_by: string
    order_by: string
  }) => `${sort_by}_${order_by}`

  const transformedSortOptions = sortOptions.map(
    (item: SortOptionAPI, idx): SortOptionUI => {
      const optionValue = getSortOptionId({
        sort_by: item.sort_by,
        order_by: item.sort_order,
      })
      return {
        id: optionValue,
        label: item.display_name,
        value: optionValue,
        status: item.status,
      }
    }
  )

  const onChangeSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Find the selected item from sortOptions
    const selectedItem = sortOptions.find(
      (item) =>
        getSortOptionId({
          sort_by: item.sort_by,
          order_by: item.sort_order,
        }) === e.target.value
    )

    if (selectedItem) {
      selectSortOption(selectedItem.sort_by, selectedItem.sort_order)

      const updatedParams = updateUrlParameters(router, {
        parameters: {
          ...parameters,
          sortBy: selectedItem.sort_by,
          sortOrder: selectedItem.sort_order,
        },
      })
      router.push({ search: updatedParams }, undefined, { shallow: true })
    }
  }
  return (
    <PageContainer>
      <NoResultsBoundary
        catchOn='unfiltered-search-only'
        popularProducts={popularProducts}
        query={query}
      >
        <Box mt={{ base: 6, lg: 16 }} mb={{ base: 2, lg: 3 }}>
          <Breadcrumb query={query || category} isSearchPage={isSearchPage} />
        </Box>

        <Heading
          as='h1'
          fontSize={{ base: 'xl', lg: '4xl' }}
          mb={{ base: 9, lg: 'xl' }}
          fontWeight='extrabold'
          textTransform={isSearchPage ? 'none' : 'capitalize'}
        >
          {isSearchPage
            ? formatMessage({ id: 'category.search.resultsFor' }, { query })
            : formatMessage(
                { id: 'category.search.shop' },
                { query: query || category }
              )}
        </Heading>

        <Flex direction={{ base: 'column', lg: 'row' }} alignItems='stretch'>
          <Box
            flexBasis='72'
            flexShrink='0'
            display={{ base: 'none', lg: 'initial' }}
          >
            <Heading as='h2' fontSize='xl' fontWeight='extrabold' mb='3'>
              {formatMessage({ id: 'category.filters.refineBy' })}
            </Heading>
            <FacetFilters />
          </Box>

          <Flex
            direction='column'
            w='full'
            ml={{ base: 'none', lg: 6 }}
            mt={{ base: 4, lg: 'none' }}
            overflow='hidden'
          >
            <Flex align='center' alignItems='end'>
              <ItemCount total={totalResults ?? 0} />
              <Spacer />
              <GridLayoutControls />

              <Box ml='8' display={{ base: 'none', lg: 'initial' }}>
                <SortBy
                  label={formatMessage({
                    id: 'category.filters.sortBy',
                  })}
                  onChange={onChangeSorting}
                  options={transformedSortOptions}
                />
              </Box>
            </Flex>

            <Flex
              id={MOBILE_PREFIX}
              mt='5'
              display={{ base: 'flex', lg: 'none' }}
            >
              <Flex w='50%' direction='column' px='2'>
                <FacetFiltersModal />
              </Flex>
              <Box w='50%' px='2'>
                <SortBy
                  prefix={MOBILE_PREFIX}
                  label={formatMessage({
                    id: 'category.filters.sortBy',
                  })}
                  onChange={onChangeSorting}
                  options={transformedSortOptions}
                />
              </Box>
            </Flex>

            <CurrentRefinements />

            <Box mt={{ base: 8, lg: 10 }} mb='6'>
              <NoResultsBoundary
                catchOn='filtered-search-only'
                popularProducts={popularProducts}
                query={query}
              >
                <InfiniteHits />
              </NoResultsBoundary>
            </Box>
          </Flex>
        </Flex>
      </NoResultsBoundary>
    </PageContainer>
  )
}
