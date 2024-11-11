---
sidebar_position: 5
---

# Tips

1. Refer to the cheatsheet https://stately.ai/docs/cheatshee
2. Overlapping Event Names  
    - Avoid overlap of event names between state machines. For example if there is an event of the same name between multiple machines, all actors will react to this event being triggered. 
    - You can use a domain naming convention to help avoiding overlap. 
    - For example if an event is sent when the user clicks on a shipping option, use event name of `shippingOption.select` instead of `select`, and if and event is sent when the user clicks on a payment optoin, use event name of `paymentOption.select` instead of `select`. 
3. Set the `id` field of each state, and use the `id` in transition `target`s instead of the state's name. This can be helpful in large state machines contain many states. Prefix the `id` with `#`, for example `#finished`. See below:
```tsx
const feedbackMachine = createMachine({
  initial: 'prompt',
  states: {
    closed: {
      id: 'finished',
    },
    // ...
  },
  on: {
    'feedback.close': {
      target: '#finished',
    },
  },
});
```
4. When an event is used to set a boolean value, construct two events for toggling the boolean. For example:
    - `set.delivery.status.done`
      - Set the boolean to true
    - `set.delivery.status.undone`
      - Set the boolean to false
    - This pattern, will simplify the state machine. The alternative requires sending an additional parameter to represent the boolean value and additional code in the event listener to perform the correct state modifcations.

