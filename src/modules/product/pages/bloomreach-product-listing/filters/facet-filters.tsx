import { Box, Button, Skeleton } from '@chakra-ui/react'
import { Accordion } from '@oriuminc/ui'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useFilters } from '../hooks'
import { FacetType, RangeFacet } from '../types'
import {
  capFirstLetter,
  parseUrlParameters,
  updateUrlParameters,
} from '../utils'
import { RangeFilter } from './range-filter'
import { RefineList } from './refine-list'

export const FacetFilters = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const intl = useIntl()
  const { facets, checked, setChecked } = useFilters()
  const isLoading = facets.length === 0
  const [expandedIndex, setExpandedIndex] = useState<number | number[]>([1])
  const { parameters, ...restParams } = parseUrlParameters(searchParams)
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
  }, [searchParams])

  const onRangeChange = ({
    name,
    range,
  }: {
    name: string
    range: [number, number]
  }) => {
    if (!name) return

    const updatedParams = updateUrlParameters(searchParams, {
      ...restParams,
      parameters: {
        ...parameters,
        filters: {
          ...parameters.filters,
          [name.toLowerCase()]: [`${range[0]}-${range[1]}`],
        },
      },
    })

    router.push(`${pathname}?${updatedParams}`, { scroll: false })
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

      const updatedParams = updateUrlParameters(searchParams, {
        ...restParams,
        parameters: {
          ...parameters,
          filters: updatedFilters,
        },
      })

      router.push(`${pathname}?${updatedParams}`, { scroll: false })
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
            height: 10,
            px: 0,
          }}
          accordionPanelProps={{
            px: 0,
            py: 0,
          }}
          items={accordionItems as any}
        />
      )}
    </>
  )
}

export default FacetFilters
