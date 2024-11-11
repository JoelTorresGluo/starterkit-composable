---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Delete Customer Product List Item

## Purpose

This endpoint is dedicated to removing an item from a customer's product list within SFCC. It ensures that only valid and authorized modifications are made, maintaining the integrity of the customer's selected items.

## Example

<Tabs>
  <TabItem value="commerce-sdk" label="Commerce SDK">
    ```js
    const options = {
      fetchOptions: {
        method: 'DELETE'
      },
      headers: {
        'Content-Type': 'application/json'
      },
      parameters: {
        customerId: 'abfTEMDZOgi3JPrkHjv9IhoziM',
        itemId: 'nikon-d90-wlens',
        listId: 'bcedkiWbxCM2MaaadkRhB2IBzM',
        organizationId: 'org456',
        siteId: 'SiteGenesis'
      }
    }

    await shopperCustomersClient.deleteCustomerProductListItem({ options });
    ```
  </TabItem>
  <TabItem value="scapi" label="SCAPI">
    ```http
    DELETE https://{shortCode}.api.commercecloud.salesforce.com/customer/shopper-customers/v1/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}/items/{itemId}
    ```
  </TabItem>
</Tabs>

## Request

### URL

``DELETE https://{shortCode}.api.commercecloud.salesforce.com/customer/shopper-customers/v1/organizations/{organizationId}/customers/{customerId}/product-lists/{listId}/items/{itemId}?siteId={siteId}``

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
- ``itemId`` *string*: The ID of the product list item to be deleted. **(required)**
  - Example: ``nikon-d90-wlens``

### Query Parameters

- ``siteId`` *string*: Identifies the site context of the request. Attributes may have site-specific values. **(required)**
  - Example: `RefArch`

### Request Body

N/A

## Response

<Tabs>
  <TabItem value="204" label="200">
  ```json
  No content
  ```
  </TabItem>

  <TabItem value="404" label="404">

  Requested Resource Not Found

  ```json
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
- commerce-sdk: [Customer.ShopperCustomers.deleteCustomerProductListItem](https://salesforcecommercecloud.github.io/commerce-sdk/classes/customer.shoppercustomers.html#deletecustomerproductlistitem)
- SCAPI: [deleteCustomerProductListItem](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-customers?meta=deleteCustomerProductListItem)

