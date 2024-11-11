---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Remove Customer Address in Customer List

## Purpose

This endpoint deletes a customer's address by address ID within SFCC. It ensures that only authorized deletions are made, safeguarding the integrity of customer data.

:::note

This is the Admin API equivalent of the [Remove Customer Address](../ShopperCustomers/remove-customer-address.md) endpoint

:::

## Authentication

A JSON Web Token (JWT) is required to authenticate the request.

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
        addressId: 'home',
        customerNo: 'D100201',
        listId: 'customer_list_1',
        organizationId: 'org456'
      }
    }

    await customersClient.removeAddressForCustomerInCustomerList({ options });
    ```
  </TabItem>
  <TabItem value="scapi" label="SCAPI">
    ```http
    DELETE https://{shortCode}.api.commercecloud.salesforce.com/customer/customers/v1/organizations/{organizationId}/customer-lists/{listId}/customers/{customerNo}/addresses/{addressId}
    ```
  </TabItem>
</Tabs>

## Request

### URL

``DELETE https://{shortCode}.api.commercecloud.salesforce.com/customer/customers/v1/organizations/{organizationId}/customer-lists/{listId}/customers/{customerNo}/addresses/{addressId}``

### Headers
- ``Authorization: Bearer {AdminAPI_token}``
- ``Content-Type: application/json``

### URL Parameters

- ``shortCode`` *string*: A region-specific merchant identifier. **(required)**
  - Retrieved from Business Manager > Administration > Salesforce Commerce API Settings > Shortcode
  - Example: ``0dnz6oep``
- ``version`` *string*: API version identifier. **(required)**
  - Example: `v1`
- ``organizationId`` *string*: The identifier for the organization. **(required)**
  - Retrieved from Business Manager > Administration > Salesforce Commerce API Settings > organization ID
- ``listId`` *string*: The customer list ID. **(required)**
  - Example: ``customer_list_1``
- ``customerNo`` *string*: The customer number. **(required)**
  - Example: ``D100201``
- ``addressId`` *string*: The ID of the address to delete. **(required)**
  - Example: ``home``

### Request Body

N/A

## Response

<Tabs>
  <TabItem value="204" label="204">
    Empty
  </TabItem>
  <TabItem value="400" label="400">

  Bad Request.

  ```js
    {
        "title": "Bad Request",
        "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/invalid-query-parameter",
        "detail": "offset-BAD-REQUEST parameters are not defined in RAML."
    }
  ```
  </TabItem>
  <TabItem value="401" label="401">

  Unauthorized. Your Client ID is invalid, or you are not allowed to access the content provided by the requested URL.

  ```json
    {
        "title": "Invalid Access Token",
        "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/invalid-access-token",
        "detail": "The request is unauthorized, the access token is invalid.",
        "accessToken": "hbGciOiJIUzI1NiIsInR5cCI6Ikp"
    }
  ```
  </TabItem>
  <TabItem value="404" label="404">

  Not Found. This error is thrown if the ID does not match any of the customer group sites or if the ID is ill-formed.
  ```json
    {
        "title": "Customer List Not Found",
        "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/customer-list-not-found",
        "detail": "No customer list with ID 'SiteGenesis-NOT-FOUND' could be found.",
        "customerListId": "SiteGenesis-NOT-FOUND"
    }
  ```
  </TabItem>
</Tabs>

## References

### Official Documentation
- commerce-sdk: [Customer.Customers.removeAddressForCustomerInCustomerList](https://salesforcecommercecloud.github.io/commerce-sdk/classes/customer.customers.html#removeaddressforcustomerincustomerlist)
- SCAPI: [removeAddressForCustomerInCustomerList](https://developer.salesforce.com/docs/commerce/commerce-api/references/customers?meta=removeAddressForCustomerInCustomerList)

