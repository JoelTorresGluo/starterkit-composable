import {
  Box,
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FunctionComponent, useEffect, useState } from 'react'
import {
  getDisplayRange,
  updateUrlParameters,
  parseUrlParameters,
} from '../utils'

export const RangeFilter: FunctionComponent<{
  name: string
  min: number
  max: number
  onRangeChange?: ({
    name,
    range,
  }: {
    name: string
    range: [number, number]
  }) => void
}> = (props) => {
  const router = useRouter()
  const { parameters, ...restParams } = parseUrlParameters(router)
  const { name, min, max, onRangeChange } = props
  const [currentRange, setCurrentRange] = useState<[number, number]>([min, max])
  const displayedRange = getDisplayRange({ name, range: [min, max] })
  const onChange = ({
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
          [name]: [`${range[0]}-${range[1]}`],
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

  useEffect(() => {
    if (!router.isReady) return
    const filter = router.query[`filters[${name}]`] as string | undefined
    if (filter) {
      const [low, high] = filter.split('-').map(Number)
      setCurrentRange([low, high])
    } else {
      setCurrentRange([min, max])
    }
  }, [router.isReady, router.query, name, min, max])

  return (
    <>
      <Flex px='1' alignItems='center'>
        <Box flex='1' pl='1' pr='5'>
          <RangeSlider
            value={currentRange}
            min={min}
            max={max}
            step={1}
            onChange={(val: [number, number]) => {
              setCurrentRange(val)
              onRangeChange
                ? onRangeChange({
                    name: name,
                    range: val,
                  })
                : onChange({
                    name: name,
                    range: val,
                  })
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
    </>
  )
}
