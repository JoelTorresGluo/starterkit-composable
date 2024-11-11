import {
  PromiseActorLogic,
  setup,
  assign,
  sendTo,
  stopChild,
  ActorLogicFrom,
} from 'xstate'
import {
  CheckoutMachineContext,
  SubmitOrderPaymentMethodData,
} from '../../types'
import {
  deliveryOptionsMachine,
  paymentMachine,
  reviewOrderMachine,
} from '../sections'

export const oneStepStateMachine = setup({
  types: {} as CheckoutMachineContext & {
    context: {
      paymentDone: boolean
      deliveryDone: boolean
    }
  },
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
    paymentMachine: {} as any,
    deliveryOptionsActor: {} as ActorLogicFrom<typeof deliveryOptionsMachine>,
    paymentActor: {} as ActorLogicFrom<typeof paymentMachine>,
    reviewOrderActor: {} as ActorLogicFrom<typeof reviewOrderMachine>,
  },
  guards: {
    isExperienceDone: ({ context }) =>
      context.paymentDone && context.deliveryDone,
  },
}).createMachine({
  id: 'checkout',
  initial: 'start',
  entry: [
    assign({
      deliveryOptionsRef: ({ spawn, context }) =>
        spawn('deliveryOptionsActor', {
          input: {
            isOneStep: true,
            isGuest: Boolean(!context.cart.customer),
          },
          syncSnapshot: true,
          id: 'deliveryOptionsActorChild',
        }),
    }),
  ],
  on: {
    'payment.status': {
      actions: assign({
        paymentDone: ({ event }) => event.isDone,
      }),
    },

    'payment.intent.confirmed': {
      actions: [
        sendTo(
          ({ context }) => context.reviewOrderRef!,
          ({ context }) => ({
            type: 'set.payment.info',
            selectedPaymentMethod:
              context.paymentRef?.getSnapshot().context.selectedPaymentMethod,
            paymentMethodData:
              context.paymentRef?.getSnapshot().context.paymentMethodData,
          })
        ),

        sendTo(({ context }) => context.reviewOrderRef!, {
          type: 'order.confirm',
        }),
      ],
    },
    'payment.intent.failed': {
      actions: [
        sendTo(({ context }) => context.reviewOrderRef!, {
          type: 'order.failed',
        }),
      ],
    },
  },
  context: ({ input }) => ({
    paymentDone: false,
    deliveryDone: false,
    orderId: null,
    redirectUrl: null,

    deliveryOptionsRef: undefined,
    paymentRef: undefined,
    reviewOrderRef: undefined,
    cart: input.cart,
  }),
  states: {
    start: {
      always: {
        target: 'ready',
        actions: [
          assign({
            reviewOrderRef: ({ spawn, context }) =>
              context.reviewOrderRef ??
              spawn('reviewOrderActor', {
                input: {
                  customerInfo: context.deliveryOptionsRef
                    ?.getSnapshot()
                    .context.customerInfoRef?.getSnapshot().context.customerInfo
                    ?.payload,
                  saveNewAddress:
                    context.deliveryOptionsRef
                      ?.getSnapshot()
                      .context.customerInfoRef?.getSnapshot().context
                      .saveNewAddress ?? false,
                  shippingAddress: context.deliveryOptionsRef
                    ?.getSnapshot()
                    .context.customerInfoRef?.getSnapshot().context
                    .shippingAddressSelected?.payload,
                  shippingOption: context.deliveryOptionsRef
                    ?.getSnapshot()
                    .context.shippingOptionsRef?.getSnapshot().context
                    .shippingOptionSelectedId,
                  billingAddress: context.paymentRef?.getSnapshot().context
                    .billingIsShipping
                    ? context.deliveryOptionsRef
                        ?.getSnapshot()
                        .context.customerInfoRef?.getSnapshot().context
                        .shippingAddressSelected?.payload
                    : context.paymentRef?.getSnapshot().context.billingAddress,
                  billingIsShipping:
                    context.paymentRef?.getSnapshot().context.billingIsShipping,
                  selectedPaymentMethod:
                    context.paymentRef?.getSnapshot().context
                      .selectedPaymentMethod,
                  paymentMethodData:
                    context.paymentRef?.getSnapshot().context.paymentMethodData,
                  isOneStep: true,
                },
                syncSnapshot: true,
                id: 'reviewOrderActorChildId',
                systemId: 'reviewOrderActorChild',
              }),
          }),
        ],
        guard: 'isExperienceDone',
      },
      on: {
        'set.delivery.status.done': {
          actions: [
            assign({
              deliveryDone: true,
            }),

            // Automatically trigger the submit.step.delivery event when is DONE
            sendTo(({ context }) => context.deliveryOptionsRef!, {
              type: 'submit.step.delivery',
            }),

            stopChild('paymentActorChild'),
            assign({
              paymentRef: ({ context, spawn }) => {
                return spawn('paymentActor', {
                  input: {
                    customerInfo: context.deliveryOptionsRef
                      ?.getSnapshot()
                      .context.customerInfoRef?.getSnapshot().context
                      .customerInfo?.payload,
                    shippingAddressSelected: context.deliveryOptionsRef
                      ?.getSnapshot()
                      .context.customerInfoRef?.getSnapshot().context
                      .shippingAddressSelected?.payload,
                    isOneStep: true,
                  },
                  syncSnapshot: true,
                  id: 'paymentActorChild',
                  systemId: 'paymentActorChildSystemId',
                })
              },
            }),
          ],
        },
      },
    },
    ready: {
      on: {
        'go.step.confirm': {
          target: 'finishing',
          actions: assign(({ event }) => ({
            orderId: event.orderId,
            redirectUrl: event.redirectUrl,
          })),
        },
        'set.delivery.status.undone': {
          target: 'start',
          actions: [
            assign({
              deliveryDone: false,
            }),
            assign({
              paymentRef: ({ spawn, context }) => {
                stopChild('paymentActorChild')
                return undefined
              },
            }),
          ],
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
              actions: [() => console.log('Something went wrong')],
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
