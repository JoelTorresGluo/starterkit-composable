'use client'

import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  HStack,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import { useRefinementList } from 'react-instantsearch'
import { useIntl } from 'react-intl'

import {
  DEFAULT_INITIAL_REFINEMENTS_LIMIT,
  DEFAULT_SHOW_MORE_REFINEMENTS_LIMIT,
  RefinementListProps,
} from '@oriuminc/algolia'

export const RefinementList: FunctionComponent<
  RefinementListProps & { prefix: string }
> = (props) => {
  const {
    label,
    limit = DEFAULT_INITIAL_REFINEMENTS_LIMIT,
    showMoreLimit = DEFAULT_SHOW_MORE_REFINEMENTS_LIMIT,
    prefix,
  } = props

  const { items, refine, canToggleShowMore, isShowingMore, toggleShowMore } =
    useRefinementList({
      ...props,
      limit,
      showMoreLimit,
      showMore: true,
    })

  const { formatMessage } = useIntl()

  if (items && items.length === 0) return null

  return (
    <AccordionItem w='full' border='none' borderBottomWidth='0 !important'>
      {({ isExpanded }) => (
        <>
          <Heading as='h3'>
            <AccordionButton
              px='0'
              borderBottom='md'
              borderBottomColor='var(--chakra-colors-gray-200)'
            >
              <Box flex='1' textAlign='left'>
                {label}
              </Box>
              {isExpanded ? (
                <MinusIcon fontSize='xs' />
              ) : (
                <AddIcon fontSize='xs' />
              )}
            </AccordionButton>
          </Heading>
          <AccordionPanel px='0-5'>
            <UnorderedList listStyleType='none' mx='0'>
              {items.map((item) => (
                <ListItem key={item.label} mb='2'>
                  <HStack justifyContent='space-between'>
                    <Checkbox
                      colorScheme='shading'
                      id={`${prefix}_${item.label}`}
                      isChecked={item.isRefined}
                      onChange={() => refine(item.value)}
                      size='sm'
                    >
                      {item.label}
                    </Checkbox>
                    <Text color='gray.600' fontSize='xs'>
                      {item.count}
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
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}
