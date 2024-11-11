'use client'

import { Button, Icon } from '@chakra-ui/react'
import { usePDPSearchParams } from '@modules/commerce'
import {
  ALGOLIA_TRACK_EVENT_DESCRIPTION,
  useAlgoliaInsights,
} from '@oriuminc/algolia'
import { useCallback } from 'react'
import { FiHeart } from 'react-icons/fi'
import { useIntl } from 'react-intl'

export const AddToWhislistButton = ({ productId }: { productId: string }) => {
  const intl = useIntl()
  const {
    trackAlgoliaConvertedObjectIDsAfterSearch,
    trackAlgoliaConvertedObjectIDs,
  } = useAlgoliaInsights()
  const searchQueryParams = usePDPSearchParams()

  const handleAddToWishlist = useCallback(() => {
    if (searchQueryParams.queryID) {
      trackAlgoliaConvertedObjectIDsAfterSearch({
        eventName: ALGOLIA_TRACK_EVENT_DESCRIPTION.PRODUCT_ADDED_TO_WISHLIST,
        objectIDs: [productId],
        queryID: searchQueryParams.queryID,
      })
    } else {
      trackAlgoliaConvertedObjectIDs({
        eventName: ALGOLIA_TRACK_EVENT_DESCRIPTION.PRODUCT_ADDED_TO_WISHLIST,
        objectIDs: [productId],
      })
    }
  }, [productId, searchQueryParams.queryID])

  return (
    <Button
      variant='outline'
      size='lg'
      fontSize='sm'
      width='full'
      whiteSpace='full'
      leftIcon={<Icon as={FiHeart} boxSize='4' />}
      onClick={() => handleAddToWishlist()}
    >
      {intl.formatMessage({ id: 'action.addToWishlist' })}
    </Button>
  )
}
