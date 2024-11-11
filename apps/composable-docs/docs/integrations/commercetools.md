---
sidebar_position: 2
---

# commercetools

The commercetools integration is maintained in `packages/commercetools`.
- It uses the commercetools [TypeScript SDK](https://docs.commercetools.com/sdk/typescript-sdk) to communicate to the commercetools API

For more  on available functionality and APIs, see the official [commercetools documentation](https://docs.commercetools.com/docs/composable-commerce).

## Configuring the Integration

The following steps describe how to create new API keys that the Storefront will use to communicate to the commercetools API:
1. In the application's root folder,  create or update the `.env.local` file:
    1. Log into your [commercetools Merchant Center](https://mc.commercetools.co/).
    1. Go to **Settings** > **Developer settings** > **API clients**.
    1. Create the following keys:
       - **Client**: Select the **Mobile and single-page application client** scope template, and use the following code sample to add the variables in the `.env.local` file:

       ```shell
        SERVER_COMMERCETOOLS_USER_SCOPED_CLIENT_ID={client_id}
        SERVER_COMMERCETOOLS_USER_SCOPED_CLIENT_SECRET={secret}
        NEXT_PUBLIC_COMMERCETOOLS_PROJECT_KEY={project_key}
        NEXT_PUBLIC_COMMERCETOOLS_HOST={api_url}
       ```

       - **Server (Admin)**: Select the **Admin client** scope template, and use the following code sample to add the variables in the `.env.local` file:

       ```shell
        SERVER_COMMERCETOOLS_ADMIN_CLIENT_ID={client_id}
        SERVER_COMMERCETOOLS_ADMIN_CLIENT_SECRET={secret}

When deploying the Storefront to a Cloud Provider, be sure to set the above Environment Variables with API keys generated on the commercetools production instance.

## Using the commercetools package on the Storefront

The Storefront expects an API client that satisfies the `CommerceClient` class in `packages/commerce-generic/src/client.ts`.

The commercetools package contains implements the `CommerceClient` class in `packages/commercetools/src/commerce-client.ts`. The implementaion is called `CommercetoolsCommerceClient`.

The Storefront imports `CommercetoolsCommerceClient` in `apps/storefront/src/modules/providers/commerce.ts`. This allows the Storefront to use the commercetools API for all Commerce related actions.

### `CommercetoolsCommerceClient`

The `CommercetoolsCommerceClient` class in `packages/commercetools/src/commerce-client.ts` is responsible for fulfilling all commerce data needs of the Storefront. It is a singleton class that is shared amongst multiple requests, across multiple users. This pattern reduces overhead of re-authenticating a new SDK Client upon each request to the Data Layer.

When initialized for the first time, this class will create a new authenticated commercetools SDK client:
```ts
  private constructor() {
    this.client = createSdkClient()
  }
```

:::danger
`CommercetoolsCommerceClient` is a [singleton](https://en.wikipedia.org/wiki/Singleton_pattern) used to perform operations across multiple requests and users. Do not store any customer specific data within the class, as this could leak sensitive information.
:::

### User Authentication

The `commercetools` package contains an `authOptions` object that is used by Next-Auth. This instructs Next-Auth how to handle User login operations, with the username and password flow. 

## Settings up a new commercetools sandbox

This section covers how to configure a new commerecetools sandbox using the scripts located in `scripts/commercetools-utils`.

### Prerequisites
Create the file `scripts/commercetools-utils/.env`. This file must contain the following:
```
COMMERCETOOLS_HOST=https://api.us-central1.gcp.commercetools.com
COMMERCETOOLS_AUTH_URL=https://auth.us-central1.gcp.commercetools.com
COMMERCETOOLS_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxx
COMMERCETOOLS_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
COMMERCETOOLS_PROJECT_KEY=xxxxxxxxxxxxxxxxxxx
```

These API keys must have been created with the **Admin client** scope template.

### Variable Configuration

To begin configuring the variables your project is going to need/use, navigate to `scripts/commercetools-utils/src/commercetools/config/index.ts` and locate the following to edit the variables necessary:

- Under **PROJECT SETTINGS** (const PROJECT_SETTINGS)
	- Currencies: Array; CAD, USD, etc
	- Languages: Array; en-US, fr-CA, etc
	- Countries: Array; US, CA, etc
	- Storefront search: Boolean value; leave at true. Context.
	- Orders search: Boolean value
	- Country tax rate fallback: Boolean value. Context.
	- Under **SHIPPING** (const SHIPPING)
	- Shipping zones: Where your countries from **Project Settings** are assorted into zone(s)
	- Shipping methods: Where you define your shipping tiers, rates, and descriptions; standard shipping, $0.00, delivers in 5-7 days

Once your variables are set and the index.ts file has been saved, switch over to your terminal where you are currently within your project’s working directory and cd into `scripts/commercetools-utils`. Validate with pwd if you have to.

Run `commercetools:config-project` and you’ve completed variable configuration provided the command runs without throwing any errors.

### Pushing Products

You can find a sample file to use as a starting ground in a file called `products.raw.example.json` under `/scripts/commercetools-utils/src/products`. This file contains a variety of fields at your disposal to populate product info:

-   seller: Think **Splash** or **Manifold**
-   type: Like a category. Sample file has “wine” or “accessories”
    -   Your “types” will need to be defined at `/scripts/commercetools-utils/src/commercetools/types/index.ts`
-   name
-   brand
-   price
-   description
-   images: Array containing all product images

When your file is saved and ready for import into commercetools, you may navigate back to your command line. `cd` to `scripts/commercetools-utils` and then run `pnpm commercetools:build-products`. Doing so will (upon successful completion of the job) create a `products.json` file in the same products folder.

If all looks fine and dandy with the new file, you are now ready to push it to commercetools. With `scripts/commercetools-utils` being your current working directory in the terminal, run `pnpm commercetools:push-products`. This should have pushed your new product info to the same commercetools instance whose keys you’ve populated in your environments file.

### Variable Configuration - Additional Context

#### storefrontSearch

This is used by the API to query product projections therefore it is advised to leave this value at true.

If you’ve not yet ran the config-project script, you can enable it directly from the commercetools Merchant Center by navigating to Settings → Project Settings → Storefront search and enable indexing.

#### countryTaxRateFallback

This should be left at `true` if you want to be able to use tax categories without a specified state/province (but still with a country). If you change this to `false`, you'll need tax categories for each combination of country and state/province that a customer might input at checkout. Failure to implement this successfully will result in an error for the customer when trying to set their shipping address.


### ImpEx

commercetools provides a tool called [ImpEx](https://impex.us-central1.gcp.commercetools.com/) that can be useful for updating, importing, deleting on objects in their API. 

:::note
The provided link to Impex assume your commercetools instance is hosted on the `us-central1.gcp` region of GCP. Ensure that you are logging into the correct region if your commercetools instance is hosted in a different region.
:::

