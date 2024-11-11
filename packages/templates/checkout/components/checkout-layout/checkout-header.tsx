import {
  Box,
  Container,
  Grid,
  GridItem,
  Link,
  useToken,
} from '@chakra-ui/react'
import { useComposable } from '@oriuminc/base'
import { BrandLogo } from '@oriuminc/ui'
import NextLink from 'next/link'
import { useIntl } from 'react-intl'
import { CheckoutSteps } from './checkout-steps'

export const CheckoutHeader = () => {
  const intl = useIntl()
  const { siteConfig, path } = useComposable()
  const headerLogo = siteConfig?.brandLogo
  const [sizeNone, size3, size12, size16] = useToken('sizes', [
    'sizes.none',
    'sizes.3',
    'sizes.12',
    'sizes.16',
  ])

  return (
    <Box
      as='header'
      bg='background'
      p={{ base: `${size3} ${sizeNone} ${sizeNone}`, md: 'none' }}
      borderBottom='none'
    >
      <Container maxW='container.2xl' px={{ base: 'none', md: 'sm' }}>
        <Grid
          gridTemplateAreas={{
            base: `"logo links" "steps steps"`,
            md: `"logo steps links"`,
          }}
          gridTemplateRows={{ base: `${size12} 1fr`, md: `${size16} 1fr` }}
          justifyContent='space-between'
          alignItems='center'
        >
          <GridItem
            w='full'
            h={{ base: 6, md: 8 }}
            ml={{ base: 4, md: 'none' }}
            area='logo'
          >
            {headerLogo && (
              <Link display='contents' as={NextLink} href={path.getHome()}>
                <BrandLogo
                  src={headerLogo.url}
                  alt={siteConfig.name ?? ''}
                  height='8'
                  width='24'
                />
              </Link>
            )}
          </GridItem>
          <GridItem area='steps'>
            <CheckoutSteps />
          </GridItem>
          <GridItem area='links'>
            <Box alignSelf='center' display={{ base: 'none', md: 'block' }}>
              <Link
                as={NextLink}
                href={path.getCart()}
                fontSize='sm'
                color='text'
                fontWeight='extrabold'
                textDecoration='underline'
              >
                {intl.formatMessage({ id: 'action.backToBag' })}
              </Link>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}
