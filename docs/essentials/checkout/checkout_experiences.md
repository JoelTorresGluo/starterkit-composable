---
sidebar_position: 2
---

# Checkout Experiences

Two Checkout Experiences are built and ready to be served to customers. These two pre-built experiences are highly customizable and should be used as the foundation for any desired customizations:

- A One Step checkout experience.
- A Three Step checkout experience.

In certain situations it may be desired to create a new Checkout Experience entirely. For example, creating a standalone Checkout Experience to target a specific customer segment. 

## Checkout Experience Components

Each Checkout Experience requires:

- an **Entry Condition** used to determine whether to serve the given Checkout Experience
- a state machine that defines all possible states and transitions to and from each state as a user proceeds through a checkout journey
- functions for data fetching and data mutating, input as props to the state machine
- functions for validating user input, input as props to the state machine
- React UI components, passed in as children to the state machine

### Entry Condition

Each Checkout Experience has an Entry Condition, a function that takes input of type `CheckoutExperienceDataInput` and evaluates to true or false.

- If the Entry Condition evaluates to `true`, the Checkout Experience will be served to the customer.
- If the Entry Condition evaluates to `false`, the next defined Checkout Experience's Entry Condition will be evaluated.
- If no Entry Conditions evaluate to true, then the `default` Checkout Experience is served.

The Entry Condition of each Checkout Experience is evaluated in a specific order, as defined by the function `checkoutExperienceConditions`, when a user navigates to the `/checkout` route. The first Entry Condition that evaluates to true will determine the Checkout Experience served to the customer. Each Entry Condition can be created with conditions assessing the values of: the current customer, the cart, and the browser window object. These input objects are referred to as **Entry Condition Input**.

The Entry Condition Input can be modified as needed in order to create unique targeted conditions for the Checkout Experiences.

- See `CheckoutExperienceDataInput` for the Type managing Entry Condition Input
- See the `useResolveCheckoutExperience` hook that loops through the Entry Conditions and evaluates which Checkout Experience to serve to the customer

