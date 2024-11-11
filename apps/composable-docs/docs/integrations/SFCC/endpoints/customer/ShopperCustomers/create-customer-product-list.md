---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create Customer Product List

## Purpose

This endpoint is dedicated to creating a new product list for a customer within SFCC. It ensures that only valid and authorized modifications are made, maintaining the integrity of the customer's product lists.

## Example

<Tabs>
  <TabItem value="commerce-sdk" label="Commerce SDK">
    ```js
    const options = {
      body: {
        coRegistrant: {
          email: "janedoe@example.com",
          firstName: "Jane",
          lastName: "Doe",
          role: "Bride"
        },
        creationDate: "2019-10-18T22:06:28.965Z",
        description: "our productlist",
        event: {
          city: "Washington",
          country: "US",
          date: "2019-09-05T17:12:56.670Z",
          state: "DC",
          type: "Wedding"
        },
        id: "bcedkiWbxCM2MaaadkRhB2IBzM",
        lastModified: "2019-10-18T22:06:28.971Z",
        name: "OurProductList",
        public: true,
        registrant: {
          email: "johndoe@example.com",
          firstName: "John",
          lastName: "Doe",
          role: "Groom"
        },
        type: "wish_list"
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

    await shopperCustomersClient.createCustomerProductList({ options });
    ```
  </TabItem>
  <TabItem value="scapi" label="SCAPI">
    ```http
    POST https://{shortCode}.api.commercecloud.salesforce.com/customer/shopper-customers/v1/organizations/{organizationId}/customers/{customerId}/product-lists
    ```
  </TabItem>
</Tabs>

## Request

### URL

``POST https://{shortCode}.api.commercecloud.salesforce.com/customer/shopper-customers/v1/organizations/{organizationId}/customers/{customerId}/product-lists?siteId={siteId}``

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

```js
{
  "coRegistrant": {
    "email": "janedoe@example.com",
    "firstName": "Jane",
    "lastName": "Doe",
    "role": "Bride"
  },
  "creationDate": "2019-10-18T22:06:28.965Z",
  "description": "our productlist",
  "event": {
    "city": "Washington",
    "country": "US",
    "date": "2019-09-05T17:12:56.670Z",
    "state": "DC",
    "type": "Wedding"
  },
  "id": "bcedkiWbxCM2MaaadkRhB2IBzM",
  "lastModified": "2019-10-18T22:06:28.971Z",
  "name": "OurProductList",
  "public": true,
  "registrant": {
    "email": "johndoe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "Groom"
  },
  "type": "wish_list"
}
```
## Attributes

- ``coRegistrant`` *object*: The coregistrant of this product list.
  - ``email`` *string*: The email of the co-registrant.
    - Example: ``janedoe@example.com``
  - ``firstName`` *string*: The first name of the co-registrant.
    - Example: ``Jane``
  - ``lastName`` *string*: The last name of the co-registrant.
    - Example: ``Doe``
  - ``role`` *string*: The role of the co-registrant.
    - Example: ``Bride``

- ``creationDate`` *datetime*: The date and time the product list was created.
  - Example: ``2019-10-18T22:06:28.965Z``

- ``description`` *string*: The description of the product list.
  - Example: ``our productlist``

- ``event`` *object*: The event of this product list.
  - ``city`` *string*: The city where the event is taking place.
    - Example: ``Washington``
  - ``country`` *string*: The country where the event is taking place.
    - Example: ``US``
  - ``date`` *datetime*: The date and time of the event.
    - Example: ``2019-09-05T17:12:56.670Z``
  - ``state`` *string*: The state where the event is taking place.
    - Example: ``DC``
  - ``type`` *string*: The type of event.
    - Example: ``Wedding``

- ``id`` *string*: The ID of the product list.


## Response

<Tabs>
  <TabItem value="200" label="200">
  ```js
  {
  "coRegistrant": {
    "email": "janedoe@example.com",
    "firstName": "Jane",
    "lastName": "Doe",
    "role": "Bride"
  },
  "creationDate": "2019-10-18T22:06:28.965Z",
  "description": "our productlist",
  "event": {
    "city": "Washington",
    "country": "US",
    "date": "2019-09-05T17:12:56.670Z",
    "state": "DC",
    "type": "Wedding"
  },
  "id": "bcedkiWbxCM2MaaadkRhB2IBzM",
  "lastModified": "2019-10-18T22:06:28.971Z",
  "name": "OurProductList",
  "public": true,
  "registrant": {
    "email": "johndoe@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "Groom"
  },
  "type": "wish_list"
}
  ```
  </TabItem>
<TabItem value="400" label="400">

 CustomerId URL parameter does not match the verified customer represented by the JWT token.

  ```js
{
  "title": "Invalid Customer",
  "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/invalid-customer",
  "detail": "The customer is invalid."
}
  ```
  </TabItem>
  <TabItem value="404" label="404">

  Requested Resource Not Found
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
- commerce-sdk: [Customer.ShopperCustomers.createCustomerProductList](https://salesforcecommercecloud.github.io/commerce-sdk/classes/customer.shoppercustomers.html#createcustomerproductlist)
- SCAPI: [createCustomerProductList](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-customers?meta=createCustomerProductList)

