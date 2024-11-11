import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { RangeParams, useRefinements } from '../../hooks'
import { RefinementRangeItem } from '../../types'

interface RangeFilterProps extends RefinementRangeItem {}

const getDisplayRange = ({ name, range }: RangeParams) => {
  switch (name.toLocaleLowerCase()) {
    case 'rating':
      return [`${range[0]}`, `${range[1]}`]
    case 'price_cad':
    case 'price_usd':
      const [min, max] = range
      return [`$${Math.floor(min / 100)}`, `$${Math.ceil(max / 100)}`]
    default:
      return range
  }
}

export const RangeFilter = ({ label, hidden, ...range }: RangeFilterProps) => {
  const min = Math.floor(range.min)
  const max = Math.ceil(range.max)

  const { formatMessage } = useIntl()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { handleRangeChange } = useRefinements()
  const [currentRange, setCurrentRange] = useState<[number, number]>([min, max])
  const displayedRange = getDisplayRange({ name: label, range: [min, max] })

  useEffect(() => {
    if (!router.isReady) return

    const filter = searchParams.get(label)

    if (filter) {
      const [low, high] = filter.split('-').map(Number)
      setCurrentRange([low, high])
    } else {
      setCurrentRange([min, max])
    }
  }, [router.isReady, router.query, label, min, max])

  if (hidden) return

  return (
    <AccordionItem w='full' border='0' py={2}>
      {({ isExpanded }) => (
        <>
          <Heading>
            <AccordionButton
              px='none'
              borderBottom='md'
              borderBottomColor='gray.200'
            >
              <Box flex={1} textAlign='left' as='span' display='inline-block'>
                <Text as='span'>
                  {formatMessage({
                    id: `category.refinements.${label.toLocaleLowerCase()}`,
                  })}
                </Text>
              </Box>
              {isExpanded ? (
                <MinusIcon fontSize='xs' />
              ) : (
                <AddIcon color='inherit' fontSize='xs' />
              )}
            </AccordionButton>
          </Heading>
          <AccordionPanel px={2}>
            <Flex alignItems='center'>
              <Box flex={1} pl={1} pr={5}>
                <RangeSlider
                  value={currentRange}
                  min={min}
                  max={max}
                  step={1}
                  onChange={(val: [number, number]) => {
                    setCurrentRange(val)
                    handleRangeChange({ name: label, range: val })
                  }}
                >
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack bg='gray.200' />
                  </RangeSliderTrack>
                  <RangeSliderThumb
                    boxSize='4'
                    index={0}
                    borderColor='gray.600'
                    borderWidth={3}
                  />
                  <RangeSliderThumb
                    boxSize='4'
                    index={1}
                    borderColor='gray.600'
                    borderWidth={3}
                  />
                </RangeSlider>
              </Box>
            </Flex>
            <Flex alignItems='center'>
              <Text px='0-5'>{displayedRange[0]}</Text>
              <Spacer />
              <Text px='4'>{displayedRange[1]}</Text>
            </Flex>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}
