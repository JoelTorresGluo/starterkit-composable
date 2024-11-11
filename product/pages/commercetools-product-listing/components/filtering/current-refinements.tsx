import { SmallCloseIcon } from '@chakra-ui/icons'
import { Button, Flex } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { useRefinements } from '../../hooks'
import { useCommercetoolsSearch } from '../provider'

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
  const { checked } = useCommercetoolsSearch()
  const { handleClearAllRefinement, handleClearSingleRefinement } =
    useRefinements()
  const intl = useIntl()

  if (!checked) {
    return null
  }

  const checkedList = Object.keys(checked).map((key) => key.split('|'))

  const getDisplayLabel = (group: string, label: string) => {
    switch (group.toLocaleLowerCase()) {
      case 'price_cad':
      case 'price_usd':
        const [min, max] = label.split('-')
        return `$${Math.floor(Number(min) / 100)} - $${Math.ceil(
          Number(max) / 100
        )}`
      case 'rating':
        return `${intl.formatMessage({
          id: 'category.refinements.rating',
        })} ${label}`
      default:
        return label
    }
  }

  return (
    <Flex
      gap='2'
      wrap='wrap'
      mt={{ base: 4, lg: 6 }}
      mb={{ base: 'none', lg: 6 }}
    >
      {checkedList.map(([group, label]) => (
        <RefinementChip
          key={`${group}_${label}`}
          label={getDisplayLabel(group, label)}
          clearRefinement={() => handleClearSingleRefinement(group, label)}
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
          onClick={handleClearAllRefinement}
        >
          {intl.formatMessage({ id: 'category.filters.action.clear' })}
        </Button>
      )}
    </Flex>
  )
}
