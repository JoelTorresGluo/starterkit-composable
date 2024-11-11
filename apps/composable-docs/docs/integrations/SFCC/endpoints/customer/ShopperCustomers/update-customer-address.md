---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update Customer Address

## Purpose

This endpoint updates a customer's address by address name within SFCC. It ensures that only authorized updates are made, safeguarding the integrity of customer data.

## Example

<Tabs>
  <TabItem value="commerce-sdk" label="Commerce SDK">
    ```js
    const options = {
      body: {
        addressId: 'home_address',
        address1: '5 Wall St',
        address2: '24 Presidential Way',
        city: 'Burlington',
        companyName: 'Salesforce Commerce Cloud',
        countryCode: 'US',
        creationDate: '2020-02-14T21:13:29.769Z',
        firstName: 'John',
        fullName: 'John Jim Murphy',
        jobTitle: 'Developer',
        lastModified: '2020-02-14T21:13:29.770Z',
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
        addressName: 'home_address',
        customerId: 'abfTEMDZOgi3JPrkHjv9IhoziM',
        organizationId: 'org456',
        siteId: 'SiteGenesis'
      }
    }

    const updatedAddress = await shopperCustomersClient.updateCustomerAddress({ options });
    ```
  </TabItem>
  <TabItem value="scapi" label="SCAPI">
    ```http
    PATCH https://{shortCode}.api.commercecloud.salesforce.com/customer/shopper-customers/v1/organizations/{organizationId}/customers/{customerId}/addresses/{addressName}
    ```
  </TabItem>
</Tabs>

## Request

### URL

``PATCH https://{shortCode}.api.commercecloud.salesforce.com/customer/shopper-customers/v1/organizations/{organizationId}/customers/{customerId}/addresses/{addressName}?siteId={siteId}``

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
- ``addressName`` *string*: The name of the address to update. **(required)**
  - Example: ``home_address``

### Query Parameters

- ``siteId`` *string*: Identifies the site context of the request. Attributes may have site-specific values. **(required)**
  - Example: `RefArch`

### Request Body

```js
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
  "addressId": "home_address",
  "address1": "5 Wall St",
  "address2": "24 Presidential Way",
  "city": "Burlington",
  "companyName": "Salesforce Commerce Cloud",
  "countryCode": "US",
  "firstName": "John",
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
- commerce-sdk: [Customer.ShopperCustomers.updateCustomerAddress](https://salesforcecommercecloud.github.io/commerce-sdk/classes/customer.shoppercustomers.html#updatecustomeraddress)
- SCAPI: [updateCustomerAddress](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-customers?meta=updateCustomerAddress)

