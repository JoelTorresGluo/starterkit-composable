import { Box, Container, Divider, Link, Stack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { CopyrightFooter } from '../CopyrightFooter'

export interface FooterProps {
  homeUrl: string
  brandLogo?: React.ReactNode
  tagline?: string
  copyrightText?: string
  children: React.ReactNode
}

export const Footer = ({
  homeUrl,
  brandLogo,
  tagline,
  copyrightText,
  children,
}: FooterProps) => {
  return (
    <Box
      mt={{ base: 10, md: 32 }}
      borderTop='sm'
      layerStyle='header-footer-padding'
    >
      <Container
        as='footer'
        id='site-footer'
        role='contentinfo'
        tabIndex={-1}
        maxW='container.2xl'
      >
        <Stack
          as='nav'
          justify='space-between'
          align='start'
          direction={{ base: 'column', lg: 'row' }}
          py={{ base: 12, md: 16 }}
          spacing={{ base: 0, md: 8 }}
        >
          <Stack spacing='4' align='start' minW='40%' pb='12'>
            {brandLogo && (
              <Link as={NextLink} href={homeUrl}>
                {brandLogo}
              </Link>
            )}
            <Text color='text-muted'>{tagline}</Text>
          </Stack>

          {children}
        </Stack>
        <Divider display={{ base: 'none', md: 'block' }} />
        <CopyrightFooter copyrightText={copyrightText} />
      </Container>
    </Box>
  )
}
