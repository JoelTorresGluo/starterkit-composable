import { useIntl } from 'react-intl'
import { Alert, AlertIcon, Box, Button, Stack } from '@chakra-ui/react'
import { Section } from '@oriuminc/ui'
import { ShippingAddressForm } from '../../../components/shipping-address-form'
import { EmailForm } from '../../../components/email-form'
import { ShippingAddressSelector } from '../../../components/shipping-address-selector'
import { Loading } from '../components/loading'
import { Login } from '@oriuminc/templates/general'
import { ShippingOptions } from '../../../components/shipping-options'
import { useSelector } from '@xstate/react'
import { deliveryOptionsMachine } from '../../../machines/sections/delivery-options-machine'
import { ActorRefFrom } from 'xstate'
import { debounce } from '../../../utils'
import { ShippingAddressFormStripe } from '../../../components'
import { ENABLE_STRIPE_ADDRESS_ELEMENT } from '../../../constants'

interface DeliveryOptionsStepProps {
  deliveryOptionsRef: ActorRefFrom<typeof deliveryOptionsMachine>
}

export const DeliveryOptionsStep = ({
  deliveryOptionsRef,
}: DeliveryOptionsStepProps) => {
  const state = useSelector(deliveryOptionsRef, (s) => s)

  const intl = useIntl()
  const { isOneStep, shippingOptionsRef, customerInfoRef, isGuest } =
    state.context || {}

  const customerInfoState = useSelector(customerInfoRef, (s) => s)

  const {
    customerInfo,
    shippingAddresses,
    shippingAddressSelected: defaultShippingAddress,
    saveNewAddress,
  } = customerInfoState?.context || {}

  const isLoading = customerInfoState?.matches('fetchingCustomerInfo')

  const shippingOptionsState = useSelector(shippingOptionsRef, (s) => s)

  const { shippingOptions, shippingOptionSelectedId } =
    shippingOptionsState?.context || {}

  const isShippingOptionsLoading = shippingOptionsState?.matches(
    'fetchingShippingOptions'
  )
  const isShippingOptionsDone = shippingOptionsState?.matches(
    'shippingOptionsDone'
  )

  if (isLoading) return <Loading />

  return (
    <>
      <Stack gap={{ base: 2, md: 6 }}>
        {/* Have Account */}
        {isGuest && (
          <Section
            headerProps={{
              title: intl.formatMessage({
                id: 'checkout.login.haveAccount',
              }),
              textProps: { fontSize: { base: 'lg', md: '3xl' } },
              boxProps: { mb: { base: 4, md: 5 } },
            }}
          >
            <Login
              login={async (data) => {
                customerInfoRef?.send({
                  type: 'login.customer',
                  email: data.email,
                  password: data.password,
                })
              }}
            />
          </Section>
        )}

        {/* Email input */}
        <Section
          headerProps={{
            hasRequiredFields: true,
            title: intl.formatMessage({
              id: 'checkout.guestSection.title',
            }),
            textProps: { fontSize: { base: 'lg', md: '3xl' } },
            boxProps: { mb: { base: 4, md: 5 } },
          }}
        >
          <EmailForm
            onChange={({ data, isValid }) => {
              customerInfoRef?.send({
                type: 'set.customerInfo',
                data: {
                  payload: data,
                  isValid,
                },
              })
            }}
            initialValues={{ email: customerInfo?.payload.email ?? '' }}
          />
        </Section>

        {/* Shipping Form */}
        <Section
          headerProps={{
            hasRequiredFields: isGuest ?? true,
            title: intl.formatMessage({
              id: 'checkout.shippingForm.title',
            }),
            textProps: { fontSize: { base: 'lg', md: '3xl' } },
            boxProps: { mb: { base: 4, md: 5 } },
          }}
        >
          <Box mb='10'>
            {shippingAddresses && shippingAddresses?.length > 0 ? (
              <ShippingAddressSelector
                list={shippingAddresses}
                deliveryOptionsRef={deliveryOptionsRef}
                saveNewAddress={saveNewAddress ?? false}
                send={customerInfoRef?.send ?? (() => {})}
                selected={
                  defaultShippingAddress?.payload || shippingAddresses[0]
                }
                setSelected={(id: string) => {
                  customerInfoRef?.send({
                    type: 'set.shippingAddress',
                    data: {
                      payload:
                        id !== 'new'
                          ? shippingAddresses.find(
                              (address) => address.id === id
                            )
                          : { id: 'new' },
                      isValid: id !== 'new' ? true : false,
                    },
                  })
                }}
              />
            ) : ENABLE_STRIPE_ADDRESS_ELEMENT ? (
              <ShippingAddressFormStripe
                deliveryOptionsRef={deliveryOptionsRef}
                initialValues={defaultShippingAddress?.payload}
                onChange={debounce(({ data, isValid }) => {
                  customerInfoRef?.send({
                    type: 'set.shippingAddress',
                    data: {
                      payload: data,
                      isValid: isValid,
                    },
                  })
                }, 350)}
              />
            ) : (
              <ShippingAddressForm
                deliveryOptionsRef={deliveryOptionsRef}
                initialValues={defaultShippingAddress?.payload}
                onChange={debounce(({ data, isValid }) => {
                  customerInfoRef?.send({
                    type: 'set.shippingAddress',
                    data: {
                      payload: data,
                      isValid: isValid,
                    },
                  })
                }, 350)}
              />
            )}
          </Box>
        </Section>
        {/* Shipping Options */}
        <Section
          headerProps={{
            title: intl.formatMessage({
              id: 'checkout.shippingForm.shippingAndGiftOptions.title',
            }),
            textProps: { fontSize: { base: 'lg', md: '3xl' } },
            boxProps: { mb: { base: 4, md: 5 } },
          }}
        >
          {!shippingOptionsRef ? (
            <Alert status='info'>
              <AlertIcon />
              {intl.formatMessage({
                id: 'checkout.shippingForm.setShippingAddressBeforeShippingMethod',
              })}
            </Alert>
          ) : null}
          {shippingOptionsRef && (
            <ShippingOptions
              list={shippingOptions}
              selected={shippingOptionSelectedId || shippingOptions?.[0]?.id}
              setSelected={(id: string) => {
                shippingOptionsRef?.send({
                  type: 'select.shipping.option',
                  shippingOptionId: id,
                })
              }}
              isLoading={isShippingOptionsLoading || !isShippingOptionsDone}
            />
          )}
        </Section>
        {!isOneStep && (
          <Box
            textAlign='right'
            mt={{ base: 6, m: 'none' }}
            mx={{ base: 4, md: 'none' }}
          >
            <Button
              fontSize='base'
              w={{ base: 'full', md: 'fit-content' }}
              variant='solid'
              onClick={() => {
                deliveryOptionsRef.send({ type: 'submit.step.delivery' })
              }}
              isDisabled={!state.can({ type: 'submit.step.delivery' })}
              isLoading={state.matches('submittingDeliveryOptions')}
            >
              {intl.formatMessage({ id: 'action.continuePayment' })}
            </Button>
          </Box>
        )}
      </Stack>
    </>
  )
}
