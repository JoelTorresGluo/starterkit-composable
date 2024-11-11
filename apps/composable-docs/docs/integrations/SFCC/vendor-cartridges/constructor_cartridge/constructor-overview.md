---
sidebar_position: 1
title: Constructor Overview
---

Constructor.io provides a comprehensive REST API enabling customers to:

- Return autosuggest, search, image search, browse, and recommendation results
- Manage product catalogs (add, update, remove items)
- Configure product metadata
- Create dynamic product collections
- Define search synonyms, redirects, and blacklists
- Customize search results with searchandizing rules (boosting, burying, slotting)

Additionally, Constructor.io offers a JavaScript autosuggest client that integrates seamlessly with existing search bars, automatically rendering suggestions as users type. Proof Schedules are available as a proof of concept to help potential customers evaluate the integration before committing.

### Main Steps

### 1. Install the Beacon
The [beacon](./constructor-beacon-install.md) should be installed on all pages except those with sensitive data like account management and credit card information. Important pages include:

- Home Page (and any page with a search bar)
- Search Result Page (Search Product Listing Pages)
- Browse Result Page (Browse PLP)
- Product Detail Pages (PDP)

#### How to Load the Beacon
The recommended method is direct site placement, as tag managers can be blocked by ad blockers, impacting up to 40% of users. Install the beacon script after a DOM Ready or Window Loaded event, or at the end of the page.

##### Direct Site Placement (Recommended Method)
For best results, install the beacon directly on your site.

##### Tag Manager Options (For Proof Schedule)
- Google Tag Manager
- Tealium iQ
- Adobe Launch

### 2. Install the Cartridge
Refer to the guide for [installing the Constructor Connect cartridge](./constructor-setup.md). After installation, locate the Site Preferences under the Constructor.io preference group. Fill in the Beacon Bundle Name field with your bundle name.

### 3. Feed the Catalog Data and Integrate into the Front End
The Constructor.io Salesforce Cartridge synchronizes your SFCC catalog data from Salesforce (SFRA or Site Genesis) to Constructor.io. This cartridge simplifies the connection and upload of your SFCC product catalog, enabling seamless integration of all product data from SFCC into Constructor solutions. [See guide](./constructor-catalog-ingest.md)

- **Using the Cartridge**: Navigate to Administration > Operations > Jobs to find three main jobs:
  - **ConstructorSyncCategoryData**: Sends all category data.
  - **ConstructorSyncProductData**: Sends all product data (products, variants).
  - **ConstructorSyncInventoryData**: Sends all product inventory data.

Run the categories job first, then products, and finally inventory. Jobs can be run manually or scheduled periodically.

