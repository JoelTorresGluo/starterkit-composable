import { useState } from 'react'
import {
  Accordion,
  AccordionProps,
  Box,
  Button,
  ComponentWithAs,
  Skeleton,
} from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { NumericMenu, RangeFilter, RefinementList } from '../filtering'
import { useCommercetoolsSearch } from '../provider'
import { useComposable } from '@oriuminc/base'

export const Filters: ComponentWithAs<'div', AccordionProps> = (props) => {
  const [expandedIndex, setExpandedIndex] = useState<number | number[]>([1])
  const intl = useIntl()
  const { currency } = useComposable()
  const { searchResult } = useCommercetoolsSearch()

  const isLoading = searchResult.total === 0
  const filtersIndexes = searchResult.refinements?.map((_, index) => index)
  const allFilterAreExpanded =
    expandedIndex instanceof Array &&
    expandedIndex.length === filtersIndexes.length

  const handleExpandButton = () => {
    if (allFilterAreExpanded) {
      return setExpandedIndex([])
    }
    return setExpandedIndex(filtersIndexes)
  }

  return (
    <>
      <Box mb='3-5'>
        <Button
          variant='link'
          size='sm'
          color='shading'
          textDecoration='underline'
          fontWeight='extrabold'
          onClick={handleExpandButton}
        >
          {allFilterAreExpanded
            ? intl.formatMessage({ id: 'category.filters.action.collapseAll' })
            : intl.formatMessage({ id: 'category.filters.action.expandAll' })}
        </Button>
      </Box>
      {
        // TODO: Replace pixel values with tokens.
        isLoading ? (
          <Box>
            <Skeleton h='9' />
            <Skeleton mt='1' h='9' />
            <Skeleton w='86%' mt='1' h='18px' />
            <Skeleton w='full' mt='1' h='18px' />
            <Skeleton w='60%' mt='1' h='18px' />
            <Skeleton w='44%' mt='1' h='18px' />
            <Skeleton w='75%' mt='1' h='18px' />
            <Skeleton mt='5' h='9' />
            <Skeleton mt='1' h='9' />
            <Skeleton mt='1' h='9' />
            <Skeleton mt='1' h='9' />
          </Box>
        ) : (
          <Accordion
            allowMultiple={true}
            index={expandedIndex}
            onChange={setExpandedIndex}
            {...props}
          >
            {searchResult.refinements?.map((refinement) => {
              switch (refinement.type) {
                case 'numeric':
                  return (
                    <NumericMenu key={refinement.attribute} {...refinement} />
                  )

                case 'list':
                  return (
                    <RefinementList
                      key={refinement.attribute}
                      {...refinement}
                    />
                  )

                case 'range':
                  // If the facet is a price facet, we only want to display it
                  // if the currency matches the current currency.
                  if (
                    refinement.label.startsWith('price_') &&
                    refinement.label.slice(-3).toLocaleLowerCase() !==
                      currency.toLocaleLowerCase()
                  )
                    return null

                  return (
                    <RangeFilter key={refinement.attribute} {...refinement} />
                  )

                default:
                  return null
              }
            })}
          </Accordion>
        )
      }
    </>
  )
}
