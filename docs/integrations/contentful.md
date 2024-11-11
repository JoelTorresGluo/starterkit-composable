---
sidebar_position: 3
---

# Contentful

Contentful is a headless Content Management System (CMS) for managing pages and content within an application without writing code. For more information, see the [Contentful documentation](https://www.contentful.com/developers/docs/).

## Configuring the Integration

1. In the root folder of the application, create or update the `.env.local` file:

    1. Log into your [Contentful](https://be.contentful.com/login) account.
    1. Select the space that you want to connect.
    1. Go to **Settings** > **API keys**.
    1. Create a new `Content delivery token`.
    Take note of the `Content Delivery API - access token` and the `Space ID`.
    1. Update the `.env.local` file with the required data:

       ```shell
        NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN={content_delivery_api_access_token}
        NEXT_PUBLIC_CONTENTFUL_SPACE_ID={space_id}
        NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT={environment}
       ```

For more information about the constants that are defined for the Contentful integration, including identifiers for the main navigation and footer navigation, see the `packages/contentful/src/constants.ts` file.

## Base Content Types

Before creating content, you must create the content models, which define the CMS components.

The Orium's Accelerator application works with the following content models:

- Content - Article Card
- Content - Banner Full
- Content - Banner Split
- Content - Banner Text Only
- Content - Cover Card
- Content - Grid
- Content - Text Card
- Content - Rich Text
- Content - Product Connector
- Navigation - Menu
- Navigation - Menu Item
- Page - Content
- Page - Product
- Page - Product Listing
- Search - Configuration
- Search - Filter
- Search - Sort By Option
- Settings - Site 

## Working With Contentful Data

### Settings - Site

The `Settings - Site` content type stores key site information and configuration. For example, displaying multi-brand pickers as sibling sites, the logo in the header, and the shortcut icon, such as favicon.


When the application loads, `Settings - Site` is fetched based on the `key` field. Set environment `NEXT_PUBLIC_BRAND_NAME` to match the `key` of the record in the CMS.

### Content Pages

The Home Page, and other page routes that purely display content (ie non Product Pages and non Product Listing Pages), are referred to as Content Pages. Content on these pages is driven through use of the content model `Page - Content`, which is configured to display the following content types:

- Content - Article Card
- Content - Banner Full
- Content - Banner Split
- Content - Banner Text Only
- Content - Cover Card
- Content - Grid
- Content - Text Card
- Content - Rich Text
- Content - Product Connector

When a browser request is made to access a page, the Orium's Accelerator uses a Next.js dynamic route, ex `src/app/[[...slug]].tsx`, to request Contentful for the requested page's content based on its slug field.

For example, when a user navigates to `/about-us`, a request to find a page with the slug `about-us` is made to Contentful.

An exception to this rule is for the homepage, route `/`, which automatically searches using the slug value of `homepage`. Additionally, when Orium's Accelerator is configured with multi-brand and the `NEXT_PUBLIC_BRAND_NAME` environment variable is set, a request with the slug `{BRAND_NAME}/homepage` is made.

When a page is found in Contentful for the requested slug, the API returns the page's metadata and content. This can include banners, grids, and other content types. With this data, Orium's Accelerator maps the CMS elements to React components to render the page appropriately.

If no page is found for the given slug key, Orium's Accelerator redirects the user to the `Page Not Found` page.

### Content on Product and Product Listing pages

Orium's Accelerator also allows placing CMS content in Product Detail pages (PDPs) and Product Listing pages (PLPs).

For example, when a user navigates to `/product/my-product`, a request to find a `Page - Product` entry with a Product slug equal to `my-product` is made to Contentful.

In a similar way, when a user navigates to `/category/my-category`, a request to find a `Page - Product Listing` entry with a Category slug equal to `my-category` is made.

The `Page - Product` and `Page - Product Listing` have two fields for content: Header Content (for components that will be placed before the main content) and Footer Content (for components that will be placed after the main content).

If a CMS page is not found for either a product or a category, only the main content will be rendered.

### Header and Footer menus

Orium's Accelerator menus are built using the `Navigation - Menu` content type, which is composed of one or more `Navigation - Menu Item` records.

When the application loads, a request is sent to Contentful to search for `Navigation - Menu` content, filtering by the `identifier` field.

For example, if the `Navigation - Menu` id is `mega-menu-nav`, Contentful searches for a record with the `mega-menu-nav` value in the identifier field or `{BRAND_NAME}/mega-menu-nav` if you have multi-brand configured and the `NEXT_PUBLIC_BRAND_NAME` environment variable set.


```jsx
<MegaMenu megaMenuId="mega-menu-nav" />
```

## Search Configuration

The `Search - Configuration` content type stores the configuration used in Algolia powered search and product listing pages (PLPs).

When a search/PLP page is requested, `Search - Configuration` is fetched based on the `key` field. The value of `key` is set using the `NEXT_PUBLIC_CMS_ALGOLIA_CONFIG_KEY` environment variable.

The `Search - Filter` content type can be used to manage filters and the `Search - Sort By Option` content type can be used to add sorting options.

## Preview Mode

[Contentful content preview](https://www.contentful.com/developers/docs/tutorials/general/content-preview/) allows you to preview content created in a Contentful space either in a local or an online version of your app.

### Preview Mode in the accelerator
- The accelerator supports Contentful's [Live preview](https://www.contentful.com/developers/docs/tutorials/general/live-preview/) feature, which lets you preview content in the same page with the entry editor.
- You can preview content for different locales.
- When using preview mode, it's not neccesary to reload the page after making changes to an entry in order to see the impact on the preview, as the preview will detect changes and update the view accordingly.
- To setup previews for different environments (for example, localhost and a production deployment), you will need to create a [preview platform](#configuration---preview-platform) for each of the environments.
- The accelerator supports previewing the following content types:
    - `Page - Content`
    - `Page - Product`
    - `Page - Product Listing` 
    - `Navigation - Menu`
    - `Settings - Site`

#### Limitations
- The `Preview in new tab` mode is not supported, the accelerator expects to be opened on an iframe to enable Preview mode.
- Previewing individual page components, like banners and cards, is not supported. They can only be previewed if they are placed on a page.


### Configuration - Preview Platform
Follow the below steps to create a Preview Platform:
1. From the Contentful dashboard, go to `Settings` -> `Content preview`.
1. Ensure that the `Live preview` mode is selected.
1. Click on `Create preview platform`.
1. Provide a name to identify the preview platform and, optionally a description.
1. Select the content types for which you want to enable the preview. It must be within the list of supported ones, mentioned above.
![Setup preview content types](/img/ContentfulLivePreview-3.png)
1. For each content type provide a `Preview URL`. See the [Preview mode URL section](#preview-mode-url) for instructions on this topic.

### Configuration - Preview API Keys
Set the Content Preview API keys:
1. From the Contentful dashboard, go to `Settings` -> `API keys`.
1. Create a new set of API keys or see the details of an existing one.
1. Grab the `Content Preview API - access token` and use it as the value of the `NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN` environment variable of the accelerator.
1. _Optional_: generate a random string and set the `CMS_PREVIEW_SECRET` environment variable to that value. This is a secret token to perform validation before enabling [Next.js Draft Mode](https://nextjs.org/docs/app/building-your-application/configuring/draft-mode). The secret token needs to be set in the preview mode URL as the value of a query parameter called `secret` (for example: `http://localhost:3001?secret=my-secret`).
1. Ensure the storefront is redeployed in order for the new environment variables to take effect.

### Preview mode URL

#### `Page - Content`
Should be:  
`{domain-url}/{entry.fields.slug}?secret={secret}`  
For example:  
`http://localhost:3001/{entry.fields.slug}?secret=my-secret`

#### `Page - Product`
Should be:  
`{domain-url}/product/{entry.fields.slug}?secret={secret}`  
For example:  
`http://localhost:3001/product/{entry.fields.slug}?secret=my-secret`

#### `Page - Product Listing`
Should be:  
`{domain-url}/category/{entry.fields.slug}?secret={secret}`  
For example:  
`http://localhost:3001/category/{entry.fields.slug}?secret=my-secret`

#### `Navigation - Menu` and `Settings - Site`
These content type can be previewed on the homepage. To do this you can hard-code the slug value:  
`{domain-url}?secret={secret}`  
For example:  
`http://localhost:3001?secret=my-secret`

### Using Preview Mode
1. Once Preview Mode is configured, and the correct _Platform_ is selected (as the Contentful space may have multiple) when the user clicks the `Open Preview` button on a supported entry, next to the editor, Contentful will open an iframe showing the `Preview URL` set for that entry type.
![Open Preview for selected Preview Platform](/img/ContentfulLivePreview-5.png)
1. The accelerator detects that its running on an iframe on Contentful's site.
1. Live Preview is initialized using Contentful's SDK. This starts a messaging system between the accelerator (running in an iframe) and the parent window (the editor).
1. The user is redirected to the `/api/preview` API route. This route validates the value of the secret token passed on the preview URL against the `CMS_PREVIEW_SECRET` environment variable (if set), turns [Next.js Draft Mode](https://nextjs.org/docs/app/building-your-application/configuring/draft-mode) on and then redirects the user back to the preview page.
1. Now the user can preview changes to the entry in real time, without having to save and publish it.
![Preview Mode window](/img/ContentfulLivePreview-6.png)