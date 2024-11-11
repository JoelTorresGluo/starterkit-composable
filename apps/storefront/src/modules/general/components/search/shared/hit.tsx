import { AspectRatio, Grid, GridItem, Text, useToken } from '@chakra-ui/react'
import { getCurrency } from '@oriuminc/base'
import Image from 'next/image'
import { FormatNumberOptions, useIntl } from 'react-intl'
import { BaseHitProps } from './types'

interface HitProps {
  hit: BaseHitProps
  selected?: boolean
}

export const Hit = ({ hit, selected = false }: HitProps) => {
  const intl = useIntl()
  const currency = getCurrency(intl.locale)
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
