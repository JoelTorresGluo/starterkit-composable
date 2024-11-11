import React, { useState, useEffect } from 'react'
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
        if (filterGroup !== 'group_id') {
          filterOptions.forEach((facetOption: string) => {
            tmpChecked[`${filterGroup}|${facetOption}`] = true
          })
        }
      }
    )
    setChecked(tmpChecked)
  }, [facets])

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

  const accordionItems = facets
    .map((facet) => {
      if (facet.hidden === true) return null

      switch (facet.type) {
        case 'multiple':
          return {
            label: capFirstLetter(facet.display_name),
            content: (
              <RefineList
                checked={checked}
                facet={facet}
                key={`${facet.display_name}`}
                onFacetOptionSelect={onFacetOptionSelect}
              />
            ),
          }
        case 'range':
          // If the facet is a price facet, we only want to display it
          // if the currency matches the current currency.
          if (
            facet.name.startsWith('price_') &&
            facet.name.slice(-3).toLocaleLowerCase() !==
              currency.toLocaleLowerCase()
          )
            return null

          return {
            label: intl.formatMessage({
              id: `category.refinements.${facet.name.toLocaleLowerCase()}`,
            }),
            content: (
              <RangeFilter
                name={facet.name}
                key={facet.display_name}
                min={Math.floor(facet.min)}
                max={Math.ceil(facet.max)}
              />
            ),
          }
        default:
          return null
      }
    })
    .filter(Boolean)

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
