'use client'

import {
  AspectRatio,
  Box,
  Circle,
  Flex,
  HStack,
  Skeleton,
  SkeletonText,
  VStack,
} from '@chakra-ui/react'
import {
  Carousel,
  CarouselSlide,
  productSliderCardWidthDesktop,
  productSliderCardWidthMobile,
  productSliderItemsDesktop,
  productSliderItemsMobile,
  useCarousel,
} from '@oriuminc/ui'
import { useState } from 'react'

const variant = 'default'
export const SkeletonProductSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [ref, slider] = useCarousel({
    slideChanged: (slider) => setCurrentSlide(slider.track.details.rel),
    destroyed: () => setCurrentSlide(0),
    loop: true,
    mode: 'free',
    slides: {
      origin: 0,
      perView: productSliderItemsMobile[variant],
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 500px)': {
        slides: {
          origin: 0,
          perView: productSliderItemsDesktop[variant],
          spacing: 16,
        },
      },
    },
  })
  return (
    <Box
      py={{ base: 10, lg: 16 }}
      maxW='container.2xl'
      mx='auto'
      layerStyle='container-padding'
    >
      <Box
        display='flex'
        width='100%'
        mb={{ base: 8, lg: 12 }}
        justifyContent='space-between'
        alignItems='center'
      >
        <VStack gap={2} w='full' alignItems='left'>
          <SkeletonText noOfLines={1} skeletonHeight={30} width='300px' />
          <SkeletonText noOfLines={1} skeletonHeight={15} width='150px' />
        </VStack>

        <Flex
          display={['none', null, null, 'flex']}
          width='100px'
          mr='5%'
          gap={1}
        >
          <Skeleton
            width={10}
            height={10}
            borderRadius='4px'
            onClick={() => slider.current?.prev()}
          />
          <Skeleton
            width={10}
            height={10}
            borderRadius='4px'
            onClick={() => slider.current?.next()}
          />
        </Flex>
      </Box>

      <Carousel mb={{ base: 8, lg: 12 }} ref={ref} overflow='visible'>
        {Array(5)
          .fill('')
          .map((_, idx) => (
            <CarouselSlide key={idx}>
              <AspectRatio
                ratio={4 / 3}
                maxWidth={[
                  productSliderCardWidthMobile[variant],
                  null,
                  null,
                  productSliderCardWidthDesktop[variant],
                ]}
                height='220px'
                borderRadius='4px'
              >
                <Skeleton width='full' height='full' />
              </AspectRatio>
            </CarouselSlide>
          ))}
      </Carousel>

      <HStack position='relative' width='full' justify='center'>
        <Circle size='2' bg='shading.300' />
        <Circle size='2' bg='shading.300' />
        <Circle size='2' bg='shading.300' />
        <Circle size='2' bg='shading.300' />
      </HStack>
    </Box>
  )
}
