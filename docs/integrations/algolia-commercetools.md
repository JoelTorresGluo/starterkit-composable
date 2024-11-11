---
sidebar_position: 7
---

# Algolia commercetools Integration

## Configuring and Populating New Indexes

The Orium's Accelerator monorepository contains a preconfigured script in the `scripts/commercetools-utils` directory. This script does the following:

- Pushes a set of products from a JSON file to commercetools.
- Creates a primary index in Algolia.
- Configures the index by specifying searchable attributes, facets, and replicas.
- Populates the index with product data.

### Prerequisites

- In the root of the `scripts/commercetools-utils` directory, create an `.env` file and set the following variables:
```bash
# commercetools
COMMERCETOOLS_PROJECT_KEY
COMMERCETOOLS_CLIENT_SECRET
COMMERCETOOLS_CLIENT_ID
COMMERCETOOLS_HOST
COMMERCETOOLS_AUTH_URL

# Algolia
ALGOLIA_APP_ID
ALGOLIA_WRITE_API_KEY
ALGOLIA_BASE_INDEX
```
You can use the `.env.example` file as a template.

#### Index naming schema
The script creates and configures Algolia indexes based on the following naming convention:

`{ALGOLIA_BASE_INDEX}_{BRAND}_{LOCALE}`.

You can configure the set of `LOCALE`s in the `packages/algolia/src/utils/constants.ts` file.

### Procedure

1. Add the products JSON file,`scripts/commercetools-utils/src/products/products.raw.json`.

  Ensure that it has the same fields as in the example to avoid adjusting the scripts for your file.  Note that the brands from the `seller` field are used to create different stores, channels, and product selections in commercetools.
1. Open the terminal and run the following command to install all dependencies:
    ```
    pnpm install
    ```
1. Go to the `scripts/commercetools-utils` directory and run the `commercetools:build-products` script:
   ```
   cd scripts/commercetools-utils
   pnpm commercetools:build-products
   ```
   A `scripts/commercetools-utils/src/products/products.json` file is generated.
1. To save the products to commercetools, run the `commercetools:push-products` script.
   ```
   pnpm commercetools:push-products
   ```
1. Run the `algolia:build-indexes` script:
    ```
    pnpm algolia:build-indexes
    ```
1. Run the `algolia:push-products` script:
    ```
    pnpm algolia:push-products
    ```

## Continuous Sync Process
The integration between Algolia and commercetools ensures that product data remains up-to-date by continuously synchronizing changes, such as adding or removing products or updating product prices and inventory.

A connector is used to automatically update Algolia's dataset to synchronize the changes in commercetools with Algolia.

This integration uses [commercetools subscriptions](https://docs.commercetools.com/api/projects/subscriptions), which streams a message whenever certain event happens.

This feature supports message queuing services, such as Google Pub/Sub topic, which triggers a serverless Google Cloud function that executes the code to update Algolia.

### Overview

![commercetools-Algolia Sync Process](/img/commercetools-algolia-sync.png)

- A commercetools subscription sends `product` and `product-selection` events to a configured Google PubSub topic.
- When a product is updated, the topic receives the event message and automatically triggers a Google Cloud function.
- The cloud function runs a Node.js script to update Algolia’s indexes using the JavaScript API client.

### Configuration

#### Configuring Google Cloud Platform

1. Create or obtain a service account.
1. Enable Secrets API.
1. Create a PubSub topic and assign the commercetools’s service account `subscriptions@commercetools-platform.iam.gserviceaccount.com` the `Pub/Sub Publisher` role.
1. Create a cloud function, set the trigger type to `PubSub` and select the newly created topic.

Google Secret Manager is used to store the Cloud Function's environment variables.

#### Configuring commercetools

1. Using commercetools Rest API, create a new subscription pointing to the `PubSub` topic that you created, and configure to monitor `product` and `product-selection` events as in the following example request:

```json
POST {{host}}/{{project-key}}/subscriptions
{
   "destination": {
      "type": "GoogleCloudPubSub",
      "projectId": "<project_id>",
      "topic": "<topic_id>"
   },
   "messages": [
      {
        "resourceTypeId": "product",
        "types": []
      },
      {
        "resourceTypeId": "product-selection",
        "types": []
      }
   ],
   "format": {
      "type": "Platform"
   }
}
```

After creating the subscription in commercetools, making a topic available to receive events, and configuring a Cloud Function to receive the events from a queue, Algolia is set up to automatically receive updates from commercetools and keep its data up to date.
