'use client'

import {
  AspectRatio,
  BoxProps,
  Center,
  Container,
  Flex,
  Link,
  useToken,
} from '@chakra-ui/react'
import { ComposableSiteConfig } from '@oriuminc/base'
import Image from 'next/image'
import NextLink from 'next/link'

const DEFAULT_COLOR_CONFIG = {
  container: { bg: 'colors.surface.inverse' },
  // TODO: Replace hex colors with tokens.
  active: { bg: '#0000115c' },
  inactive: { bg: 'transparent' },
  hover: { bg: '#00001126' },
}

const DEFAULTS: BrandPickerProps = {
  height: 10,
  align: 'flex-start',
  brandContainerProps: {
    h: 'full',
    minW: 12,
    px: 4,
    py: 2,
  },
}

export interface BrandPickerProps {
  sites?: ComposableSiteConfig[]
  currentBrand?: string
  backgroundColor?: BoxProps['backgroundColor']
  height?: BoxProps['height']
  align?: BoxProps['justifyContent']
  brandContainerProps?: BoxProps
}

export const BrandPicker = (props: BrandPickerProps) => {
  const {
    sites,
    currentBrand,
    backgroundColor = DEFAULT_COLOR_CONFIG.container.bg,
    height = DEFAULTS.height,
    align = DEFAULTS.align,
    brandContainerProps,
  } = props

  const brandContainer = {
    ...DEFAULTS.brandContainerProps,
    ...brandContainerProps,
  }

  const [sizeDeviceW] = useToken('sizes', ['sizes.deviceW'])

  sites?.sort((a, b) => (a?.order || 0) - (b?.order || 0))

  return (
    <Flex alignContent='center' bg={backgroundColor} h={height}>
      <Container maxW='container.2xl'>
        <Flex
          justifyContent={align}
          role='navigation'
          aria-label='Brand'
          alignContent='center'
          h='full'
        >
          {sites?.map((site) => {
            const active = site.key === currentBrand
            let brandPickerLogo = active
              ? site?.brandLogoSmall || site?.brandLogo
              : site?.brandLogo || site?.brandLogoSmall

            if (
              !site ||
              !site.url ||
              !site.displayMultiBrandBanner ||
              !brandPickerLogo
            ) {
              return null
            }

            return (
              <Link
                as={NextLink}
                key={site.key}
                href={site.url}
                aria-label={site.name || site.key || ''}
                bg={
                  active
                    ? DEFAULT_COLOR_CONFIG.active.bg
                    : DEFAULT_COLOR_CONFIG.inactive.bg
                }
                _hover={{
                  ...(!active && { ...DEFAULT_COLOR_CONFIG.hover }),
                }}
              >
                <Center
                  {...brandContainer}
                  w={active ? 30 : 100}
                  aria-hidden={true}
                >
                  <AspectRatio h='full' w='full' ratio={5 / 6}>
                    <Image
                      priority
                      src={brandPickerLogo.url}
                      alt={site.name || site.key || ''}
                      fill={true}
                      style={{ objectFit: 'contain' }}
                      sizes={`calc(${sizeDeviceW} / 10)`}
                    />
                  </AspectRatio>
                </Center>
              </Link>
            )
          })}
        </Flex>
      </Container>
    </Flex>
  )
}
