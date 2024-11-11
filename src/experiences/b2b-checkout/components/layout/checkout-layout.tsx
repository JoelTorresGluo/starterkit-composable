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
import { CheckoutHeader } from './checkout-header'
import { ActorRefFrom } from 'xstate'
import { threeStepStateMachine } from '../../../../machines'

interface CheckoutLayoutProps {
  children: React.ReactElement
  DesktopCartSummary: ReactNode
  MobileCartSummary?: ReactNode
  experienceRef?: ActorRefFrom<typeof threeStepStateMachine>
}

export const CheckoutLayout = ({
  children,
  DesktopCartSummary,
  MobileCartSummary,
  experienceRef,
}: CheckoutLayoutProps) => {
  const [size6, size8] = useToken('sizes', ['sizes.6', 'sizes.8'])

  return (
    <Box
      display='flex'
      flexDirection='column'
      minHeight='100vh'
      bg='colors.surface.muted'
    >
      <CheckoutHeader experienceRef={experienceRef} />
      <Box px={{ base: 0, md: 4 }} as='main'>
        <>
          {MobileCartSummary}
          <Container
            mb='auto'
            maxW='container.2xl'
            py={{ base: '4', md: '2xl' }}
          >
            <Grid
              templateColumns={{
                md: '1fr min(45%, 25rem)',
                lg: '1fr min(40%, 31.5rem)',
              }}
              gap={8}
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
