---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Shipping Methods for Shipment

## Purpose

This endpoint retrieves the applicable shipping methods for a certain shipment of a basket within SFCC. It ensures that only authorized access is allowed, safeguarding the integrity of customer data.

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
        basketId: 'a10ff320829cb0eef93ca5310a',
        locale: 'en-US',
        organizationId: 'org456',
        shipmentId: 'me',
        siteId: 'SiteGenesis'
      }
    }

    const shippingMethods = await shopperCustomersClient.getShippingMethodsForShipment({ options });
    ```
  </TabItem>
  <TabItem value="scapi" label="SCAPI">
    ```http
    GET https://{shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v2/organizations/{organizationId}/baskets/{basketId}/shipments/{shipmentId}/shipping-methods?siteId=SiteGenesis&locale=en-US
    ```
  </TabItem>
</Tabs>

## Request

### URL

``GET https://{shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v2/organizations/{organizationId}/baskets/{basketId}/shipments/{shipmentId}/shipping-methods?siteId={siteId}&locale={locale}``

### Headers
- ``Authorization: Bearer {slas_token}``
- ``Content-Type: application/json``

### URL Parameters

- ``shortCode`` *string*: A region-specific merchant identifier. **(required)**
  - Retrieved from Business Manager > Administration > Salesforce Commerce API Settings > Shortcode
  - Example: ``0dnz6oep``
- ``organizationId`` *string*: The identifier for the organization. **(required)**
  - Retrieved from Business Manager > Administration > Salesforce Commerce API Settings > organization ID
- ``basketId`` *string*: The ID of the basket to be modified. **(required)**
  - Example: ``a10ff320829cb0eef93ca5310a``
- ``shipmentId`` *string*: The ID of the shipment to be modified. **(required)**
  - Example: ``me``

### Query Parameters

- ``siteId`` *string*: Identifies the site context of the request. Attributes may have site-specific values. **(required)**
  - Example: `SiteGenesis`
- ``locale`` *string*: A descriptor to provide locale context for a geographical region by both a language and/or country code. **(optional)**
  - Example: `en-US`

### Request Body

N/A

## Response

<Tabs>
  <TabItem value="200" label="200">
  ```json
    {
        "applicableShippingMethods": [
            {
            "description": "Order received within 7-10 business days",
            "id": "001",
            "name": "Ground",
            "price": 15.99
            },
            {
            "description": "Order received in 2 business days",
            "id": "002",
            "name": "2-Day Express",
            "price": 20.99
            },
            {
            "description": "Order received the next business day",
            "id": "003",
            "name": "Overnight",
            "price": 29.99
            },
            {
            "description": "Store Pickup",
            "id": "005",
            "name": "Store Pickup",
            "price": 0,
            "c_storePickupEnabled": true
            }
        ],
        "defaultShippingMethodId": "001"
    }
```
  </TabItem>

  <TabItem value="404" label="404">

    Requested Resource Not Found. This error is thrown if the basket with the given basket ID is unknown or the shipment with the given shipment ID is unknown.

    ```json
        {
            "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/basket-not-found",
            "title": "Basket Not Found",
            "detail": "No basket with ID '123' could be found."
        }
    ```
  </TabItem>
  <TabItem value="400" label="400">

  The customer assigned to the basket does not match the verified customer represented by the JSON Web Token (JWT).

    ```json
        {
            "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/bad-request",
            "title": "Bad Request",
            "detail": "The customer is invalid."
        }
  ```
  </TabItem>
</Tabs>

## References

### Official Documentation
- commerce-sdk: [Customer.ShopperBaskets.getShippingMethodForShipment](https://salesforcecommercecloud.github.io/commerce-sdk/classes/checkout.shopperbaskets.html#getshippingmethodsforshipment)
- SCAPI: [getShippingMethodsForShipment](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-baskets-v2?meta=getShippingMethodsForShipment)

