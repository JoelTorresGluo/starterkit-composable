---
sidebar_position: 3
title: Salesforce Catalog Ingestion
---

The Constructor.io Salesforce Cartridge synchronizes your SFCC catalog data from Salesforce (SFRA or Site Genesis) to Constructor.io. This cartridge simplifies the connection and upload of your SFCC product catalog, enabling seamless integration of all product data from SFCC into Constructor solutions. It helps your e-commerce team in real-time by identifying optimization opportunities and can be customized to suit specific requirements.

### Cartridge Installation
Refer to the guide for [installing the Constructor Connect cartridge](./constructor-setup.md).

### Last Sync Dates
The cartridge tracks the last sync job run without filters to support partial syncs. These dates are updated automatically but can be manually updated if needed.

- **Stored in UTC**: Dates include the locale to support partial syncs in different locales.

### Ingestion Strategies
Choose an ingestion strategy for products, categories, and inventory data:

- **Full (Replace)**: Replaces the entire catalog with the data sent.
- **Patch (Update)**: Updates only the items sent.
- **Patch Delta (Fail)**: Partially updates the catalog but fails if additional items are sent.
- **Patch Delta (Create)**: Partially updates and creates additional items if sent.
- **Patch Delta (Ignore)**: Partially updates and ignores additional items sent.

:::note 
Full (Replace) can only be used without filters or partial syncs. If conditions are met, it switches to Patch (Update).
:::

### Using the Cartridge
Navigate to Administration > Operations > Jobs to find three main jobs:

- **ConstructorSyncCategoryData**: Sends all category data.
- **ConstructorSyncProductData**: Sends all product data (products, variants).
- **ConstructorSyncInventoryData**: Sends all product inventory data.

Run the categories job first, then products, and finally inventory. Jobs can be run manually or scheduled periodically.

### Partial Syncs
Enable the `PartialByLastSyncDate` toggle in job steps to send only updated data since the last successful job run. For maximum performance, enable this toggle and schedule a full product sync periodically.

### Cartridge Jobs

#### ConstructorSyncCategoryData
Sends all category data, preserving hierarchy.

- Parameters:
  - `writeFiles.Locale`: Locale to fetch data from.
  - `sendDeltas.ApiKeyOverride`: Override API key.
  - `sendDeltas.FileAction`: Action for generated files (ARCHIVE, DELETE, KEEP).
  - `sendDeltas.ArchivePath`: Path for archived files.
  - `sendDeltas.ErrorPath`: Path for errors.

#### ConstructorSyncProductData
Sends all product data (simple products, product sets, master products, and variants).

- Parameters:
  - `writeFiles.PartialByLastSyncDate`: Toggles partial sync.
  - `writeFiles.SendOfflineVariants`: Sends all variants if enabled.
  - `writeFiles.IncludeMasterProductsOutOfStock`: Sends out-of-stock products if enabled.
  - `writeFiles.SearchPhrase`: Filter products by search phrase.
  - `writeFiles.CategoryId`: Filter products by category.
  - `writeFiles.Ids`: Filter products by IDs.
  - `writeFiles.WriteFolder`: Folder to write files to.
  - `sendDeltas.ApiKeyOverride`: Override API key.
  - `sendDeltas.FileAction`: Action for generated files (ARCHIVE, DELETE, KEEP).
  - `sendDeltas.ArchivePath`: Path for archived files.
  - `sendDeltas.ErrorPath`: Path for errors.
  - `sendDeltas.Section`: Index section (defaults to Products).

#### ConstructorSyncInventoryData
Sends all inventory data using the same query as the products job.

- Parameters:
  - `writeFiles.PartialByLastSyncDate`: Toggles partial sync.
  - `writeFiles.SendOfflineVariants`: Sends all variants if enabled.
  - `writeFiles.IncludeMasterProductsOutOfStock`: Sends out-of-stock products if enabled.
  - `writeFiles.SearchPhrase`: Filter products by search phrase.
  - `writeFiles.CategoryId`: Filter products by category.
  - `writeFiles.Ids`: Filter products by IDs.
  - `writeFiles.WriteFolder`: Folder to write files to.
  - `sendDeltas.ApiKeyOverride`: Override API key.
  - `sendDeltas.FileAction`: Action for generated files (ARCHIVE, DELETE, KEEP).
  - `sendDeltas.ArchivePath`: Path for archived files.
  - `sendDeltas.ErrorPath`: Path for errors.
  - `sendDeltas.Section`: Index section (defaults to Products).

### Customizing Your Catalog Data
Customize synced data using facets and metadata. Use the `constructor_connect_custom` cartridge for easier future updates.

- Transformer Files:
  - `categoryTransformer.js`
  - `customizeCategoryData.js`
  - `customizeItemFacets.js`
  - `customizeItemMetadata.js`
  - `customizeProductData.js`
  - `customizeVariationFacets.js`
  - `customizeVariationMetadata.js`
  - `inventoryTransformer.js`
  - `productTransformer.js`
  - `variationTransformer.js`

Example for adding product facets in `customizeItemFacets.js`:

```javascript
function getItemFacets(product) {
  return [
    { key: "gender", value: product.custom.gender },
  ];
}
module.exports.getItemFacets = getItemFacets;
```
For changes to take effect, re-upload the cartridge with npm run uploadCartridge.