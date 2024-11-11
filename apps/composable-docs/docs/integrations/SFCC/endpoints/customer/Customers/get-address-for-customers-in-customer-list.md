---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Customer Address from Customer List

## Purpose

This endpoint retrieves a specific customer address from a customer list within SFCC. It ensures that only authorized access is allowed, safeguarding the integrity of customer data and preferences.

:::note

This is the Admin API equivalent of the [Get Customer Address](../ShopperCustomers/get-customer-address.md) endpoint

:::

## Authentication

A JSON Web Token (JWT) is required to authenticate the request.

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
        addressId: 'HomeAddress',
        customerNo: 'D100201',
        listId: 'customer_list_1',
        organizationId: 'org456'
      }
    }

    const customerAddress = await customersClient.getAddressForCustomerFromCustomerList({ options });
    ```
  </TabItem>
  <TabItem value="scapi" label="SCAPI">
    ```http
    GET https://{shortCode}.api.commercecloud.salesforce.com/customer/customers/v1/organizations/{organizationId}/customer-lists/{listId}/customers/{customerNo}/addresses/{addressId}
    ```
  </TabItem>
</Tabs>

## Request

### URL

``GET https://{shortCode}.api.commercecloud.salesforce.com/customer/customers/v1/organizations/{organizationId}/customer-lists/{listId}/customers/{customerNo}/addresses/{addressId}``

### Headers
- ``Authorization: Bearer {AdminAPI_token}``
- ``Content-Type: application/json``

### URL Parameters

- ``shortCode`` *string*: A region-specific merchant identifier. **(required)**
  - Retrieved from Business Manager > Administration > Salesforce Commerce API Settings > Shortcode
  - Example: ``0dnz6oep``
- ``organizationId`` *string*: The identifier for the organization. **(required)**
  - Retrieved from Business Manager > Administration > Salesforce Commerce API Settings > organization ID
- ``listId`` *string*: The customer list ID. **(required)**
  - Example: ``customer_list_1``
- ``customerNo`` *string*: The customer number. **(required)**
  - Example: ``D100201``
- ``addressId`` *string*: The ID of the address to retrieve. **(required)**
  - Example: ``HomeAddress``

### Request Body

N/A

## Response

<Tabs>
  <TabItem value="200" label="200">
  ```json
    {
        "address1": "123 Trailblazer Ave.",
        "address2": "",
        "addressId": "HomeAddress",
        "city": "San Francisco",
        "companyName": "",
        "countryCode": "US",
        "firstName": "Wei",
        "fullName": "Wei Leung",
        "jobTitle": "",
        "lastName": "Leung",
        "phone": "",
        "postalCode": "",
        "postBox": "",
        "salutation": "Ms.",
        "secondName": "",
        "state_code": "CA",
        "suffix": "",
        "suite": "",
        "title": ""
    }
```
  </TabItem>

  <TabItem value="404" label="404">

    Requested Resource Not Found. This error is thrown if the ID does not match any of the customer group sites or if the ID is ill-formed.

    ```json
    {
        "title": "Customer List Not Found",
        "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/customer-list-not-found",
        "detail": "No customer list with ID 'SiteGenesis-NOT-FOUND' could be found.",
        "customerListId": "SiteGenesis-NOT-FOUND"
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
  <TabItem value="401" label="401">

  CustomerId URL parameter does not match the verified customer represented by the JWT token.

    ```json
    {
        "title": "Invalid Access Token",
        "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/invalid-access-token",
        "detail": "The request is unauthorized, the access token is invalid.",
        "accessToken": "hbGciOiJIUzI1NiIsInR5cCI6Ikp"
    }
  ```
  </TabItem>
</Tabs>

## References

### Official Documentation
- commerce-sdk: [Customer.ShopperCustomers.getCustomerAddress](https://salesforcecommercecloud.github.io/commerce-sdk/classes/customer.shoppercustomers.html#getcustomeraddress)
- SCAPI: [getCustomerAddress](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-customers?meta=getCustomerAddress)

