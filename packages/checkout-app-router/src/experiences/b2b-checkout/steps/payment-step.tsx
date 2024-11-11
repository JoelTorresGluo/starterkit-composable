import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Stack,
} from '@chakra-ui/react'
import { Section, SectionHeader } from '@oriuminc/ui'
import { BsCashCoin } from 'react-icons/bs'
import { IoCardOutline } from 'react-icons/io5'
import { useIntl } from 'react-intl'
import {
  DeliveryOptionsDetails,
  PaymentMethodSection,
} from '../../../components'
import { StripeThreeStep } from '../components/stripe-three-step'
import { ActorRefFrom } from 'xstate'
import { paymentMachine } from '../../../machines/sections/payment-machine'
import { useSelector } from '@xstate/react'

interface PaymentStepProps {
  paymentRef: ActorRefFrom<typeof paymentMachine> | undefined
}

export const PaymentStep = ({ paymentRef }: PaymentStepProps) => {
  const intl = useIntl()
  const state = useSelector(paymentRef, (state) => state)

  const {
    customerInfo,
    billingAddress,
    billingIsShipping,
    shippingAddress,
    shippingOption,
    selectedPaymentMethod,
    isOneStep,
  } = state?.context || {}

  const customerEmail = customerInfo?.email

  const isSubmittingBillingData = state?.matches({
    enteringData: {
      billingAddress: 'submittingBillingAddressData',
    },
  })

  const isSubmittingStripeData = state?.matches({
    enteringData: {
      paymentMethod: { stripeSelected: 'submittingStripePaymentData' },
    },
  })
  const isLoading = isSubmittingBillingData || isSubmittingStripeData

  return (
    <Stack spacing='6'>
      {paymentRef && !isOneStep && (
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
            customerEmail={customerEmail ?? ''}
            shippingAddress={shippingAddress!}
            shippingOption={shippingOption}
            onClickEdit={() => paymentRef?.send({ type: 'go.step.delivery' })}
          />
        </Section>
      )}

      <Section
        headerProps={{
          hasRequiredFields: true,
          title: intl.formatMessage({
            id: 'checkout.success.orderDetails.paymentMethod',
          }),
          textProps: { fontSize: { base: 'lg', md: '3xl' } },
          boxProps: { mb: { base: 4, md: 5 } },
        }}
      >
        {paymentRef ? (
          <PaymentMethodSection
            paymentMethods={[
              {
                key: 'purchaseOrder',
                titleTranslationKey:
                  'checkout.paymentSection.createPurchaseOrder',
                icon: BsCashCoin,
                Component: null,
              },
              {
                key: 'stripe',
                titleTranslationKey:
                  'checkout.paymentSection.stripe.paymentMethodTitle',
                icon: IoCardOutline,
                Component: (
                  <StripeThreeStep
                    paymentRef={paymentRef}
                    customerEmail={customerEmail}
                  />
                ),
              },
            ]}
            onPaymentMethodSelect={(paymentMethodKey) =>
              paymentRef.send({
                type: `paymentMethod.select.${paymentMethodKey}`,
              })
            }
            onPaymentMethodClearSelection={() =>
              paymentRef.send({ type: 'paymentMethod.select.none' })
            }
            initialSelectedPaymentMethodKey={selectedPaymentMethod ?? undefined}
            onBillingAddressUpdate={(billingAddress) =>
              paymentRef.send({
                type: 'billingAddress.update',
                data: billingAddress,
              })
            }
            billingIsShipping={billingIsShipping}
            onBillingIsShippingUpdate={(value) =>
              paymentRef.send({
                type: 'billingAddress.setSameAsShipping',
                value,
              })
            }
            initialBillingAddress={billingAddress.payload}
            shippingAddress={shippingAddress!}
          />
        ) : (
          <Alert background='gray.200' color='gray.500' justifyContent='center'>
            <AlertIcon color='gray.500' />
            {intl.formatMessage({
              id: 'checkout.shippingForm.setCustomerInfoBeforePaymentMethod',
            })}
          </Alert>
        )}
      </Section>

      {paymentRef && !isOneStep && (
        <Box textAlign='right' mx={{ base: 4, md: 0 }}>
          <Button
            fontSize='base'
            w={{ base: 'full', md: 'fit-content' }}
            variant='solid'
            onClick={() => {
              paymentRef?.send({ type: 'submit.step.payment' })
            }}
            isDisabled={!state?.can({ type: 'submit.step.payment' })}
            isLoading={isLoading}
          >
            {intl.formatMessage({ id: 'action.reviewOrder' })}
          </Button>
        </Box>
      )}
    </Stack>
  )
}
