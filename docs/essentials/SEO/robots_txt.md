---
sidebar_position: 6
---

# robots.txt

The `robots.txt` file is a standard used by websites to communicate with web crawlers and search engines. It plays a key role in Search Engine Optimization (SEO) by providing instructions on which pages or sections of a website should or should not be crawled and indexed. The robots.txt file is placed at the root of a website and is publicly accessible.

## Configuration

The `robots.txt` file is configured in the page route `src/app/robots.ts` and is dynamically generated to ensure that crawlers always receive the most up-to-date instructions.

:::important
The `robots.ts` file uses the Route Segment Config option [``dynamic = 'force-dynamic'``](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic) to prevent caching. Do not remove this setting.
:::

### Disallow Rules
- The `/api` route is disallowed since all paths under `/api` are not intended for search engines.
- Dynamic routes like `/cart` and `/account` are **not** disallowed in `robots.txt`. Instead, these pages are configured with [`noindex`](https://developers.google.com/search/docs/crawling-indexing/block-indexing) meta tags, which provide more precise control over search engine behavior. Do not add these routes to the `robots.txt` file.




## Related Resources
- [Next.js robots.txt](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- [Useful robots.txt rules](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt#useful-robots.txt-rules).
- [Introduction to robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Block Search indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
