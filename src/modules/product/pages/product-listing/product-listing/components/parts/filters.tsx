'use client'

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
import {
  useCurrentRefinements,
  useInfiniteHits,
  useInstantSearch,
} from 'react-instantsearch'
import { AlgoliaFilter } from '@oriuminc/cms-generic'

export const Filters: ComponentWithAs<
  'div',
  AccordionProps & { prefix?: string; filters: AlgoliaFilter[] }
> = (props) => {
  const [expandedIndex, setExpandedIndex] = useState<number | number[]>([1])
  const intl = useIntl()
  const prefix = props.prefix ?? 'desktop'

  const filtersIndexes = props.filters.map((_, index) => index)
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

      <Accordion
        allowMultiple={true}
        index={expandedIndex}
        onChange={(expandedIndex) => setExpandedIndex(expandedIndex)}
        {...props}
      >
        {props.filters.map((refinement) => {
          if (refinement.type === 'numeric') {
            return (
              <NumericMenu
                prefix={prefix}
                key={refinement.attribute}
                {...refinement}
              />
            )
          } else if (refinement.type === 'list') {
            return (
              <RefinementList
                prefix={prefix}
                key={refinement.attribute}
                {...refinement}
              />
            )
          } else if (refinement.type === 'range') {
            return <RangeFilter key={refinement.attribute} {...refinement} />
          } else return null
        })}
      </Accordion>
    </>
  )
}
