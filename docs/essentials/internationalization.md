---
sidebar_position: 25
---

# Internationalization

## Overview

The Storefront uses libraries `react-intl` and `next-i18n-router` to provide internationalization features, and can be configured to support as many locales and currencies as needed.

`react-intl` provides the ability to display text, numbers, dates and currencies in a localized format.

`next-i18n-router` provides user locale detection by inspecting the request header *accept-language* and redirecting the user to the closest preferred language that is supported by the Storefront. The Storefront will fallback to the `defaultLocale`, as specified in `apps/storefront/i18nConfig.js`, if there is no support for the user's preferred language.

The Storefront contains internationalization realted features in module `@modules/intl`. It contains two functions used to support internationalization:
- `getCurrency(locale: string)`: Returns the mapped currency for the given locale. 
- `getServerIntl(locale: string)`: Returns the set of translations for the given locale.

## Managing Translations

Locale translations are stored in `packages/templates/general/intl`. Each Locale has its own translation file. The translation file contains a set of translations for labels used throughout the storefront. For example:

``` ts 
// packages/templates/general/intl/en-CA.json
{
...
"action.addToCart" = "Add to Bag",
...
}

```

## Setup Locales

To add or remove a new Locale on the storefront:
- Modify the `il8nConfig` to specify the desired Locales. 
  -  See Setting up the [next-i18n-router](#setting-up-next-i18n-router).
- For each Locale specified in `il8nConfig`, ensure there is a corresponding translation file in `packages/templates/general/intl`.

## How to use in Components

Internationalization features can be used in both React Server Components and React Client Components.

### Client  Components
To use internationalization features in Client Components, use the `useIntl()` hook. Use the `formatMessage` function to retreive a translated label. The Locale is detected automatically by the URL path of the Storefront.

``` tsx
'use client'

import { useIntl } from 'react-intl'

const MyComponent = () => {
  const intl = useIntl()

  return <p>{intl.formatMessage({ id: 'action.addToCart' })}</p>
}

```

### Server Components

To use internationalization features in Client Components, use function `getServerIntl`. Use the `formatMessage` function to retreive a translated label.

``` tsx
import { getServerIntl } from '@modules/intl'

const MyServerComponent = async ({
  params: { locale },
}: {
  params: { locale: Locale }
}) => {
  const intl = await getServerIntl(locale)
  const translatedLabel = intl.formatMessage({id: 'action.addToCart'})
  ...
}
```

## Configuration

### Setting up react-intl

The `react-intl` library is configured in module `@modules/intl`
- This module exports a context provider component `ServerIntlProvider`.
- `ServerIntlProvider` is then used inside the the Root Layout of the App Router (`apps/storefront/src/app/[locale]/layout.tsx`), to provide provide internationalization features to the Storefront application.

### Setting up next-i18n-router

The `next-i18n-router` configuration is managed in file `apps/storefront/i18nConfig.js`. This file specifies the Storefront's supported locales. The library is setup with the following defaults:

``` tsx
const i18nConfig = {
  locales: ['en-US', 'en-CA', 'fr-CA'],
  defaultLocale: 'en-US',
}
```

See all configuration options for fine tuning the behaviour of `next-i18n-router` [here](https://github.com/i18nexus/next-i18n-router?tab=readme-ov-file#config-options).

### Setting up locale detection

The App Router is setup with middleware that inspects the user's header for their preferred language. This is configured in `apps/storefront/src/middleware.ts`.

### Currency Setup

Supported currencies are defined in the the `INTL_CONFIG` object in `apps/storefront/src/modules/intl/utils.ts`. This maps each locale to a specific currency. 

### App Router setup

In the App Router (`src/app`), there is a top level folder `[locale]`. This is a [dynamic segment](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes) that allows the Storefront to identify the customer's current locale from the URL path.

### Managing Translations

Locale translations for labels used across the Storefront are managed in a package, `packages/templates/general/intl`. Inside this folder you can configure a specific json file for each locale to support.

### Locale Picker Component

Storefront users can switch between locales with the `LangSwitch` component in `packages/ui/src/components/LangSwitch`. This component is rendered in the Header component: `apps/storefront/src/modules/general/components/header`, and is visible on every page of the Storefront.

## References
- [Next.js App Router with react-intl (Tutorial)](https://i18nexus.com/tutorials/nextjs/react-intl)
- [App Router code example with react-intl](https://github.com/i18nexus/next-i18n-router/tree/main/examples/react-intl-example)
- [next-i18n-router configuration options](https://github.com/i18nexus/next-i18n-router?tab=readme-ov-file#config-options)
