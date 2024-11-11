---
sidebar_position: 35
---

# Data Layer

## Overview

Efficient data management is essential for delivering a fast, reliable, and scalable Storefront experience. The Storefront’s [Data Layer](#the-data-layer) enables seamless integration with key data sources, such as content management systems (CMS), commerce platforms, and payment gateways, ensuring that the Storefront can easily adapt to changing needs.

By leveraging a modern stack of tools, including [tRPC](https://trpc.io/docs/) for secure server-side API management, Next.js [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) for exposing API endpoints, and [react-query](https://tanstack.com/query/latest/docs/framework/react/overview) for efficient client-side data handling, the Storefront is equipped to manage data interactions smoothly across all touchpoints.

This approach ensures:
- **Unified Data Handling**: Consistent implementation of data fetching and mutation logic across different contexts.
- **Scalability and Flexibility**: Seamless integration with external data sources such as CMS, Commerce, and Payment APIs.
- **Agnostic Frontend**: The Storefront’s frontend can be powered by any combination of headless APIs, making it flexible enough to evolve with your business needs..
- **Enhanced Security and Reliability**: Sensitive business logic and API keys are securely managed on the server side, minimizing the exposure of sensitive data while maintaining full control over how data is accessed.
- **Improved Developer Productivity**: Full-stack type safety ensures that data is handled consistently and reliably, reducing bugs and speeding up development cycles.

## The Data Layer

The Storefront’s Data Layer acts as the backbone for managing all external data, enabling seamless integration with third-party services like CMS, commerce platforms, and payment gateways. This architecture ensures that the Storefront remains flexible, scalable, and future-proof, making it easier to adapt to evolving business requirements and data sources.

To learn how to use the Data Layer in the Storefront, see [API Client](#api-client).

### tRPC

The Storefront’s Data Layer is built on tRPC, a powerful tool that enables the creation of fully type-safe APIs. With tRPC, the Storefront ensures that all data interactions, whether fetching content from a CMS or managing customer orders, are handled securely and efficiently. The strong type safety provided by tRPC minimizes errors, improves developer productivity, and ensures that data is processed consistently across the platform.

At the core of tRPC in the Storefront is the [tRPC Router](#trpc-router), which defines the data-fetching and mutation procedures. These procedures manage interactions with external systems, including content, product, and commerce operations.

### tRPC Router

The tRPC Router is defined in `modules/server/api/root` and contains procedures for working with remote data sources. Each procedure is deployed as a Next.js Route Handler, with the integration managed in `app/api/trpc/[trpc]/route.ts`.

Some example procedures include:

Content related procedures (under `modules/server/api/routers/cms`):
- `getContentPage`
- `getProductPage`
- `getMegaMenu`

Commerce related procedures (under `modules/server/api/routers/commerce`):
- `createCart`
- `getCart`
- `getProductBySlug`


These procedures can be modified to meet evolving Storefront requirements, and new ones can be added as needed. 

The Storefront consumes these procedures via the [API Client](#api-client), making them available across all application contexts.


### Auto Retry

Each procedure in the tRPC Router is wrapped with a `withRetry` function. This function automatically retries the operation if an error occurs, helping to mitigate issues caused by vendor APIs experiencing service degradation or throttling. Auto retrying allows the Storefront to handle transient errors more gracefully and provides a smoother user experience.
- For customization options, refer to the `withRetry` function in `modules/utils/with-retry.ts`.
- See further documentation in the node-retry [README](https://github.com/tim-kos/node-retry?tab=readme-ov-file#retrytimeoutsoptions)
 
#### Session Context

A session context is created with each request from the frontend to the Data Layer, and it is managed in `modules/server/api/trpc.ts`. This session context is available to any procedure defined in the tRPC Router, ensuring consistency across data operations.

The session context is initialized with:
- The user's session object, if it exists
- Authenticated SDKs for communicating to CMS and Commerce APIs

The session context can be extended as needed. For example, you can pull additional cookies from the request object or initialize new integrations with third-party data sources.

## API Client

The Data Layer is accessed in the Storefront through an API Client. This client is used by both React Server Components and React Client Components, as well as other Storefront features that require external data, such as sitemap generation.

### Using the API Client in React Server Components

For React Server Components, a sessionless API Client is defined in `modules/trpc/server.ts`. This client is intentionally designed without relying on the request object, meaning it operates independently of user session data. By avoiding session-specific information, this API Client allows the Storefront to use [Static Rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#static-rendering-default) to improve page performance.

For example, to fetch product data in the RSC on the Product Display Page:

```ts
import { staticApi } from '@modules/trpc/server'

slug = 'example-product-slug'
locale = 'en-US'
currency = 'USD'

const product = await staticApi.commerce.getProductBySlug({
      slug,
      locale,
      currency
    })
```

:::important
The sessionless aspect of this API Client is crucial to maintain static rendering performance, as using dynamic session data will cause the Storefront to switch to [dynamic rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#switching-to-dynamic-rendering), reducing overall performance.
:::

### Using the API Client in Client Components

React Client Components use an API Client that incorporates session data for making authenticated requests to external APIs. This client is initialized in `modules/trpc/react.tsx` and allows access to all procedures defined in the [tRPC Router](#trpc-router). The API Client integrates with react-query, providing a consistent and efficient experience for fetching and mutating data in Client Components.

For example, fetching the cart in the `useCart()` hook:
``` tsx
  /**
   * Fetch Cart
   */
  const {
    data: cart,
    isLoading,
    isError,
    refetch,
  } = api.commerce.getCart.useQuery(
    {
      locale,
      currency,
    },
    {
      retry: false,
    }
  )
```