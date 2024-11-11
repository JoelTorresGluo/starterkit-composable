---
sidebar_position: 1
---

# Introduction

## Overview

Optimizing the Storefront for search engines and social sharing is critical for ensuring visibility and engagement:
- The Storefront supports [Search Engine Optimization (SEO)](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) by adding by specific meta tags to the `<head>` element, and by rendering an `<h1>` element on each page, providing search enginges with essential context about the content on a page.
- The Storefront supports the [Open Graph protocol](https://ogp.me/), enabling shared links to be rendered with rich previews. This means, when a user shares a link to the Storefront on a social media platform, the link will be rendered with content like: an image, a title, and a description. This behavior is dependent on each social media platform's support of Open Graph. See [Open Graph Tags](./og_tags.md) to lean more.

The App Router's [`generateMetaData`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) function is used to setup the SEO and Open Graph related tags on each page.

:::important
Review the Meta tags, Open Graph, and hreflang configuration of all pages prior to launching your storefront. For example, the meta property `twitter:site` defaults to `@Composable`.
:::

## Managing SEO and Open Graph data

In the CMS, Content editors have control of the SEO and Open Graph tags on the Homepage, Content Pages, and Product Listing Pages. 

On Product Display Pages, data from the Commerce API is used to drive the related SEO and Open Graph tags, meaning this data is not configurable from the CMS.

### Homepage and Content Pages

In the CMS, the content model `Page - Content` is configured with the following fields:
- Page Title (renders as `<h1>`)
- Meta Title
- Meta Description
- Meta Keywords
- Open Graph Title
- Open Graph Description
- Open Graph Images

### Product Listing Pages

The `Page - Product Listing` content type in the CMS includes the following fields:
- Page Title (renders as `<h1>`)
- Meta Title
- Meta Description
- Meta Keywords (can only be set through the Commerce API's `category` object)
- Open Graph Title
- Open Graph Description
- Open Graph Images

### Product Display Pages

SEO and Open Graph tags on Product Display Pages are automatically populated with data from the Commerce API. 
- This is configured in the `generateMetaData` function in the Product Page route: `app/[locale]/(full-layout)/product/[slug]/[variant]/page.tsx`.

## Multilingual Support

Multilingual websites offer content in different languages, and it’s important to inform search engines about these alternate versions. This is achieved using the `hreflang` tag, which tells search engines which language version of a page to display to users based on their language preferences.

In the Storefront, the [`hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions)tags are added to each page using the [`generateMetadata`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) function of Next.js.

:::important
The Storefront has a default assumption that all pages are available in all locales. If this is not true, review the [`alternates`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#alternates) implementation to ensure search engines are provided with correct information.
:::


## References

- [Search Engine Optimization (SEO)](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [What is Open Graph and how can I use it for my website?](https://www.freecodecamp.org/news/what-is-open-graph-and-how-can-i-use-it-for-my-website/)
- [Rich Results Test](https://search.google.com/test/rich-results)


