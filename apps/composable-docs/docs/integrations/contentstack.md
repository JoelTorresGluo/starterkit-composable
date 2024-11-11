---
sidebar_position: 4
---

# Contentstack

Contentstack is a headless Content Management System (CMS) that provides the ability to manage pages and content within the application without writing code.

For more information, see the [Contentstack documentation](https://www.contentstack.com/docs/).

## Configuring the Integration

1. In the application's root folder, create or update the `.env.local` file:

    1. Log into your [Contentstack](https://app.contentstack.com/) account.
    1. Select the stack that you want to connect.
    1. Go to **Settings** > **Tokens**.
    1. Create a new `Delivery Token`.
    Note the `Delivery Token` and the `Stack API Key` to use in the next step.
    1. Update the `.env.local` file with the required details as in the following example:

       ```shell
        NEXT_PUBLIC_CONTENTSTACK_API_KEY={stack_api_key}
        NEXT_PUBLIC_CONTENTSTACK_ACCESS_TOKEN={delivery_token}
        NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT={environment}
        # only needed if using a branch other than 'main'
        NEXT_PUBLIC_CONTENTSTACK_BRANCH={branch}
       ```

A number of constants, including identifiers for the main navigation and footer navigation,  are defined for the Contentstack integration. For more information, see the `packages/contentstack/src/constants.ts` file.

## Base Content Types

Before creating content, you must create the content models, which define the CMS components.

The base Orium's Accelerator application works with the following content models:

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

## Data Flow

### Settings - Site

The `Settings - Site` content type stores key site information and configuration. For example, displaying multi-brand pickers as sibling sites, the logo in the header, and the shortcut icon, such as favicon.

When the application loads, `Settings - Site` is fetched based on the `key` field. Set environment `NEXT_PUBLIC_BRAND_NAME` to match the `key` of the record in the CMS.


### Content Pages

Content Pages setup with the content model `Page - Content` can display the following content:

- Content - Article Card
- Content - Banner Full
- Content - Banner Split
- Content - Banner Text Only
- Content - Cover Card
- Content - Grid
- Content - Text Card
- Content - Rich Text
- Content - Product Connector

When a browser request is made to access a page, the Orium's Accelerator uses a Next.js dynamic route, ex `src/app/[[...slug]].tsx`, to request Contentstack for the requested page's content based on its slug field.

For example, when a user navigates to `/about-us`, a request to find a page with the slug `about-us` is made to Contentstack.

An exception to this rule is for the homepage, route `/`, which automatically searches using the slug value of `homepage`. Additionally, when Orium's Accelerator is configured with multi-brand and the `NEXT_PUBLIC_BRAND_NAME` environment variable is set, a request with the slug `{BRAND_NAME}/homepage` is made.

When a page is found in Contentstack for the requested slug, the API returns the page's metadata and content. This can include banners, grids, and other content types. With this data, Orium's Accelerator maps the CMS elements to React components in order to render the page appropriately.

If no page is found for the given slug key, Orium's Accelerator redirects the user to the `Page Not Found` page.

### Content on Product and Product Listing pages

Orium's Accelerator also allows placing CMS content in Product Detail pages (PDPs) and Product Listing pages (PLPs).

For example, when a user navigates to `/product/my-product`, a request to find a `Page - Product` entry with a Product slug equal to `my-product` is made to Contentful.

In a similar way, when a user navigates to `/category/my-category`, a request to find a `Page - Product Listing` entry with a Category slug equal to `my-category` is made.

The `Page - Product` and `Page - Product Listing` have two fields for content: Header Content (for components that will be placed before the main content) and Footer Content (for components that will be placed after the main content).

If a CMS page is not found for either a product or a category, only the main content will be rendered.

### Header and Footer menus

Orium's Accelerator menus are built using the `Navigation - Menu` content type, which is composed of one or more `Navigation - Menu Items`.

When the application loads, a request is sent to Contentstack to search for `Navigation - Menu` content, filtering by the `identifier` field.

For example, if the `Navigation - Menu` id is `mega-menu-nav`, Contentstack will be queried for Navigation - Menu record with the `mega-menu-nav` value in the identifier field or `{BRAND_NAME}/mega-menu-nav` if you have multi-brand configured and the `NEXT_PUBLIC_BRAND_NAME` environment variable set.

```jsx
<MegaMenu megaMenuId="mega-menu-nav" />
```

### Algolia Configuration

The `Search - Configuration` content type stores the configuration used in Algolia powered search and product listing pages (PLPs).

When a search/PLP page is requested, `Search - Configuration` is fetched based on the `key` field. The value of `key` is set using the `NEXT_PUBLIC_CMS_ALGOLIA_CONFIG_KEY` environment variable.

The `Search - Filter` content type can be used to manage filters and the `Search - Sort By Option` content type can be used to add sorting options.

## Live Preview
[Live Preview](https://www.contentstack.com/docs/content-managers/author-content/about-live-preview) allows content managers to preview content without publishing it to an environment or saving the changes made to the content. The content changes you make reflect in the preview in real-time.

### Live Preview in the accelerator
- You can preview content for different locales.
- When using live preview, it's not neccesary to reload the page after making changes to an entry in order to see the impact on the preview, as the preview will detect changes and update the view accordingly.
- To setup previews for different environments (for example, localhost and a production deployment), you will need to create a Contentstack `Enviroment` for each.
- The accelerator supports previewing the following content types:
    - `Page - Content`
    - `Page - Product`
    - `Page - Product Listing` 
    - `Navigation - Menu`
    - `Settings - Site`

#### Limitations
- Previewing individual page components, like banners and cards, is not supported. They can only be previewed if they are placed on a page.

### Configuration: Environments
1. From the Contentstack dashboard, select your Stack and go to `Settings` -> `Environments`.
1. Create or configure the environments, setting a name and the base URLs. You will need to set a base URL for each locale.
![image](/img/preview-url.png)

### Configuration: Enable Live Preview
1. Go to `Settings` -> `Live Preview`.
1. Check `Enable Live Preview`.
1. Select a Default Preview Environment. This can be changed once you are on the entry that you want to preview.

### Configuration: Create API Tokens For Live Preview
1. Go to `Settings` -> `Tokens`.
1. Select or create a new Delivery Token.
1. Scroll down to the API keys at the bottom of the page. Copy the `Preview Token` and use this value to set the `NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW_TOKEN` environment variable on the accelerator.
1. _Optional_: generate a random string and set the `CMS_PREVIEW_SECRET` environment variable to that value. This is a secret token to perform validation before enabling [Next.js Draft Mode](https://nextjs.org/docs/app/building-your-application/configuring/draft-mode). The secret token needs to be set in the URL field as the value of a query parameter called `secret` (for example: `/product/my-product?secret=my-secret`).
1. Ensure the storefront is redeployed in order for the new environment variable to take effect.

### Live Preview URL
Contentstack looks for a `URL` type field in the entry to build the preview URL:
- If there is URL field, then the preview URL will be the concatenation of the Environment's base URL and entry's URL field value. For example, if the Environment's base URL is `http://localhost:3001` and entry's URL field value is `/product/my-product`, then the preview URL would be `http://localhost:3001/product/my-product`.
- If there is no URL field in the entry, then the preview URL will be equal to the Environment's base URL. This is the case for homepages and for the `Navigation - Menu` and `Settings - Site` content types previews.

### Using Live Preview

1. Once Live Preview is configured, when the user clicks the `Live Preview` button on a supported entry, next to the editor, Contentstack will open an iframe showing the preview for that entry type.
![image](/img/live-preview.png)
1. The accelerator detects that its running on an iframe on Contentstack's site.
1. Live Preview is initialized using Contentstack's SDK. This starts a messaging system between the accelerator (running in an iframe) and the parent window (the editor).
1. The accelerator receives a live preview session hash from Contentstack and redirects the user to the `/api/preview` API route. This route validates the value of the secret token passed on the preview URL against the `CMS_PREVIEW_SECRET` environment variable (if set), turns [Next.js Draft Mode](https://nextjs.org/docs/app/building-your-application/configuring/draft-mode) on, sets a cookie called `previewData` with the session hash, and then redirects the user back to the preview page.
1. The session hash is passed to the Contentstack client to retrieve the preview content.
1. Now the user can preview changes to the entry in real time, without having to save and publish it.

