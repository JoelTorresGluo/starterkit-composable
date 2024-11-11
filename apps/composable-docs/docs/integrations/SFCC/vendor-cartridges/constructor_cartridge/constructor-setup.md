---
sidebar_position: 2
title: Installing the Constructor Connect Cartridge
---

### Requirements
- **Source Code**: Download from [Salesforce AppExchange](https://appexchange.salesforce.com/appxListingDetail?listingId=ae2be66d-7c97-4a82-99f6-a3dd97298c8b&tab=e) Listing.
- **Support**: Contact [partners@constructor.io](mailto:partners@constructor.io) for installation assistance.

:::note
You must have an SFRA base installed
:::

### Pre-requisites
- **Backend (SFCC) Cartridge**: Requires a cartridge token from Constructor. Contact your dedicated support channel or partners@constructor.io. The constructor team is responsible for supplying this token.

### 1. Setting Up Your Environment
- Unzip the source code and create a `dw.json` file in the root directory with your credentials:
  - username: your_salesforce_username
  - password: your_salesforce_password
  - hostname: your_salesforce_hostname
  - code-version: optionally_your_salesforce_code_version

#### 1.1 Credentials
- **Backend Cartridge**: Go to Merchant Tools > Site Preferences > Custom Site Preference Groups > Constructor group. Fill in the API Key and API Token fields.

#### 1.2 Storefront Reference Architecture (SFRA)
- **Frontend Cartridge**: Update the local path to `app_storefront_base` in the `package.json` file:
  - paths:
    - base: ../storefront-reference-architecture/cartridges/app_storefront_base/

### 2. Uploading Your Cartridge
- Run the following commands to upload the source code:
  - npm install
  - npm run uploadCartridge

### 3. Cartridge Metadata Installation & Setup
- Import the cartridge metadata from `metadata/link_constructor_connect.zip` through Administration > Site Development > Site Import & Export.

### 4. Adding All Cartridges to the Path
- Update the instance's cartridge path:
  - Add cartridges in the order: `link_constructor_connect_custom`, `link_constructor_connect`, `link_constructor_frontend`.

### Troubleshooting
- **Cache Issues**: Invalidate the cache via Administration > Sites > Manage Sites > [Site Name] > Cache.
- **Code Version**: Change the active code version and revert if needed.
- **Required Hooks**: Ensure `app.template.htmlHead` is called in the `htmlHead.isml` template.

For further assistance, contact partners@constructor.io.