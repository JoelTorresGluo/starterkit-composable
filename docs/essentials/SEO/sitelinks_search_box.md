---
sidebar_position: 4
---

# Sitelinks Search Box

## Overview

The Sitelinks search box is a feature that allows users to search within a website directly from the Google search results.

When a website has a Sitelinks search box, it typically appears as a search box directly beneath the main search results. Users can enter a query into this search box, and the search results will be limited to pages within that specific website. This provides a convenient way for users to find information directly within a site without having to navigate to the site first.

![Sitelinks Search Box in Google](/img/sitelink-search-box-example.png)

## Sitelinks Search Box on the Storefront

Implemented on the Homepage, the Sitelinks search box structured data provides a quick way for users to search the Storefront. It is configured in `modules/general/components/seo.tsx`.

## Considerations
- This markup should only be added to the home page, not to any other pages.
- Google doesn't guarantee that a sitelinks search box will be shown in search results. Additionally, using the sitelinks search box markup doesn't make it more likely that a sitelinks search box will be shown.
- Adding this will not have an immediate effect, it may take several days after publishing a page for Google to find and crawl it.
- You can validate a correct implementation by using the [Rich Results Test](https://search.google.com/test/rich-results).

## Related Resources
- [Sitelinks Search Box on Google](https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox)
- [Google's Rich Results Test](https://search.google.com/test/rich-results)
