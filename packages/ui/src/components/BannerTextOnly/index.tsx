import { Flex } from '@chakra-ui/react'
import { BannerText, BannerTextProps } from '../BannerText'
import { useId } from 'react'

export interface BannerTextOnlyProps {
  text?: BannerTextProps
  centered?: boolean
  theme?: BannerTextOnlyTheme
}

type BannerTextOnlyTheme = 'dark' | 'light' | 'highlight'

export const BannerTextOnly = ({
  text,
  centered,
  theme = 'light',
}: BannerTextOnlyProps) => {
  const background = backgroundValue[theme]
  const bannerId = `banner-${useId()}`

  return (
    <Flex
      as='section'
      aria-labelledby={bannerId}
      flexWrap='wrap'
      alignItems='stretch'
      minH='96'
      backgroundColor={background}
    >
      <BannerText
        root={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: centered ? 'center' : undefined,
          textAlign: centered ? 'center' : undefined,
          p: { base: 5, xs: 10 },
          w: 'full',
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
          textStyle: { base: 'body-100', xs: 'body-200', lg: 'body-200' },
          textColor: 'text',
          ...text?.body,
        }}
        ctaButtonPrimary={{
          variant: 'outline',
          ...text?.ctaButtonPrimary,
        }}
        ctaButtonBox={{
          justifyContent: centered ? 'center' : undefined,
          ...text?.ctaButtonBox,
        }}
      />
    </Flex>
  )
}

const backgroundValue: Record<BannerTextOnlyTheme, string> = {
  light: 'colors.surface.primary',
  dark: 'colors.surface.inverse',
  highlight: 'colors.surface.highlight',
}
const textColorValue: Record<BannerTextOnlyTheme, string> = {
  light: 'colors.text.primary',
  dark: 'colors.text.primary-inverse',
  highlight: 'colors.text.primary',
}
