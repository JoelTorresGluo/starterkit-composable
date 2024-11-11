import ConstructorIO from '@constructor-io/constructorio-client-javascript'
import { transformConstructorHit } from '@modules/general/components/search/constructor-global-search/utils'
import { getCurrency, useGridLayout } from '@oriuminc/base'
import { useSearchParams } from 'next/navigation'
import { InfiniteHits as InfiniteHitsShared } from '../../product-listing-shared'
import { useFilters } from '../hooks'
import { SortOptionAPI } from '../types'
import { loadMoreSearchResults } from '../utils'
import { useIntl } from 'react-intl'

export const InfiniteHits = ({ cioClient }: { cioClient: ConstructorIO }) => {
  const intl = useIntl()
  const currency = getCurrency(intl.locale)
  const { hitsPerPage } = useGridLayout()
  const searchParams = useSearchParams()

  const {
    items,
    page,
    setFacets,
    setItems,
    setPage,
    setSortOptions,
    setTotalResults,
    totalResults,
    setIsLoading,
  } = useFilters()

  const showMore = async () => {
    try {
      setIsLoading(true)
      const response = await loadMoreSearchResults({
        currentPage: page,
        totalResults: totalResults ?? 0,
        queryParams: searchParams,
        hitsPerPage,
        cioClient,
      })
      if (response) {
        const newItems = [...(items ?? []), ...response?.results] as any
        setItems(newItems)
        setSortOptions(
          response.sort_options.map((item: SortOptionAPI) => ({
            ...item,
            id: `${item.sort_by}_${item.sort_order}`,
          }))
        )
        setFacets(response.facets)
        setTotalResults(response.total_num_results)
        setPage(page + 1)
      }
    } catch (e) {
      console.error(e)
    }
    setIsLoading(false)
  }
  const formatedItems = items?.map((item) =>
    transformConstructorHit({ item, currency })
  )
  return (
    <InfiniteHitsShared
      items={formatedItems ?? null}
      isLastPage={
        formatedItems ? formatedItems?.length >= (totalResults ?? 0) : true
      }
      showMore={showMore}
    />
  )
}
