import { Box, Container, Grid, GridItem } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { useIntl } from 'react-intl'

interface CheckoutGridProps {
  currentStep: string
  mobileCartSummary: React.ReactElement
  desktopCartSummary: React.ReactElement
  step1: React.ReactElement
  step2: React.ReactElement
  success?: React.ReactElement // TODO: Remove this (This is still here for EP checkout)
  review?: React.ReactElement // TODO: Make this NOT optional (This is still here for EP checkout)
}

export const CheckoutGrid = ({
  currentStep,
  mobileCartSummary,
  desktopCartSummary,
  step1,
  step2,
  success,
  review,
}: CheckoutGridProps) => {
  const intl = useIntl()
  const title = intl.formatMessage({ id: 'checkout.title' })

  return (
    <>
      {mobileCartSummary}
      <Container mb='auto' maxW='container.2xl' py={{ base: 4, md: '2xl' }}>
        <NextSeo title={title} noindex nofollow />

        <Grid
          // TODO: Remove fixed values, use percentages with CSS min function.
          templateColumns={{ base: '1fr', md: 'auto 400px', lg: 'auto 505px' }}
          gap='8'
        >
          <GridItem>
            {currentStep === 'step1' && step1}
            {currentStep === 'step2' && step2}
            {currentStep === 'success' && success}
            {currentStep === 'review' && review}
          </GridItem>

          <GridItem>
            <Box position='sticky' top='12'>
              {desktopCartSummary}
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </>
  )
}
