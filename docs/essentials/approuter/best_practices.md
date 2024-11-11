---
sidebar_position: 99
---

# Best Practices

### Avoid async requests in Layout files
Placing promises in a Layout file can prevent the display of a route’s [Loading fallback](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#instant-loading-states). The app may appear unresponsive during async operations within the layout, as the Layout component is fully awaited before rendering any Loading.tsx fallback UI. If the layout promises take longer to resolve than the Page.tsx RSC promises, the Loading.tsx fallback won't render at all, and the Page.tsx will render immediately once the layout resolves. To maintain a smooth experience, avoid placing long-running async operations in your layout files.

### Passing data to Client Components
When passing data from a React Server Component (RSC) to a Client Component, ensure that only the necessary data is passed down via props. For instance, if a product description is passed from the RSC but isn’t used within the Client Component, it adds unnecessary weight to the network response and degrades performance. Only pass the data that is essential for rendering the Client Component.

### Static Rendering with `generateStaticParams`
When defining [`generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params), consider configuring [\<Link\> components](https://nextjs.org/docs/app/api-reference/components/link) pointing to the given route to use [`prefetch`](https://nextjs.org/docs/app/api-reference/components/link#prefetch) (either `null` or `true`) to improve user experience of navigating between pages. 

### Configuring `prefetch` of the `<Link>` component
- Consider the prefetch setting of each `<Link>` component used on the Storefront.
    - For **Dynamically Rendered** routes:
        - The `default` behavior of `<Link>` will prefetch the Loading UI Fallback from the route's [`loading.tsx`](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming) file. This allows the browser to instantly display the Loading UI Fallback when the user navigates to the given page providing a satisfying user experience. This approach of prefetching only the Loading UI Fallback will result in a lower hosting cost compared to using `prefetch={true}`.
        - Setting `prefetch={true}` will prefetch the full page route, allowing instant navigation to the fully rendered and interactive page. While this provides an excellent user experience, this approach consumes significant cloud resources over time, especially if most or all of the `<Link>` components use this setting.
        - Setting `prefetch={false}` will disable prefetching. Clicking on a `<Link>` that has not been prefetched will result in a delay while the browser requests data for the page. The Loading UI Fallback will render once it has been streamed to the browser.
    - For **Statically Rendered** routes:
        - Both the `default` behavior, or setting `prefetch={true}`, in the `<Link>` component will result in the entire page to be prefetched, allowing instant navigation to the fully rendered and interactive page. This will consume more bandwidth than Dynamically Rendered pages using `prefetch={true}`, because Statically Rendered pages are larger in size as they contain the necessary data to render the *entire page*, while Dynamically Rendered pages only contain the data required to render their given *route*. There is currently no option to prefetch only the Loading UI Fallback of Statically Rendered pages.
        - Setting `prefetch={false}` will disable prefetching. Clicking on a `<Link>` that has not been prefetched will result in a delay while the browser requests and downloads the page's data, and then renders the full page. The user will not see any navigation events until the entire page has been received by the browser.
- Periodically review and optimize the Storefront's prefetch settings by analyzing the network activity in your browser's developer tools as you navigate through the site. This allows you to identify potential performance bottlenecks and fine-tune prefetch configurations to balance user experience with resource consumption.

### Avoid long asynchronous requests in `generateMetadata`
When navigating to a page, the asynchronous requests in [`generateMetadata`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) will block the [Loading UI Fallback](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#instant-loading-states) until they complete. This behavior is expected, as outlined in the Next.js documentation on [SEO](https://nextjs.org/docs/app/api-reference/functions/generate-metadata). The blocking only affects the first render of a given page, as subsequent requests use cached data. For potential improvements, see a discussion on Github [here](https://github.com/vercel/next.js/issues/45418#issuecomment-1914076788). Note that this only impacts Dynamically Rendered pages.



