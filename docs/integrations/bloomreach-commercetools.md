---
sidebar_position: 13
---


# Bloomreach - Discovery commercetools Integration

This documents the process of integrating Bloomreach Discovery with commercetools.

## Process Overview

1. **[Initial Product Migration](#initial-product-migration):** The first step involves migrating an example product to commercetools, followed by migration of products from commercetools to Bloomreach.
2. **[Continuous Synchronization Process:](#continuous-synchronization-process)** The second step is implementing a continuous synchronization process to ensure product data remains up-to-date in both systems.


## Initial Product Migration
Orium's Accelerator monorepository includes a predefined script. You can find it in the `scripts/commercetools-utils` directory. This script is designed for the configuration and population of data that is retrieved from commercetools. Here are the tasks it can carry out:

- [Initial configuration of commercetools (Optional)](#initial-configuration-of-commercetools-optional)
- [Initial push of products to commercetools (from products.raw.example.json)](#initial-push-of-products-to-commercetools-from-productsrawexamplejson)
- [Transfer the initial set of products from commercetools to Bloomreach Discovery](#transfer-the-initial-set-of-products-from-commercetools-to-bloomreach-discovery)

> **Important**: After the installation, you'll need to set up a few things on [Bloomreach Portal](https://tools.bloomreach.com/navapp):
> - Configure the store catalog by setting up the searchable attributes and facets.
> - Adjust any facet of type 'slider' in the app to be of type 'bucket'.
> - Activate 'Auto index' because we cannot execute auto-indexing every time we synchronize the product information.


## Prerequisites

Create a `.env` file at the root of the `scripts/commercetools-utils` directory, and set the following environment variables:
```shell
   # commercetools
   COMMERCETOOLS_PROJECT_KEY
   COMMERCETOOLS_CLIENT_SECRET
   COMMERCETOOLS_CLIENT_ID
   COMMERCETOOLS_HOST
   COMMERCETOOLS_AUTH_URL
   COMMERCETOOLS_MANIFOLD_STORE_NAME=MANIFOLD
   COMMERCETOOLS_SPLASH_STORE_NAME=SPLASH
   
   #BLOOMREACH
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

This document provides steps for setting up and configuring your project. It contains instructions for initializing your commercetools project, pushing products to commercetools, and transferring products from commercetools to Bloomreach Discovery.

#### Initial configuration of commercetools (Optional)
This section demonstrates how to push all the initial configurations for the commercetools project with a script.
>NOTE: Most of the initial configurations are located in the `/src/commercetools/config/index.ts` file.

Steps:

1. Run the `commercetools:config-project` command to generate the initial configuration for the commercetools project.
```
pnpm commercetools:config-project
```

#### Initial push of products to commercetools (from products.raw.example.json)
This section guides on pushing a set of products from the `products.raw.example.json` file to commercetools.

>NOTE: We are using commercetools keys with suffixes to make references for channels, product selections, and tax categories.

Steps:

1. Rename the `products.raw.example.json` file located at `src/products/products.raw.example.json`  to `products.raw.json`.

2. Run the `commercetools:build-products` command to generate another JSON file, `src/products/products.json`.
```
pnpm commercetools:build-products
```

3. Run the `commercetools:push-products` command. This command will execute the product push to commercetools.
```
pnpm commercetools:push-products
```

#### Transfer the initial set of products from commercetools to Bloomreach Discovery
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

1. Configure the env vars for the new store, add the information in the initial product load process (`scripts/commercetools-utils`) and in the synchronization process (`scripts/commercetools-bloomreach-sync-gcf`)
```shell
   COMMERCETOOLS_NEWSTORE_STORE_NAME=NEWSTORE
   BLOOMREACH_NEWSTORE_ACCOUNT_ID='xxx'
   BLOOMREACH_NEWSTORE_CATALOG_NAME_EN='xxx'
   BLOOMREACH_NEWSTORE_CATALOG_NAME_FR='xxx'
   BLOOMREACH_NEWSTORE_API_KEY='xxx'
```
>Note: It is important to set the variable COMMERCETOOLS_NEWSTORE_STORE_NAME with the exact name provided by commercetools selections.

2. **For the initial product load process**, go to file `scripts/commercetools-utils/src/bloomreach/config/index.ts`
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

 3. **For the synchronization process**, go to file `scripts/commercetools-bloomreach-sync-gcf/src/bloomreach/config/index.ts`
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

1. Add the new catalogs to the env vars, add the information in the initial product load process (`scripts/commercetools-utils`) and in the synchronization process (`scripts/commercetools-bloomreach-sync-gcf`)
```shell
   BLOOMREACH_MANIFOLD_CATALOG_NAME_ES='xxx'
   BLOOMREACH_SPLASH_CATALOG_NAME_ES='xxx'
```

2. **For the initial product load process**, go to file `scripts/commercetools-utils/src/bloomreach/config/index.ts`
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
3. **For the synchronization process**:
 - Go to file `scripts/commercetools-bloomreach-sync-gcf/src/types.ts`
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
 - Go to file `scripts/commercetools-bloomreach-sync-gcf/src/bloomreach/config/index.ts`
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

The `Orium's Accelerator` monorepository includes a script found within the `scripts/commercetools-bloomreach-sync-gcf` directory. This script ensures continuous synchronization between Bloomreach and commercetools, reflecting changes such as the addition/removal of products or updates to product pricing. Furthermore, this connector keeps Bloomreach's dataset updated in real-time, reflecting the published or unpublished products in commercetools.

This integration leverages [commercetools subscriptions](https://docs.commercetools.com/api/projects/subscriptions), triggering a message whenever a specific event occurs. Compatible with message queuing services like Google Pub/Sub Topic, this feature enables a serverless Google Cloud function to execute the necessary code for updating Bloomreach.

### Overview

![commercetools-Bloomreach Sync Process](/img/commercetools-bloomreach-sync.png)

The synchronization process involves several steps:

- The occurrence of a `product` event triggers a commercetools subscription that dispatches this information to a preconfigured Google PubSub topic.
- Publishing or unpublishing a product results in an event message, which the topic receives and triggers a Google Cloud function.
- The triggered Cloud function runs a Node.js script to update the product's status in Bloomreach utilizing the [Bloomreach - API Discovery](https://documentation.bloomreach.com/discovery/reference/welcome).

## Requirements

Before you start, ensure:

- You have installed the gcloud command-line interface
- You create a `.env` file in the `scripts/bigcommerce-bloomreach-sync-gcf` directory with the environment variables listed below:

```shell
MODULE_FUNCTION_NAME=ctBloomreachSync
GCP_TOPIC={TOPIC_CREATED_ON_GCP}
GCP_PROJECT_ID={PROJECT_ID_ON_GCP}
GCP_CLOUD_FUNCITON_NAME={CLOUD_FUNCTION_ON_GCP}

#COMMERCETOOLS
COMMERCETOOLS_HOST=
COMMERCETOOLS_AUTH_URL=
COMMERCETOOLS_CLIENT_ID=
COMMERCETOOLS_CLIENT_SECRET=
COMMERCETOOLS_PROJECT_KEY=
COMMERCETOOLS_MANIFOLD_STORE_NAME=MANIFOLD
COMMERCETOOLS_SPLASH_STORE_NAME=SPLASH

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
3. **Create a Pub/Sub Topic**: Navigate to the *Pub/Sub menu* on Google Cloud Platform and initiate a new topic.
4. **Grant Pub/Sub Permission to commercetools:** Bestow the `Pub/Sub Publisher` role upon the commercetools' service account via `subscriptions@commercetools-platform.iam.gserviceaccount.com`.
5. **Enable Function**: Activate your function within this freshly forged topic.
6. **Grant Function Secret Access Permission**: Assign the 'Secret Manager Secret Accessor' role to `{GCP_PROJECT_ID}@appspot.gserviceaccount.com`. This grants the Google Cloud Function the necessary permissions to utilize the secrets created earlier.


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

#### Configuring commercetools to send pub/sub

To keep Bloomreach data updated with commercetools, you need to set up a subscription in commercetools, make a topic available for receiving events, and then configure a cloud function to receive those events. Follow the steps below:

1. Use the commercetools Rest API to create a new subscription. This should point to the `PubSub` topic you've created and should be configured to track `product` and `product-selection` events. Here's an example request:

```json
POST {{host}}/{{project-key}}/subscriptions
{
   "key": "ct-bloomreach-key",
   "destination": {
      "type": "GoogleCloudPubSub",
      "projectId": "{GCP_PROJECT_ID}",
      "topic": "{GCP_PUB_SUB_TOPIC}"
   },
   "messages": [
      {
        "resourceTypeId": "product",
        "types": ["ProductPublished", "ProductUnpublished"]
      }
   ]
}
```

>Remember to replace `{GCP_PROJECT_ID}` and `{GCP_PUB_SUB_TOPIC}` with your Google Cloud Platform's project ID and Pub/Sub topic respectively.

After doing the above, Bloomreach is all set to receive automatic updates from commercetools and keep its data updated.
