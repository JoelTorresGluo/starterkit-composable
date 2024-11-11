---
sidebar_position: 14
---

# Bloomreach - Discovery BigCommerce Integration

This documents the process of integrating Bloomreach Discovery with BigCommerce.

## Process Overview

1. **[Initial Product Migration](#initial-product-migration):** The first step involves migrating an example product to BigCommerce, followed by migration of products from BigCommerce to Bloomreach.
2. **[Continuous Synchronization Process:](#continuous-synchronization-process)** The second step is implementing a continuous synchronization process to ensure product data remains up-to-date in both systems.


## Initial Product Migration
Orium's Accelerator monorepository includes a predefined script. You can find it in the `scripts/bigcommerce-utils` directory. This script is designed for the configuration and population of data that is retrieved from BigCommerce. Here are the tasks it can carry out:

- [Initial configuration of BigCommerce (Optional)](#initial-configuration-of-bigcommerce-optional)
- [Initial push of products to BigCommerce (from products.raw.example.json)](#initial-push-of-products-to-bigcommerce-from-productsrawexamplejson)
- [Transfer the initial set of products from BigCommerce to Bloomreach Discovery](#transfer-the-initial-set-of-products-from-bigcommerce-to-bloomreach-discovery)

> **Important**: After the installation, you'll need to set up a few things on [Bloomreach Portal](https://tools.bloomreach.com/navapp):
> - Configure the store catalog by setting up the searchable attributes and facets.
> - Adjust any facet of type 'slider' in the app to be of type 'bucket'.
> - Activate 'Auto index' because we cannot execute auto-indexing every time we synchronize the product information.


## Prerequisites

Create a `.env` file at the root of the `scripts/bigcommerce-utils` directory, and set the following environment variables:
```shell
   # BIGCOMMERCE
   BIGCOMMERCE_STORE_API_TOKEN=
   BIGCOMMERCE_STORE_API_URL=
   BIGCOMMERCE_MANIFOLD_STORE_NAME=MANIFOLD
   BIGCOMMERCE_SPLASH_STORE_NAME=SPLASH
   
   # BLOOMREACH
   BLOOMREACH_HOST=https://api.connect.bloomreach.com
   BLOOMREACH_MANIFOLD_ACCOUNT_ID='xxx'
   BLOOMREACH_MANIFOLD_CATALOG_NAME_EN='xxx'
   BLOOMREACH_MANIFOLD_CATALOG_NAME_FR='xxx'
   BLOOMREACH_MANIFOLD_API_KEY='xxx'
   BLOOMREACH_SPLASH_ACCOUNT_ID='xxx'
   BLOOMREACH_SPLASH_CATALOG_NAME_EN='xxx'
   BLOOMREACH_SPLASH_CATALOG_NAME_FR='xxx'
   BLOOMREACH_SPLASH_API_KEY='xxx'
   
```

Use the `.env.example` file as a reference template.

> NOTE: In this example, we are working with two different stores (BLOOMREACH_MANIFOLD_ACCOUNT_ID, BLOOMREACH_SPLASH_ACCOUNT_ID) and two different languages (e.g., BLOOMREACH_MANIFOLD_CATALOG_NAME_EN, BLOOMREACH_SPLASH_CATALOG_NAME_EN).


### Installation and Setup

This document provides steps for setting up and configuring your project. It contains instructions for initializing your BigCommerce project, pushing products to BigCommerce, and transferring products from BigCommerce to Bloomreach Discovery.

#### Initial configuration of BigCommerce (Optional)
This section demonstrates how to push all the initial configurations for the BigCommerce project with a script.
>NOTE: Most of the initial configurations are located in the `/src/bigcommerce/config/index.ts` file.

Steps:

1. Run the `bigcommerce:initialize-store` command to generate the initial configuration for the BigCommerce project.
```
pnpm bigcommerce:initialize-store
```

#### Initial push of products to BigCommerce (from products.raw.example.json)
This section guides on pushing a set of products from the `products.raw.example.json` file to BigCommerce.

Steps:

1. Rename the `products.raw.example.json` file located at `src/products/products.raw.example.json`  to `products.raw.json`.

2. Run the `bigcommerce:build-products` command to generate another JSON file, `src/products/products.json`.
```
pnpm bigcommerce:build-products
```

3. Run the `bigcommerce:push-products` command. This command will execute the product push to BigCommerce.
```
pnpm bigcommerce:push-products
```

#### Transfer the initial set of products from BigCommerce to Bloomreach Discovery
This section contains instructions to push products to an existing catalog in Bloomreach. This implementation supports two stores and two languages (en-US and fr-CA) for each store. After pushing products to a catalog, an index update is requested.

Steps:

1. Run the `bloomreach:push-products` command to upload the product catalog to Bloomreach.
```
pnpm bloomreach:push-products
```

#### Add a new store
This section provides the steps to add a new store to the configuration.

>NOTE: Before proceeding with the next steps, a new Bloomreach account must be created, along with one catalog per language.

Steps:

1. Configure the env vars for the new store, add the information in the initial product load process (`scripts/bigcommerce-utils`) and in the synchronization process (`scripts/bigcommerce-bloomreach-sync-gcf`)
```shell
   BIGCOMMERCE_NEWSTORE_STORE_NAME=NEWSTORE
   BLOOMREACH_NEWSTORE_ACCOUNT_ID='xxx'
   BLOOMREACH_NEWSTORE_CATALOG_NAME_EN='xxx'
   BLOOMREACH_NEWSTORE_CATALOG_NAME_FR='xxx'
   BLOOMREACH_NEWSTORE_API_KEY='xxx'
```
>Note: It is important to set the variable BIGCOMMERCE_NEWSTORE_STORE_NAME with the exact name provided by BigCommerce.

2. **For the initial product load process**, go to file `scripts/bigcommerce-utils/bloomreach/index.ts`
 - Add the new vars as constants.
 - In the `getBloomreachConfiguration` function add a new case in the switch statement and set the configuration for the new store:
 ```shell
   case BIGCOMMERCE_NEWSTORE_STORE_NAME:
      accountId = BLOOMREACH_NEWSTORE_ACCOUNT_ID
      apiKey = BLOOMREACH_NEWSTORE_API_KEY
      catalogs.set('en', BLOOMREACH_NEWSTORE_CATALOG_NAME_EN)
      catalogs.set('fr', BLOOMREACH_NEWSTORE_CATALOG_NAME_FR)
      break
 ```

 3. **For the synchronization process**, go to file `scripts/bigcommerce-bloomreach-sync-gcf/src/bloomreach/config/index.ts`
  - Add the new vars as constants.
   - In the `getBloomreachConfiguration` function add a new case in the switch statement and set the configuration for the new store:
   ```shell
     case COMMERCETOOLS_NEWSTORE_STORE_NAME:
        accountId = BLOOMREACH_NEWSTORE_ACCOUNT_ID
        apiKey = BLOOMREACH_NEWSTORE_API_KEY
        catalogs.set('en', BLOOMREACH_NEWSTORE_CATALOG_NAME_EN)
        catalogs.set('fr', BLOOMREACH_NEWSTORE_CATALOG_NAME_FR)
        break
   ```

#### Add a new language
This section provides the steps to add a new language to the configuration.

>NOTE: Before proceeding with the next steps, a new catalog must be created for each account in Bloomreach.

Steps:

1. Add the new catalogs to the env vars, add the information in the initial product load process (`scripts/bigcommerce-utils`) and in the synchronization process (`scripts/bigcommerce-bloomreach-sync-gcf`)
```shell
   BLOOMREACH_MANIFOLD_CATALOG_NAME_ES='xxx'
   BLOOMREACH_SPLASH_CATALOG_NAME_ES='xxx'
```

2. **For the initial product load process**, go to file `scripts/bigcommerce-utils/bloomreach/index.ts`
 - Add the new vars as constants.
 - Add the new language, country, and currency to the `LOCALES` constant:
 ```shell
   export const LOCALES = [
      { languageCode: 'en', countryLanguageCode: 'en-US', currency: 'USD' },
      { languageCode: 'fr', countryLanguageCode: 'fr-CA', currency: 'CAD' },
      { languageCode: 'es', countryLanguageCode: 'es-MX', currency: 'MXN' },
   ] as const
 ```
 - In the `getBloomreachConfiguration` function set the new catalog name for every store, the key in the map is the `languageCode` attribute defined in the `LOCALES` constant:
 ```shell
   case BIGCOMMERCE_MANIFOLD_STORE_NAME:
      accountId = BLOOMREACH_MANIFOLD_ACCOUNT_ID
      apiKey = BLOOMREACH_MANIFOLD_API_KEY
      catalogs.set('en', BLOOMREACH_MANIFOLD_CATALOG_NAME_EN)
      catalogs.set('fr', BLOOMREACH_MANIFOLD_CATALOG_NAME_FR)
      catalogs.set('es', BLOOMREACH_MANIFOLD_CATALOG_NAME_ES)
      break
   case BIGCOMMERCE_SPLASH_STORE_NAME:
      accountId = BLOOMREACH_SPLASH_ACCOUNT_ID
      apiKey = BLOOMREACH_SPLASH_API_KEY
      catalogs.set('en', BLOOMREACH_SPLASH_CATALOG_NAME_EN)
      catalogs.set('fr', BLOOMREACH_SPLASH_CATALOG_NAME_FR)
      catalogs.set('es', BLOOMREACH_SPLASH_CATALOG_NAME_ES)
      break
 ```

3. **For the synchronization process**:
 - Go to file `scripts/bigcommerce-bloomreach-sync-gcf/src/types.ts`
    - In the interface `Locale` add the new language, currency, and languageCode.
    ```shell
      export interface Locale {
          language: 'en-US' | 'fr-CA' | 'es-MX'
          currency: 'USD' | 'CAD' | 'MXN'
          languageCode: 'en' | 'fr' | 'mx'
      }
    ```
    - Add the new language configuration in the `LOCALES` constant.
    ```shell
      export const LOCALES: Locales = [
          { language: 'en-US', currency: 'USD', languageCode: 'en' },
          { language: 'fr-CA', currency: 'CAD', languageCode: 'fr' },
          { language: 'es-MX', currency: 'MXN', languageCode: 'mx' },
      ] as const
    ```
 - Go to file `scripts/bigcommerce-bloomreach-sync-gcf/src/bloomreach/config/index.ts`
    - Add the new vars as constants.
    - In the `getBloomreachConfiguration` function set the new catalog name for every store, the key in the map is the `languageCode` attribute defined in the `LOCALES` constant:
    ```shell
       case COMMERCETOOLS_MANIFOLD_STORE_NAME:
          accountId = BLOOMREACH_MANIFOLD_ACCOUNT_ID
          apiKey = BLOOMREACH_MANIFOLD_API_KEY
          catalogs.set('en', BLOOMREACH_MANIFOLD_CATALOG_NAME_EN)
          catalogs.set('fr', BLOOMREACH_MANIFOLD_CATALOG_NAME_FR)
          catalogs.set('es', BLOOMREACH_MANIFOLD_CATALOG_NAME_ES)
          break
       case COMMERCETOOLS_SPLASH_STORE_NAME:
          accountId = BLOOMREACH_SPLASH_ACCOUNT_ID
          apiKey = BLOOMREACH_SPLASH_API_KEY
          catalogs.set('en', BLOOMREACH_SPLASH_CATALOG_NAME_EN)
          catalogs.set('fr', BLOOMREACH_SPLASH_CATALOG_NAME_FR)
          catalogs.set('es', BLOOMREACH_SPLASH_CATALOG_NAME_ES)
        break
    ```
***

## Continuous Synchronization Process

The `Orium's Accelerator` monorepository includes a script found within the `scripts/bigcommerce-bloomreach-sync-gcf` directory. This script ensures continuous synchronization between Bloomreach and BigCommerce, reflecting changes such as the addition/removal of products or updates to product pricing. Furthermore, this connector keeps Bloomreach's dataset updated in real-time, reflecting the published or unpublished products in BigCommerce.

This integration leverages [BigCommerce Webhooks](https://developer.bigcommerce.com/docs/integrations/webhooks), triggering a message whenever a specific event occurs.

### Overview

![BigCommerce-Bloomreach Sync Process](/img/bigcommerce-bloomreach-sync.png)

The synchronization process involves several steps:

- The occurrence of a `product` event triggers a BigCommerce Webhook that dispatches this information to a preconfigured Google PubSub topic.
- Publishing or unpublishing a product results in an event message, which the topic receives and triggers a Google Cloud function.
- The triggered Cloud function runs a Node.js script to update the product's status in Bloomreach utilizing the [Bloomreach - API Discovery](https://documentation.bloomreach.com/discovery/reference/welcome).

## Requiremnts

Before you start, ensure:

- You have installed the gcloud command-line interface
- You create a `.env` file in the `scripts/bigcommerce-bloomreach-sync-gcf` directory with the environment variables listed below:

```shell
MODULE_FUNCTION_NAME=ctBloomreachSync
GCP_TOPIC={TOPIC_CREATED_ON_GCP}
GCP_PROJECT_ID={PROJECT_ID_ON_GCP}
GCP_CLOUD_FUNCITON_NAME={CLOUD_FUNCTION_ON_GCP}

# BIGCOMMERCE
BIGCOMMERCE_STORE_API_TOKEN=
BIGCOMMERCE_STORE_API_URL=
BIGCOMMERCE_MANIFOLD_STORE_NAME=MANIFOLD
BIGCOMMERCE_SPLASH_STORE_NAME=SPLASH

# BLOOMREACH CONFIG
BLOOMREACH_HOST=
    #STORE SPLASH
BLOOMREACH_SPLASH_API_KEY=
BLOOMREACH_SPLASH_ACCOUNT_ID=
BLOOMREACH_SPLASH_CATALOG_NAME_EN=
BLOOMREACH_SPLASH_CATALOG_NAME_FR=
    #STORE MANIFOLD
BLOOMREACH_MANIFOLD_API_KEY=
BLOOMREACH_MANIFOLD_ACCOUNT_ID=
BLOOMREACH_MANIFOLD_CATALOG_NAME_EN=
BLOOMREACH_MANIFOLD_CATALOG_NAME_FR=

```
Use the .env.example file as a reference template.

### Configuration

#### Configuring Google Cloud Platform

1. **GCP Account:** Establish or access a pre-existing service account.
2. **Enable Secret Manager on GCP:** Activate the Secrets API. For each elusive project-specific value (like `BLOOMREACH_HOST`), devise a parallel secret in your specific GCP project's Secret Manager.
3. **Create Function**: Create a new function and push the sync project to this function.
4. **Grant Function Secret Access Permission**: Assign the 'Secret Manager Secret Accessor' role to `{GCP_PROJECT_ID}@appspot.gserviceaccount.com`. This grants the Google Cloud Function the necessary permissions to utilize the secrets created earlier.


Google Secret Manager is used to store the Cloud Function's environment variables.

## Deploy on Google Cloud Platform function
To deploy your project on the Google Cloud Platform:

1. Deploy the project using the `gcp:deploy` command, which publishes the project to your designated function on GCP.
```
pnpm run gcp:deploy
```
2. If your project requires secret values, deploy it using the `gcp:deployWithSecrets` command. This command helps you release your project with necessary secret values right into the GCP function.
```
pnpm run gcp:deployWithSecrets
```

#### Configuring BigCommerce Webhook

To keep Bloomreach data updated with BigCommerce, you need to set up a Webhook in BigCommerce, make a topic available for receiving events, and then configure a cloud function to receive those events. Follow the steps below:

1. Send a POST request to create the actual webhook callback. This request is addressed to the BigCommerce API at the following endpoint: `https://api.bigcommerce.com/stores/{ID_STORE}/v3/hooks`.

- `ID_STORE`: Replace this parameter with the ID of your store.

This request must include the following headers:
- `X-Auth-Client` and `X-Auth-Token`: These headers are needed for the authorization process.
- `Content-Type: application/json`: This header indicates that the body of the request, which is sent in JSON format, should be processed as such.

A representative body of this request is illustrated below:
```
{
  "scope": "store/product/created",
  "destination": "{GCP_FUNCTION_URL}",
  "is_active": true
}
```
- `scope`: This parameter specifies the specific event that the webhook will monitor. For detailed information, please refer to the [BigCommerce Webhooks Callbacks Documentation](https://developer.bigcommerce.com/docs/webhooks/callbacks).
- `destination`: Should be replaced with the URL of the Google Cloud Platform function that should be called when the webhook fires.
- `is_active`: This boolean value simply indicates whether the webhook is currently active or not.

>Remember to replace `{GCP_PROJECT_ID}` and `{GCP_PUB_SUB_TOPIC}` with your Google Cloud Platform's project ID and Pub/Sub topic respectively.

After doing the above, Bloomreach is all set to receive automatic updates from BigCommerce and keep its data updated.
