import {
  Button,
  Checkbox,
  HStack,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { useState } from 'react'
import { PLP_CONSTANT } from '../../product-listing-shared'
import { FacetAPI } from '../types'

interface RefineListProps {
  checked: { [key: string]: boolean }
  facet: FacetAPI
  onFacetOptionSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const RefineList = (props: RefineListProps) => {
  const { formatMessage } = useIntl()
  const { facet, checked, onFacetOptionSelect } = props
  const canToggleShowMore =
    facet.options.length >= PLP_CONSTANT.REFINEMENTS_SHOW_LIMIT
  const [isShowingMore, setIsShowingMore] = useState(false)
  const toggleShowMore = () => {
    setIsShowingMore((prevIsShowingMore) => !prevIsShowingMore)
  }

  return (
    <>
      <UnorderedList listStyleType='none' mx='0'>
        {(isShowingMore
          ? facet.options
          : facet.options.slice(0, PLP_CONSTANT.REFINEMENTS_SHOW_LIMIT)
        ).map((option) => (
          <ListItem key={option.display_name} mb='2'>
            <HStack justifyContent='space-between'>
              <Checkbox
                colorScheme='shading'
                id={`${facet.name}|${option.value}`}
                isChecked={checked[`${facet.name}|${option.value}`] || false}
                onChange={onFacetOptionSelect}
                size='sm'
              >
                {option.display_name}
              </Checkbox>
              <Text color='gray.600' fontSize='xs'>
                {option.count}
              </Text>
            </HStack>
          </ListItem>
        ))}
      </UnorderedList>
      {canToggleShowMore && (
        <Button
          variant='link'
          size='xs'
          mt={{ base: 5, lg: 'sm' }}
          color='shading'
          textDecoration='underline'
          fontWeight='extrabold'
          onClick={toggleShowMore}
        >
          {isShowingMore
            ? formatMessage({ id: 'category.filters.action.viewLess' })
            : formatMessage({ id: 'category.filters.action.viewMore' })}
        </Button>
      )}
    </>
  )
}
