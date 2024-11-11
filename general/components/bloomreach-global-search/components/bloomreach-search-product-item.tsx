import { ListItem } from '@chakra-ui/react'
import React from 'react'
import { HitItem } from '../shared/types'
import { Hit } from '../../global-search-shared'

const BloomreachSearchProducItem = ({
  item,
  bgStyle,
  isSelected,
  ...rest
}: {
  item: HitItem
  bgStyle: string
  isSelected: boolean
}) => {
  return (
    <ListItem
      key={`${item.pId}${item.index}`}
      _hover={{
        backgroundColor: 'highlight',
      }}
      bg={bgStyle}
      {...rest}
    >
      <Hit
        hit={
          {
            name: item.label,
            image: {
              url: item?.thumb_image
                ? item?.thumb_image
                : '/img/image-placeholder.svg',
              label: item.label,
            },
            attributes: { normalized: { brand: item.brand } },
            price: {
              centAmount: item.price,
              fractionDigits: item.fractionDigits,
            },
          } as any
        }
        selected={isSelected}
      />
    </ListItem>
  )
}

export default BloomreachSearchProducItem
