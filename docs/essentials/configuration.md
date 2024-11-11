---
sidebar_position: 20
---

# Environment Variables

The Storefront depends on a set of environment variables to function properly. Each integration has its own set of environment variables, which often include API keys. For local development, copy `.env.example` to `.env.local` and set the environment files as required.

For detailed information on how Next.js manages environment variables, and how `NEXT_PUBLIC_*` variables are exposed to the browser, see the [Next.js documentation on environment variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables).

## General Environment Variables

| Environment Variable | Description |
| - | - |
| [`NEXTAUTH_URL`](https://next-auth.js.org/configuration/options#nextauth_url) | The environment variable used to determine the URL of your application. You must use the canonical URL of your site for this variable. For local development, set this to `http://localhost:3001`. Be sure the port number matches the port setup in the `dev` and `start` scripts in the `app/storefront/package.json` file. |
| [`NEXTAUTH_SECRET`](https://next-auth.js.org/configuration/options#nextauth_secret) |  The environment variable used for JWT encryption when signing in. This is only requred in `production` deployments. |
| `NEXT_PUBLIC_BRAND_NAME` |  A string identifying the website's identity. You must only use capital letters. |
| [`NEXT_PUBLIC_SOCIAL_X_HANDLE`](../essentials/SEO/og_tags.md) |  If desired, a string identifying your organizations's X (Twitter) handle. For example `@acmecorp`. This will be used when sharing content on X. |
| Prefetching |  See [Prefetching Configuration](./approuter/routing.md#prefetching-configuration) for environment variables related to fine tuning the Next.js [\<Link\>](https://nextjs.org/docs/app/api-reference/components/link) component's prefetch behavior. |

## Integration Environment Variables

For information on the environment variables related to each integration, see the [Integrations](../integrations/overview) section.

## Storefront Constants.ts

The Storefront references many configuration settings that are managed in the `src/modules/general/constants.ts` file. Some settings are set by environment variables, and others are hardcoded. Use the `constants.ts` file as a cenrtal place to manage variables that are needed throughout the application.

To use a constant in Storefront code, import the constants file and then reference any of the variables exported as in the following example:

```tsx
import { BRAND_NAME } from '@modules/general'
...
<Text>{BRAND_NAME}</Text>
...
```
