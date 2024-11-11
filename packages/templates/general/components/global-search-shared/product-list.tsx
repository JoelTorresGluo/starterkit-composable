import React from 'react'
import { List, Text, Divider, Box, ListItem } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { CollectionItemProps, HitItem, SearchDataType } from './types'
export const ProductList = ({
  combinedItems,
  inputValue,
  renderItem,
}: {
  combinedItems: (CollectionItemProps | HitItem)[]
  inputValue: string
  renderItem: (item: CollectionItemProps | HitItem) => React.ReactElement
}) => {
  const intl = useIntl()
  const hit_items = combinedItems.filter(
    (item) => item.type === SearchDataType.HIT
  )
  if (hit_items.length === 0 && inputValue.length > 0) {
    return (
      <Box>
        <Text fontSize='sm'>
          {intl.formatMessage({ id: 'global.search.noResults' })}
        </Text>
      </Box>
    )
  }

  return (
    <List>
      {hit_items.map((item, index) => {
        const renderedItem = renderItem(item)
        return (
          <React.Fragment key={`${item.index}${item.name}`}>
            {renderedItem}
            {index !== hit_items.length - 1 && <Divider />}
          </React.Fragment>
        )
      })}
    </List>
  )
}
