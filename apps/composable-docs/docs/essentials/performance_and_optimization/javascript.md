---
sidebar_position: 2
---

# Optimizing JavaScript

Next.js provides several built-in optimizations, such as code splitting, for JavaScript. This method breaks the code into smaller chunks so that only the JavaScript that is required for a particular page is loaded. Additionally, Next.js preloads the next page in the background by automatically prefetching the page.

## Lazy Loading
The lazy loading feature in Next.js helps to improve the initial loading performance of an application by decreasing the amount of JavaScript needed to render a route. With this feature, you can defer the loading time of client components and imported libraries and only include them in the client bundle when they are needed. For example, you can defer loading a modal until a user clicks to open it.

With this feature, you can defer loading of client components and imported libraries, and only include them in the client bundle when they are needed. For example, you might want to defer loading a modal until a user clicks to open it as in the following example:

```jsx
import dynamic from 'next/dynamic';

const DynamicModal = dynamic(() => import('../components/modal'), {
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return <DynamicModal />;
}
```

## Third-party Scripts
If you need to load a third-party script, you can use the [next/script](https://nextjs.org/docs/app/api-reference/components/script) component as in the following code sample:

````jsx
import Script from 'next/script';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Script src="https://example.com/script.js" />
    </>
  );
}
````

We recommended including third-party scripts only in specific pages or layouts to minimize any unnecessary impact on the performance.

### Strategy
You can customize the loading behavior of a third-party scripts in Next.js by using the following strategy properties provided by next/script:

- **`beforeInteractive`**: Loads the script before any Next.js code and any page hydration occur.
- **`afterInteractive`** (default): Loads the script early, but after some hydration on the page occurs.
- **`lazyOnload`**: Loads the script later during browser idle time.
- **`worker`**(experimental): Loads the script in a web worker.

## Related Resources

- [Lazy Loading](https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading)
- [Script Optimization](https://nextjs.org/docs/pages/building-your-application/optimizing/scripts)
