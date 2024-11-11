import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  useToken,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { CheckoutFooter } from './checkout-footer'
import { CheckoutHeader, CheckoutHeaderProps } from './checkout-header'
import { ActorRefFrom } from 'xstate'
import { threeStepStateMachine } from '../../../../machines'

interface CheckoutLayoutProps {
  children: React.ReactElement
  DesktopCartSummary: ReactNode
  MobileCartSummary?: ReactNode
  experienceRef?: ActorRefFrom<typeof threeStepStateMachine>
  headerLogo?: CheckoutHeaderProps['headerLogo']
}

export const CheckoutLayout = ({
  children,
  DesktopCartSummary,
  MobileCartSummary,
  experienceRef,
  headerLogo,
}: CheckoutLayoutProps) => {
  const [size6, size8] = useToken('sizes', ['sizes.6', 'sizes.8'])

  return (
    <Box
      display='flex'
      flexDirection='column'
      minH='deviceH'
      bg='colors.surface.muted'
    >
      <CheckoutHeader experienceRef={experienceRef} headerLogo={headerLogo} />
      <Box px={{ base: 'none', md: 4 }} as='main'>
        <>
          {MobileCartSummary}
          <Container mb='auto' maxW='container.2xl' py={{ base: 4, md: '2xl' }}>
            <Grid
              // TODO: Replace rem values with token.
              templateColumns={{
                md: '1fr min(45%, 25rem)',
                lg: '1fr min(40%, 31.5rem)',
              }}
              gap='8'
            >
              <GridItem>{children}</GridItem>
              <GridItem>
                <Box
                  position={{ md: 'sticky' }}
                  top='12'
                  backgroundColor={{ md: 'background' }}
                  p={{ md: `${size6} ${size6} ${size8}` }}
                >
                  {DesktopCartSummary}
                </Box>
              </GridItem>
            </Grid>
          </Container>
        </>
      </Box>
      <Divider />
      <CheckoutFooter />
    </Box>
  )
}
