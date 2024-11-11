import { Text, Box, List } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { SOURCE_ID_TO_TRANSLATION_ID } from './constants'
import {
  CollectionItemProps,
  HitItem,
  SearchDataType,
  AutocompleteState,
} from './types'

interface CollectionListProps {
  collection: AutocompleteState['collections'][0]
  combinedItems: (CollectionItemProps | HitItem)[]
  renderItem: (item: CollectionItemProps | HitItem) => React.ReactElement
}

export const CollectionList = ({
  collection,
  combinedItems,
  renderItem,
}: CollectionListProps) => {
  const intl = useIntl()
  const collection_items = combinedItems.filter(
    (item) =>
      item.type === SearchDataType.COLLECTION &&
      item.subType === collection.source.sourceId
  )
  return (
    <Box key={`${collection.source.sourceId}`} mb='4'>
      <Text
        as='h2'
        fontWeight='semiBold'
        textStyle='blockquote-75-100'
        mb='3'
        textTransform='uppercase'
      >
        {intl.formatMessage({
          id: SOURCE_ID_TO_TRANSLATION_ID[collection?.source?.sourceId ?? ''],
        })}
      </Text>
      <List>{collection_items.map(renderItem)}</List>
    </Box>
  )
}
