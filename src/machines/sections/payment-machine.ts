import {
  PromiseActorLogic,
  assign,
  emit,
  not,
  sendParent,
  sendTo,
  setup,
} from 'xstate'

export const paymentMachine = setup({
  types: {} as {
    input: {
      customerInfo: any
      shippingAddressSelected: any
      shippingOptionSelected?: any
      isOneStep?: boolean
    }
  },
  actors: {
    fetchStripeInitialDataActor: {} as PromiseActorLogic<
      any,
      { customerEmail: string }
    >,
    submitBillingAddressActor: {} as PromiseActorLogic<
      any,
      { billingAddress: any }
    >,
  },
  actions: {
    'track.next.on.payment': {} as any,
    goToStepReview: {} as any,
  },
  guards: {
    billingFormIsComplete: ({ context }) =>
      context.billingIsShipping || context.billingAddress.isValid,
    paymentFormIsComplete: ({ context }) => {
      switch (context.selectedPaymentMethod) {
        case 'offline':
          return true
        case 'purchaseOrder':
          return true
        case 'stripe':
          return context.stripeFormIsComplete
      }

      return false
    },
  },
}).createMachine({
  id: 'paymentOptions',
  context: ({ input }) => ({
    isOneStep: input?.isOneStep ?? false,

    customerInfo: input?.customerInfo,
    shippingAddress: input?.shippingAddressSelected,
    shippingOption: input?.shippingOptionSelected,

    selectedPaymentMethod: null,
    paymentMethodData: null,
    // Stripe
    stripeFormIsComplete: false,

    //billing
    billingIsShipping: true,
    billingAddress: {
      payload: {
        city: '',
        country: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        postalCode: '',
        state: '',
        streetName: '',
        streetNumber: '',
      },
      isValid: false,
    },
  }),
  initial: 'enteringData',
  on: {
    'reset.payment': {
      target: ['#enteringData'],
    },
    'go.step.delivery': {
      actions: sendParent({ type: 'go.step.delivery' }),
    },
    'billingAddress.setSameAsShipping': {
      actions: assign(({ event }) => ({
        billingIsShipping: event.value,
      })),
    },
    'update.deliveryInfo': {
      actions: assign(({ event }) => ({
        customerInfo: event.customerInfo,
        shippingAddress: event.shippingAddressSelected,
        shippingOption: event.shippingOptionSelected,
      })),
    },
  },
  states: {
    enteringData: {
      id: 'enteringData',
      type: 'parallel',
      onDone: {
        actions: [
          sendParent(({ context }) => {
            if (context.isOneStep) {
              return {
                type: 'payment.intent.confirmed',
              }
            }

            return { type: 'go.step.review' }
          }),
        ],
      },
      states: {
        paymentMethod: {
          id: 'paymentMethod',
          initial: 'initialize',
          on: {
            'paymentMethod.select.stripe': {
              target: '#stripeSelected',
              actions: [assign(() => ({ selectedPaymentMethod: 'stripe' }))],
            },
            'paymentMethod.select.offline': {
              target: '#offlineSelected',
              actions: [
                assign(() => ({
                  selectedPaymentMethod: 'offline',
                })),
              ],
            },
            'paymentMethod.select.purchaseOrder': {
              target: '#purchaseOrderSelected',
              actions: assign(() => ({
                selectedPaymentMethod: 'purchaseOrder',
              })),
            },

            'paymentMethod.select.none': {
              target: '#noneSelected',
              actions: [
                assign(() => ({ selectedPaymentMethod: null })),
                sendParent({ type: 'payment.status', isDone: false }),
              ],
            },
          },
          states: {
            initialize: {
              always: [
                {
                  target: '#offlineSelected',
                  guard: ({ context }) =>
                    context.selectedPaymentMethod === 'offline',
                },
                {
                  target: '#purchaseOrderSelected',
                  guard: ({ context }) =>
                    context.selectedPaymentMethod === 'purchaseOrder',
                },
                {
                  target: '#stripeSelected',
                  guard: ({ context }) =>
                    context.selectedPaymentMethod === 'stripe',
                },
                { target: '#noneSelected' },
              ],
            },
            noneSelected: {
              id: 'noneSelected',
            },
            stripeSelected: {
              id: 'stripeSelected',
              initial: 'initialize',
              states: {
                initialize: {
                  always: [
                    {
                      target: '#previousSetupIntentConfirmed',
                      guard: ({ context }) =>
                        Boolean(
                          context.paymentMethodData?.stripe?.setupIntent
                            ?.payment_method
                        ),
                    },
                    {
                      target: '#enteringCardInfo',
                      guard: ({ context }) =>
                        Boolean(context.paymentMethodData?.stripe?.setupIntent),
                    },
                    { target: '#loadingStripeInitialData' },
                  ],
                },
                previousSetupIntentConfirmed: {
                  id: 'previousSetupIntentConfirmed',
                  on: {
                    'stripe.changeCard': {
                      target: '#loadingStripeInitialData',
                    },
                    'submit.step.payment': {
                      target: '#paymentDataSubmitted',
                      guard: 'billingFormIsComplete',
                    },
                  },
                },
                loadingStripeInitialData: {
                  id: 'loadingStripeInitialData',
                  invoke: {
                    src: 'fetchStripeInitialDataActor',
                    input: ({ context }) => ({
                      customerEmail: context.customerInfo?.email ?? '',
                    }),
                    onDone: {
                      target: 'enteringCardInfo',
                      actions: assign(({ event }) => ({
                        paymentMethodData: {
                          stripe: event.output,
                        },
                      })),
                    },
                    onError: {
                      target: 'errorLoading',
                    },
                  },
                },
                errorLoading: {
                  on: {
                    'stripe.reload': '#loadingStripeInitialData',
                  },
                },
                enteringCardInfo: {
                  id: 'enteringCardInfo',
                  on: {
                    'stripe.formComplete': {
                      target: '#stripeDataComplete',
                      actions: [
                        assign(() => ({
                          stripeFormIsComplete: true,
                        })),
                      ],
                    },
                  },
                },
                stripeDataComplete: {
                  id: 'stripeDataComplete',
                  entry: [sendParent({ type: 'payment.status', isDone: true })],
                  on: {
                    'stripe.formIncomplete': {
                      target: '#stripeSelected.enteringCardInfo',
                      actions: [
                        sendParent({ type: 'payment.status', isDone: false }),
                        assign(() => ({
                          stripeFormIsComplete: false,
                        })),
                      ],
                    },
                    'submit.step.payment': {
                      target: '#submittingStripePaymentData',
                      guard: 'billingFormIsComplete',
                    },
                  },
                },
                submittingStripePaymentData: {
                  id: 'submittingStripePaymentData',
                  on: {
                    'stripe.setConfirmedData': {
                      target: '#paymentDataSubmitted',
                      actions: [
                        assign(({ context, event }) => {
                          return {
                            paymentMethodData: {
                              ...context.paymentMethodData,
                              stripe: {
                                ...context.paymentMethodData?.stripe,
                                setupIntent: event.setupIntent,
                              },
                            },
                          }
                        }),
                      ],
                    },
                    'stripe.confirmationError': {
                      target: '#stripeDataComplete',
                      actions: [
                        sendParent({
                          type: 'payment.intent.failed',
                        }),
                      ],
                    },
                  },
                },
              },
            },
            offlineSelected: {
              id: 'offlineSelected',
              entry: [sendParent({ type: 'payment.status', isDone: true })],
              on: {
                'submit.step.payment': {
                  target: '#paymentDataSubmitted',
                  guard: 'billingFormIsComplete',
                },
              },
            },
            purchaseOrderSelected: {
              id: 'purchaseOrderSelected',
              on: {
                'submit.step.payment': {
                  target: '#paymentDataSubmitted',
                  guard: 'billingFormIsComplete',
                },
              },
            },
            paymentDataSubmitted: {
              id: 'paymentDataSubmitted',
              type: 'final',
              on: {
                'stripe.changeCard': {
                  target: '#loadingStripeInitialData',
                },
              },
            },
          },
        },
        billingAddress: {
          id: 'billingAddress',
          initial: 'enteringBillingAddress',
          states: {
            enteringBillingAddress: {
              id: 'enteringBillingAddress',
              always: {
                target: '#billingAddressComplete',
                guard: 'billingFormIsComplete',
              },
              on: {
                'billingAddress.update': {
                  actions: assign(({ context, event }) => ({
                    billingAddress: event.data,
                  })),
                },
              },
            },
            billingAddressComplete: {
              id: 'billingAddressComplete',
              always: {
                target: '#enteringBillingAddress',
                guard: not('billingFormIsComplete'),
              },
              on: {
                'submit.step.payment': {
                  target: '#submittingBillingAddressData',
                  guard: 'paymentFormIsComplete',
                  actions: [
                    assign(({ context }) => {
                      if (context.billingIsShipping) {
                        const { shippingAddress } = context
                        const { id: _, ...payloadRest } = shippingAddress

                        return {
                          billingAddress: {
                            isValid: true,
                            payload: {
                              ...payloadRest,
                            },
                          },
                        }
                      }
                      return {}
                    }),
                  ],
                },
                'billingAddress.update': {
                  actions: assign(({ context, event }) => {
                    return {
                      billingAddress: event.data,
                    }
                  }),
                },
              },
            },
            submittingBillingAddressData: {
              id: 'submittingBillingAddressData',
              invoke: {
                src: 'submitBillingAddressActor',
                input: ({ context }) => ({
                  billingAddress: context.billingAddress.payload,
                }),
                onDone: '#submittingBillingAddressDone',
                onError: '#enteringBillingAddress',
              },
            },
            submittingBillingAddressDone: {
              id: 'submittingBillingAddressDone',
              type: 'final',
            },
          },
        },
      },
    },
  },
})
