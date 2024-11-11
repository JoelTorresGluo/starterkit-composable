import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Heading,
  HStack,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import { PLP_CONSTANT } from '../../../product-listing-shared'
import { useRefinements } from '../../hooks'
import { useCommercetoolsSearch } from '../provider'
import { RefinementListItem } from '../../types'

interface RefinementListProps extends RefinementListItem {}

export const RefinementList = ({
  label,
  hidden,
  items,
}: RefinementListProps) => {
  const { formatMessage } = useIntl()
  const { handleRefinement } = useRefinements()
  const { checked } = useCommercetoolsSearch()
  const [isShowingMore, setIsShowingMore] = useState(false)

  const canToggleShowMore =
    (items ?? []).length >= PLP_CONSTANT.REFINEMENTS_SHOW_LIMIT

  const toggleShowMore = () => {
    setIsShowingMore((prevIsShowingMore) => !prevIsShowingMore)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.id) return

    const [param, value] = e.target.id.split('|')

    handleRefinement({ param, value, checked: e.target.checked })
  }

  if (hidden) return null

  return (
    <AccordionItem w='full' border='0' borderBottomWidth='0 !important'>
      {({ isExpanded }) => (
        <>
          <Heading>
            <AccordionButton
              px={0}
              borderBottom='md'
              borderBottomColor='gray.200'
            >
              <Box as='span' flex={1} textAlign='left' display='inline-block'>
                {formatMessage({
                  id: `category.refinements.${label.toLocaleLowerCase()}`,
                })}
              </Box>
              {isExpanded ? (
                <MinusIcon fontSize='xs' />
              ) : (
                <AddIcon fontSize='xs' />
              )}
            </AccordionButton>
          </Heading>
          <AccordionPanel p={0.5}>
            <UnorderedList listStyleType='none' mx={0}>
              {(isShowingMore
                ? items
                : items.slice(0, PLP_CONSTANT.REFINEMENTS_SHOW_LIMIT)
              ).map((item) => {
                const id = `${label}|${item.label}`
                const isChecked = Boolean(checked[id])

                return (
                  <ListItem key={item.label} mb={2}>
                    <HStack justifyContent='space-between'>
                      <Checkbox
                        colorScheme='shading'
                        id={id}
                        isChecked={isChecked}
                        onChange={handleChange}
                        size='sm'
                      >
                        {item.label}
                      </Checkbox>
                      <Text color='gray.600' fontSize='xs'>
                        {item.count}
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
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}
