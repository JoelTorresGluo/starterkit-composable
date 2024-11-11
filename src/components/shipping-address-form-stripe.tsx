import { Button, ButtonProps, Stack } from '@chakra-ui/react'
import {
  StripeAddress,
  StripeAddressElement,
  composableAddressToStripe,
  stripeAddressToComposableAddress,
} from '@oriuminc/stripe'
import { useSelector } from '@xstate/react'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { ActorRefFrom } from 'xstate'
import { GOOGLE_MAPS_API_KEY } from '../constants'
import { deliveryOptionsMachine } from '../machines'
import { countries } from '../utils'
import { ComposableAddress } from '@oriuminc/commerce-generic'

interface ShippingAddressFormStripeProps {
  initialValues?: ComposableAddress
  onChange: (event: { data: ComposableAddress; isValid: boolean }) => void
  cancelButtonProps?: ButtonProps
  showSubmitButton?: boolean
  onClose?: () => void
  setStatus?: (status: any) => void
  submitButtonProps?: ButtonProps
  deliveryOptionsRef: ActorRefFrom<typeof deliveryOptionsMachine>
}

export const ShippingAddressFormStripe = ({
  cancelButtonProps,
  initialValues,
  showSubmitButton = false,
  onChange,
  onClose,
  setStatus,
  submitButtonProps,
  deliveryOptionsRef,
}: ShippingAddressFormStripeProps) => {
  const intl = useIntl()
  const id = initialValues?.id
  const [stripeAddress, setStripeAddress] = useState<{
    value: StripeAddress
    complete: boolean
  } | null>(null)
  const state = useSelector(deliveryOptionsRef, (state) => state)
  const customerInfoRef = state.context.customerInfoRef

  const onSubmit = () => {
    if (!stripeAddress?.value || !stripeAddress.complete) {
      return
    }
    const address = stripeAddressToComposableAddress(stripeAddress.value)
    customerInfoRef?.send({
      type: 'update.shippingAddress',
      data: { ...address, id },
    })
  }

  useEffect(() => {
    // close the modal after editing
    const subscription = customerInfoRef?.subscribe((state) => {
      if (customerInfoRef?.getSnapshot().matches({ authenticated: 'idle' })) {
        onClose?.()
      }
    })
    return () => subscription?.unsubscribe()
  }, [])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <StripeAddressElement
        onChange={(e) => {
          setStripeAddress({
            value: e.value,
            complete: e.complete,
          })
          onChange({
            isValid: e.complete,
            data: stripeAddressToComposableAddress(e.value),
          })
        }}
        options={{
          autocomplete: GOOGLE_MAPS_API_KEY
            ? {
                mode: 'google_maps_api',
                apiKey: GOOGLE_MAPS_API_KEY,
              }
            : { mode: 'disabled' },
          fields: {
            phone: 'always',
          },
          display: {
            name: 'split',
          },
          allowedCountries: countries.map((c) => c.code),
          mode: 'shipping',
          defaultValues: initialValues
            ? composableAddressToStripe(initialValues)
            : undefined,
        }}
      />

      {showSubmitButton && (
        <Stack width='full' mt='8'>
          <Button
            type='submit'
            size='lg'
            isLoading={customerInfoRef
              ?.getSnapshot()
              .matches({ authenticated: 'loading' })}
            onClick={onSubmit}
            disabled={!stripeAddress?.complete}
            {...submitButtonProps}
          >
            {intl.formatMessage({ id: 'action.updateAddress' })}
          </Button>
          <Button
            size='md'
            color='text'
            variant='ghost'
            textDecoration='underline'
            onClick={() => {
              setStatus?.(undefined)
              onClose?.()
            }}
            isDisabled={customerInfoRef
              ?.getSnapshot()
              .matches({ authenticated: 'loading' })}
            {...cancelButtonProps}
          >
            {intl.formatMessage({ id: 'action.cancel' })}
          </Button>
        </Stack>
      )}
    </form>
  )
}
