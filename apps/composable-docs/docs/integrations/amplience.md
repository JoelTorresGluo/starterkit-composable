---
sidebar_position: 4
---

# Amplience

Amplience is a headless Content Management System (CMS) that provides features to manage pages and content within the application without writing code. For more information, see the [Amplience documentation](https://amplience.com/developers/docs/).

## Configuring the Integration

1. In the application's root folder, create or update the `.env.local` file:
    1. Log into the [Amplience Dynamic Content](https://amplience.com/login/) dashboard.
    1. Go to **Settings** > **Properties**.

      Note the **Hub name** to use in the following steps.
    1. **Optional**: Contact the Amplience's support team and request a **Fresh API** key.

    Instead of the Fresh API, you can also use the CDN version by not setting the environment variable corresponding to Fresh API. For more information, see the [the Fresh API](https://amplience.com/developers/docs/apis/content-delivery/fresh/) page. Note the **Content Type Schemas prefix** for future use. For example, if your schemas have ids like "https://composable.com/page" and "https://composable.com/blogpost", then use the prefix "https://composable.com/".
    4. Update `.env.local` file as required:

       ```shell
        NEXT_PUBLIC_AMPLIENCE_VSE={hub_name}
        AMPLIENCE_FRESH_API_KEY={fresh_api_key}  // optional
        NEXT_PUBLIC_AMPLIENCE_URI_PREFIX={content_types_schemas_prefix}
       ```

There are also a number of constants defined for the Amplience integration, including identifiers for the main navigation and footer navigation. See `src/modules/amplience/constants.ts`.

## Base Content Types

Before creating content, you must create the schemas and content types, which defines the CMS components.

Orium's Accelerator works with the following Content Types:

- Blog Author (schema: "https://composable.com/blog-author")
- Blog Image (schema: "https://composable.com/blog-image")
- Blog Post (schema: "https://composable.com/blogpost")
- Blog Text (schema: "https://composable.com/blog-text")
- Blog Video (schema: "https://composable.com/blog-video")
- Component: Article Card (schema: "https://composable.com/article-card")
- Component: Banner Full (schema: "https://composable.com/banner-full")
- Component: Banner Split (schema: "https://composable.com/banner-split")
- Component: Banner Text Only (schema: "https://composable.com/banner-text-only")
- Component: Cover Card (schema: "https://composable.com/cover-card")
- Component: Grid (schema: "https://composable.com/grid")
- Component: Text Card (schema: "https://composable.com/text-card")
- Mega Menu (schema: "https://composable.com/mega-menu")
- Mega Menu Item (schema: "https://composable.com/mega-menu-item")
- Page (schema: "https://composable.com/page")
- Product Connector (schema: "https://composable.com/product-connector")
- Product List Page (schema: "https://composable.com/plp")
- Site Config (schema: "https://composable.com/site-config")

## Data Flow

### `Site Config`

The `Site Config` content type stores key site information and configuration. For example, displaying multi-brand pickers as sibling sites, the logo in the header, and the shortcut icon, such as favicon.

When the application loads, `Site Config` is fetched based on the `key` field.

### Page

Orium's Accelerator. pages are built using the `Page` content type that contains the following types of elements:

- Blog Post
- Component: Banner Full
- Component: Banner Split
- Component: Banner Text Only
- Component: Cover Card
- Component: Grid
- Product Connector

When a browser request is made to access a page, the Orium's Accelerator uses a Next.js dynamic route, `src/pages/[[...slug]].tsx`, to request Amplience for the requested page's content based on its slug field. Note that the Amplience requests are not made for pages defined in the codebase, such as `/account`, `/category`, `/product`, `/cart`, and `/search`.

For example, when a user navigates to `/about-us`, a request to find a  page with the slug `about-us` is made to Amplience.

An exception to this rule is for the homepage, route `/`, which automatically searches using the slug value of `home`. Additionally, when Orium's Accelerator is configured with multi-brand and the `NEXT_PUBLIC_BRAND_NAME` environment variable is set, a request with the slug `{BRAND_NAME}/home` is made.

When a page is found in Amplience for the requested slug, the API returns the page's metadata and content. This can include banners, grids, and other content types. With this data, Orium's Accelerator maps the CMS elements to React components to render the page appropriately.

If no page is found for the given slug key, Orium's Accelerator redirects the user to the `Page Not Found` page.

### Header and footer Menus

Orium's Accelerator menus are built using the `Mega Menu` content type, which is composed of one or more `Mega Menu Items`.

When the application loads, a request is sent to Amplience to search for `Mega Menu` content, filtering by the `identifier` field.

For example, if the `Mega Menu` id is `mega-menu-nav`, Amplience searches for a Mega Menu with the `mega-menu-nav` value in the identifier field or `{BRAND_NAME}/mega-menu-nav` if you have multi-brand configured and the `NEXT_PUBLIC_BRAND_NAME` environment variable set.

```jsx
<MegaMenu megaMenuId="mega-menu-nav" />
```
