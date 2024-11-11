import { useRouter } from 'next/router'

import { useComposable, useGridLayout } from '@oriuminc/base'
import { useFilters } from '../hooks'
import { InfiniteHits as InfiniteHitsShared } from '../../product-listing-shared'
import { loadMoreSearchResults } from '../utils'
import { transformBloomreachHit } from '../../../../general/components/bloomreach-global-search/utils'
import { useIntl } from 'react-intl'

export const InfiniteHits = () => {
  const router = useRouter()
  const { currency } = useComposable()
  const { hitsPerPage } = useGridLayout()
  const { locale, formatMessage } = useIntl()

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
        router,
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
