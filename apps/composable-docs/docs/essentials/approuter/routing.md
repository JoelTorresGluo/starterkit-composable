---
sidebar_position: 20
---

# Routing

This page covers the Storefront's [routing](https://nextjs.org/docs/app/building-your-application/routing) implementation using features available within the App Router.

## Top level files and folders

The `apps/storefront/src/app` folder contains the following:

- `[locale]`
  - This folder is a [Dynamic Route Segment](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes), and it contains all user facing pages on the Storefront. The `locale` parameter is used to provide localization features on each page. See [Page Routes](#page-routes) for more details on the files and folders within this Dynamic Route Segment. 
  - This folder also contains the [Root Layout](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates#root-layout-required) of the App Router. 
- `api`
  - This folder sets up [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), which are managed and handled by tRPC. By using tRPC, the backend of the Storefront is extremely scalable and maintainable, and provides full stack type safety to both React Server Components and Client Components that require external third party data sources.
- `sitemap`
  - This folder contains sitemap generation logic, see [Generating a sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts).
- `robots.ts`
    - Manages generation of the `robots.txt` file, see [Generate a Robots file](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots#generate-a-robots-file).


## Root Layout

The App Router provides a pattern to share common layout UI (like a Header and Footer components) between multiple different page routes. The top most layout file within the `app` folder is known as the [Root Layout](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates#root-layout-required). It is a **required** file that provides a top level layout *all* page routes within the App Router. The Storefront's Root Layout is `app/[locale]/layout.tsx` 

The Storefront uses the Root Layout file to initialize many features by wrapping the Storefront application with the following Context Providers:
- `TRPCReactProvider` provides tRPC features within the App Router.
- `HydrateClient` sets up [`react-query`](https://tanstack.com/query/latest/docs/framework/react/overview) for use in Client Components.
- `ServerIntlProvider` provides localization abilities to Client Components.
- `ComposableProvider` provides utility control of Menu Drawers and centralizes URL paths used by many components on the Storefront.
- `ChakraProvider` provides the Chakra theme for use on any component on the Storefront.
- `Analytics` initializes the chosen analytics engine, like GA4, and instruments user behaviour tracking of events like viewing the Cart Page, or beginning Checkout

## Understanding files and folders within `[locale]`

The Dynamic Route Segment `app/[locale]` contains:
- `(full-layout)` 
- `(no-layout)`
- `layout.tsx`


The `(full-layout)` and `(no-layout)` folders are [Route Groups](https://nextjs.org/docs/app/building-your-application/routing/colocation#route-groups).
  - Route Groups are an App Router organizational convention, and the provide a way to organize page routes into separate folders without impacting the URL path of the page.
  - Each Route Group can contain a nested `layout.tsx` file that [applies a common layout](https://nextjs.org/docs/app/building-your-application/routing/route-groups#opting-specific-segments-into-a-layout) to each Page in the Route Group.
Read below for a deep dive into each folder and its purpose.


### Route Group: `(full-layout)`
- Pages under `(full-layout)` all share a common nested Layout file `app/[locale]/(full-layout)/layout.tsx`.
  - The Layout provides a Header (containing the Main Menu, Global Search, Cart Drawer, etc) and a Footer (containing news letter subscription form, additional links that are not displayed in the Main Menu) to each page within this Route Group.
  - The contents of each page is displayed between the Header and the Footer components, for example:
  ``` tsx
  <Header /> // this comes from the nested Layout
  <PageContent /> // this comes the page that is being rendered, like the PDP app/[locale]/product/[slug]
  <Footer /> // this comes from the nested Layout
  ```
- Pages in the `(full-layout)` Route Group include:
  - `[[...slug]]`: This serves Homepage and Content pages
  - `account`: The Account Management pages for actions like address management, order history, account registration, login.
  - `cart`: The Cart Page
  - `category`: The Product Listing Page
  - `checkout`
    - `success`: This serves the user a Checkout Summary page after a successful purchase
  - `product`: The Product Display Page
  - `search`: The Search Results Page
  - `not-found.tsx`: A 404 Not Found page if the user navigates to a page that no longer exists
  
### Route Group: `(no-layout)`
- Pages under `(no-layout)` do not have a nested Layout file.
  - The Checkout is placed under this Route Group, since it does not require the full Storefront's Header and Footer. The Header and Footer are not displayed in a typical e-commerce checkout, as it can distract the user from completing a purchase.

## Page Routes

This section gives an overview of each Route defined in the Storefront's App Router in `/src/app`.

### [[...slug]]
This is a multi purpose route that serves both the Homepage and Content Pages. It is setup as a [Optional Catch-all Segment](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#optional-catch-all-segments):
- This route serves both the Homepage and Content Pages. The content on these pages is managed in the CMS, with the `Page - Content` content model.
  - ex: `/summer-sale`, or `/seasonal-favorites`
- The catch-all feature allows this page route to also handle handle nested slug routes like:
  - `/outdoors/water-sports` and `/outdoors/water-sports/gear-guide`
- This route uses [Static Rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#static-rendering-default). It is recommended to use the `prefetch` feature of the `<Link>` component when providing links to these pages.
- A `loading.tsx` UI fallback is provided but will only be used if this route is changed to use Dynamic Rendering by removing `generateStaticParams` and modifying the `modules/server/next-cache-config.ts` file.

### /account
This route contains all Account Management features available to logged in users on the Storefront.
- Profile Management
- Address Management
- Wishlist
- Payment Methods
- Order History
- Login and Reset password

These pages are dynamically rendered.

### /cart
This route serves a dedicated Cart page. This page is dynamically rendered.

### /category
This route serves the Product Listing Pages. 
- The CMS content above and below the Prodict Listing Grid is Statically Rendered.
- The Product Listing Grid is [streamed in using Suspense](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense), due to its use of [`useSearchParams`](https://nextjs.org/docs/app/api-reference/functions/use-search-params).
- This route uses [Static Rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#static-rendering-default). It is recommended to use the `prefetch` feature of the `<Link>` component when providing links to category pages.
- A `loading.tsx` UI fallback is provided but will only be used if this route is changed to use Dynamic Rendering by removing `generateStaticParams` and modifying the `modules/server/next-cache-config.ts` file.

### /checkout
This route serves the [Checkout](../checkout/intro.md). 
- Note that this route is under the `(no-layout)` route group, and it does not display the Header or Footer components.

### /checkout/success
This route serves the Checkout Success page. After a successful checkout, the customer is sent to this page displaying their order information.

### /product/[slug]/[variant]
This route serves the Product Display Page. 
- This route uses Dynamic Rendering.
- Prefetching:
  - When using environment variable `NEXT_PUBLIC_PREFETCH_PRODUCT_CARD_LINKS=default`, links on the Product Listing Page and in Product merchandising components will prefetch the Loading UI Fallback of the Product Display Page, resulting in instant navigation feedback when the user clicks on the link.
  - When using environment variable `NEXT_PUBLIC_PREFETCH_PRODUCT_CARD_LINKS=true`, links on the Product Listing Page and in Product merchandising components will prefetch entire Product Display Page, resulting in instant navigation to the page when the user clicks on the link.
  - See [Configuring prefetch of the \<Link\> component](./best_practices.md#configuring-prefetch-of-the-link-component)

### /search
This route serves the search results when customers use the search bar in the Header of the Storefront. This page displays a filterable product grid containing products related to the customer's search results.

## Prefetching Configuration
The following environment variables allow fine grained control of the prefetch setting of many, but not all, [\<Link \>](https://nextjs.org/docs/app/api-reference/components/link) components used across the Storefront. The value of these environment variables determine the [prefetch](https://nextjs.org/docs/app/api-reference/components/link#prefetch) prop passed in to each `<Link>` component.
- `NEXT_PUBLIC_PREFETCH_TOP_NAV_LINKS`: This controls the prefetching behavior of the top level navigation links in the Mega Menu and Mobile Menu.
- `NEXT_PUBLIC_PREFETCH_CHILD_NAV_LINKS`: This controls the prefetching behavior of the child navigation links in the Mega Menu and Mobile Menu.
- `NEXT_PUBLIC_PREFETCH_FOOTER_NAV_LINKS`: This controls the prefetching behavior of the links displayed in the Footer.
- `NEXT_PUBLIC_PREFETCH_PRODUCT_CARD_LINKS`: This controls the prefetching behavior of the product page links displayed on the Product Listing Grid, and product page links in the Product Slider and Product List components.

Configure these environment variables to either `default`, `true`, or `false`.
- Refer to the [Best Practices](./best_practices.md#configuring-prefetch-of-the-link-component) section for guidance on optimal prefetch settings for `<Link>` components.
- Be mindful of the impact on hosting resources when configuring prefetch. The more `<Link>` components that utilize prefetch, the higher the resource consumption as users navigate through the Storefront, increasing hosting costs.
- If left undefined, the links that rely on these environment variables will be set to `prefetch={false}`. See `getPrefetchConfig` in `modules/general/constants.ts` to modify this default fallback setting.

## References
- [App Router File Conventions](https://nextjs.org/docs/app/building-your-application/routing#file-conventions)
- [Layouts and Templates](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates)

