'use client'

import { HStack, Box, Button, Flex } from '@chakra-ui/react'
import { useCurrentRefinements, useClearRefinements } from 'react-instantsearch'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { useIntl } from 'react-intl'

interface RefinementChipProps {
  label: string
  clearRefinement: () => void
}

const RefinementChip = ({ label, clearRefinement }: RefinementChipProps) => {
  return (
    <Button
      variant='outline'
      size='xs'
      rightIcon={<SmallCloseIcon />}
      py='2'
      h='8'
      onClick={clearRefinement}
    >
      {label}
    </Button>
  )
}

export const CurrentRefinements = () => {
  const { items: refinementAttributes, refine: clearSingleRefinement } =
    useCurrentRefinements()
  const { canRefine: isRefined, refine: clearAllRefinements } =
    useClearRefinements()

  const intl = useIntl()

  if (!isRefined) {
    return null
  }

  return (
    <Flex
      gap='2'
      wrap='wrap'
      mt={{ base: 4, lg: 6 }}
      mb={{ base: 'none', lg: 6 }}
    >
      {refinementAttributes?.map((attribute) =>
        attribute?.refinements?.map((refinement, index) => (
          <RefinementChip
            key={index}
            label={
              attribute.attribute === 'attributes.normalized.rating'
                ? `${refinement.value}+ (${intl.formatMessage({
                    id: 'category.refinements.rating',
                  })})`
                : refinement.value.toString()
            }
            clearRefinement={() => clearSingleRefinement(refinement)}
          />
        ))
      )}
      <Button
        variant='link'
        size='xs'
        color='shading'
        fontWeight='extrabold'
        ml='2'
        textDecoration='underline'
        onClick={clearAllRefinements}
      >
        {intl.formatMessage({ id: 'category.filters.action.clear' })}
      </Button>
    </Flex>
  )
}
