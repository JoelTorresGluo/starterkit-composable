'use client'

import { Box, Divider, ListItem, Text } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { CollectionItemProps } from '../../shared/types'
import { HitItem } from '../shared/types'

export const BloomreachProductList = ({
  hitItems,
  inputValue,
  renderItem,
}: {
  hitItems: HitItem[]
  inputValue: string
  renderItem: (item: CollectionItemProps | HitItem) => React.ReactElement
}) => {
  const intl = useIntl()

  if (hitItems.length === 0 && inputValue.length > 0) {
    return (
      <ListItem>
        <Text fontSize='sm'>
          {intl.formatMessage({ id: 'global.search.noResults' })}
        </Text>
      </ListItem>
    )
  }

  return (
    <Box>
      {hitItems.map((item, index) => {
        return (
          <Box key={`${item.index}${item.label}`}>
            {renderItem(item)}
            {index !== hitItems.length - 1 && <Divider />}
          </Box>
        )
      })}
    </Box>
  )
}
