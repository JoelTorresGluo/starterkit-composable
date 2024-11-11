---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Register Customer

## Purpose

This endpoint is dedicated to creating new customer profiles within SFCC. It handles the ingestion of essential customer information. This service ensures data integrity by enforcing unique login credentials and required fields during the customer registration process.

Successful execution of this endpoint results in the registration of a new customer in the system, providing the foundation for all future interactions and transactions involving the customer's profile.

:::note

This is the Shopper equivalent of the [Create Customer in Customer List](../Customers/create-customer-in-customer-list.mdx) endpoint

:::

## Example

<Tabs>
  <TabItem value="commerce-sdk" label="Commerce SDK">
    ```js
    const body = {
      customer: {
        lastName: "Doe",
        email: "test@example.com",
    },
      password: "test1234!"
    }

    const customer = await shopperCustomersClient.registerCustomer({ body });
    ```
  </TabItem>
  <TabItem value="scapi" label="SCAPI">
    ```http
    POST /customer/shopper-customers/v1/organizations/{organizationId}/customers?siteId=RefArch HTTP/1.1
    Host: {shortcode}.api.commercecloud.salesforce.com:443
    content-type: application/json

    {
      "password": "12345!aBcD",
      "customer": {
        "login": "jsmith",
        "email": "jsmith@test.com",
        "firstName": "John",
        "lastName": "Smith"
      }
    }
    ```
  </TabItem>
</Tabs>

## Request

### URL

``POST https://{shortCode}.api.commercecloud.salesforce.com/customer/shopper-customers/{version}/organizations/{organizationId}/customers?siteId={siteId}``

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

### Query Parameters

- ``siteId`` *string*: Identifies the site context of the request. Attributes may have site-specific values. **(required)**
  - Example: `RefArch`

### Request Body
```js
{
  "password": "12345!aBcD", // required
  "customer": {
    "login": "jsmith",
    "email": "jsmith@test.com", // required
    "firstName": "John",
    "lastName": "Smith" // required
  }
}
```
## Response

<Tabs>
  <TabItem value="200" label="200">
  ```json
  {
    "authType": "registered",
    "creationDate": "2020-02-13T17:44:15.892Z",
    "customerId": "abkd9LhOWzAiAFubdEDChtkMHW",
    "customerNo": "00006002",
    "email": "jsmith@test.com",
    "enabled": true,
    "firstName": "John",
    "lastModified": "2020-02-13T17:44:15.898Z",
    "lastName": "Smith",
    "login": "jsmith"
  }
  ```
  </TabItem>
  <TabItem value="400" label="400">
  If the customer cannot be created due to validation failures or data issues, the API responds with a 400 status code. This error code is accompanied by a detailed message specifying the reason for the failure, enabling clients to address the issues promptly.

  ```json
  {
    "title": "Invalid Customer",
    "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/invalid-customer",
    "detail": "The customer is invalid."
  }
  ```
  </TabItem>
  <TabItem value="401" label="401">
  Case of type credentials the username is unknown or the password does not match. In case of type session, the session is not active anymore or the dwsecuretoken value is invalid. In both cases the customer is disabled or locked.

  ```json
  {
    "title": "Authentication Failed",
    "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/authentication-failed",
    "detail": "Customer authentication based on JohnSmith failed.",
    "credentialType": "JohnSmith"
  }
  ```
  </TabItem>
</Tabs>

## References

### Official Documentation
- commerce-sdk: [Customer.ShopperCustomers.registerCustomer](https://salesforcecommercecloud.github.io/commerce-sdk/classes/customer.shoppercustomers.html#registercustomer)
- SCAPI: [registerCustomer](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-customers?meta=registerCustomer)

