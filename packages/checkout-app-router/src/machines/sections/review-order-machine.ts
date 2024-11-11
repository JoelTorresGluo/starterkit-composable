import { PromiseActorLogic, assign, sendParent, sendTo, setup } from 'xstate'
import { ComposableAddress } from '@oriuminc/commerce-generic'
import { SubmitOrderPaymentMethodData } from '../../types'

export const reviewOrderMachine = setup({
  types: {} as {
    input: {
      customerInfo: any
      saveNewAddress: boolean
      shippingAddress: any
      shippingOption: any
      billingAddress: any
      billingIsShipping: boolean
      selectedPaymentMethod: string | null
      paymentMethodData: any
      isOneStep?: boolean
    }
    context: {
      customerInfo: any
      saveNewAddress: boolean
      shippingAddress: any
      shippingOption: any
      billingAddress: any
      billingIsShipping: boolean
      selectedPaymentMethod: string | null
      paymentMethodData: any

      orderId: string | null
      redirectUrl: string | null
      isOneStep: boolean
    }
  },
  actors: {
    confirmOrderActor: {} as PromiseActorLogic<
      any,
      {
        saveNewAddress: boolean
        customerEmail: string
        shippingAddress: ComposableAddress
        shippingMethodId: string
        billingAddress: ComposableAddress
        billingIsShipping: boolean
        paymentMethod: SubmitOrderPaymentMethodData
      }
    >,
  },
  actions: {
    'track.next.on.payment': {} as any,
  },
}).createMachine({
  id: 'reviewOrder',
  context: ({ input }) => ({
    isOneStep: input.isOneStep ?? false,
    customerInfo: input.customerInfo,
    saveNewAddress: input.saveNewAddress,
    shippingAddress: input.shippingAddress,
    shippingOption: input.shippingOption,
    billingAddress: input.billingAddress ?? null,
    billingIsShipping: input.billingIsShipping,
    selectedPaymentMethod: input.selectedPaymentMethod,
    paymentMethodData: input.paymentMethodData,

    orderId: null,
    redirectUrl: null,
  }),
  initial: 'idle',
  on: {
    'go.step.delivery': {
      actions: sendParent({ type: 'go.step.delivery' }),
    },
    'go.step.payment': {
      actions: sendParent({ type: 'go.step.payment' }),
    },
  },
  states: {
    idle: {
      id: 'idle',
      on: {
        // This event will only by handled if the Checkout Experience is OneStep
        'process.payment.confirm': '#processing',

        // This will only get handled if the Checkout Experience is ThreeStep
        'order.confirm': 'confirmingOrder',
      },
    },
    processing: {
      id: 'processing',
      entry: [
        // Probably we would want to re-work this part
        // In the best scenario we would want to have a different confirmOrderActor
        // for each Checkout Experience, but StripeElements make it hard to do so
        // since we can't access to the details of the cart, so we can't call any
        // API endpoint directly from the client.
        sendTo(({ system }) => system.get('paymentActorChildSystemId'), {
          type: 'submit.step.payment',
        }),
      ],
      on: {
        'order.confirm': 'confirmingOrder',
        'set.payment.info': {
          actions: assign({
            selectedPaymentMethod: ({ event }) => event.selectedPaymentMethod,
            paymentMethodData: ({ event }) => event.paymentMethodData,
          }),
        },

        // Only For OneStep Checkout
        'order.failed': {
          target: '#failed',
        },
      },
    },
    failed: {
      id: 'failed',
      after: {
        1500: {
          target: '#idle',
        },
      },
    },
    confirmingOrder: {
      invoke: {
        src: 'confirmOrderActor',
        input: ({ context }) => ({
          saveNewAddress: context.saveNewAddress,
          customerEmail: context.customerInfo?.email ?? '',
          shippingAddress: context.shippingAddress,
          shippingMethodId: context.shippingOption.id ?? '',
          billingAddress: context.billingIsShipping
            ? context.shippingAddress
            : context.billingAddress,
          billingIsShipping: context.billingIsShipping,
          paymentMethod: {
            key: context.selectedPaymentMethod,
            data:
              context.paymentMethodData?.[context.selectedPaymentMethod!] ??
              null,
          } as SubmitOrderPaymentMethodData,
        }),
        onDone: {
          actions: [
            assign(({ event }) => ({
              orderId: event.output?.orderId,
              redirectUrl: event.output?.redirectUrl,
            })),
            sendParent(({ event }) => ({
              type: 'go.step.confirm',
              orderId: event.output?.orderId,
              redirectUrl: event.output?.redirectUrl,
            })),
          ],
        },
        onError: '#idle',
      },
    },
  },
})
