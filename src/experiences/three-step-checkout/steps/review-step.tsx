import { Stack, Box, Button } from '@chakra-ui/react'
import { Section } from '@oriuminc/ui'
import { useIntl } from 'react-intl'
import { PaymentDetails } from '../components/payment-details'
import { DeliveryOptionsDetails } from '../../../components'
import { reviewOrderMachine } from '../../../machines/sections/review-order-machine'
import { ActorRefFrom } from 'xstate'
import { useSelector } from '@xstate/react'

interface ReviewStepProps {
  reviewOrderRef: ActorRefFrom<typeof reviewOrderMachine>
}

export const ReviewStep = ({ reviewOrderRef }: ReviewStepProps) => {
  const intl = useIntl()
  const state = useSelector(reviewOrderRef, (state) => state)

  const { shippingOption, customerInfo, shippingAddress, isOneStep } =
    state.context || {}

  return (
    <Stack spacing='6'>
      {!isOneStep && (
        <>
          <Section
            headerProps={{
              hasRequiredFields: true,
              title: intl.formatMessage({
                id: 'checkout.customerSection.title',
              }),
              textProps: { fontSize: { base: 'lg', md: '3xl' } },
              boxProps: { mb: { base: 4, md: 5 } },
            }}
          >
            <DeliveryOptionsDetails
              customerEmail={customerInfo?.email ?? ''}
              shippingAddress={shippingAddress}
              shippingOption={shippingOption}
              onClickEdit={() =>
                reviewOrderRef.send({ type: 'go.step.delivery' })
              }
            />
          </Section>

          <Section
            headerProps={{
              hasRequiredFields: true,
              title: intl.formatMessage({
                id: 'checkout.paymentSection.title',
              }),
              textProps: { fontSize: { base: 'lg', md: '3xl' } },
              boxProps: { mb: { base: 4, md: 5 } },
            }}
          >
            <PaymentDetails reviewOrderRef={reviewOrderRef} />
          </Section>
        </>
      )}
      <Box textAlign='right' mx={{ base: 4, md: 'none' }}>
        <Button
          fontSize='base'
          w={{ base: 'full', md: 'fit-content' }}
          variant='solid'
          onClick={() => {
            reviewOrderRef.send({ type: 'order.confirm' })
          }}
          isLoading={state.matches('confirmingOrder')}
        >
          {intl.formatMessage({ id: 'action.placeOrder' })}
        </Button>
      </Box>
    </Stack>
  )
}
