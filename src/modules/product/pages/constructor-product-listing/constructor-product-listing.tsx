'use client'

import { Box, Flex, Heading, Spacer } from '@chakra-ui/react'
import { useCioClient } from '@modules/general/components/search/constructor-global-search/utils'
import { useGridLayout } from '@oriuminc/base'
import { PageContainer } from '@oriuminc/templates/general'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { useIntl } from 'react-intl'
import {
  CONSTRUCTOR_DEFAULT_CATEGORY,
  ItemCount,
  SortBy,
  SortOptionUI,
} from '../product-listing-shared'
import {
  Breadcrumb,
  GridLayoutControls,
} from '../product-listing/product-listing'
import {
  CurrentRefinements,
  FacetFilters,
  FacetFiltersModal,
  InfiniteHits,
} from './filters'
import { useFilters } from './hooks'
import { NoResultsBoundary } from './no-results-boundary'
import { SortOptionAPI } from './types'
import { fetchSearchResults, updateUrlParameters } from './utils'

interface ConstructorProductListingProps {
  popularProducts?: ReactNode
  customerId?: string
}

export const ConstructorProductListing = ({
  popularProducts = null,
  customerId,
}: ConstructorProductListingProps) => {
  const { formatMessage, locale } = useIntl()
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
  } = useFilters()

  const cioClient = useCioClient({
    userId: customerId,
  })

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const filterName = searchParams.get('filterName')
  const filterValue = searchParams.get('filterValue')
  const query = searchParams.get('query')

  const category =
    filterName === 'type' && filterValue
      ? filterValue
      : CONSTRUCTOR_DEFAULT_CATEGORY.filterValue
  const isSearchPage = Boolean(query)
  const MOBILE_PREFIX = 'mobileView'

  useEffect(() => {
    if (cioClient === undefined) return
    const fetchSearchResultsFromAPI = async () => {
      setIsLoading(true)
      try {
        const response = await fetchSearchResults(
          searchParams,
          cioClient,
          hitsPerPage
        )
        if (response) {
          setItems(response.results)
          setPage(1)
          setSortOptions(
            response.sort_options.map((item: SortOptionAPI) => ({
              ...item,
              id: `${item.sort_by}_${item.sort_order}`,
            }))
          )
          setFacets(response.facets)
          setTotalResults(response.total_num_results)
        }
      } catch (e) {
        console.error(e)
      }
      setIsLoading(false)
    }

    fetchSearchResultsFromAPI()
  }, [searchParams, hitsPerPage, locale, cioClient])

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
      const updatedParams = updateUrlParameters(searchParams, {
        parameters: {
          filters: {},
          sortBy: selectedItem.sort_by,
          sortOrder: selectedItem.sort_order,
        },
      })
      router.push(`${pathname}?${updatedParams}`, { scroll: false })
    }
  }
  return (
    <PageContainer>
      <NoResultsBoundary
        catchOn='unfiltered-search-only'
        popularProducts={popularProducts}
        query={query ?? ''}
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
            ml={{ base: 0, lg: 6 }}
            mt={{ base: 4, lg: 0 }}
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
                query={query ?? ''}
              >
                {cioClient && <InfiniteHits cioClient={cioClient} />}
              </NoResultsBoundary>
            </Box>
          </Flex>
        </Flex>
      </NoResultsBoundary>
    </PageContainer>
  )
}
