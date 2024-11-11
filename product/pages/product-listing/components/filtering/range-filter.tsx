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
    <AccordionItem w='100%' border='0' py='2'>
      {({ isExpanded }) => (
        <>
          <Heading>
            <AccordionButton px={0} borderBottom='md'>
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
          <AccordionPanel px={2}>
            <Flex alignItems='center'>
              <Box flex='1' pl={1} pr={5}>
                <RangeSlider
                  value={slider}
                  min={range.min}
                  max={range.max}
                  step={1}
                  onChange={(val) => refine(val as any)}
                >
                  <RangeSliderTrack bg='shading.100'>
                    <RangeSliderFilledTrack bg='info-med' />
                  </RangeSliderTrack>
                  <RangeSliderThumb
                    boxSize={4}
                    index={0}
                    boxShadow='none'
                    background={'info-med'}
                  />
                  <RangeSliderThumb
                    boxSize={4}
                    index={1}
                    boxShadow='none'
                    background={'info-med'}
                  />
                </RangeSlider>
              </Box>
            </Flex>
            <Flex alignItems='center'>
              <Text px={0.5}>{range.min}</Text>
              <Spacer />
              <Text px={4}>{range.max}</Text>
            </Flex>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}
