import {
  Box,
  Container,
  Grid,
  GridItem,
  Link,
  useToken,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useIntl } from 'react-intl'
import { ActorRefFrom } from 'xstate'
import { threeStepStateMachine } from '../../../../machines'
import { CheckoutSteps } from './checkout-steps'

interface CheckoutHeaderProps {
  experienceRef?: ActorRefFrom<typeof threeStepStateMachine>
}

export const CheckoutHeader = ({ experienceRef }: CheckoutHeaderProps) => {
  const intl = useIntl()
  // const { siteConfig } = useComposable()
  // const headerLogo = siteConfig?.brandLogo
  const [size12, size16] = useToken('sizes', ['sizes.12', 'sizes.16'])

  return (
    <Box
      as='header'
      bg='background'
      borderBottomWidth={{ base: '0', md: '1px' }}
    >
      <Container maxW='container.2xl' px={{ base: 0, md: 'sm' }}>
        <Grid
          gridTemplateAreas={{
            base: experienceRef ? `"logo links" "steps steps"` : `"logo links"`,
            md: experienceRef ? `"logo steps links"` : `"logo links"`,
          }}
          gridTemplateRows={{
            base: experienceRef ? `${size12} 1fr` : size12,
            md: experienceRef ? `${size16} 1fr` : size16,
          }}
          justifyContent='space-between'
          alignItems='center'
        >
          <GridItem
            w='full'
            h={{ base: 6, md: 8 }}
            ml={{ base: 4, md: 0 }}
            area='logo'
          >
            {/* {headerLogo && (
              <Link as={NextLink} href={path.getHome()}>
                <BrandLogo
                  src={headerLogo.url}
                  alt={siteConfig.name ?? ''}
                  height={32}
                  width={100}
                />
              </Link>
            )} */}
          </GridItem>
          {experienceRef ? (
            <GridItem area='steps' h='full'>
              <CheckoutSteps threeStepExperienceRef={experienceRef} />
            </GridItem>
          ) : (
            ''
          )}
          <GridItem area='links'>
            <Box alignSelf='center' display={{ base: 'none', md: 'block' }}>
              <Link
                as={NextLink}
                href='/cart'
                fontSize='sm'
                color='primary'
                fontWeight='extrabold'
                _hover={{
                  textDecoration: 'underline',
                }}
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
