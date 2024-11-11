---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create Customer Product List Item

## Purpose

This endpoint is dedicated to adding an item to a customer's product list within SFCC. It ensures that only valid and authorized modifications are made, maintaining the integrity of the customer's selected items.

## Example

<Tabs>
  <TabItem value="commerce-sdk" label="Commerce SDK">
    ```js
    const options = {
      body: {
        id: '1d447daa4d25805fd682bd4ce1',
        priority: 4,
        productId: 'RedDress1',
        public: true,
        purchasedQuantity: 0,
        quantity: 2,
        type: 'product'
      },
      fetchOptions: {
        method: 'POST'
      },
      headers: {
        'Content-Type': 'application/json'
      },
      parameters: {
        customerId: 'abfTEMDZOgi3JPrkHjv9IhoziM',
        listId: 'bcedkiWbxCM2MaaadkRhB2IBzM',
        organizationId: 'org456',
        siteId: 'SiteGenesis'
      }
    }

    await shopperCustomersClient.createCustomerProductListItem({ options });
    ```
  </TabItem>
  <TabItem value="scapi" label="SCAPI">
    ```http
    POST https://{shortCode}.api.commercecloud.salesforce.com/customer/shopper-customers/v1/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}/items
    ```
  </TabItem>
</Tabs>

## Request

### URL

``POST https://{shortCode}.api.commercecloud.salesforce.com/customer/shopper-customers/v1/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}/items?siteId={siteId}``

### Headers
- ``Authorization: Bearer {slas_token}``
- ``Content-Type: application/json``

### URL Parameters

- ``shortCode`` *string*: A region-specific merchant identifier. **(required)**
  - Retrieved from Business Manager > Administration > Salesforce Commerce API Settings > Shortcode
  - Example: ``0dnz6oep``
- ``version`` *string*: API version identifier. **(required)**
  - Example: `v1`
- ``organizationId`` *string*: The identifier for the organization. **(required)**
  - Retrieved from Business Manager > Administration > Salesforce Commerce API Settings > organization ID
- ``customerId`` *string*: The customer ID. **(required)**
  - Example: ``abfTEMDZOgi3JPrkHjv9IhoziM``
- ``listId`` *string*: The product list ID. **(required)**
  - Example: ``bcedkiWbxCM2MaaadkRhB2IBzM``

### Query Parameters

- ``siteId`` *string*: Identifies the site context of the request. Attributes may have site-specific values. **(required)**
  - Example: `RefArch`

### Request Body

```js
{
  "id": "1d447daa4d25805fd682bd4ce1",
  "priority": 4,
  "productId": "RedDress1",
  "public": true,
  "purchasedQuantity": 0,
  "quantity": 2,
  "type": "product"
}
```
## Attributes

- ``id`` *string*: The ID of the product list item.
  - Example: ``1d447daa4d25805fd682bd4ce1``

- ``priority`` *integer*: The priority of the product list item.
  - Example: ``4``

- ``productId`` *string*: The ID (SKU) of the product related to the item.
  - Example: ``RedDress1``

- ``*public`` *boolean*: Indicates whether the product list item is public.
  - Example: ``true``

- ``purchasedQuantity`` *number*: The quantity of the product that has already been purchased.
  - Example: ``0``

- ``quantity`` *number*: The quantity of the product list item.
  - Example: ``2``

- ``type`` *string*: The type of the product list item. Enum values: `product`, `gift_certificate`.
  - Example: ``product``

## Response

<Tabs>
  <TabItem value="200" label="200">
  ```js
  {
  "id": "1d447daa4d25805fd682bd4ce1",
  "priority": 4,
  "productId": "RedDress1",
  "public": true,
  "purchasedQuantity": 0,
  "quantity": 2,
  "type": "product"
}
  ```
  </TabItem>
<TabItem value="400" label="400">

  Requested Resource Not Found

  ```js
{
  "title": "Invalid Customer",
  "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/invalid-customer",
  "detail": "The customer is invalid."
}
  ```
  </TabItem>
  <TabItem value="404" label="404">

  CustomerId URL parameter does not match the verified customer represented by the JWT token.

  ```js
{
  "title": "Not Found",
  "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/not-found",
  "detail": "No customer with ID 'abfTWMDZOgi3JPzkHjv9IhmziI' could be found.",
  "customerId": "abfTWMDZOgi3JPzkHjv9IhmziI"
}
  ```
  </TabItem>
</Tabs>

## References

### Official Documentation
- commerce-sdk: [Customer.ShopperCustomers.createCustomerProductListItem](https://salesforcecommercecloud.github.io/commerce-sdk/classes/customer.shoppercustomers.html#createcustomerproductlistitem)
- SCAPI: [createCustomerProductListItem](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-customers?meta=createCustomerProductListItem)

