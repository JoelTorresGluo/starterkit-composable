'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

export const loadStripe = (key: string) =>
  import(/* webpackChunkName: "stripe_stripe-js" */ '@stripe/stripe-js').then(
    (mod) => mod.loadStripe(key)
  )

const DynamicReactStripeElements = dynamic(
  () =>
    import(
      /* webpackChunkName: "stripe_stripe-js" */ '@stripe/react-stripe-js'
    ).then((mod) => mod.Elements),
  {
    ssr: false,
  }
)

export const StripeProvider = (props: {
  children: React.ReactElement
  stripeKey: string
  stripeClientSecret?: string
}) => {
  const stripePromise = useMemo(
    () => loadStripe(props.stripeKey),
    [props.stripeKey]
  )

  return (
    <DynamicReactStripeElements
      stripe={stripePromise ?? null}
      options={{
        clientSecret: props.stripeClientSecret,
      }}
    >
      {props.children}
    </DynamicReactStripeElements>
  )
}
