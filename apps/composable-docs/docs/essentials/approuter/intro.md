---
sidebar_position: 5
---

# Introduction

## Overview

This section introduces key App Router concepts and outlines how the Storefront implements core features of the App Router. It also explains why certain features of the App Router are not currently used in the Storefront, as some promising functionalities are still marked as experimental and are not yet production-ready.

## React Server Components

[React Server Components (RSC)](https://nextjs.org/docs/app/building-your-application/rendering/server-components) are a feature of the the App Router that provide performance improvements and a better developer experience for data fetching. They offer fine-grained caching options and allow for server-side logic, which can reduce the amount of JavaScript sent to the client.

## React Client Components

[React Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components) are components that run JavaScript in the browser. These components can be [rendered](https://nextjs.org/docs/app/building-your-application/rendering/client-components#how-are-client-components-rendered) either on the server or the client, depending on how the user navigates to a page.

## `fetch` in the App Router

The App Router provides an extended [fetch API](https://nextjs.org/docs/app/api-reference/functions/fetch) for data fetching in React Server Components. This enhanced fetch allows for fine-grained cache control with each request and automatically memoizes results across the lifecycle of a single request.

However, the extended fetch API does not support third-party libraries, such as vendor SDKs, for data fetching.

The Storefront **does not use** `fetch` for data requests. Instead, it utilizes [unstable_cache](#unstable_cache) to manage caching and to support more flexible data-fetching methods, including using vendor SDKs.

## unstable_cache

The Storefront leverages the [unstable_cache](https://nextjs.org/docs/app/api-reference/functions/unstable_cache) function to cache responses from remote data sources such as CMS and Commerce APIs. Unlike the built-in fetch, `unstable_cache` allows caching of promises, meaning any method of fetching data can be used, including fetching with vendor SDKs.

Although Vercel has marked unstable_cache as an unstable API due to potential changes in its parameters, the underlying functionality is production-ready. For more information, refer to this [video](https://youtu.be/VBlSe8tvg4U?si=YQz_esVtxofm2sxB&t=509) where unstable_cache is discussed in detail.

:::important
Be sure to understand the [Data Cache](https://nextjs.org/docs/app/building-your-application/caching#data-cache) behavior in the App Router. Data is cached across *deployments*, meaning data needs to be revalidated using either a [time-based](https://nextjs.org/docs/app/building-your-application/caching#time-based-revalidation) revalidation or an [on-demand](https://nextjs.org/docs/app/building-your-application/caching#on-demand-revalidation) revalidation. The Storefront relies on time-based revalidation.
:::

### Revalidation

Revalidation is the process of re-fetching and re-rendering of data used in React Server Components at a defined interval. This ensures the Storefront is always serving up to date information.

The Storefront achieves revalidation by defining `options.revalidate` in all uses of the [`unstable_cache`](https://nextjs.org/docs/app/api-reference/functions/unstable_cache) function. 
- See `modules/server/cache.ts` for all uses of `unstable_cache`.
- See `modules/server/next-cache-config.ts` for cache settings of each page.
- The default revalidation timing of each page is 5 minutes. This can be overridden by setting environment variable `STATIC_REVALIDATE_SECONDS`.
  - For example, `STATIC_REVALIDATE_SECONDS=120` would cause all data to revalidate after two minutes. 
- See [examples](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration#examples) of both Time-based and On-demand revalidation.

## Rendering Strategies

Understanding the available rendering strategies in the App Router is crucial for optimizing performance and user experience. The Storefront uses different strategies based on specific page requirements:

- [Static Rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#static-rendering-default)
  - This approach allows pages to be rendered ahead of time and sent to the browser immediately upon request.
- [Dynamic Rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering)
  - This approach renders pages at *request* time, which introduces latency since the server must fetch data (unless the data already exists in the [Server Data Cache](https://nextjs.org/docs/app/building-your-application/caching#data-cache)), render the page, and send it back to the browser.
- [Streaming](https://nextjs.org/docs/app/building-your-application/rendering/server-components#streaming)
  - Streaming allows the server to progressively render UI and stream it to the browser as soon as it's ready. This can enhance performance by reducing perceived load times.
- [Partial Prerednering (experimental)](https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering)
  - Partial Prerendering (PPR) is an experimental feature that enables the combination of static and dynamic rendering on the same page. The Storefront does not use PPR, as it is not yet stable for production. However, once it is, it will enable a powerful pattern where static content can be combined with dynamically rendered components under Suspense, offering flexibility in how data is fetched and displayed.
  - For example, this would allow most of a page to be statically rendered, while streaming in React Server Components (RSCs) that depend on [dynamic functions](https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-functions), such as fetching the user's cart using [`cookies()`](https://nextjs.org/docs/app/api-reference/functions/cookies). Although this feature is not yet production-ready, it would offer a more intuitive rendering pattern for developers.
- [Prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
  - Although prefetching is not a rendering strategy, it plays a significant role in the perceived performance of a Next.js site. Prefetching allows the browser to load data for a page before the user navigates to it, creating a faster browsing experience. However, this also increases bandwidth usage, as data is fetched for pages the user may never visit.
  - The Storefront’s default behavior is to disable prefetching on all `<Link>` components. This ensures efficient use of network and compute resources, avoiding unnecessary preloading of pages. Instead, a smooth user experience is maintained by using [loading fallbacks](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming), which visually indicate that a page is loading. This reduces session abandonment without the overhead caused by excessive prefetching.
  - The decision to disable prefetching by default should be re-evaluated for each Storefront deployment to balance performance and resource usage based on the specific use case.

## Server Actions

[Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) are a [React feature](https://react.dev/reference/rsc/server-actions) available in the App Router, enabling server-side logic to handle data mutations.

The Storefront does not use Server Actions as the primary method for mutating data, as they currently provide limited value until Partial Prerendering (PPR) becomes production-ready. However, to enable the CMS Live Preview feature, the Storefront relies on Server Actions.

### Potential Use Case

An ideal use case for Server Actions is to render the Cart with a React Server Component (RSC), and utilize Server Actions for cart operations such as adding or removing cart items. When a user interacts with the Cart, a Server Action would mutate the cart data, revalidate it, and stream the updated cart back to the user using Suspense.

However, implementing this pattern requires the Cart to use a dynamic function, [`cookies()`](https://nextjs.org/docs/app/api-reference/functions/cookies), which is not compatible with the Storefront's Static Rendering strategy since dynamic functions cause the page to become [Dynamically Rendered](https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering) and significantly degrades page speed performance.

### Future Outlook
Once PPR is stable, the limitation of dynamic functions forcing pages to become dynamically rendered will be resolved. With PPR the Storefront will be able to render the majority of the page statically and stream in components that rely on dynamic functions. Server Actions could then be used to manage data mutations in components like the Cart, all without sacrificing overall page speed performance.

For now, the Storefront avoids Server Actions. This approach should be reconsidered when Partial Prerendering is ready for production use.


## References
- [fetch](https://nextjs.org/docs/app/api-reference/functions/fetch)
- [Finally Master Next.js's Most Complex Feature - Caching](https://blog.webdevsimplified.com/2024-01/next-js-app-router-cache/)
- [Rendering](https://nextjs.org/docs/app/building-your-application/rendering)
- [Server Actions](https://react.dev/reference/rsc/use-server)
- [Next.js Visually Explained: Partial Pre-rendering (PPR)](https://www.youtube.com/watch?v=MTcPrTIBkpA)
