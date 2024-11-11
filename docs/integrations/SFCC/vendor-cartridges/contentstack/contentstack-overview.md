---
sidebar_position: 1
---

# Contentstack Overview

Integration with Contentstack is API-based rather than a cartridge. The integration uses SCAPI to fetch catalog information inside your stack.

## Setup Details

:::note

The user performing the setup will need access to SLAS Admin

:::

On a high level, the setup of the Contentstack integration is as follows:

1. Create a B2C Commerce Client ID
2. Add client ID to SLAS Admin
3. Install and configure Salesforce Commerce app in Contentstack


## API Client Required Scopes

### Default Scopes

```
mail
roles
tenantFilter
profile
openId
```

### Allowed Scopes

```
sfcc.shopper-baskets-orders.rw
sfcc.shopper-promotions
sfcc.shopper-gift-certificates
sfcc.shopper-categories
sfcc.shopper-product-search
sfcc.shopper.stores
sfcc.shopper-customers.register
sfcc.shopper-customers.login
sfcc.shopper-myaccount.rw
sfcc.shopper-myaccount.addresses.rw
sfcc.shopper-myaccount.baskets
sfcc.shopper-myaccount.orders
sfcc.shopper-myaccount.paymentinstruments.rw
sfcc.shopper-myaccount.productlists.rw
sfcc.products.rw
sfcc.catalogs.rw
sfcc.shopper-products
sfcc.shopper-productlists
```

## Official Docs

For detailed setup guide, follow the official [Salesforce Commerce App Installation Guide](https://www.contentstack.com/docs/developers/marketplace-apps/salesforce-commerce#install-and-configure-salesforce-commerce-in-contentstack-marketplace) on Contentstack.