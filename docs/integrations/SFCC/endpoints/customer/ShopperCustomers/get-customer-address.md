---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Customer Address

## Purpose

This endpoint retrieves a customer's address by address name within SFCC. It ensures that only authorized access is allowed, safeguarding the integrity of customer data.

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
        addressName: 'home_address',
        customerId: 'abfTEMDZOgi3JPrkHjv9IhoziM',
        organizationId: 'org456',
        siteId: 'SiteGenesis'
      }
    }

    const customerAddress = await shopperCustomersClient.getCustomerAddress({ options });
    ```
  </TabItem>
  <TabItem value="scapi" label="SCAPI">
    ```http
    GET https://{shortCode}.api.commercecloud.salesforce.com/customer/shopper-customers/v1/organizations/{organizationId}/customers/{customerId}/addresses/{addressName}
    ```
  </TabItem>
</Tabs>

## Request

### URL

``GET https://{shortCode}.api.commercecloud.salesforce.com/customer/shopper-customers/v1/organizations/{organizationId}/customers/{customerId}/addresses/{addressName}?siteId={siteId}``

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
- ``addressName`` *string*: The name of the address to retrieve. **(required)**
  - Example: ``home_address``

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
    "addressId": "home_address",
    "address1": "5 Wall St",
    "address2": "24 Presidential Way",
    "city": "Burlington",
    "companyName": "Salesforce Commerce Cloud",
    "countryCode": "US",
    "creationDate": "2020-02-14T21:13:29.769Z",
    "firstName": "John",
    "fullName": "John Jim Murphy",
    "jobTitle": "Developer",
    "lastModified": "2020-02-14T21:13:29.770Z",
    "lastName": "Murphy",
    "phone": "408-555-1212",
    "postalCode": "01805",
    "postBox": "12a",
    "preferred": false,
    "salutation": "Mr.",
    "secondName": "Jim",
    "stateCode": "MA",
    "title": "Dr."
  }
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
- commerce-sdk: [Customer.ShopperCustomers.getCustomerAddress](https://salesforcecommercecloud.github.io/commerce-sdk/classes/customer.shoppercustomers.html#getcustomeraddress)
- SCAPI: [getCustomerAddress](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-customers?meta=getCustomerAddress)

