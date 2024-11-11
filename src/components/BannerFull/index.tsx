'use client'

import { AspectRatio, Box, BoxProps, useToken } from '@chakra-ui/react'
import { BannerImage, BannerImageProps } from '../BannerImage'
import { BannerText, BannerTextProps } from '../BannerText'
import { useBreakpointValue } from '@chakra-ui/react'
import { overlay } from '../../../../chakra/src/figma-tokens'
import { useId } from 'react'

export interface BannerFullProps {
  priority?: boolean
  image?: BannerImageProps
  text?: BannerTextProps
  textPosition?: BannerFullTextPosition
  theme?: BannerFullTheme
  overlayBackground?: string
  isMobile?: boolean
}

type BannerFullTextPosition = 'left' | 'center' | 'right'
type BannerFullTheme = 'dark' | 'light'

export const BannerFull = ({
  priority = false,
  text,
  image,
  textPosition = 'center',
  theme = 'dark',
}: BannerFullProps) => {
  const isMobile = useBreakpointValue({ base: true, lg: false })

  const textPositionProps = getTextPositionProps()
  const overlayBackground = getOverlayBackground(theme, textPosition, isMobile)
  const bannerId = `banner-${useId()}`
  const [size40] = useToken('sizes', ['sizes.40'])

  return (
    <AspectRatio
      as='section'
      aria-labelledby={bannerId}
      position='relative'
      display='flex'
      flexWrap='wrap'
      alignItems='stretch'
      ratio={{ base: 0.8, xs: 1.25, sm: 1.5, md: 1.75, lg: 2.2 }}
      maxH={{ base: 'initial', lg: `calc(${size40} * 4)` }}
      sx={{
        '> .banner-full-content': {
          inset: 'none',
        },
      }}
    >
      <Box className='banner-full-content'>
        <BannerImage
          priority={priority}
          root={{
            pointerEvents: 'none',
            ...image?.root,
            ...parentSizeProps,
          }}
          imageBox={{
            ...image?.imageBox,
            ...parentSizeProps,
          }}
          overlayBackground={overlayBackground}
          {...image}
        />
        <BannerText
          root={{
            p: { base: 6, xs: 16 },
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            ...text?.root,
            ...textPositionProps[textPosition],
          }}
          eyebrow={{
            textStyle: 'eyebrow',
            textColor: theme === 'dark' ? 'text' : 'background',
            ml: textPosition === 'center' ? 'auto' : undefined,
            mr: textPosition === 'center' ? 'auto' : undefined,
            ...text?.eyebrow,
          }}
          title={{
            as: 'h2',
            id: bannerId,
            textStyle: {
              base: 'mobile-600',
              xs: 'mobile-700',
              md: 'desktop-500',
              lg: 'desktop-600',
            },
            textColor: theme === 'dark' ? 'text' : 'background',
            ...text?.title,
          }}
          body={{
            textStyle: { base: 'body-100', sm: 'body-300' },
            textColor: theme === 'dark' ? 'text' : 'background',
            ...text?.body,
          }}
          ctaButtonBox={{
            justifyContent: textPosition === 'center' ? 'center' : undefined,
            ...text?.ctaButtonBox,
          }}
          ctaButtonPrimary={{
            variant: theme === 'dark' ? 'solid' : 'solid-alt',
            ...text?.ctaButtonPrimary,
          }}
          ctaButtonSecondary={{
            variant: theme === 'dark' ? 'outline' : 'outline-alt',
            ...text?.ctaButtonSecondary,
          }}
          ctaLinkBox={{
            justifyContent: textPosition === 'center' ? 'center' : undefined,
            ...text?.ctaButtonBox,
          }}
          ctaLinkItems={text?.ctaLinkItems?.map((el) => {
            return {
              variant: theme === 'dark' ? 'outline' : 'outline-alt',
              ...text?.ctaButtonSecondary,
              ...el,
            }
          })}
        />
      </Box>
    </AspectRatio>
  )
}

const parentSizeProps: BoxProps = {
  position: 'absolute',
  inset: 'none',
}

const getTextPositionProps = (): Record<BannerFullTextPosition, BoxProps> => {
  return {
    left: {
      w: { base: 'full', md: '50%' },
    },
    center: {
      w: { base: 'full', sm: '75%' },
      m: '0 auto',
      textAlign: 'center',
    },
    right: {
      w: { base: 'full', md: '50%' },
      ml: { base: 'auto', lg: '50%' },
    },
  }
}

const getOverlayBackground = (
  theme: BannerFullTheme,
  textPosition: BannerFullTextPosition,
  isMobile: boolean | undefined
): string => {
  const oppositeTheme = theme === 'dark' ? 'light' : 'dark'
  const themeOverlay = overlay[oppositeTheme]

  switch (textPosition) {
    case 'left':
      return isMobile ? themeOverlay.fill : themeOverlay.gradientLeft
    case 'center':
      return isMobile ? themeOverlay.fill : themeOverlay.fill
    case 'right':
      return isMobile ? themeOverlay.fill : themeOverlay.gradientRight
    default:
      return isMobile ? themeOverlay.fill : themeOverlay.fill
  }
}
