---
sidebar_position: 4
---
# FAQ

### Can I use the Stately Studio to see a visual representation of a Checkout Experience state machine?
- The [Stately Studio](https://stately.ai/docs/studio) is a tool for learning how to model state machines. 
  - However, it may not be suitable for complex state machines as it can become unstable beyond a certain complexity threshold.
- **Important:** The free version of Stately Studio only supports public facing projects
  - See examples of public facing projects on the [Discover](https://stately.ai/registry/discover?page=1) page.
  - Due to this exposure, only use the free tier for learning purposes.
  - Do not paste in a state machine from Checkout Experiences into the Stately Studio.
- See the [Pricing](https://stately.ai/pricing) page for features on each paid tier. Note, this is a purely optional service and is not required. 
- To work with a visual editor on your local machine, install the [Inspector](https://stately.ai/docs/inspector) library and instrument into your state machine.
  - At the time of writing, the Inspector library causes Next.js build errors when deploying to Cloud Providers like Vercel.

### What type of bugs are common when developing a state machine?
- Infinite Loops
  - Occasionally a state machine will enter an infinite loop, for example if on a state you define a guard but have not yet defined a target.
  - Read more on Stately's Docs, [Avoid Infinite Loops](https://stately.ai/docs/eventless-transitions#avoid-infinite-loops)
- Overlapping Event Names  
  - Avoid overlap of event names between state machines. For example, if there is an event of the same name between multiple machines, all actors will react to this event being triggered. 
  - You can use a domain naming convention to help avoid overlap. 
  - For example, if an event is sent when the user clicks on a shipping option, use event name of `shippingOption.select` instead of `select`, and if an event is sent when the user clicks on a payment option, use event name of `paymentOption.select` instead of `select`. 
- Ensure when defining the target of a transition, that the target state exists, otherwise xState will throw an error.

### How can I check whether a certain event can be triggered?
- If it is desired to dynamically hide or disable buttons depending on which events can be triggered from the given state, use the `.can` function: [state.can(eventType)](https://stately.ai/docs/states#statecaneventtype)
- If an event is sent and the current state of the state machine has no defined listener for the event, nothing will happen.

### How can I modify the state of an Actor?
- In React components, use the `send` function to an event that modifies the current state of the actor. Ensure the actor is in a state that is listening for the given event name.
- See the below example of the `threeStepActor` sending an event of name `customerInfo.login`. This event will trigger an action if the state machine is in state `deliveryOptions` which is listening for the `customerInfo.login` event as defined in the `on` object.
  - The `target` is set to `#login`. 
- Using `#` in the target name means the state will be looked up by the state's `id`.
  - Read more about targets here: [Finite States - Targets](https://stately.ai/docs/finite-states#targets)
```tsx
threeStepActor.send({
            type: 'customerInfo.login',
            email: data.email,
            password: data.password,
          })
```

```tsx
//...
  states: {
    deliveryOptions: {
      id: 'deliveryOptions',
      type: 'parallel',
      states: {
        customerInfo: {
          initial: 'fetchingCustomerInfo',
          states: {
            login: {
              id: 'login',
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
                  target: '#customerInfoDone',
                },
              },
            },
          },
        },
      },
      on: {
        'customerInfo.login': {
          target: '#login',
        }
      },
    }
  }

```

### How can I create a new State in the State Machine of a Checkout Experience?
- To add a new state to a state machine, you need to ensure that the new state is reachable from an existing state in your state machine.
- Follow these steps to create a new state:
  1. Create one or more transitions on one or more existing states that transition the state machine to your new state.
  2. Consider creating `guards` for moving to this new state, to restrict transitioning only if certain conditions are satisfied.
  3. Consider the transitions exiting from the new state to other states.
  4. If the new state is a `final` state, it will not be able to transition or send events. Refer to the [documentation on final states](https://stately.ai/docs/final-states) for more information.

### How can I find all ways into a specific State?
- Search for the State's name, or `id` if specified, in the `target` of other state's transitions
- Use the Inspector tool: https://stately.ai/docs/inspector.

### How can I find React components that transition the state machine?
- Look for use of the `.send` function and review the event parameters being sent which will determine the state transition logic, and review possible guards that need to be satisfied before a transition is allowed

### Where can I find the actions that occur during a state transition?
- Find the state in the state machine that you want to learn more about, the `on` object contains the event listeners which specify the target and the actions that will occur for each event.
   
### How do I use a promise in a state transition?
- Use `invoke` with a [promiseActor](https://stately.ai/docs/promise-actors), this allows a function to be executed 
-  `onDone` will be called when the Promise is resolved
-  `onError` will be called if the Promise throws an error
- See below example of the `loginActor` being invoked. When initializing the state machine, the function `loginActor` is passed in as a prop.

```tsx
//...
custormerInfo: {
    initial: 'fetchingCustomerInfo',
    states: {
    login: {
        id: 'login',
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
            target: '#customerInfoDone',
        },
        },
    },
    },
},
//...
```

### What are the recommended steps for creating a new Checkout Experience?

To create a new Checkout Experience, follow these steps:

1. Consider using the Stately Studio for a rough proof of concept mock-up. Please note that data is public facing on the free tier.
2. List out all the desired states for your Checkout Experience.
3. Determine the transitions that occur between each state.
4. Define any guards that prevent certain transitions from happening.
5. Determine the data needs of each transition. If you need to fetch or mutate remote data and respond to that network request, consider using a promiseActor.
6. Define the initial state attributes to pass when initializing the state machine.


