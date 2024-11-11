import { ReactNode } from 'react'
import NextLink from 'next/link'

import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'

interface CallToActionBannerProps {
  heading?: string
  contentText?: ReactNode
  contentNode?: ReactNode
  ctaUrl?: string
  ctaLabel?: string
  theme?: CallToActionBannerTheme
}

type CallToActionBannerTheme = 'dark' | 'light' | 'highlight'

export const CallToActionBanner = ({
  heading,
  contentText,
  contentNode,
  ctaUrl,
  ctaLabel,
  theme = 'light',
}: CallToActionBannerProps) => {
  const background = backgroundValue[theme]
  const textColor = textColorValue[theme]

  return (
    <Container maxW='container.2xl'>
      <Box
        backgroundColor={background}
        color={textColor}
        borderRadius='xl'
        px={{ base: 6, lg: 16 }}
        py={{ base: 10, lg: 16 }}
      >
        <Stack
          spacing='8'
          direction={{ base: 'column', lg: 'row' }}
          justify='space-between'
        >
          <Stack spacing='4' maxW='2xl'>
            {heading && (
              <Text textStyle={{ base: 'desktop-200', md: 'desktop-300' }}>
                {heading}
              </Text>
            )}
            {contentText && <Text textStyle='body-100-300'>{contentText}</Text>}
            {contentNode && <Text textStyle='body-100-300'>{contentNode}</Text>}
          </Stack>

          {ctaUrl && ctaLabel && (
            <Stack
              spacing='3'
              direction={{ base: 'column', sm: 'row' }}
              justify={{ base: 'center' }}
              alignItems='center'
            >
              <Button
                as={NextLink}
                href={ctaUrl}
                colorScheme='blue'
                size='lg'
                w='full'
              >
                {ctaLabel}
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>
    </Container>
  )
}

const backgroundValue: Record<CallToActionBannerTheme, string> = {
  light: 'colors.surface.primary',
  dark: 'colors.surface.inverse',
  highlight: 'colors.surface.highlight',
}
const textColorValue: Record<CallToActionBannerTheme, string> = {
  light: 'colors.text.primary',
  dark: 'colors.text.primary-inverse',
  highlight: 'colors.text.primary',
}
