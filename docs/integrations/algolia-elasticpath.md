---
sidebar_position: 6
---

# Algolia Elastic Path Integration

## Configuring and Populating New Indexes

The Orium's Accelerator monorepository contains a preconfigured script. This script performs the following tasks:

- Creates a primary index in Algolia.
- Configures the index by specifying searchable attributes, facets, and replicas.
- Populates the index with product data.

### Prerequisites

- In the root of the `scripts/elasticpath-utils` directory, create an `.env` file and set the following variables:
```bash
# Elastic Path
EP_HOST
EP_CLIENT_ID
EP_CLIENT_SECRET

# Algolia
ALGOLIA_APP_ID
ALGOLIA_WRITE_API_KEY
ALGOLIA_BASE_INDEX
```
You can use the `.env.example` file as a template.

#### Index naming schema
The script creates and configures Algolia indexes based on the following naming convention:

`{ALGOLIA_BASE_INDEX}_{EP_TAG}_{EP_CHANNEL}_{LOCALE}`

You can configure the set of `EP_TAG`s and `EP_CHANNEL`s  in the `scripts/elasticpath-utils/src/elasticpath/config/index.ts` file, and the configuration must align with your Elastic Path catalogue rules. If you only need a single catalogue, edit the `scripts/elasticpath-utils/src/algolia.push-products.ts` file to remove this logic.

You can configure the set of `LOCALE`s in the `packages/algolia/src/utils/constants.ts` file.

### Procedure

1. Open the terminal and run the following command to install all dependencies:
    ```
    pnpm install
    ```
1. Move to the `scripts/elasticpath-utils` directory and run the script:
    ```
    cd scripts/elasticpath-utils
    pnpm algolia:push-products
    ```


## Continuous Sync Process
The integration between Algolia and Elastic Path ensures that product data remains up-to-date by continuously synchronizing changes, such as adding or removing products or updating product prices and inventory.

A connector is used to automatically update Algolia's dataset to synchronize the changes in Elastic Path with Algolia.

This integration uses [Elastic Path Integrations](https://elasticpath.dev/docs/integrations/integrations), which streams a message whenever certain event happens.

With this feature you can set up a webhook, pointing to a route that executes the code to update Algolia.

### Overview

![ElasticPath-Algolia Sync Process](/img/elasticpath-algolia-sync.png)

- An Elastic Path integration to send `PXM Catalog` events to an API route is configured.
- When a catalog is published, the API route receives the event message.
- The API route runs a script to update Algolia’s indexes using the JavaScript API client.

### Configuration

1. Log into Elastic Path Commerce Manager.
1. Go to **Store Settings** > **Webhooks** > **New Webhook**.
1. Set the URL to `{PROUDUCTION_BASE_URL}/api/integrations/algolia`.
1. Generate a random secret Key.
1. Subscribe to all `PXM Catalog` events.
1. Add the following variables to your .`env` file.
```bash
# the Secret Key from the 3º step
ELASTIC_PATH_ALGOLIA_INTEGRATION_SECRET_KEY={integration_secret_key}
# the names of the catalogs that you want the integration to be able to update (comma separated)
ELASTIC_PATH_SYNC_CATALOG_NAMES="catalog1,catalog2,..."
```

By integrating Elastic Path and configuring the API route to receive events from the PXM catalog, Algolia automatically receives updates from Elastic Path and ensures its data remains up-to-date.
