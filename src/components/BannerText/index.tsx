import NextLink from 'next/link'

import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  HStack,
  StackProps,
} from '@chakra-ui/react'

export interface BannerTextProps {
  root?: BoxProps
  eyebrow?: BoxProps
  title?: BoxProps
  body?: BoxProps
  ctaButtonBox?: StackProps
  ctaButtonPrimary?: ButtonProps & { href?: string }
  ctaButtonSecondary?: ButtonProps & { href?: string }
  ctaLinkBox?: BoxProps
  ctaLinkItems?: (ButtonProps & { href?: string })[]
}

export const BannerText = ({
  root,
  eyebrow,
  title,
  body,
  ctaButtonBox,
  ctaButtonPrimary,
  ctaButtonSecondary,
  ctaLinkBox,
  ctaLinkItems,
}: BannerTextProps) => {
  const { children: ctaButtonBoxChildren, ...ctaButtonBoxProps } =
    ctaButtonBox ?? {}
  const renderCtaButtonBox = Boolean(
    ctaButtonBox?.children ||
      ctaButtonPrimary?.children ||
      ctaButtonSecondary?.children
  )

  const renderCtaLinkBox = Boolean(ctaLinkBox?.children || ctaLinkItems?.length)
  const { children: ctaLinkBoxChildren, ...ctaLinkBoxProps } = ctaLinkBox ?? {}

  return (
    <Box {...root}>
      {eyebrow?.children && (
        <Box
          as='p'
          textStyle='eyebrow'
          style={{ textWrap: 'balance' }}
          {...eyebrow}
        />
      )}
      {title?.children && (
        <Box as='h2' my='3' style={{ textWrap: 'balance' }} {...title} />
      )}
      {body?.children && (
        <Box
          textStyle={{ base: 'body-100', xs: 'body-200', lg: 'body-300' }}
          style={{ textWrap: 'balance' }}
          {...body}
        />
      )}

      {renderCtaButtonBox && (
        <HStack
          mt='8'
          spacing='4'
          display='flex'
          flexWrap='wrap'
          {...ctaButtonBoxProps}
        >
          {ctaButtonBox?.children ? (
            <div>{ctaButtonBox?.children}</div>
          ) : (
            <>
              {ctaButtonPrimary?.children && (
                <NextLink href={ctaButtonPrimary.href ?? ''} prefetch={false}>
                  <Button size='md' as='span' {...ctaButtonPrimary} />
                </NextLink>
              )}
              {ctaButtonSecondary?.children && (
                <NextLink href={ctaButtonSecondary.href ?? ''} prefetch={false}>
                  <Button size='md' as='span' {...ctaButtonSecondary} />
                </NextLink>
              )}
            </>
          )}
        </HStack>
      )}

      {renderCtaLinkBox && (
        <Box
          display={{ base: 'grid', xs: 'flex' }}
          gridTemplateColumns='repeat(2, 1fr)'
          gridGap='4'
          flexWrap='wrap'
          mt='8'
          {...ctaLinkBoxProps}
        >
          {ctaLinkBox?.children ? (
            ctaLinkBox?.children
          ) : (
            <>
              {ctaLinkItems?.map((buttonProps, i) => {
                const { href = '', ...__buttonProps } = buttonProps
                return (
                  <NextLink href={href} key={`${href}-${i}`} prefetch={false}>
                    <Button
                      width={{ base: 'full', xs: 'auto' }}
                      {...__buttonProps}
                    />
                  </NextLink>
                )
              })}
            </>
          )}
        </Box>
      )}
    </Box>
  )
}
