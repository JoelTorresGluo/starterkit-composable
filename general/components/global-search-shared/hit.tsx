import { useCallback } from 'react'
import { Grid, GridItem, Text, AspectRatio, useToken } from '@chakra-ui/react'
import { useComposable } from '@oriuminc/base'
import { useAlgoliaInsights } from '@oriuminc/algolia'
import { useIntl, FormatNumberOptions } from 'react-intl'
import Image from 'next/image'
import { BaseHitProps } from './types'

interface HitProps {
  hit: BaseHitProps
  selected?: boolean
}

export const Hit = ({ hit, selected = false }: HitProps) => {
  const intl = useIntl()
  const { currency } = useComposable()
  const { trackAlgoliaClickedObjectIDAfterSearch } = useAlgoliaInsights()
  const handleTrackClick = useCallback(() => {
    trackAlgoliaClickedObjectIDAfterSearch(hit)
  }, [hit, trackAlgoliaClickedObjectIDAfterSearch])
  const formatNumberOptions: FormatNumberOptions = {
    currency,
    style: 'currency',
  }
  const [sizeDeviceW] = useToken('sizes', ['sizes.deviceW'])

  return (
    <Grid
      backgroundColor={selected ? 'blackAlpha.100' : 'transparent'}
      gridTemplateColumns='1fr 5fr'
      pt='3'
      px='none'
      cursor='pointer'
      onClick={handleTrackClick}
      className='testing'
    >
      <GridItem>
        <AspectRatio ratio={6 / 5}>
          {hit.image ? (
            <Image
              src={hit.image?.url}
              alt={hit.image?.label ?? ''}
              fill={true}
              style={{ objectFit: 'contain' }}
              sizes={`calc(${sizeDeviceW} / 5)`}
            />
          ) : (
            <Image
              src='/img/image-placeholder.svg'
              alt={hit.name ?? ''}
              fill={true}
              style={{ objectFit: 'contain' }}
              sizes={`calc(${sizeDeviceW} / 5)`}
            />
          )}
        </AspectRatio>
      </GridItem>
      <GridItem>
        <Text fontSize='2xs' color='blackAlpha.700' fontWeight='semibold'>
          {hit.attributes?.normalized?.brand ?? ''}
        </Text>
        <Text fontSize='sm' fontWeight='semibold'>
          {hit.name ?? ''}
        </Text>
        <Text fontSize='xs' fontWeight='semibold'>
          {hit.price?.centAmount !== undefined
            ? intl.formatNumber(
                hit.price.centAmount /
                  (hit.price.fractionDigits
                    ? Math.pow(10, hit.price.fractionDigits)
                    : 100),
                formatNumberOptions
              )
            : 'N/A'}
        </Text>
      </GridItem>
    </Grid>
  )
}
