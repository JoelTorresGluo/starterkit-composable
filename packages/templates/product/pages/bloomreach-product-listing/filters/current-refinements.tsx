import { Button, Flex } from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { useIntl } from 'react-intl'
import { useFilters } from '../hooks'
import { useRouter } from 'next/router'
import { updateUrlParameters, parseUrlParameters } from '../utils'
import { useEffect } from 'react'

interface RefinementChipProps {
  label: string
  clearRefinement?: () => void
}

const RefinementChip = ({ label, clearRefinement }: RefinementChipProps) => {
  return (
    <Button
      variant='outline'
      size='xs'
      rightIcon={clearRefinement && <SmallCloseIcon />}
      py='2'
      h='8'
      onClick={() => clearRefinement?.()}
    >
      {label}
    </Button>
  )
}

export const CurrentRefinements = () => {
  const { checked } = useFilters()
  const router = useRouter()
  const intl = useIntl()
  if (!checked) {
    return null
  }

  const checkedList = Object.keys(checked).map((key) => key.split('|'))
  const getDisplayLabel = (group: string, name: string) => {
    switch (group.toLocaleLowerCase()) {
      case 'price':
        const [min, max] = name.split('-')
        return `$${Math.floor(Number(min) / 100)} - $${Math.ceil(
          Number(max) / 100
        )}`
      case 'rating':
        return `${intl.formatMessage({
          id: 'category.refinements.rating',
        })} ${name}`
      default:
        return name
    }
  }

  const clearSingleRefinement = (facetGroup: string, facetOption: string) => {
    if (!facetGroup || !facetOption) {
      // Handle error or exit the function.
      console.error('Facet group or option is missing.')
      return
    }
    const { parameters, ...restParams } = parseUrlParameters(router)
    const updatedFilters = {
      ...parameters.filters,
      [facetGroup]:
        parameters.filters[facetGroup]?.filter(
          (value) => value !== facetOption
        ) || [],
    }

    // Remove the facetGroup entirely if no filters are left
    if (updatedFilters[facetGroup].length === 0) {
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

  const handleClearRefinement = () => {
    const updatedParams = updateUrlParameters(router, {
      parameters: {
        filters: {},
      },
    })
    router.push({ search: updatedParams }, undefined, { shallow: true })
  }

  return (
    <Flex
      gap='2'
      wrap='wrap'
      mt={{ base: 4, lg: 6 }}
      mb={{ base: 'none', lg: 6 }}
    >
      {checkedList.map(([group, name]) => (
        <RefinementChip
          key={`${group}_${name}`}
          label={getDisplayLabel(group, name)}
          clearRefinement={() => clearSingleRefinement(group, name)}
        />
      ))}
      {!!checkedList.length && (
        <Button
          variant='link'
          size='xs'
          color='shading'
          fontWeight='extrabold'
          ml='2'
          textDecoration='underline'
          onClick={handleClearRefinement} // clearAllRefinements
        >
          {intl.formatMessage({ id: 'category.filters.action.clear' })}
        </Button>
      )}
    </Flex>
  )
}
