import {
  assign,
  emit,
  enqueueActions,
  not,
  PromiseActorLogic,
  sendParent,
  sendTo,
  setup,
} from 'xstate'

import { ComposableAddress } from '@oriuminc/commerce-generic'

export const customerInfoActor = setup({
  types: {} as {
    context: {
      customerInfo: {
        payload: {
          email: string
          firstName: string
          lastName: string
          addresses: any[]
          defaultShippingAddressId: number
        }
        isValid: boolean
      } | null
      saveNewAddress: boolean
      shippingAddresses: Array<ComposableAddress & { id: string }>
      shippingAddressSelected: {
        payload: ComposableAddress & { id: string }
        isValid: boolean
      } | null
      error: any
    }
  },
  actors: {
    fetchCustomerInfoActor: {} as PromiseActorLogic<any>,
    updateCustomerInfoActor: {} as PromiseActorLogic<any, { address: any }>,
    loginActor: {} as PromiseActorLogic<
      any,
      { email: string; password: string }
    >,
  },
  guards: {
    isShippingInfoDone: ({ context }) =>
      Boolean(
        context.shippingAddressSelected?.isValid &&
          context.customerInfo?.isValid
      ),
  },
}).createMachine({
  id: 'customerInfox',
  initial: 'fetchingCustomerInfo',
  context: {
    customerInfo: null,
    shippingAddresses: [],
    shippingAddressSelected: null,
    saveNewAddress: false,
    error: null,
  },
  on: {
    'set.shippingAddress': {
      actions: [
        assign({
          shippingAddressSelected: ({ event }) => event.data,
        }),
        sendParent(({ context, event }) => ({
          type: 'set.customerInfo.status',
          isDone: event.data?.isValid && context.customerInfo?.isValid,
        })),
      ],
    },

    'set.customerInfo': {
      actions: [
        assign({
          customerInfo: ({ event }) => event.data,
        }),
        sendParent(({ context, event }) => ({
          type: 'set.customerInfo.status',
          isDone:
            event.data.isValid && context.shippingAddressSelected?.isValid,
        })),
      ],
    },

    'save.new.address': {
      actions: [
        assign({
          saveNewAddress: ({ event }) => event.data,
        }),
      ],
    },
  },
  states: {
    fetchingCustomerInfo: {
      id: 'fetchingCustomerInfo',
      invoke: {
        id: 'fetchCustomerInfo',
        src: 'fetchCustomerInfoActor',
        onDone: {
          target: '#authenticatedCustomer',
          actions: [
            assign({
              customerInfo: ({ event }) => ({
                payload: event.output,
                isValid: true,
              }),
              shippingAddresses: ({ event }) => event.output.addresses,
              shippingAddressSelected: ({ event }) => ({
                payload:
                  event.output.addresses.find(
                    (address: any) =>
                      address.id === event.output.defaultShippingAddressId
                  ) ?? event.output.addresses[0],
                isValid: true,
              }),
            }),

            // We sent this event because we have the customer info and shipping address valid
            sendParent({ type: 'set.customerInfo.status', isDone: true }),
            sendParent({ type: 'on.logged.in' }),
          ],
        },
        onError: {
          target: '#annonymousCustomer',
        },
      },
    },
    authenticated: {
      id: 'authenticatedCustomer',
      initial: 'idle',
      states: {
        idle: {
          id: 'customerInfoIdle',
          on: {
            'edit.shippingAddress': {
              target: '#editCustomerAddress',
            },
          },
        },
        editing: {
          id: 'editCustomerAddress',
          on: {
            'update.shippingAddress': {
              target: '#customerInfoLoading',
              actions: [
                assign({
                  shippingAddressSelected: ({ event, context }) => ({
                    payload: {
                      ...context.shippingAddressSelected?.payload,
                      ...event.data,
                    },
                    isValid: true,
                  }),
                }),
              ],
            },
          },
        },
        loading: {
          id: 'customerInfoLoading',
          invoke: {
            id: 'updateAddress',
            src: 'updateCustomerInfoActor',
            input: ({ context }) => ({
              address: context.shippingAddressSelected?.payload,
            }),
            onDone: {
              target: '#customerInfoIdle',
              actions: [
                assign({
                  shippingAddressSelected: ({ event }) => ({
                    payload: event.output.addressSelected,
                    isValid: true,
                  }),
                  shippingAddresses: ({ event }) => event.output.addresses,
                }),
              ],
            },
            onError: {
              target: 'idle',
              actions: assign({
                error: ({ event }) => event.error,
              }),
            },
          },
        },
      },
    },
    annonymous: {
      id: 'annonymousCustomer',
      on: {
        'login.customer': {
          target: '#logging',
        },
      },
    },
    logging: {
      id: 'logging',
      invoke: {
        id: 'login',
        src: 'loginActor',
        input: ({ event }) => ({
          email: event.email,
          password: event.password,
        }),
        onDone: {
          target: '#fetchingCustomerInfo',
        },
        onError: {
          target: '#annonymousCustomer',
        },
      },
    },
  },
})
