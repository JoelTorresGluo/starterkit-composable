import {
  setup,
  PromiseActorLogic,
  assign,
  stopChild,
  sendTo,
  ActorRefFrom,
  ActorLogicFrom,
} from 'xstate'
import {
  SubmitOrderPaymentMethodData,
  CheckoutMachineContext,
} from '../../types'
import {
  deliveryOptionsMachine,
  paymentMachine,
  reviewOrderMachine,
} from '../sections'

export const threeStepStateMachine = setup({
  types: {} as CheckoutMachineContext,
  actors: {
    redirectActor: {} as PromiseActorLogic<any, { redirectUrl: string }>,
    afterPaymentRedirectionActor: {} as PromiseActorLogic<
      {
        redirectUrl: string
        orderId?: string
      },
      { paymentMethod: SubmitOrderPaymentMethodData }
    >,
    setOrderIdActor: {} as PromiseActorLogic<any, { orderId: string }>,
    cleanUpActor: {} as PromiseActorLogic<any, any>,
    deliveryOptionsActor: {} as ActorLogicFrom<typeof deliveryOptionsMachine>,
    paymentActor: {} as ActorLogicFrom<typeof paymentMachine>,
    reviewOrderActor: {} as ActorLogicFrom<typeof reviewOrderMachine>,
  },
  actions: {
    'track.next.on.delivery': {} as any,
    'track.next.on.payment': {} as any,
  },
}).createMachine({
  id: 'checkout',
  initial: 'delivery',
  entry: [
    assign({
      deliveryOptionsRef: ({ spawn, context }) =>
        spawn('deliveryOptionsActor', {
          syncSnapshot: true,
          id: 'deliveryOptionsActorChild',
          input: {
            isOneStep: false,
            isGuest: Boolean(!context.cart.customer),
          },
        }),
    }),
  ],
  context: ({ input }) => ({
    orderId: null,
    redirectUrl: null,

    deliveryOptionsRef: undefined,
    paymentRef: undefined,
    reviewOrderRef: undefined,
    error: null,
    cart: input?.cart,
  }),
  states: {
    delivery: {
      id: 'delivery',
      on: {
        'go.step.payment': {
          target: 'payment',
          actions: [
            'track.next.on.delivery',
            // update paymentRef to display lastest shipping details on payment step summary
            sendTo(
              ({ context }) => context.paymentRef!,
              ({ context }) => {
                const { customerInfoRef, shippingOptionsRef } =
                  context.deliveryOptionsRef?.getSnapshot().context || {}
                const { customerInfo, shippingAddressSelected } =
                  customerInfoRef?.getSnapshot().context || {}
                const { shippingOptionSelectedId, shippingOptions } =
                  shippingOptionsRef?.getSnapshot().context || {}
                return {
                  type: 'update.deliveryInfo',
                  customerInfo: customerInfo?.payload,
                  shippingAddressSelected: shippingAddressSelected?.payload,
                  shippingOptionSelected: shippingOptions?.find(
                    (option) => option.id === shippingOptionSelectedId
                  ),
                }
              }
            ),
            assign({
              paymentRef: ({ spawn, context }) => {
                const { customerInfoRef, shippingOptionsRef } =
                  context.deliveryOptionsRef?.getSnapshot().context || {}

                const { customerInfo, shippingAddressSelected } =
                  customerInfoRef?.getSnapshot().context || {}

                const { shippingOptionSelectedId, shippingOptions } =
                  shippingOptionsRef?.getSnapshot().context || {}

                return context.paymentRef
                  ? context.paymentRef
                  : spawn('paymentActor', {
                      id: 'paymentActorChild',
                      input: {
                        customerInfo: customerInfo?.payload,
                        shippingAddressSelected:
                          shippingAddressSelected?.payload,
                        shippingOptionSelected: shippingOptions?.find(
                          (option) => option.id === shippingOptionSelectedId
                        ),
                      },
                      syncSnapshot: true,
                    })
              },
            }),
          ],
        },
        'go.step.review': {
          target: 'review',
          guard: ({ context }) => {
            return Boolean(context.reviewOrderRef)
          },
        },
      },
    },
    payment: {
      id: 'payment',
      on: {
        'go.step.delivery': {
          target: 'delivery',
        },
        'go.step.review': {
          target: 'review',
          actions: [
            'track.next.on.payment',
            assign({
              reviewOrderRef: ({ spawn, context }) => {
                stopChild('reviewOrderActorChild')

                const { customerInfoRef, shippingOptionsRef } =
                  context.deliveryOptionsRef?.getSnapshot().context || {}

                const {
                  customerInfo,
                  saveNewAddress,
                  shippingAddressSelected,
                } = customerInfoRef?.getSnapshot().context || {}
                const { shippingOptionSelectedId, shippingOptions } =
                  shippingOptionsRef?.getSnapshot().context || {}

                const {
                  billingAddress,
                  billingIsShipping,
                  paymentMethodData,
                  selectedPaymentMethod,
                } = context.paymentRef?.getSnapshot().context || {}

                return spawn('reviewOrderActor', {
                  input: {
                    billingAddress,
                    billingIsShipping,
                    customerInfo: customerInfo?.payload,
                    paymentMethodData,
                    saveNewAddress: saveNewAddress ?? false,
                    selectedPaymentMethod,
                    shippingAddress: shippingAddressSelected?.payload,
                    shippingOption: shippingOptions?.find(
                      (option) => option.id === shippingOptionSelectedId
                    ),
                  },
                  id: 'reviewOrderActorChild',
                  syncSnapshot: true,
                })
              },
            }),
          ],
        },
      },
    },
    review: {
      on: {
        'go.step.delivery': {
          target: 'delivery',
        },
        'go.step.payment': {
          target: 'payment',
          actions: sendTo(({ context }) => context.paymentRef!, {
            type: 'reset.payment',
          }),
        },
        'go.step.confirm': {
          target: 'finishing',
          actions: assign(({ event }) => ({
            orderId: event.orderId,
            redirectUrl: event.redirectUrl,
          })),
        },
      },
    },
    finishing: {
      id: 'finishing',
      initial: 'checkOrderStatus',
      states: {
        checkOrderStatus: {
          id: 'checkOrderStatus',
          always: [
            {
              // if there's already an order created, go to orderCreated
              target: '#orderCreated',
              guard: ({ context }) => Boolean(context.orderId),
            },
            {
              // else, go to paymentConfirmationRedirection to finish the payment process
              target: '#paymentConfirmationRedirection',
            },
          ],
        },
        paymentConfirmationRedirection: {
          id: 'paymentConfirmationRedirection',
          invoke: {
            src: 'redirectActor',
            input: ({ context }) => ({ redirectUrl: context.redirectUrl! }),
          },
          on: {
            'payment.redirection.done': 'waitBeforeSuccessAction',
          },
        },
        // workaround to prevent running afterPaymentRedirectionActor twice
        waitBeforeSuccessAction: {
          id: 'waitBeforeSuccessAction',
          after: {
            1: '#paymentConfirmationSuccess',
          },
        },
        paymentConfirmationSuccess: {
          id: 'paymentConfirmationSuccess',
          invoke: {
            src: 'afterPaymentRedirectionActor',
            input: ({ context }) => ({
              paymentMethod: {
                key: context.paymentRef?.getSnapshot().context
                  .selectedPaymentMethod,
                data:
                  context.paymentRef?.getSnapshot().context.paymentMethodData?.[
                    context.paymentRef?.getSnapshot().context
                      .selectedPaymentMethod
                  ] ?? null,
              } as SubmitOrderPaymentMethodData,
            }),
            onDone: {
              target: '#orderCreated',
              actions: assign(({ event }) => ({
                orderId: event.output.orderId,
                redirectUrl: event.output.redirectUrl,
              })),
            },
            onError: {
              target: '#payment',
            },
          },
        },
        paymentConfirmationError: {
          id: 'paymentConfirmationError',
        },
        orderCreated: {
          id: 'orderCreated',
          invoke: {
            src: 'setOrderIdActor',
            input: ({ context }) => ({ orderId: context.orderId! }),
            onDone: '#done',
          },
        },
      },
    },
    done: {
      id: 'done',
      initial: 'cleanup',
      states: {
        cleanup: {
          id: 'cleanup',
          invoke: {
            src: 'cleanUpActor',
            onDone: 'redirectingToSuccessPage',
            onError: 'redirectingToSuccessPage', // if it fails, send to success anyway
          },
        },
        redirectingToSuccessPage: {
          id: 'redirectingToSuccessPage',
          invoke: {
            src: 'redirectActor',
            input: ({ context }) => ({ redirectUrl: context.redirectUrl! }),
          },
        },
      },
    },
  },
})
