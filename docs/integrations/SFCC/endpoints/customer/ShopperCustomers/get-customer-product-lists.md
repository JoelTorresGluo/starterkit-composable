---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Customer Product Lists

## Purpose

This endpoint retrieves all customer product lists within SFCC. It ensures that only authorized access is allowed, safeguarding the integrity of customer data and preferences.

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
        customerId: 'abfTEMDZOgi3JPrkHjv9IhoziM',
        organizationId: 'org456',
        siteId: 'SiteGenesis'
      }
    }

    const productList = await shopperCustomersClient.getCustomerProductLists({ options });
    ```
  </TabItem>
  <TabItem value="scapi" label="SCAPI">
    ```http
    GET https://{shortCode}.api.commercecloud.salesforce.com/customer/shopper-customers/v1/organizations/{organizationId}/customers/{customerId}/product-lists
    ```
  </TabItem>
</Tabs>

## Request

### URL

``GET https://{shortCode}.api.commercecloud.salesforce.com/customer/shopper-customers/v1/organizations/{organizationId}/customers/{customerId}/product-lists?siteId={siteId}``

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

### Query Parameters

- ``siteId`` *string*: Identifies the site context of the request. Attributes may have site-specific values. **(required)**
  - Example: `RefArch`

### Request Body

N/A

## Response

<Tabs>
  <TabItem value="200" label="200">
  ```json
  {
    "limit": 1,
    "data": [
      {
        "coRegistrant": {
          "email": "janedoe@example.com",
          "firstName": "Jane",
          "lastName": "Doe",
          "role": "Bride"
        },
        "creationDate": "2019-10-18T22:06:28.965Z",
        "currentShippingAddressInfo": {
          "addressId": "home_address",
          "title": "home_address, John Murphy, Burlington"
        },
        "customerProductListItems": [
          {
            "description": "Description",
            "id": "30f35c187ea255ccb633c3ba11",
            "priority": 4,
            "productId": "SimpleProduct",
            "public": false,
            "purchasedQuantity": 0,
            "quantity": 2,
            "type": "product"
          }
        ],
        "postEventShippingAddressInfo": {
          "addressId": "home_address",
          "title": "home_address, John Murphy, Burlington"
        },
        "productListShippingAddress": {
          "addressId": "home_address",
          "city": "Burlington",
          "firstName": "John",
          "lastName": "Murphy"
        },
        "name": "OurProductList",
        "registrant": {
          "email": "johndoe@example.com",
          "firstName": "John",
          "lastName": "Doe",
          "role": "Groom"
        },
        "lastModified": "2019-10-18T22:06:28.971Z",
        "description": "a productlist",
        "event": {
          "city": "any city",
          "country": "USA",
          "type": "product_list_event"
        },
        "shippingAddressLink": {
          "addressId": "home_address",
          "title": "home_address, John Murphy, Burlington"
        },
        "id": "8b04014a9d6e5dbae542004824",
        "public": false,
        "type": "wish_list"
      }
    ],
    "total": 1
  }
  ```
  </TabItem>

  <TabItem value="404" label="404">

  If the specified customer or product list cannot be found, the API responds with a 404 error.

    ```json
   {
  "title": "Not Found",
  "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/not-found",
  "detail": "No customer with ID 'abfTWMDZOgi3JPzkHjv9IhmziI' could be found.",
  "customerId": "abfTWMDZOgi3JPzkHjv9IhmziI"
}
  ```
  </TabItem>
  <TabItem value="400" label="400">

  CustomerId URL parameter does not match the verified customer represented by the JWT token.

    ```json
   {
  "title": "Invalid Customer",
  "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/invalid-customer",
  "detail": "The customer is invalid."
}
  ```
  </TabItem>
</Tabs>

## References

### Official Documentation
- commerce-sdk: [Customer.ShopperCustomers.getCustomerProductLists](https://salesforcecommercecloud.github.io/commerce-sdk/classes/customer.shoppercustomers.html#getcustomerproductlists)
- SCAPI: [getCustomerProductLists](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-customers?meta=getCustomerProductLists)

