---
sidebar_position: 5
---

# Sitemap

## Overview

A sitemap is a file that lists the URLs and metadata of your website’s pages, serving as a guide for search engine crawlers. It helps search engines discover and understand the structure of your website, leading to better indexing and visibility in search results. By optimizing your sitemap, you can improve your site's SEO performance.

Benefits of a Sitemap:
- **Improved Indexing**: Ensures that search engine crawlers can effectively discover and index your pages, helping your content appear in search results.
- **Crawl Efficiency**: Provides a structured overview of your website’s pages, making it easier for search engines to navigate and understand the content hierarchy.
- **Enhanced SEO**: Includes metadata like the last modification date, change frequency, and priority, helping search engines assess the relevance and freshness of your content, which can positively affect page rankings.

## Sitemap Configuration

The sitemap is generated dynamically in the route `src/app/sitemap`, ensuring that search engines always work with the latest version of your sitemap.
- For detailed instructions on generating a sitemap, refer to the Next.js documentation [Generating a sitemap using code](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts).
- Product routes are split into multiple sitemap files, see [Generating multiple sitemaps](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts). This ensures the sitemap can scale and support any size of product catalog.

:::important
Each route within `src/app/sitemap` uses the Route Segment Config option [``dynamic = 'force-dynamic'``](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic) to prevent caching. Do not remove this setting.
:::

### Sitemap URL

The URL for the root `sitemap.xml` file, which is referenced by file `robots.txt`, is determined based on the environment:
- **Local Development**: `http://localhost:3001/sitemap.xml` (Note: This assumes you are using port 3001 for local development)
- **Cloud Provider Previews**:
    - Vercel: Uses the platform provided environment variable `NEXT_PUBLIC_VERCEL_URL`
    - Netlify: Uses the platform provided environment variable `NEXT_PUBLIC_NETLIFY_URL`
- **Production Deployments**: Uses a environment variable `NEXT_PUBLIC_SITEMAP_HOST`, for example https://example-storefront.com/sitemap.xml if `NEXT_PUBLIC_SITEMAP_HOST` is set to `example-storefront.com`

:::important
Production deployments must set environment variable `NEXT_PUBLIC_SITEMAP_HOST`. This should only be set for production environments. Align this environment variable with the public customer facing domain of the storefront.
:::
