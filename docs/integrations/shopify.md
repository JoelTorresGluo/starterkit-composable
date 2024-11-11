# Shopify Integration Documentation

## Overview
The Shopify integration for the Storefront application is housed in `packages/shopify`. This integration allows the Storefront to leverage Shopify as the Commerce engine, using the Shopify Storefront API Client SDK to communicate with Shopify's GraphQL Storefront API. It includes:

- Support for syncing product data with Algolia.
- Utilization of Shopify's hosted Account Management and Checkout pages.
- Use of Shopify's default email notification system.

## Configuring the Integration
### Environment Variables
1. Install [Shopify Headless](https://apps.shopify.com/headless) and generate necessary API keys.
2. Create a new [Shopify Custom App](https://help.shopify.com/en/manual/apps/app-types/custom-apps) in the Shopify Dashboard and generate the necessary [API keys](https://shopify.dev/docs/apps/build/authentication-authorization/access-tokens/generate-app-access-tokens-admin).
3. Configure environment variables:
```
SHOPIFY_ADMIN_ACCESS_TOKEN=
SHOPIFY_PUBLIC_ACCESS_TOKEN=
SHOPIFY_PRIVATE_ACCESS_TOKEN=
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=
NEXT_PUBLIC_COMMERCE_PROVIDER=shopify
NEXT_PUBLIC_SHOPIFY_ACCOUNT_DASHBOARD_ID=
```
### Shopify Theme Configuration
- Set up redirects in `theme.liquid` to support Account Management and Checkout.
- Configure the theme to support the Forgot Password email reset flow.
```html
<!--- Start Shopify Redirection to Composable App --->
   <style>
      body {
         display: none;
      }
   </style>
   <script>
      const yourStoreDomain = '/YOUR_DOMAIN_HERE/';
      if (!window.location.pathname.includes("/_t/c/")) {
        window.location.assign(`https://${yourStoreDomain}`);
      }

      if (window.location.pathname.includes("/account/reset/")) {
        window.location.href = `https://${yourStoreDomain}/account/reset?t=` + window.location.href;
      }
   </script>
<!--- End Shopify Redirection to Composable App --->
```

## Using the Shopify Storefront Client SDK
- The [Shopify Storefront API Client SDK](https://shopify.dev/docs/api/storefront) is used to communicate with the Shopify GraphQL Storefront API.
- The integration supports agnostic types for commerce data, transforming queries and mutations from the Storefront before sending them to Shopify.

> **Note:** Shopify collections are the equivalent of Commercetools product categories. So we are using them to sync product categories to Algolia.

### Working with TypeScript and the Shopify Client SDK
- The integration relies on types in the `@shopify/hydrogen-react/storefront-api-types` library.
- Ensure that fields from `@shopify/hydrogen-react/storefront-api-types` are included in the GraphQL queries or mutations defined in `packages/shopify/src/services`.

## Algolia Integration
A custom cloud function is used for syncing as Shopify's marketplace app for Algolia supports only one locale and currency. 
To define locales and currencies in Shopify you have to use [Shopify Markets](https://shopify.dev/docs/apps/build/markets).

> **Note:** Changes in the Shopify Products Locales won't get trigger if the changes are too frequent, we recommend put the product on draft, modify and then publish again. If your changes are not related with locales you won't have issues.

### Setting Up GCP Cloud Run Function

1. Provide API keys for the GCP function responsible for deploying the remaining keys should be set/configured in the GCP console. 

```bash
GCP_TOPIC=
GCP_PROJECT_ID=
GCP_CLOUD_FUNCITON_NAME=
```

2. When running `pnpm run gcp:deploy`, the function will be deployed to GCP and a PubSub topic will be created.

3. Follow the [instructions](https://shopify.dev/docs/apps/build/webhooks/subscribe/get-started?framework=remix&deliveryMethod=pubSub) to set up the PubSub subscription in Google Cloud Console.

4. Create a Shopify Pub/Sub webhook using the Shopify GraphQL Admin API, by running the following mutation:

```bash
# headers
X-Shopify-Access-Token: YOUR_SHOPIFY_ADMIN_ACCESS_TOKEN
```
```graphql
mutation pubSubWebhookSubscriptionCreate(
    $topic: WebhookSubscriptionTopic!
    $webhookSubscription: PubSubWebhookSubscriptionInput!
) {
    pubSubWebhookSubscriptionCreate(
        topic: $topic
        webhookSubscription: $webhookSubscription
    ) {
        webhookSubscription {
            id
            topic
            format
            endpoint {
                __typename
                ... on WebhookPubSubEndpoint {
                    pubSubProject
                    pubSubTopic
                }
            }
        }
    }
}
```
Create the topics:
  - "PRODUCTS_DELETE", 
  - "PRODUCTS_CREATE", 
  - "PRODUCTS_UPDATE",
  - "MARKETS_CREATE",
  - "MARKETS_UPDATE",
  - "MARKETS_DELETE"

with the following payload:
```json
{
    "topic": "PRODUCTS_DELETE", // and PRODUCTS_CREATE, PRODUCTS_UPDATE
    "webhookSubscription": {
        "pubSubProject": "YOUR_GCP_PROJECT_ID",
        "pubSubTopic": "YOUR_GCP_TOPIC",
        "format": "JSON"
    }
}
```

> **Note:** You must have created the algolia indexes before running the function. Use the `scripts/shopify-utils` file to create the indexes by running `pnpm run algolia:build-indexes`.

## Session Management
### User Carts
- The integration uses the Shopify Storefront API to manage carts.
   We save the cartId in local storage and we assing the cart to the user when they login. We do the cart ownership verification on the backend, to avoid unauthorized access to the cart.
- When the user logs out, we clear the cartId from local storage.
- The cart contains the checkoutUrl, which is used to redirect the user to the Shopify hosted checkout page, after a successful checkout the user is redirected back to the Storefront when pressing 'Continue Shopping'. When the user is redirected back, we try to retrieve the cart but it will trigger an error if in that case we are going to create a new cart for the user.

### Hosted Checkout Page
- Every time a cart is created, Shopify provides a `checkoutUrl` that is used to redirect the user to the Shopify hosted checkout page.
- Consider setting up a DNS CNAME for a seamless transition from Storefront to Checkout.

### Hosted Account Management Pages
- Overview of redirects to Shopify's hosted Account pages.
- Customers logged into the Storefront will need to log in separately on the hosted Account dashboard.

## Customer Accounts
- Shopify's classic username/password login option must be used, as one-time code login is not supported natively by this integration.
- If using the one-time code login, the UI will need custom development.

## Email Notifications
- Configuration for Shopify’s email notifications (order creation, shipment, etc.).
- Access Shopify's notification settings on the Shopify Store Dashboard: **Settings -> Notifications**.

## Best Practices and Tips
- Reference Shopify Community Forums for additional help or to find answers to common questions.


# CMS Integration (Connector & Product Listing)
For both content types we are using the Shopify App, for both Contentful and Contentstack.
We will use the Public Storefront API Key (client side) for getting the product data.


- https://www.contentstack.com/docs/developers/marketplace-apps/shopify

![contentstack config](/img/contentstack-shopify.png)



- https://www.contentful.com/developers/docs/extensibility/apps/shopify/

![contentful config](/img/contentful-shopify.png)