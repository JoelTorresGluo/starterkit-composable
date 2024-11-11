---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create Customer Address in Customer List

## Purpose

This endpoint updates a customer's address by address ID within SFCC. It ensures that only authorized updates are made, safeguarding the integrity of customer data.

:::note

This is the Admin API equivalent of the [Create Customer Address](../ShopperCustomers/create-customer-address.md) endpoint

:::

## Authentication

A JSON Web Token (JWT) is required to authenticate the request.

## Example

<Tabs>
  <TabItem value="commerce-sdk" label="Commerce SDK">
    ```js
    const options = {
      body: {
        addressId: 'home',
        address1: '5 Wall St',
        address2: '24 Presidential Way',
        city: 'Burlington',
        companyName: 'Salesforce Commerce Cloud',
        countryCode: 'US',
        firstName: 'John',
        fullName: 'John Jim Murphy',
        jobTitle: 'Developer',
        lastName: 'Murphy',
        phone: '408-555-1212',
        postalCode: '01805',
        postBox: '12a',
        preferred: false,
        salutation: 'Mr.',
        secondName: 'Jim',
        stateCode: 'MA',
        title: 'Dr.'
      },
      fetchOptions: {
        method: 'PATCH'
      },
      headers: {
        'Content-Type': 'application/json'
      },
      parameters: {
        customerNo: 'D100201',
        listId: 'customer_list_1',
        organizationId: 'org456'
      }
    }

    const createAddress = await customersClient.createAddressForCustomerInCustomerList({ options });
    ```
  </TabItem>
  <TabItem value="scapi" label="SCAPI">
    ```http
    POST https://{shortCode}.api.commercecloud.salesforce.com/customer/customers/v1/organizations/{organizationId}/customer-lists/{listId}/customers/{customerNo}/addresses
    ```
  </TabItem>
</Tabs>

## Request

### URL

``POST https://{shortCode}.api.commercecloud.salesforce.com/customer/customers/v1/organizations/{organizationId}/customer-lists/{listId}/customers/{customerNo}/addresses``

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

### Request Body

```js
{
  "addressId": "home",
  "address1": "5 Wall St",
  "address2": "24 Presidential Way",
  "city": "Burlington",
  "companyName": "Salesforce Commerce Cloud",
  "countryCode": "US",
  "firstName": "John",
  "fullName": "John Jim Murphy",
  "jobTitle": "Developer",
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
## Attributes

- ``addressId`` *string*: The ID of the address as specified by account owner.
    - Example: ``home_address``
- ``address1`` *string*: The first address.
    - Example: ``5 Wall St``
- ``address2`` *string*: The second address.
    - Example: ``24 Presidential Way``
- ``city`` *string*: The city.
    - Example: ``Burlington``
- ``companyName`` *string*: The company name.
    - Example: ``Salesforce Commerce Cloud``
- ``countryCode`` *string*: The two-letter ISO 3166-1 (Alpha-2) country code.
    - Example: ``US``
- ``firstName`` *string*: The first name.
    - Example: ``John``
- ``fullName`` *string*: The full name.
    - Example: ``John Jim Murphy``
- ``jobTitle`` *string*: The job title.
    - Example: ``Developer``
- ``lastName`` *string*: The last name.
    - Example: ``Murphy``
- ``phone`` *string*: The phone number.
    - Example: ``408-555-1212``
- ``postalCode`` *string*: The postal code.
    - Example: ``01805``
- ``postBox`` *string*: The post box.
    - Example: ``12a``
- ``preferred`` *boolean*: Indicates whether the address is preferred.
    - Example: ``false``
- ``salutation`` *string*: The salutation.
    - Example: ``Mr.``
- ``secondName`` *string*: The second name.
    - Example: ``Jim``
- ``stateCode`` *string*: The state code.
    - Example: ``MA``
- ``title`` *string*: The title.
    - Example: ``Dr.``

## Response

<Tabs>
  <TabItem value="200" label="200">
  ```json
    {
        "addressId": "3",
        "city": "San Francisco",
        "companyName": "Ursa Major Solar",
        "countryCode": "US",
        "creationDate": "2019-09-23T20:49:38.370Z",
        "etag": "8772fd1c59fed8313a6c1ad260544c116dc0af4bc13941957173244edba47d31",
        "firstName": "Wei",
        "fullName": "Wei Leung",
        "jobTitle": "",
        "lastModified": "2019-09-23T20:49:38.372Z",
        "lastName": "Leung",
        "phone": "415-555-1212",
        "postalCode": "94105",
        "salutation": "Ms",
        "secondName": "",
        "stateCode": "CA"
    }
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

  Bad Request

    ```json
    {
        "title": "Bad Request",
        "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/invalid-query-parameter",
        "detail": "offset-BAD-REQUEST parameters are not defined in RAML."
    }

  ```
  </TabItem>
    <TabItem value="401" label="401">

  Your Client ID is invalid, or you are not allowed to access the content provided by the requested URL.

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
- commerce-sdk: [Customer.Customers.createAddressForCustomerInCustomerList](https://salesforcecommercecloud.github.io/commerce-sdk/classes/customer.customers.html#createaddressforcustomerincustomerlist)
- SCAPI: [createAddressForCustomerInCustomerList](https://developer.salesforce.com/docs/commerce/commerce-api/references/customers?meta=createAddressForCustomerInCustomerList)
