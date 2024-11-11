---
sidebar_position: 2
---

# Algolia Cartridge Setup

## Add Cartridges to Business Manager

1. Upload algolia cartridges to B2C Commerce instance. (Recommend using [Prophet Debugger](https://marketplace.visualstudio.com/items?itemName=SqrTT.prophet) extension for VSCode)
2. Add Algolia cartridges in the Cartridge Path for the required sites
   1. Go to **Administration > Sites > Manage Sites > \{Site ID\}**
   2. Add `int_algolia` to the beginning of the cartridge path. If you want to integrate InstantSearch and Autocomplete, add `int_algolia_sfra` as well.
3. Add the business manager cartridge
   1. Go to **Administration > Sites > Manage Sites** and click on **Business Manager**
      1. Add `bm_algolia:int_algolia` to the end of the cartridge path.

## Configure Algolia Role

By default, the Algolia role will not be assigned to any users in business manager. It should be assigned to the Administrator role as well as any additional roles that are required to manage Algolia indexes.

1. Go to **Administration > Organization > Roles & Permissions**
2. Select the relevant role
3. Click the **Business Manager Modules** tab
4. Click the checkboxes next to **Algolia** and click **Update**

## Metadata

The Algolia cartridge includes the following metadata:

### Custom Objects

- **AlgoliaJobReport**: Used to store reports on single Algolia index job runs

### System Objects

- **Product**
  - Contains refinement attributes suitable for consumption by Algolia
- **Site Preferences**
  - Contains required configurations to manage the Algolia integration

### Importing Metadata

1. Navigate to **Administration > Site Development > Import & Export** and select **Upload** under the **Import & Export Files** section.
2. Upload the files located in the `metadata/algolia/meta` directory.
3. Return to **Administration > Site Development > Import & Export** and choose **Import** under the **Meta Data** section.
4. Choose the `custom-objecttype-definitions.xml` file, click **Next**, and then select **Import**.
5. Select **Import** under the **Meta Data** section again and import the `system-objecttype-extensions.xml` file.
6. Check the status section at the bottom of the page to confirm that the import was successful.

## Jobs and Services

1. Navigate to **Administration > Operations > Import & Export** and choose **Upload** under the **Import & Export Files** section.
2. Upload the `jobs.xml` and `services.xml` files from the `metadata/algolia` directory.
3. Go back to **Administration > Operations > Import & Export** and select **Import** under the **Jobs** section.
4. Choose the `jobs.xml` file, then click **Next**, **Next**, and **Import**.
5. Select **Import** under the **Services** section.
6. Choose the `services.xml` file, then click **Next**, **Next**, and **Import**.
7. Confirm the success of the imports in the status section at the bottom of the page.

## Configure Algolia Preferences

1. Go to **Merchant Tools** > **Algolia** > **Algolia**
2. Click the checkbox next to **Enable Algolia**
3. Enter the **Application ID**, **Search API Key** and **Admin API Key** from the [Algolia dashboard](https://dashboard.algolia.com/account/api-keys/).
4. Enter any additional product attributes you want to index in the **Additional Attributes** field. (ex: `long_description`, `short_description`, `brand`, `color`, `size`)

A full list of configuration options is available [here](https://www.algolia.com/doc/integration/salesforce-commerce-cloud-b2c/getting-started/custom-preferences/)