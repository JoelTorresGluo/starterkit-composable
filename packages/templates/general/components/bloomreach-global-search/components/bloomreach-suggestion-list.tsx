import { ListItem } from '@chakra-ui/react'
import React from 'react'
import { CollectionItem } from '../../global-search-shared'
import { RecentSearchItem, SuggestionItem } from '../shared/types'

const BloomreachSuggestionList = ({
  item,
  inputValue,
  bgStyle,
  isSelected,
  handleRemove,
  ...rest
}: {
  item: { label: string; index: number } | RecentSearchItem
  inputValue: string
  bgStyle: string
  isSelected: boolean
  handleRemove?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => {}
}) => {
  return (
    <ListItem
      key={`${item.label}${item.index}`}
      py='1-5'
      px='none'
      _hover={{
        backgroundColor: 'highlight',
      }}
      bg={bgStyle}
      {...item}
      {...rest}
    >
      <CollectionItem
        selected={isSelected}
        name={item.label}
        inputValue={inputValue}
        handleRemove={handleRemove}
      />
    </ListItem>
  )
}

export default BloomreachSuggestionList
