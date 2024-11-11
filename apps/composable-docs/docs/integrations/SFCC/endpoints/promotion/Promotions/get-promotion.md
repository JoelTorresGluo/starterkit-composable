---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Promotion Details

## Purpose

This endpoint retrieves detailed information about a specific promotion. It supports the retrieval of data including promotion rules, validity, and applicability. This is vital for managing promotional activities within Salesforce Commerce Cloud (SFCC).

This endpoint is particularly useful for admins to verify and manage promotions effectively.

:::note

This is the Admin API equivalent of the [Shopper Promotions](../ShopperPromotions/get-shopper-promotion.md) endpoint

:::

## Authentication

A JSON Web Token (JWT) is required to authenticate the request. This token must be obtained through the appropriate authentication mechanisms provided by SFCC.

## Example
<Tabs>
  <TabItem value="commerce-sdk" label="Commerce SDK">

    ```bash
      const options = {
          fetchOptions: {
              method: 'GET'
          },
          headers: {
              'Content-Type': 'application/json'
          },
          parameters: {
              id: 'promo123',
              organizationId: 'org456',
              siteId: 'site789'
          },
          retrySettings: {
              retries: 3,
              retryDelay: 200
          }
      };

      const promotion = await promotionsClient.getPromotion({ options });

    ```  
  </TabItem>
  <TabItem value="SCAPI" label="SCAPI">

    ```http

      GET https://{shortCode}.api.commercecloud.salesforce.com/pricing/promotions/v1/organizations/{organizationId}/promotions/{id}?siteId={YourSiteId}

    ```
  </TabItem>
</Tabs>

## Request

### URL

``GET https://{shortCode}.api.commercecloud.salesforce.com/pricing/promotions/v1/organizations/{organizationId}/promotions/{id}?siteId={YourSiteId}``

### Headers

- ``Authorization: Bearer {AdminAPI_token}``
- ``Content-Type: application/json``

### URL Parameters

- ``shortCode string``: A region-specific merchant identifier. (required)
  - Retrieved from Business Manager > Administration > Salesforce Commerce API Settings > Shortcode
  - Example: ``0dnz6oep``
- ``organizationId string``: The identifier for the organization. (required)
  - Retrieved from Business Manager > Administration > Salesforce Commerce API Settings > organization ID
- ``id string``: The identifier of the specific promotion to retrieve. (required)
  - Example: ``Buy5for50``

### Query Parameters

- ``siteId string``: Identifies the site context of the request. Attributes may have site-specific values. (required)
  - Example: ``SiteGenesis``

### Request Body

*N/A*

## Response
<Tabs>
  <TabItem value="200" label="200">
    ```json
      {
        "archived": false,
        "assignmentInformation": {
          "active": false,
          "enabled": true,
          "scheduleType": "none"
        },
        "creationDate": "2020-01-09T16:50:32.000Z",
        "disableGloballyExcluded": false,
        "enabled": true,
        "exclusivity": "class",
        "id": "my-promotion",
        "lastModified": "2020-01-09T16:50:32.000Z",
        "name": {
          "default": "__PROMOTION_ID__"
        },
        "promotionClass": "order",
        "tags": []
      }
    ```
  </TabItem>
  <TabItem value="400" label="400">
If there is an issue with the request parameters or the request itself, the API responds with a 400 status code. The response includes details on what went wrong to help correct the request.
    
    ```json
      {
        "title": "Bad Request",
        "detail": "Required parameter id missing or invalid."
      }
    ```
  </TabItem>
  <TabItem value="404" label="404">
When the specified promotion ID does not exist, the API responds with a 404 error.

    ```json
      {
        "title": "Promotion Not Found",
        "detail": "The promotion with ID '-Buy5for50' could not be found."
      }
    ```
  </TabItem>
</Tabs>
References
Official Documentation

- commerce-sdk: [Pricing.Promotions.getPromotion](https://salesforcecommercecloud.github.io/commerce-sdk/classes/pricing.promotions.html#getpromotion)
- SCAPI: [getPromotion](https://developer.salesforce.com/docs/commerce/commerce-api/references/promotions?meta=getPromotion)
