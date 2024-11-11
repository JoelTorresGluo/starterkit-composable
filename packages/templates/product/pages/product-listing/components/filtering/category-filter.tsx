'use client'

import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Button,
  HStack,
  ListItem,
  UnorderedList,
  Text,
  Box,
} from '@chakra-ui/react'
import { ALGOLIA_CATEGORY } from '@oriuminc/algolia'
import { useHierarchicalMenu } from 'react-instantsearch'
import { useIntl } from 'react-intl'

type HierarchicalMenuItem = {
  value: string
  label: string
  count: number
  isRefined: boolean
  data: HierarchicalMenuItem[] | null
}

export const CategoryFilter = () => {
  const { formatMessage } = useIntl()
  const uhm = useHierarchicalMenu({ ...ALGOLIA_CATEGORY })
  const { items, refine, canToggleShowMore, isShowingMore, toggleShowMore } =
    uhm
  const refinedBy: HierarchicalMenuItem | null =
    items.find((i) => i.isRefined) || null
  const displayItems =
    refinedBy && refinedBy.data?.length
      ? {
          items: refinedBy.data,
          canToggleShowMore: false,
          isShowingMore: false,
        }
      : {
          items,
          canToggleShowMore,
          isShowingMore,
        }

  return (
    <Box py='3'>
      <UnorderedList listStyleType='none' mx='none'>
        {displayItems.items.map((item: any) => (
          <ListItem key={item.label} mb='2'>
            <HStack>
              <HStack
                flexGrow='1'
                justify='space-between'
                fontSize='xs'
                fontWeight='normal'
              >
                <Text
                  cursor='pointer'
                  onClick={() => {
                    refine(item.value)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      refine(item.value)
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                  tabIndex={0}
                >
                  {item.label}
                </Text>
                <Text color='gray.500'>{item.count}</Text>
              </HStack>
            </HStack>
          </ListItem>
        ))}
      </UnorderedList>
      {displayItems.canToggleShowMore && (
        <Button
          variant='link'
          size='sm'
          mt={{ base: 5, lg: 'sm' }}
          color='shading'
          textDecoration='underline'
          onClick={toggleShowMore}
        >
          {displayItems.isShowingMore
            ? formatMessage({ id: 'category.filters.action.viewLess' })
            : formatMessage({ id: 'category.filters.action.viewMore' })}
        </Button>
      )}
    </Box>
  )
}
