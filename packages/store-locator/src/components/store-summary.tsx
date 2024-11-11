import React from 'react'
import { IntlShape } from 'react-intl'
import { Box, BoxProps, Stack } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { REACT_INTL_KILOMETER_FORMAT } from '../constants'
import { Store } from '../_data'
import { UseStoreLocatorRouter } from '../hooks/use-store-locator-router'
import { useUserLatLng } from '../hooks/use-user-lat-lng'
import { LinkButton } from '../ui/link-button'
import { WarnTag } from '../ui/warn-tag'
import { InfoTag } from '../ui/info-tag'
import { isOpen } from '../utils/is-open'
import { getOpenHoursLabel } from '../utils/get-open-hours-label'

interface StoreSummaryProps {
  deps: {
    intl: IntlShape
    router: UseStoreLocatorRouter
  }
  root?: BoxProps
  store: Store
  distance?: string
  onBookmark?: (store: Store) => void
  isBookmarked?: boolean
}

export const StoreSummary = ({
  deps,
  root,
  store,
  distance,
  isBookmarked = false,
  onBookmark,
}: StoreSummaryProps) => {
  const { getDistance, getMapsLink } = useUserLatLng()
  const storeIsOpen = isOpen(store)
  const mapsLink = getMapsLink(store)
  const openHoursLabel = getOpenHoursLabel(store)
  const pointsDistance = getDistance(store)
  const rectDistance = pointsDistance
    ? deps.intl.formatNumber(pointsDistance, REACT_INTL_KILOMETER_FORMAT)
    : ''

  const distanceValue = distance || rectDistance

  return (
    <Box {...root}>
      <Box color='text' textStyle='blockquote-100' fontWeight='bold' mb='2'>
        #{store.id} {store.title}
      </Box>

      <Box
        color='text'
        textStyle={{ base: 'blockquote-75', xs: 'blockquote-100' }}
        mb='2'
      >
        {[store.address1, store.address2, store.city, store.postal_code]
          .filter(Boolean)
          .join(', ')}
      </Box>

      <Box color='text-muted' textStyle='blockquote-75' mb='2'>
        {[distanceValue, openHoursLabel].filter(Boolean).join(' • ') || '-'}
      </Box>

      {!storeIsOpen && <WarnTag>This store is closed</WarnTag>}

      {store.is_curbside_pickup_available && (
        <InfoTag>Curbside pickup available</InfoTag>
      )}

      <Box mt='4' display='flex' flexWrap='wrap'>
        <Stack direction={{ base: 'column', md: 'row' }} spacing='4'>
          <LinkButton
            textAlign='left'
            onClick={() => window.open(mapsLink, 'mapsLink')}
          >
            Get Directions
          </LinkButton>

          <LinkButton
            textAlign='left'
            onClick={(e) => {
              e.stopPropagation()
              deps.router.goTo('details', store.id)
            }}
          >
            Store Details
          </LinkButton>

          {onBookmark && (
            <LinkButton textAlign='left' onClick={() => onBookmark?.(store)}>
              Favourites
              <StarIcon
                ml='2'
                color={isBookmarked ? 'secondary.700' : 'gray.300'}
              />
            </LinkButton>
          )}
        </Stack>
      </Box>
    </Box>
  )
}
