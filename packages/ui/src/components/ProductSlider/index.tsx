'use client'

import { ReactElement, useState } from 'react'
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Circle,
  Flex,
  FlexProps,
  HStack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'
import {
  Carousel,
  CarouselIconButton,
  CarouselSlide,
  useCarousel,
} from '../Carousel'
import { ProductCard } from '../ProductCard'

type ProductSliderVariant = 'default' | 'large'

interface SliderProductData {
  id: string
  href: string
  imageUrl: string
  brand: string
  title: string
  price: string | ReactElement
}

export interface ProductSliderProps {
  title?: string
  subtitle?: string
  variant?: ProductSliderVariant
  callToAction?: ButtonProps
  prefetch?: boolean | undefined
  productList?: Array<SliderProductData>
  onClickProduct?: (product: SliderProductData) => void
  overflow?: FlexProps['overflow']
  containerProps?: BoxProps
}

export const ProductSlider = ({
  title,
  subtitle,
  variant = 'default',
  callToAction,
  productList,
  prefetch,
  onClickProduct,
  overflow = 'visible',
  containerProps,
}: ProductSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const isMobile = useBreakpointValue({ base: true, xs: false })
  const itemOffset = isMobile
    ? Math.floor(productSliderItemsMobile[variant])
    : Math.floor(productSliderItemsDesktop[variant])
  const lastItemIdx = productList ? productList.length - itemOffset : 0
  const [ref, slider] = useCarousel({
    slideChanged: (slider) => setCurrentSlide(slider.track.details.rel),
    destroyed: () => setCurrentSlide(0),
    loop: false,
    range: {
      min: 0,
      max: lastItemIdx,
    },
    mode: 'free',
    slides: {
      origin: 0,
      perView: productSliderItemsMobile[variant],
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 28rem)': {
        slides: {
          origin: 0,
          perView: productSliderItemsDesktop[variant],
          spacing: 16,
        },
      },
    },
  })

  if (!productList?.length) {
    return null
  }

  const sliderDots = productList.slice(0, lastItemIdx + 1)

  return (
    <Box
      py={{ base: 10, lg: 16 }}
      maxW='container.2xl'
      mx='auto'
      layerStyle='container-padding'
      {...containerProps}
    >
      <Flex
        w='full'
        mb={{ base: 8, lg: 12 }}
        justifyContent='space-between'
        alignItems='center'
      >
        <Box>
          {title && (
            <Text as='h2' textStyle='heading-400' mb='1'>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text as='h3' textStyle='body-100-300'>
              {subtitle}
            </Text>
          )}
        </Box>

        <Box
          display={{ base: 'none', sm: 'flex' }}
          justifyContent='space-between'
        >
          <CarouselIconButton
            w='12'
            h='12'
            background='shading.100'
            borderRadius='base'
            onClick={() => slider.current?.prev()}
            disabled={currentSlide === 0}
            opacity={currentSlide === 0 ? 0.5 : 1}
            icon={<IoChevronBackOutline />}
            // TODO: Localize string.
            aria-label='Previous Slide'
          />
          <CarouselIconButton
            w='12'
            h='12'
            background='shading.100'
            borderRadius='base'
            onClick={() => slider.current?.next()}
            disabled={currentSlide === sliderDots.length - 1}
            opacity={currentSlide === sliderDots.length - 1 ? 0.5 : 1}
            icon={<IoChevronForwardOutline />}
            // TODO: Localize string.
            aria-label='Next Slide'
          />
        </Box>
      </Flex>

      <Carousel mb={{ base: 8, lg: 12 }} ref={ref} overflow={overflow}>
        {productList.map((product, index) => {
          return (
            <CarouselSlide key={`${product.href}${index}`}>
              <ProductCard
                root={{
                  onClick: () => onClickProduct?.(product),
                  onFocus: () => slider.current?.moveToIdx(index),
                  onMouseDown: (e) => e.preventDefault(),
                  maxWidth: [
                    productSliderCardWidthMobile[variant],
                    null,
                    null,
                    productSliderCardWidthDesktop[variant],
                  ],
                }}
                prefetch={prefetch}
                href={product.href}
                image={{
                  src: product.imageUrl,
                  objectFit: 'contain',
                }}
                name={{
                  children: product.title,
                }}
                brand={{
                  children: product.brand,
                }}
                price={{
                  children: product.price,
                }}
              />
            </CarouselSlide>
          )
        })}
      </Carousel>

      {productList.length > 1 && (
        <HStack position='relative' w='full' justify='center'>
          {sliderDots.map((_, idx) => (
            <Circle
              role='img'
              tabIndex={-1}
              // TODO: Localize string.
              aria-label={`Go to product ${idx + 1} of ${
                sliderDots.length + 1
              }`}
              cursor='pointer'
              key={idx}
              size={{ base: 2, lg: 3 }}
              bg={currentSlide === idx ? 'text' : 'shading.300'}
              onClick={() => slider.current?.moveToIdx(idx)}
              onKeyPress={() => slider.current?.moveToIdx(idx)}
            />
          ))}
        </HStack>
      )}

      {callToAction?.children && (
        <Box display='flex' mt='6' justifyContent='center'>
          <Button size={{ base: 'md', lg: 'lg' }} {...callToAction} />
        </Box>
      )}
    </Box>
  )
}

export const productSliderItemsMobile: Record<ProductSliderVariant, number> = {
  default: 2.2,
  large: 1.2,
}

export const productSliderCardWidthMobile: Record<
  ProductSliderVariant,
  string
> = {
  default: '158px',
  large: '260px',
}

export const productSliderItemsDesktop: Record<ProductSliderVariant, number> = {
  default: 4.25,
  large: 3.2,
}

export const productSliderCardWidthDesktop: Record<
  ProductSliderVariant,
  string
> = {
  default: '320px',
  large: '390px',
}
