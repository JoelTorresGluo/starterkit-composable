---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Remove Customer Address

## Purpose

This endpoint deletes a customer's address by address name within SFCC. It ensures that only authorized deletions are made, safeguarding the integrity of customer data.

:::note

This is the Shopper equivalent of the [Remove Customer Address in Customer List](../Customers/create-customer-in-customer-list.mdx) endpoint

:::

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
        addressName: 'home_address',
        customerId: 'abfTEMDZOgi3JPrkHjv9IhoziM',
        organizationId: 'org456',
        siteId: 'SiteGenesis'
      }
    }

    await shopperCustomersClient.removeCustomerAddress({ options });
    ```
  </TabItem>
  <TabItem value="scapi" label="SCAPI">
    ```http
    DELETE https://{shortCode}.api.commercecloud.salesforce.com/customer/shopper-customers/v1/organizations/{organizationId}/customers/{customerId}/addresses/{addressName}
    ```
  </TabItem>
</Tabs>

## Request

### URL

``DELETE https://{shortCode}.api.commercecloud.salesforce.com/customer/shopper-customers/v1/organizations/{organizationId}/customers/{customerId}/addresses/{addressName}?siteId={siteId}``

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
- ``addressName`` *string*: The name of the address to delete. **(required)**
  - Example: ``home_address``

### Query Parameters

- ``siteId`` *string*: Identifies the site context of the request. Attributes may have site-specific values. **(required)**
  - Example: `RefArch`

### Request Body

N/A

## Response

<Tabs>
  <TabItem value="204" label="204">
  ```json
  No Content
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
- commerce-sdk: [Customer.ShopperCustomers.removeCustomerAddress](https://salesforcecommercecloud.github.io/commerce-sdk/classes/customer.shoppercustomers.html#removecustomeraddress)
- SCAPI: [removeCustomerAddress](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-customers?meta=removeCustomerAddress)

