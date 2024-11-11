import { useInfiniteHits, UseInfiniteHitsProps } from 'react-instantsearch'
import { StarterKitAlgoliaProduct } from '@oriuminc/algolia'
import { InfiniteHits as InfiniteHitsShared } from '../../../product-listing-shared'

export const InfiniteHits = (
  props: UseInfiniteHitsProps<StarterKitAlgoliaProduct>
) => {
  const { hits, isLastPage, showMore } = useInfiniteHits(props)

  return (
    <InfiniteHitsShared
      items={hits}
      isLastPage={isLastPage}
      showMore={showMore}
    />
  )
}
