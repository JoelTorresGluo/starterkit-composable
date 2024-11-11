---
sidebar_position: 15
---

# Code Modules

## Overview

The Storefront has feature specific code isolated into *modules* for use throught the Storefront application. These modules exist under the `apps/storefront/src/modules` directory. Each module contains code relating to a specific feature or set of features on the Next.js Storefront. 

| Module | Description |
| - | - |
| `@modules/account`  | All user account related components and pages, such as `forgot password` page. |
| `@modules/cart`  | All cart related components, such as cart drawer and cart page, and pages. |
| `@modules/chakra` | Chakra theme provider, connecting the Storefront theme to the `@oriuminc/chakra` package |
| `@modules/checkout`  | Code used to initialize and drive Checkout Experiences |
| `@modules/commerce` | Product and Cart components |
| `@modules/content` | CMS driven UI components like Menus, Banners, Product Carousels, etc |
| `@modules/general` | Top level components like Header, Footer, and Global Search |
| `@modules/intl` | Internationalization and currency configuration |
| `@modules/navigation` | Navigation components relating to Account Management features |
| `@modules/product` | Product Listing Page UI components |
| `@modules/providers` | Configures the Storefront to use a specific CMS and Commerce integration |
| `@modules/server` | Next.js API backend procedures that provide data fetching and data mutating endpoints used by the frontend. Also contains a configuration file for managing [Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config) settings for each page. |
| `@modules/stripe` | Stripe related functions for using Stripe Addresses iframe on the Storefront   |
| `@modules/trpc` | tRPC and react-query setup |
| `@modules/utils` | Data fetching utility functions |

## How to import a module

Modules can imported into other files in the Next.js Storefront application by using import pattern:
``` tsx
import { Component } from @modules/[module_name]
```

For example, to import the `CartDrawer` component from the `src/modules/cart` directory, the import statement is:
``` tsx
import { CartDrawer } from '@modules/cart'
```

:::note
The `@modules/` import path is configured in the Storefront's TypeScript configuration file `apps/storefront/tsconfig.json`. Also please be aware that code located in the `apps/storefront/src/modules` can only be imported into other files that exist under the `apps/storefront` directory, as Modules are intended to serve the Next.js application's needs only. If you need code that can be accessed by the entire monorepo, move it into a package under the `packages` folder. Then, you can use that code in the Storefront application, as well as in other places within the monorepo.
:::
