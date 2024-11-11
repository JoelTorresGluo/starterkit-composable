import {
  PromiseActorLogic,
  and,
  assign,
  not,
  or,
  sendParent,
  sendTo,
  setup,
  emit,
  ActorLogicFrom,
  ActorRefFrom,
} from 'xstate'

import { ComposableAddress } from '@oriuminc/commerce-generic'

import { shippingOptionsActor } from './shipping-options-actor'
import { customerInfoActor } from './customer-info-actor'

export const deliveryOptionsMachine = setup({
  types: {} as {
    context: {
      isOneStep?: boolean
      isGuest?: boolean
      error: any
      shippingOptionsRef: ActorRefFrom<typeof shippingOptionsActor> | undefined
      customerInfoRef: ActorRefFrom<typeof customerInfoActor> | undefined
      isCustomerInfoDone: boolean
      wasSubmitted: boolean
    }
    input: {
      isOneStep: boolean
      isGuest: boolean
    }
  },
  actors: {
    submitDeliveryOptions: {} as PromiseActorLogic<
      any,
      {
        shippingOptionSelected: string
        shippingAddress: ComposableAddress
        customerEmail: string
        saveNewAddress: boolean
        shippingOptions: any[]
      }
    >,
    shippingOptionsActor: {} as ActorLogicFrom<typeof shippingOptionsActor>,
    customerInfoActor: {} as ActorLogicFrom<typeof customerInfoActor>,
  },
  actions: {
    setShippingOptionSelected: {} as any,
  },
  guards: {
    isDeliveryOptionsDone: ({ context }) => {
      const { customerInfoRef, shippingOptionsRef } = context

      return Boolean(
        customerInfoRef?.getSnapshot().context.customerInfo?.isValid &&
          customerInfoRef?.getSnapshot().context.shippingAddressSelected
            ?.isValid &&
          shippingOptionsRef?.getSnapshot().context.shippingOptions &&
          shippingOptionsRef?.getSnapshot().context.shippingOptionSelectedId
      )
    },
    isOneStep: ({ context }) => Boolean(context.isOneStep),
    wasSubmitted: ({ context }) => context.wasSubmitted,
  },
}).createMachine({
  id: 'deliveryOptionsx',
  initial: 'idle',
  context: ({ input }) => ({
    isOneStep: input?.isOneStep ?? false,
    isCustomerInfoDone: false,
    isGuest: input.isGuest ?? false,

    shippingOptionsRef: undefined,
    customerInfoRef: undefined,
    error: null,

    wasSubmitted: false,
  }),
  entry: assign({
    customerInfoRef: ({ spawn, context }) =>
      context.customerInfoRef ??
      spawn('customerInfoActor', {
        syncSnapshot: true,
      }),
  }),

  on: {
    'set.customerInfo.status': {
      actions: [
        assign({
          wasSubmitted: false,
          isCustomerInfoDone: ({ event }) => event.isDone,
          shippingOptionsRef: ({ context, spawn, event }) =>
            event.isDone
              ? context.shippingOptionsRef ??
                spawn('shippingOptionsActor', { syncSnapshot: true })
              : undefined,
        }),

        // For one step checkout, we need to tell the parent machine
        // that the customer info is not done (not valid) in order to update the
        // customer info (ct, ep, bc) when it becomes done (valid) again.
        sendParent(({ event }) => {
          if (!event.isDone) {
            return {
              type: 'set.delivery.status.undone',
            }
          }

          // This is just to satisfy the type checker,
          // this event is not defined in the parent machine
          // so it won't trigger any action.
          return { type: 'do.nothing' }
        }),

        sendTo(({ context }) => context.shippingOptionsRef!, {
          type: 'fetch.shippingOptions.inner',
        }),
      ],
    },
  },
  states: {
    idle: {
      id: 'idle',
      always: [
        {
          target: 'ready',
          actions: [sendParent({ type: 'set.delivery.status.done' })],
          guard: and(['isDeliveryOptionsDone', not('wasSubmitted')]),
        },
      ],
      on: {
        'on.logged.in': {
          actions: [
            assign({
              isGuest: false,
            }),
          ],
        },
        'fetch.shippingOptions': {
          actions: [
            sendTo(({ context }) => context.shippingOptionsRef!, {
              type: 'fetch.shippingOptions.inner',
            }),
          ],
        },
      },
    },
    submittingDeliveryOptions: {
      id: 'submittingDeliveryOptions',
      invoke: {
        id: 'submitCustomerInfo',
        src: 'submitDeliveryOptions',
        input: ({ context }) => ({
          shippingOptionSelected:
            context.shippingOptionsRef?.getSnapshot().context
              .shippingOptionSelectedId || '',
          shippingOptions:
            context.shippingOptionsRef?.getSnapshot().context.shippingOptions ??
            [],
          shippingAddress:
            context.customerInfoRef?.getSnapshot().context
              .shippingAddressSelected?.payload!,
          customerEmail:
            context.customerInfoRef?.getSnapshot().context.customerInfo?.payload
              .email ?? '',
          saveNewAddress:
            context.customerInfoRef?.getSnapshot().context.saveNewAddress ??
            false,
        }),
        onDone: {
          target: 'ready',
          actions: [
            assign({
              wasSubmitted: true,
            }),
            sendParent({ type: 'go.step.payment' }),
          ],
        },
        onError: {
          target: '#idle',
        },
      },
    },
    ready: {
      on: {
        'submit.step.delivery': {
          target: ['#submittingDeliveryOptions'],
        },
      },
    },
  },
})
