---
sidebar_position: 3
---

# Set up Indexing

## Start Indexing Your Data

The Algolia B2C cartridge provides six Salesforce B2C Commerce jobs to build, synchronize, and clear product, category, and content indices:

- **Product Indices**:
  - `AlgoliaProductIndex_v2`
  - `AlgoliaProductDeltaIndex_v2`
  - `AlgoliaProductPriceIndex_v2`
  - `AlgoliaProductInventoryIndex_v2`

- **Category Indices**:
  - `AlgoliaCategoryIndex_v2`

- **Content Indices**:
  - `AlgoliaContentIndex_v2`

## Initial Indexing

To begin indexing your product data to Algolia for the first time, follow these steps:

1. **Navigate to Jobs**:
   - Go to **Administration > Operations > Jobs**.

2. **Run Product Index Job**:
   - Select `AlgoliaProductIndex_v2`.
   - Go to the **Job Steps** section.
   - Set the execution scope to the desired site.
   - Run the job.

3. **Run Category Index Job**:
   - Select `AlgoliaCategoryIndex_v2`.
   - Set the execution scope to the desired site.
   - Run the job.

4. **Verify Indices**:
   - After both jobs finish, check the new indices in the Algolia dashboard.

> **Note**: The initial run may take a while depending on the data size. Subsequent runs will be faster as they only send changed data.

## Product Indexing

The `int_algolia` cartridge ensures your site’s data remains synchronized with Algolia.

### Overview of the Indexing Jobs

- **AlgoliaProductIndex_v2**: Performs a full catalog update.
- **AlgoliaProductDeltaIndex_v2**: Performs delta updates on your Algolia product records using the B2C Delta Export feature.
- **AlgoliaProductPriceIndex_v2**: Updates price information for all your Algolia products.
- **AlgoliaProductInventoryIndex_v2**: Updates inventory information for all your Algolia products.
- **AlgoliaCategoryIndex_v2**: Updates your category indices

### Ongoing Indexing

The jobs can be scheduled according to requirements. It is recommended to use the `AlgoliaProductDeltaIndex_v2` for ongoing indexing as it only pushes a delta. `AlgoliaProductPriceIndex_v2` and `AlgoliaProductInventoryIndex_v2` support the delta feed with updated price and inventory data.

## Content Indexing

With the Algolia cartridge for Salesforce B2C Commerce, you can index various types of content, including content assets and Page Designer components.

The job that drives content indexing is `AlgoliaContentIndex_v2`.

For more information on Content Indexing, see the [official docs](https://www.algolia.com/doc/integration/salesforce-commerce-cloud-b2c/indexing/content-indexing/fundamentals/?client=javascript)