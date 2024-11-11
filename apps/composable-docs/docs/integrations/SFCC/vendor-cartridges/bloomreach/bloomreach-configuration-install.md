---
sidebar_position: 3
title: Bloomreach Business Manager Configurations
---

## Bloomreach Integration Guide Configurations

### 1. Import Metadata

1. Go to **Administration > Site Development > Site Import & Export**.
2. Upload the `bloomreach.zip` file from the metadata folder.
3. Select `bloomreach.zip`, click the Import button, and complete the import process.

### 2. Service Configuration

1. Configure the Bloomreach API credentials in the SFCC Business Manager under **Administration > Operations > Services**.
   - **Production**: `https://api.connect.bloomreach.com/dataconnect/api/v1/`
   - **Staging**: `https://api-staging.connect.bloomreach.com/dataconnect/api/v1/`

### 3. Custom Site Preferences

1. After the metadata import, go to **Merchant Tools > Site Preferences > Custom Preferences**.
2. Select Bloomreach and fill in the required fields:
   - **Bloomreach Account ID**: Contact Bloomreach support to obtain your Account ID.
   - **Bloomreach Authentication Key**: Contact Bloomreach support to obtain your Authentication Key.
   - **Bloomreach Domain Key**: Contact Bloomreach support to obtain your Domain Key.
   - **Bloomreach Content Domain Key**: Contact Bloomreach support to obtain your Content Domain Key.
   - **Bloomreach API Key**: Contact Bloomreach support to obtain your API Key.
   - **Create multi-locale feed**: Toggle on/off to create product and content feeds for multi-locale sites.
   - **Create multi-currency feed**: Select the type of product feed for multi-currency sites. Options are:
     - Disable: Default currency for the current site.
     - Price as attribute: Creates price properties with currency suffix (e.g., price_usd, price_eur).
     - Price as View: Creates a View object with the currency code as the view ID and price value.

### 4. Configure Product and Content Fields

1. Customize the product and content fields in JSON format as needed for your site. Examples:

   - **Product Fields**:
     ```json
     {
       "title": "title",
       "category_paths": "categories",
       "price": "price",
       "description": "description",
       "url": "url",
       "availability": "availabilityModel.inStock",
       "brand": "brand",
       "thumb_image": "thumb_image",
       "color": "color",
       "size": "size"
     }
     ```

   - **Content Fields**:
     ```json
     {
       "title": "name",
       "description": "custom.body.source",
       "url": "url"
     }
     ```

2. Add simple SFCC product properties to the configuration that do not require preprocessing. For properties requiring pre- or post-processing, add a handler function to the `aggregatedValueHandlers` variable in `int_bloomreach/cartridge/scripts/bloomreach/models/productAttributes.js`. Examples of handlers:
   - `categories`: Get product category tree in Bloomreach format.
   - `color`: Get product color property for variation products.
   - `size`: Get product size property for variation products.
   - `price`: Get product price value.
   - `url`: Get product storefront URL.
   - `thumb_image`: Get product large image URL.
   - `title`: Get product name in lower case.
   - `description`: Get product description in lower case.

### 5. Set Up Certificates

1. Upload your Bloomreach certificate to **Administration > Operations > Private Keys and Certificates**.
2. Ensure the alias name is set to `bloomreach`.

### 6. Jobs Configuration

1. Go to **Administration > Operations > Jobs**.
2. Configure and run the following jobs: