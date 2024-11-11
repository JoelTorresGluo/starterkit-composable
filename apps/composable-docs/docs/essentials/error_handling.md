---
sidebar_position: 42
---

# Error Handling

## Overview

The Storefront employs a comprehensive error handling strategy using Next.js App Router features, including error boundaries, toast notifications, and centralized logging. Error boundaries catch uncaught exceptions in both React Server and Client Components, while toast notifications provide immediate feedback for user-initiated errors like failed form submissions. Real-time form validation with React Hook Form and Zod, offline state detection, and loading indicators further enhance the user experience by preventing disruptions and managing expectations. A centralized logging mechanism ensures errors are tracked on both server and client sides, facilitating efficient troubleshooting and improving overall application reliability.

## Error Boundaries

Next.js provides [error boundaries](https://nextjs.org/docs/app/building-your-application/routing/error-handling#using-error-boundaries) to handle uncaught exceptions. Error boundaries catch errors in their child components and display a fallback UI to provide an improved user experience when an error occurs.
- These error boundaries will catch exceptions occurring in both React Server Components, and React Client Components.
- The `error` object in the error boundary is automatically sanitized of sensitive information, like the stack trace.
- To implement an error boundary, refer to the Next.js documentation [Uncaught Exception](https://nextjs.org/docs/app/building-your-application/routing/error-handling#uncaught-exceptions)

Error boundaries can be created by adding an `error.tsx` file inside a route segment:
```jsx
'use client' // Error boundaries must be Client Components
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) { 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
```

Errors will bubble up to the nearest parent error boundary. This allows for granular error handling by placing error.tsx files at different levels in the route hierarchy.

## Not Found Pages

If a user visits an invalid URL on the storefront, they will be automatically redirected to the [`not-found`](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) page.
- Use the [`notFound`](https://nextjs.org/docs/app/api-reference/functions/not-found) function to redirect users to the `not-found` page.


## Toast Notifications

The Storefront relies on [Toast](https://chakra-ui.com/docs/components/toast) notifications to report errors resulting from user actions, like adding an item to the cart.

The `useToast` hook, in `packages/ui/src/hooks/useToast.ts`, hook provides a convenient way to display a Toast notification.
- This hook includes basic configuration of the Chakra UI `useToast` hook to ensure consistent Toast reporting across the entire Storefront.
- Refer to the [Chakra UI Toast component](https://chakra-ui.com/docs/components/toast) for more information.

```tsx

import { useToast } from '@oriuminc/ui'

const MyComponent = () => {
  const toast = useToast()

  toast({
    status: 'error',
    description: 'An error occurred',
  })

  return <p>MyComponent</p>
}
```

## Form Errors

Forms on the Storefront are powered by the [React Hook Form](https://react-hook-form.com/) and input validation is handled with [Zod](https://zod.dev/). This ensures that any input that does not conform to the expected format is flagged immediately, allowing users to correct the data before submission. Leveraging these libraries, developers can create dynamic forms that provide real-time feedback, significantly enhancing user experience and preventing erroneous data submission.

## Offline State Notifications
The Storefront includes a feature to detect when users are offline and provides a notification to inform them of the offline status. This is crucial for maintaining a transparent communication channel with the user, letting them know that some functionalities may be limited until connectivity is restored. It enhances user experience by managing expectations and reducing confusion during network interruptions.

The accelerator subscribes to `online` and `offline` events to display or hide the offline banner. This code can be found in the `<OfflineBanner/>` component.


## Error Logging

Logging errors is essential for maintaining visibility into Storefront operations and quickly identifying issues. The Storefront uses a centralized logger object that can be fully customized to meet your logging requirements, such as sending errors to an external error reporting service. This centralized logger can be utilized on both the server and client sides, ensuring a consistent error reporting strategy across the Storefront.

### Using the Logger

The logger can be easily used within any part of the codebase:

```tsx

import { logger } from '@modules/general'

logger.error('Something went wrong')

```

### Server-side Errors

The Storefront relies on tRPC's [`onError`](https://trpc.io/docs/server/error-handling#handling-errors) procedure to manage server-side error reporting and logging. 

The default behavior is as follows:
- When running the storefront in a **DEVELOPMENT** environment:
  - Errors will be logged the console on the server, and the full error is sent to the browser to be reported to the user. 
  - The error data includes the stack trace.
- When running the storefront a **PRODUCTION** envioronment:
  - Errors are not logged.
  - Errors are sanitized prior to being sent to the browser.
    - The `error.message` is overridden to: *Something went wrong. Please try again later or contact support.*
    - The stack trace is excluded (this is default behaviour of tRPC) 

This behaviour is fully customizable, including the logging of errors to an external log sink service. See `apps/storefront/src/app/api/trpc/[trpc]/route.ts` and `apps/storefront/src/modules/trpc/server.ts` to begin customizing.

:::note 
The runtime environment of the storefront is determined by the **process.env.NODE_ENV** environment variable. Depending on your Cloud Provider, you may need to manually set this variable in each environment.
:::

### Client-side errors

Errors that occur in the browser, for example an error while adding an item to the cart, will trigger the App Router to render the route's `error.tsx` error page. Each `error.tsx` page renders the `<ErrorFallback />` component, ensuring consistent behavior on all `error.tsx` pages.
- `<ErrorFallback />` can be customized in `modules/general/components/error-fallback.tsx`. This component sends errors **synchronously** to a `logErrorToServer` server action, which by default will log the error message on the server. 

:::note
In Production, the `error` object passed to the `error.tsx` pages does not include the stack trace or detailed debugging information. As a result, it may have limited value for sending to an error logging service.
:::

## Loading State Indicators

The Storefront is pre-configured to show loading indicators during page transitions or when actions are taken, such as adding an item to the cart. Furthermore, to avoid duplicate requests, buttons for actions like 'Add to Bag' are set to disable automatically upon activation, until the operation is completed.

For example, a spinner on the checkout can be implemented in the following manner:

```jsx
export const Checkout = () => {
  const { isLoading } = useCart()

 return (
   isLoading ?
       <Spinner /> :
       <Box>{/*...render the checkout*/}</Box>
 )
}
```

## Related Resources
- [Error Handling in Next.js](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Error Handling in tRPC](https://trpc.io/docs/server/error-handling)
