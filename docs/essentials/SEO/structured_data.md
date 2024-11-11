---
sidebar_position: 3
---

# Structured Data

## Overview

The Storefront implements [Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) on each page. This further informs search engines about the contents of each page.
This is achieved by adding markup to each page that follows a set of guidelines, defined on [schema.org](https://schema.org). It is important to note that Google [recommends following their own recommendations](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data#structured-data-vocabulary-and-format), and not the ones from [schema.org](https://schema.org).

[JSON-LD](https://json-ld.org/) is the recommended format for Structured Data markup.

## Structured Data in the Storefront

Structured Data in the Storefront is maintained in `modules/general/components/seo.tsx`. This file contains implementations for the following:

### Organization

Implemented on the homepage, the [Organization structued data](https://developers.google.com/search/docs/appearance/structured-data/organization) provides the organization's administrative details, for example, logo, address, contact information, and business identifiers.

### Product

Implemented on the Product Display Page, the [Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product) allows search results to show product information in richer ways, including displaying pricing and product snippets in search results.

:::important
Regularly review the Structured Data on Product Display Pages, as it significantly influences how your Storefront's products appear in search results. For example, If your Storefront deployment supports product reviews, ensure that the review data is included in the product's Structured Data to enhance visibility and engagement in search results.
:::

### Sitelinks search box

Implemented on the homepage, the [Sitelinks search box structured data](https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox) provides a quick way for users to search the Storefront. See the section on [Sitelinks Search Box](./sitelinks_search_box.md) for more details.

## References

- [Introduction to structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Schema Markup](https://schema.org/)
- [JSON-LD](https://json-ld.org/)
- [Product Schema](https://developers.google.com/search/docs/appearance/structured-data/product)
- [Organization Schema](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Structured data markup that Google Search supports](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
