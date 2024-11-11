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
import { Facet, FacetGroup } from '../types'

interface RefineListProps {
  checked: { [key: string]: boolean }
  facet: FacetGroup
  onFacetOptionSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const RefineList = (props: RefineListProps) => {
  const { formatMessage } = useIntl()
  const { facet, checked, onFacetOptionSelect } = props
  const canToggleShowMore =
    (facet.values as Facet[]).length >= PLP_CONSTANT.REFINEMENTS_SHOW_LIMIT
  const [isShowingMore, setIsShowingMore] = useState(false)
  const toggleShowMore = () => {
    setIsShowingMore((prevIsShowingMore) => !prevIsShowingMore)
  }

  return (
    <>
      <UnorderedList listStyleType='none' mx='0'>
        {(
          (isShowingMore
            ? facet.values
            : (facet.values as Facet[]).slice(
                0,
                PLP_CONSTANT.REFINEMENTS_SHOW_LIMIT
              )) as Facet[]
        ).map((value) => {
          return (
            <ListItem key={value.name} mb='2'>
              <HStack justifyContent='space-between'>
                <Checkbox
                  colorScheme='shading'
                  id={`${facet.label}|${value.name}`}
                  isChecked={checked[`${facet.label}|${value.name}`] || false}
                  onChange={onFacetOptionSelect}
                  size='sm'
                >
                  {value.name}
                </Checkbox>
                <Text color='gray.600' fontSize='xs'>
                  {value.count}
                </Text>
              </HStack>
            </ListItem>
          )
        })}
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