:::important
Once a customer has initiated a Checkout Experience, the customer will continue to be served the same experience even if they reload their page or are redirected away (for something like a third-party login redirect), or go back to the storefront and modify their cart. This allows the Checkout Experience system to re-initialize the customer exactly where they left off before the reload or redirect occurred. See [State Persistence](#state-persistence) to learn more and how to modify this behaviour.
:::

## Common Data fetching and data mutating hooks

There are several core hooks defined in `modules/checkout/hooks` that are intended to be reused and extended upon to build a variety of Checkout Experiences. For example, it's reasonable to assume that every Checkout Experience will need to fetch the cart, making it logical to share this code across all Checkout Experiences.

- These core hooks are passed into a Checkout Experience's state machine as props, allowing the state machine to invoke each data fetching or data mutating function when needed depending on the action being invoked in the state machine.
  - This allows the state machines in Checkout Experience to be agnostic to any third-party API.
- If these hooks don't meet your needs you can:
  - create a new hook that contains your desired data fetching and data mutating logic
  - compose together a new hook with your desired custom function(s) and/or re-use some of the existing hook's functions.

The following core hooks are defined:

- useCartManagement()
- useCustomerManagement()
- useOrderManagement()
- usePaymentManagement()
- useShippingManagement()
- useCheckoutAnalytics()

Below is an example of using these hooks in the Three Step Checkout experience:

```tsx
export const ThreeStepExperience = () => {
  const cartManagement = useCartManagement()
  const customerManagement = useCustomerManagement()
  const orderManagement = useOrderManagement()
  const paymentManagement = usePaymentManagement()
  const shippingManagement = useShippingManagement()

  const analytics = useCheckoutAnalytics()

  const hideSummary = useBreakpointValue({ base: false, md: true })

  return (
    <DynamicThreeStepCheckout
      customerManagement={customerManagement}
      cartManagement={cartManagement}
      paymentManagement={paymentManagement}
      orderManagement={orderManagement}
      shippingManagement={shippingManagement}
      MobileCartSummary={<BagSummary />}
      ...
/>

```

### useCartManagement()

```ts
/**  Provides functions for fetching the cart and submitting billing and shipping addresses,
 *  and setting the selected delivery option.
 *
 * @returns {Object} An object containing the following functions:
 *  - fetchCart: A function that fetches the cart data.
 *  - submitBillingAddress: A function that submits the billing address.
 *  - submitShippingAddress: A function that submits the shipping address.
 *  - submitDeliveryOptions: A function that submits the delivery options.
 *  - clearCart: A function that clears the cart.
 *
 */
```

### useCustomerManagement()

```ts
/** Provides functions for fetching the customer, logging in the customer,
 *  and setting the customer's address.
 *
 * @returns {Object} An object containing the following functions:
 * - fetchCustomer: A function that fetches the customer data.
 * - login: A function that logs in the user.
 * - updateCustomerAddress: A function that updates the customer's address.
 *
 */
```

### useShippingManagement()

```ts
/**
 * Provides functions for working with shipping options
 *
 * @returns {Object} An object containing the following functions:
 * - fetchShippingOptions: A function that fetches the shipping options.
 * - onSelectedShippingOption: A function that sets the selected shipping option.
 */
```

### usePaymentManagement()

```ts
/**
 *  Provides functions for working with Stripe
 *
 * @returns {Object} An object containing the following functions:
 * - fetchStripeSetupIntent: A function that fetches the Stripe setup intent.
 * - stripeAfterPaymentRedirectConfirmation: A function that confirms the Stripe order after payment.
 * - onRedirectAfterPayment: A function that redirects the user after payment.
 * - confirmOrder: A function that confirms the order.
 *
 */
```

### useOrderManagement()

```ts
/**
 * This small utility hook is used to track the orderId in the checkout experience.
 * On the Order Summary page, the orderId is used to retrieve the order details from the commerce engine.
 * @returns setOrderId: a function to set the orderId after a successful payment.
 */
```

### useCheckoutAnalytics()

```ts
/**
 * Provides functions for tracking analytics events in the checkout experience
 *
 * @returns {Object} An object containing the following functions:
 * - track.next.on.delivery: A function that tracks the shipping information.
 * - track.next.on.payment: A function that tracks the payment information.
 */
```

## Dynamically Loaded

Each Checkout Experience is dynamically loaded using the `dynamic` function from Next.js

```jsx
import dynamic from 'next/dynamic'
```

This ensures a fast first paint for the user when they navigate to the `/checkout` page by preventing the need for the browser to download code bundles related to the Checkout Experience. The user will be displayed a loading cart page as defined in React component `CheckoutLoadingCart`, see `/pages/checkout/index.tsx` for more.

## State Persistence

Each Checkout Experience tracks the user's progress through the checkout process. If the page is refreshed, the user is redirected, or the user navigates back to the checkout after modifying their cart, the Checkout Experience will restore the user's previous state. For example, if the user has already entered their shipping address and refreshes the page, the form data and UI state will be retrieved from localStorage.

The logic governing state persistence can be customized if needed. For instance, if there are entry conditions that determine different experiences based on the cart contents, and a user modifies their cart during checkout, it is recommended to delete the stored state in localStorage and reevaluate the entry conditions instead of restoring the prior Checkout Experience.

- If you need to fine tune the logic governing Checkout Experience state persistence, see hook `useResolveCheckoutExperience`.

## Prebuilt Checkout Experiences

There are two pre-built Checkout Experences:

- One Step Checkout
  - This checkout flow is a single page experience where all components of the checkout are displayed in a single page and are usually always visible to the end user
- Three Step Checkout
  - This checkout flow is a three stage experience where the user navigates through their account login and/or address input, then on a new page inputs their billing information on a separate view, and then on the third and final page reviews their order and completes the order.