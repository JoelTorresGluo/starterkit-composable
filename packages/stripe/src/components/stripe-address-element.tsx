import {
  AddressElement,
  AddressElementProps,
  Elements,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useMemo } from 'react'

export function StripeAddressElement(props: AddressElementProps) {
  const stripePromise = useMemo(
    () => loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || ''),
    []
  )

  return (
    <Elements
      stripe={stripePromise}
      options={{
        appearance: {
          variables: {
            fontWeightLight: '400',
            fontWeightNormal: '700',
            fontWeightMedium: '700',
            fontWeightBold: '700',
          },
        },
      }}
    >
      <AddressElementWrapper {...props} />
    </Elements>
  )
}

const AddressElementWrapper = (props: AddressElementProps) => {
  return <AddressElement {...props} />
}
