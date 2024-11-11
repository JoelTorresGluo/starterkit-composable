---
sidebar_position: 45
---

# Custom React Hooks

## Overview

The Storefront includes several custom React hooks that simplify common tasks, such as retrieving the logged-in user or adding an item to the cart.

Custom hooks are organized within their respective modules. For example, the `useCart` hook is located in `modules/commerce/hooks`.

This section highlights the most important custom hooks you should be aware of. Explore each module to discover additional hooks that are available.ß

## useComposable

The `useComposable` hook is primarily used to manage UI elements like drawers and centralize the definitions of URL paths throughout the Storefront.

It is maintained in `modules/general/context`.

Here’s an example of using `useComposable` to retrieve the URL path to the Checkout page:

```tsx
import { useComposable } from '@modules/general'
...
export const SampleComponent = () => {
    const { path } = useComposable()
    ....
    return (
        <Text>{path.getCheckout()}</Text>
    )
}
```

The following objects are available through the `useComposable` hook:

```tsx
export interface ComposableContextInterface {
  locale: Locale
  cartDrawer: UseDisclosureReturn
  megaDrawer: UseDisclosureReturn
  accountDrawer: UseDisclosureReturn
  path: {
    getAccountDashboard: (params?: { page?: string }) => string
    getManagementDashboard: (params?: { page?: string }) => string
    getAccountForgot: () => string
    getAccountLogin: (queryParams?: QueryParams) => string
    getAccountRegister: () => string
    getAccountReset: () => string
    getCart: () => string
    getCheckout: () => string
    getCheckoutSuccess: (params: { order?: string }) => string
    getConstructorIo: () => string
    getHome: () => string
    getPDP: (params: { slug: string }) => string
    getPLP: (params: { slug: string }) => string
    getSearch: (params: { query: string }) => string
    getConstructorIoSearch: (params: { query: string }) => string
    getBloomreach: () => string
    getBloomreachSearch: (params: { query: string }) => string
  }
}
```

Breakdown of `useComposable` Properties and Functions:

| Property/Function  | Description |
| - | - |
| `accountDrawer` | Specifies whether the account drawer is currently being shown or hidden and provides functions to control the drawer states, such as `onOpen`, `OnClose`, or `onToggle`. |
| `cartDrawer` | Specifies whether the cart drawer is currently being shown or hidden and provides functions to control the drawer states, such as `onOpen`, `OnClose`, or `onToggle`.  |
| `megaDrawer` | Specifies whether the mega menu drawer is currently being shown or hidden and provides functions to control the drawer states, such as `onOpen`, `OnClose`, or `onToggle`.  |
| `locale` | Specifies the current locale. |
| `path.getAccountDashboard` | Returns the path to the account dashboard page. |
| `path.getAccountForgot` | Returns the path to the forgot password page. |
| `path.getAccountReset` | Returns the path to the account password reset page. |
| `path.getAccountLogin` | Returns the path to the account login page. |
| `path.getAccountRegister` | Returns the path to the account register page. |
| `path.getCart` | Returns the path to the cart  page. |
| `path.getCheckout` | Returns the path to the checkout page. |
| `path.getCheckoutSuccess` | Returns the path to the checkout confirmation page. |
| `path.getHome` | Returns the path to the home page. |
| `path.getPDP` | Returns the path to the product display page. |
| `path.getPLP` | Returns the path to the Product Listing Page (PLP) for a product category. |
| `path.getSearch` | Returns the path to the search page. |


## useCart

The `useCart` hook in `modules/commerce/hooks/use-cart` facilitates operations with the customer's cart. 

Use this hook to perform common commerce operations like:
 - Creating the Cart
 - Fetching the Cart
 - Adding and removing items from the Cart
 - Applying discount codes

## useUser

The `useUser` hook in `modules/commerce/hooks/use-user` provides access to operations like:
- login
- logout
- fetching the User object

## References

- [Extracting your own custom Hook from a component ](https://react.dev/learn/reusing-logic-with-custom-hooks#extracting-your-own-custom-hook-from-a-component)