import { transformBloomreachHit } from '@modules/general/components/search/bloomreach-global-search/utils'
import { getCurrency, useGridLayout } from '@oriuminc/base'
import { useSearchParams } from 'next/navigation'
import { useIntl } from 'react-intl'
import { InfiniteHits as InfiniteHitsShared } from '../../product-listing-shared'
import { useFilters } from '../hooks'
import { loadMoreSearchResults } from '../utils'

export const InfiniteHits = () => {
  const { locale } = useIntl()
  const currency = getCurrency(locale)
  const searchParams = useSearchParams()
  const { hitsPerPage } = useGridLayout()

  const {
    items,
    page,
    sortOptions,
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
        locale,
      })

      if (response) {
        const newItems = [...(items ?? []), ...response?.docs] as any
        setItems(newItems)
        //  setFacets(response.facets)
        setTotalResults(response.numFound)
        setPage(page + 1)
      }
    } catch (e) {
      console.error(e)
    }
    setIsLoading(false)
  }

  const formatedItems = items?.map((item) =>
    transformBloomreachHit({ item, currency })
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
