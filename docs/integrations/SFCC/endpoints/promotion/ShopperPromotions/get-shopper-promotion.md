---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Shopper Promotion Details

## Purpose

This endpoint retrieves an array of enabled promotions for a list of specified IDs. It is crucial for allowing shoppers to view active promotions relevant to them, supporting promotional rules, validity, and applicability. This data helps shoppers make informed purchasing decisions based on available promotional offers.

:::note

This is the Shopper API equivalent of the [Admin Promotions API](../Promotions/get-promotion.md) endpoint.

:::

## Authentication

A JSON Web Token (JWT) obtained through shopper authentication is required to authenticate the request. This token is generally acquired via a shopper login process.

## Example
<Tabs>
  <TabItem value="commerce-sdk" label="Commerce SDK">

     ```js
      const options = {
        fetchOptions: {
            method: 'GET'
        },
        headers: {
            'Content-Type': 'application/json'
        },
        parameters: {
            ids: 'Buy5for50,$5_off_ties_promotion',
            locale: 'en-US',
            organizationId: 'f_ecom_zzxy_prd',
            siteId: 'SiteGenesis'
        },
        retrySettings: {
            retries: 3,
            retryDelay: 200
        }
      };

      const promotions = await shopperPromotionsClient.getPromotions({ options });
  ```  
  </TabItem>
  <TabItem value="SCAPI" label="SCAPI">

    ```http

      GET https://{shortCode}.api.commercecloud.salesforce.com/pricing/shopper-promotions/v1/organizations/{organizationId}/promotions?siteId={siteId}&ids={promotionId},{promotionId}

    ```
  </TabItem>
</Tabs>

## Request

### URL

``GET https://{shortCode}.api.commercecloud.salesforce.com/pricing/shopper-promotions/v1/organizations/{organizationId}/promotions?siteId={siteId}&ids={promotionId},{promotionId}``

### Headers

- ``Authorization: Bearer {SLAS token}``
- ``Content-Type: application/json``

### URL Parameters

- ``shortCode string``: A region-specific merchant identifier. (required)
  - Retrieved from Business Manager > Administration > Salesforce Commerce API Settings > Shortcode
  - Example: ``0dnz6oep``
- ``organizationId string``: The identifier for the organization. (required)
  - Retrieved from Business Manager > Administration > Salesforce Commerce API Settings > organization ID

### Query Parameters

- ``siteId string``: Identifies the site context of the request. Attributes may have site-specific values. (required)
  - Example: ``SiteGenesis``
- ``id string``: The identifier of the specific promotion to retrieve. (required)
  - Example: ``Buy5for50``

### Request Body

*N/A*

## Response
<Tabs>
  <TabItem value="200" label="200">
  ```json
  {
    "limit": 2,
    "data": [
      {
        "calloutMsg": "Buy5for50",
        "details": "Buy5for50",
        "id": "Buy5for50",
        "name": "Buy5for50"
      },
      {
        "calloutMsg": "$5 off Men's Ties",
        "details": "$5 off Men's Ties (with coupon)",
        "id": "$5_off_ties_promotion",
        "name": "5 Off Ties Promotion"
      }
    ],
    "total": 2
  }
  ```
  </TabItem>
  <TabItem value="400" label="400">
If there is an issue with the request parameters or the request itself, the API responds with a 400 status code. The response includes details on what went wrong to help correct the request.
    
    ```json
      {
    "title": "Bad Request",
    "detail": "Required parameter ids missing or invalid."
  }
    ```
  </TabItem>
  <TabItem value="404" label="404">
When the specified promotion ID does not exist, the API responds with a 404 error.

    ```json
     {
    "title": "Promotions Not Found",
    "detail": "No promotions with the specified IDs could be found."
  }
    ```
  </TabItem>
</Tabs>
References
Official Documentation

- commerce-sdk: [Pricing.ShopperPromotions.getPromotions](https://salesforcecommercecloud.github.io/commerce-sdk/classes/pricing.shopperpromotions.html)
- SCAPI: [getPromotion](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-promotions?meta=getPromotions)
