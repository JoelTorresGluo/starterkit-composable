import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Skeleton } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import {
  parseUrlParameters,
  updateUrlParameters,
  capFirstLetter,
} from '../utils'
import { RefineList } from './refine-list'
import { RangeFilter } from './range-filter'
import { useFilters } from '../hooks'
import { Accordion } from '@oriuminc/ui'
import { useComposable } from '@oriuminc/base'
import { FacetType, RangeFacet } from '../types'

export const FacetFilters = () => {
  const router = useRouter()
  const intl = useIntl()
  const { currency } = useComposable()
  const { facets, checked, setChecked } = useFilters()
  const isLoading = facets.length === 0
  const [expandedIndex, setExpandedIndex] = useState<number | number[]>([1])
  const { parameters, ...restParams } = parseUrlParameters(router)
  const filtersIndexes = facets.map((_, index) => index)
  const allFilterAreExpanded =
    expandedIndex instanceof Array &&
    expandedIndex.length === filtersIndexes.length

  const handleExpandButton = () => {
    if (allFilterAreExpanded) {
      return setExpandedIndex([])
    }
    return setExpandedIndex(filtersIndexes)
  }
  useEffect(() => {
    const tmpChecked: { [key: string]: boolean } = {}
    Object.entries(parameters.filters).forEach(
      ([filterGroup, filterOptions]) => {
        if (filterGroup !== 'group_id' && filterOptions) {
          if (Array.isArray(filterOptions)) {
            filterOptions.forEach((facetOption: string) => {
              tmpChecked[`${filterGroup}|${facetOption}`] = true
            })
          } else {
            tmpChecked[`${filterGroup}|${filterOptions}`] = true
          }
        }
      }
    )
    setChecked(tmpChecked)
  }, [router.query])

  const onRangeChange = ({
    name,
    range,
  }: {
    name: string
    range: [number, number]
  }) => {
    if (!name) return

    const updatedParams = updateUrlParameters(router, {
      ...restParams,
      parameters: {
        ...parameters,
        filters: {
          ...parameters.filters,
          [name.toLowerCase()]: [`${range[0]}-${range[1]}`],
        },
      },
    })

    router.push(
      {
        search: updatedParams,
      },
      undefined,
      { shallow: true }
    )
  }

  const onFacetOptionSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const facetIdSplit = e?.target?.id?.split('|')

    if (!facetIdSplit) {
      // Handle error or exit the function.
      return
    }

    if (facetIdSplit) {
      const [facetGroup, facetOption] = facetIdSplit
      const existingValues = parameters.filters[facetGroup] ?? []
      const newValue = e?.target?.checked
        ? [...existingValues, facetOption]
        : existingValues.filter((value) => value !== facetOption)

      const updatedFilters = { ...parameters.filters }

      if (newValue.length > 0) updatedFilters[facetGroup] = newValue
      else {
        delete updatedFilters[facetGroup]
      }

      const updatedParams = updateUrlParameters(router, {
        ...restParams,
        parameters: {
          ...parameters,
          filters: updatedFilters,
        },
      })

      router.push(
        {
          search: updatedParams,
        },
        undefined,
        { shallow: true }
      )
    }
  }

  const accordionItems = facets.map((facetGroup) => {
    switch (facetGroup.type) {
      case FacetType.Select:
        return {
          label: capFirstLetter(facetGroup.label),
          content: (
            <RefineList
              checked={checked}
              facet={facetGroup}
              key={`${facetGroup.label}`}
              onFacetOptionSelect={onFacetOptionSelect}
            />
          ),
        }
      case FacetType.Range:
        let display_label = facetGroup.label
        let display_min
        let display_max
        if (display_label.toLowerCase() === 'price') {
          display_min =
            Math.floor((facetGroup.values as RangeFacet).start) / 100
          display_max = Math.ceil((facetGroup.values as RangeFacet).end) / 100
        }

        return {
          label: capFirstLetter(display_label),
          content: (
            <RangeFilter
              name={facetGroup.label}
              key={display_label}
              min={Math.floor((facetGroup.values as RangeFacet).start)}
              max={Math.ceil((facetGroup.values as RangeFacet).end)}
              onRangeChange={onRangeChange}
              display_min={display_min}
              display_max={display_max}
            />
          ),
        }
      default:
        return null
    }
  })

  return (
    <>
      <Box mb={3.5}>
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
      {isLoading ? (
        <Box>
          <Skeleton h='9' />
          <Skeleton mt='1' h='9' />
          <Skeleton
            w='86%'
            mt='1'
            // TODO: Replace pixel values with tokens.
            h='18px'
          />
          <Skeleton w='100%' mt='1' h='18px' />
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
          size='medium'
          accordionProps={{
            index: expandedIndex,
            allowMultiple: true,
            onChange: (expandedIndex) => setExpandedIndex(expandedIndex),
          }}
          accordionButtonProps={{
            h: 10,
            px: 'none',
          }}
          accordionPanelProps={{
            px: 'none',
            py: 'none',
          }}
          items={accordionItems as any}
        />
      )}
    </>
  )
}

export default FacetFilters
