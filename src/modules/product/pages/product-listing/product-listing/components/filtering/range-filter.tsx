'use client'

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
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { FunctionComponent, useEffect, useState } from 'react'
import { useRange } from 'react-instantsearch'
import { RangeProps } from '@oriuminc/algolia'

export const RangeFilter: FunctionComponent<RangeProps> = (props) => {
  const { label, attribute } = props
  const { range, refine, start, canRefine } = useRange({
    attribute,
  })
  const [slider, setSlider] = useState<number[]>(start as number[])
  useEffect(() => {
    // to properly update the slider position
    setSlider(start as any)
  }, [start])

  if (!canRefine) {
    return <></>
  }
  return (
    <AccordionItem w='full' border='none' py='2'>
      {({ isExpanded }) => (
        <>
          <Heading>
            <AccordionButton
              px='0'
              borderBottom='md'
              borderBottomColor='var(--chakra-colors-gray-200)'
            >
              <Box flex='1' textAlign='left'>
                <Text>{label}</Text>
              </Box>
              {isExpanded ? (
                <MinusIcon fontSize='xs' />
              ) : (
                <AddIcon color='inherit' fontSize='xs' />
              )}
            </AccordionButton>
          </Heading>
          <AccordionPanel px='2'>
            <Flex alignItems='center'>
              <Box flex='1' pl='1' pr='5'>
                <RangeSlider
                  value={slider}
                  min={range.min}
                  max={range.max}
                  step={1}
                  onChange={(val) => refine(val as any)}
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
              <Text px='0-5'>{range.min}</Text>
              <Spacer />
              <Text px='4'>{range.max}</Text>
            </Flex>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}
