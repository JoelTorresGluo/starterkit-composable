import { useRouter } from 'next/router'

import { useComposable, useGridLayout } from '@oriuminc/base'
import { useFilters } from '../hooks'
import { InfiniteHits as InfiniteHitsShared } from '../../product-listing-shared'
import { loadMoreSearchResults } from '../utils'
import { SortOptionAPI } from '../types'
import { transformConstructorHit } from '../../../../general/components/constructor-global-search/utils'
import ConstructorIO from '@constructor-io/constructorio-client-javascript'

export const InfiniteHits = ({ cioClient }: { cioClient: ConstructorIO }) => {
  const router = useRouter()
  const { currency } = useComposable()
  const { hitsPerPage } = useGridLayout()

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
        router,
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
