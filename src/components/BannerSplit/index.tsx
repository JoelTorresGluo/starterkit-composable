import { Flex } from '@chakra-ui/react'
import { BannerImage, BannerImageProps } from '../BannerImage'
import { BannerText, BannerTextProps } from '../BannerText'
import { useId } from 'react'

export interface BannerSplitProps {
  priority?: boolean
  image?: BannerImageProps
  text?: BannerTextProps
  inverted?: boolean
}

export const BannerSplit = ({
  priority = false,
  text,
  image,
  inverted,
}: BannerSplitProps) => {
  const bannerId = `banner-${useId()}`

  return (
    <Flex
      flexWrap='wrap'
      alignItems='stretch'
      as='section'
      aria-labelledby={bannerId}
    >
      <BannerImage
        priority={priority}
        root={{
          aspectRatio: '16/9',
          order: inverted ? 1 : 0,
          w: { base: 'full', md: '50%' },
          ...image?.root,
        }}
        {...image}
      />
      <BannerText
        root={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { base: 6, lg: 16 },
          py: { base: 6, lg: 16 },
          order: inverted ? 0 : 1,
          w: { base: 'full', md: '50%' },
          ...text?.root,
        }}
        eyebrow={{
          textStyle: 'eyebrow',
          textColor: 'text',
          ...text?.eyebrow,
        }}
        title={{
          as: 'h2',
          id: bannerId,
          textStyle: {
            base: 'mobile-500',
            xs: 'mobile-600',
            md: 'desktop-400',
            lg: 'desktop-500',
          },
          textColor: 'text',
          ...text?.title,
        }}
        body={{
          textStyle: { base: 'body-75', xs: 'body-100', md: 'body-200' },
          textColor: 'text',
          ...text?.body,
        }}
        ctaButtonPrimary={{
          variant: 'outline',
          w: { base: 'full', xs: 'auto' },
          ...text?.ctaButtonPrimary,
        }}
      />
    </Flex>
  )
}
