import { ComposableShippingMethod } from '@oriuminc/commerce-generic'
import { spawn } from 'child_process'
import { assign, PromiseActorLogic, sendParent, setup } from 'xstate'

export const shippingOptionsActor = setup({
  types: {} as {
    context: {
      shippingOptions: ComposableShippingMethod[]
      shippingOptionSelectedId: string | null
    }
  },
  actions: {
    setShippingOptionSelected: () => {},
  },
  actors: {
    fetchShippingOptionsActor: {} as PromiseActorLogic<any, { data: any }>,
    selectShippingOptionActor: {} as PromiseActorLogic<
      any,
      { shippingOptionId: string }
    >,
  },
  guards: {
    isShippingOptionDifferent: ({ event, context }) =>
      event.shippingOptionId !== context.shippingOptionSelectedId,
  },
}).createMachine({
  id: 'shippingOptionsk',
  initial: 'fetchingShippingOptions',
  context: {
    shippingOptions: [],
    shippingOptionSelectedId: null,
  },
  states: {
    fetchingShippingOptions: {
      id: 'fetchingShippingOptions',
      invoke: {
        id: 'fetchShippingOptionsKey',
        src: 'fetchShippingOptionsActor',
        input: ({ context }) => ({
          data: context.shippingOptionSelectedId,
        }),
        onDone: {
          target: '#shippingOptionsDone',
          actions: [
            assign({
              shippingOptions: ({ event }) => event.output,
            }),
            assign({
              shippingOptionSelectedId: ({ event, context }) =>
                context.shippingOptionSelectedId ?? event.output?.[0].id,
            }),
            sendParent(({ context }) => ({
              type: 'shippingOptions.isDone',
              isDone: true,
            })),
            'setShippingOptionSelected',
          ],
        },
        onError: {
          target: '#shippingOptionsEmpty',
          actions: [
            sendParent(({ context }) => ({
              type: 'shippingOptions.isDone',
              isDone: false,
            })),
          ],
        },
      },
    },
    shippingOptionsDone: {
      id: 'shippingOptionsDone',
      on: {
        'fetch.shippingOptions.inner': {
          target: '#fetchingShippingOptions',
          actions: [
            sendParent(({ context }) => ({
              type: 'shippingOptions.isDone',
              isDone: false,
            })),
          ],
        },
        'select.shipping.option': {
          actions: [
            assign({
              shippingOptionSelectedId: ({ event }) => event.shippingOptionId,
            }),
            'setShippingOptionSelected',
          ],
          guard: 'isShippingOptionDifferent',
        },
      },
    },
    shippingOptionsEmpty: {
      id: 'shippingOptionsEmpty',
      on: {
        retry: {
          target: '#fetchingShippingOptions',
        },
      },
    },
  },
})
