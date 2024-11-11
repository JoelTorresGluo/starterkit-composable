---
sidebar_position: 10
---

# Storefront

The Storefront application is located in `apps/storefront`. It is a Next.js application built with TypeScript, Chakra-UI, React Query, and tRPC. The Storefront application uses the Next.js [App Router](https://nextjs.org/docs/app).

:::note
There are many references to the term *Storefront* throughout this documentation, and this term is always referring to the to the Next.js application in the `apps/storefront` folder.
:::

## Storefront Code Structure

Within `apps/storefront` there are several folders critical to the function and behaviour of the Storefront.  

| Path | Content |
| ---- | ----------- |
| `public` | Static assets, including images and fonts. |
| `src/app` | The Next.js App Router implementation for the various page routes on the Storefront. See the [Routing](approuter/routing.md) section for a detailed breakdown of each folder and route. |
| `src/modules` | Orium's Accelerator modules centralizing common components and functionality. For more information, see the [Modules](./modules.md) section. |
| `src/middleware.ts` | Provides internationalization support on the Storefront, ensuring customers are displayed the correct locale according to their language preference set in their browser. |
| `.eslintrc.js` | Connects to the eslint package in `/packages` to provide linting to the Storefront |
| `.prettierignore` | Configures the prettier vscode extension to ignore formatting certain files in the project |
| `i18nConfig.js` | Configures specific behavior of the `next-i18n-router` library that supports internationalization routing features. See all configuration options [here](https://github.com/i18nexus/next-i18n-router?tab=readme-ov-file#config-options). |
| `next.config.js` | The Next.js configuration file, typically used to set things like what domains to load images from, and url rewrites and redirects. See all configuration options [here](https://nextjs.org/docs/app/api-reference/next-config-js). |

