---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update Shipping Method for Shipment

## Purpose

This endpoint sets a shipping method to a specific shipment of a basket within SFCC. It ensures that only authorized updates are made, safeguarding the integrity of customer data.

## Example

<Tabs>
  <TabItem value="commerce-sdk" label="Commerce SDK">
    ```js
    const options = {
      body: {
        id: '003'
      },
      fetchOptions: {
        method: 'PUT'
      },
      headers: {
        'Content-Type': 'application/json'
      },
      parameters: {
        basketId: 'a10ff320829cb0eef93ca5310a',
        shipmentId: 'me',
        organizationId: 'org456',
        siteId: 'SiteGenesis',
        locale: 'en-US'
      }
    }

    const updatedBasket = await shopperCustomersClient.updateShippingMethodForShipment({ options });
    ```
  </TabItem>
  <TabItem value="scapi" label="SCAPI">
    ```http
    PUT https://{shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/{organizationId}/baskets/{basketId}/shipments/{shipmentId}/shipping-method
    ```
  </TabItem>
</Tabs>

## Request

### URL

``PUT https://{shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/{organizationId}/baskets/{basketId}/shipments/{shipmentId}/shipping-method?siteId={siteId}``

### Headers
- ``Authorization: Bearer {slas_token}``
- ``Content-Type: application/json``

### URL Parameters

- ``shortCode`` *string*: A region-specific merchant identifier. **(required)**
  - Retrieved from Business Manager > Administration > Salesforce Commerce API Settings > Shortcode
  - Example: ``0dnz6oep``
- ``version`` *string*: API version identifier. **(required)**
  - Example: `v1`
- ``organizationId`` *string*: An identifier for the organization the request is being made by. **(required)**
  - Example: `f_ecom_zzxy_prd`
- ``basketId`` *string*: The ID of the basket to be modified. **(required)**
  - Example: `a10ff320829cb0eef93ca5310a`
- ``shipmentId`` *string*: The ID of the shipment to be modified. **(required)**
  - Example: `me`

### Query Parameters

- ``siteId`` *string*: The identifier of the site that a request is being made in the context of. Attributes may have site-specific values. **(required)**
  - Example: `SiteGenesis`
- ``locale`` *string*: A descriptor to provide locale context for a geographical region by both a language and/or country code.
  - Example: `en-US`

### Request Body

```json
{
  "id": "003"
}
```

### Attributes

- ``id`` *string*: The shipping method ID.
    - Example: ``003``

## Response

<Tabs>
  <TabItem value="204" label="204">
  ```json
  {
  "adjustedMerchandizeTotalTax": 30,
  "adjustedShippingTotalTax": 0.8,
  "agentBasket": false,
  "basketId": "a10ff320829cb0eef93ca5310a",
  "billingAddress": {
    "address1": "104 Presidential Way",
    "city": "Woburn",
    "countryCode": "US",
    "firstName": "Stephanie",
    "fullName": "Stephanie Miller",
    "id": "bfea663fd3de75d5be3ec02702",
    "lastName": "Miller",
    "postalCode": "01801",
    "stateCode": "MA"
  },
  "channelType": "storefront",
  "couponItems": [
    {
      "code": "5ties",
      "couponItemId": "cc6ef43f207bf64099288aec36",
      "statusCode": "no_applicable_promotion",
      "valid": true
    }
  ],
  "creationDate": "2019-10-17T08:29:55.340Z",
  "currency": "USD",
  "customerInfo": {
    "customerId": "beQeANXJNsd0xcINsB6cSrobQa",
    "email": "shopper@salesforce-test.com"
  },
  "lastModified": "2019-10-17T08:29:55.698Z",
  "merchandizeTotalTax": 30,
  "notes": {},
  "orderTotal": 646.76,
  "paymentInstruments": [
    {
      "amount": 0,
      "paymentCard": {
        "cardType": "Visa",
        "creditCardExpired": false
      },
      "paymentInstrumentId": "b7679bea661819b2de78b9de7d",
      "paymentMethodId": "CREDIT_CARD"
    }
  ],
  "productItems": [
    {
      "adjustedTax": 30,
      "basePrice": 199.99,
      "bonusProductLineItem": false,
      "gift": false,
      "itemId": "3d4e28425ce0b3a65b0ac4e163",
      "itemText": "Green Umbrella - Sustained Edition",
      "optionItems": [
        {
          "adjustedTax": 0,
          "basePrice": 0,
          "bonusProductLineItem": false,
          "gift": false,
          "itemId": "ff9452ed11fcf5c80f9143a8f1",
          "itemText": "We will plant a tree for your order.",
          "optionId": "plantATree",
          "optionValueId": "000",
          "price": 0,
          "priceAfterItemDiscount": 0,
          "priceAfterOrderDiscount": 0,
          "productId": "000",
          "productName": "Plant a tree.",
          "quantity": 3,
          "shipmentId": "me",
          "tax": 0,
          "taxBasis": 0,
          "taxClassId": "standard",
          "taxRate": 0.05
        }
      ],
      "price": 599.97,
      "priceAfterItemDiscount": 599.97,
      "priceAfterOrderDiscount": 599.97,
      "productId": "green-umbrella",
      "productName": "Green Umbrella - Sustained Edition",
      "quantity": 3,
      "shipmentId": "me",
      "tax": 30,
      "taxBasis": 599.97,
      "taxClassId": "standard",
      "taxRate": 0.05
    }
  ],
  "productSubTotal": 599.97,
  "productTotal": 599.97,
  "shipments": [
    {
      "adjustedMerchandizeTotalTax": 30,
      "adjustedShippingTotalTax": 0.8,
      "gift": false,
      "merchandizeTotalTax": 30,
      "productSubTotal": 599.97,
      "productTotal": 599.97,
      "shipmentId": "me",
      "shipmentTotal": 646.76,
      "shippingAddress": {
        "address1": "4911  Lincoln Street",
        "postalCode": "97350",
        "city": "IDANHA",
        "countryCode": "US",
        "firstName": "Ward J",
        "fullName": "Ward J Adamek",
        "id": "b3e1269a2c1d0ad56694206741",
        "lastName": "Adamek",
        "stateCode": "OR"
      },
      "shippingMethod": {
        "description": "Order received the next business day",
        "id": "003",
        "name": "Overnight",
        "price": 29.99
      },
      "shippingStatus": "not_shipped",
      "shippingTotal": 29.99,
      "shippingTotalTax": 1.5,
      "taxTotal": 36.5
    }
  ],
  "shippingItems": [
    {
      "adjustedTax": 1.5,
      "basePrice": 29.99,
      "itemId": "d5ed0e58b8f8b5efe8d617a630",
      "itemText": "Shipping",
      "price": 29.99,
      "priceAfterItemDiscount": 29.99,
      "shipmentId": "me",
      "tax": 1.5,
      "taxBasis": 29.99,
      "taxClassId": "standard",
      "taxRate": 0.05
    }
  ],
  "shippingTotal": 29.99,
  "shippingTotalTax": 1.5,
  "taxation": "net",
  "taxTotal": 36.5
}
  ```
  </TabItem>
  <TabItem value="400" label="400">

  The shipment with the given shipment ID is invalid or the customer assigned to the basket does not match the verified customer represented by the JSON Web Token (JWT).

    ```json
    {
  "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/bad-request",
  "title": "Bad Request",
  "detail": "Decoding of the property with path '$.failedExample.[1].intProperty' failed because the expected type is 'Integer|Decimal' but the actual type was 'String'."
}
  ```
  </TabItem>

  <TabItem value="404" label="404">

  The basket with the given basket ID is unknown.

    ```json
{
  "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/basket-not-found",
  "title": "Basket Not Found",
  "detail": "No basket with ID '123' could be found."
}
  ```
  </TabItem>
</Tabs>

## References

### Official Documentation
- commerce-sdk: [Checkout.ShopperBaskets.updateShippingMethodForShipment](https://salesforcecommercecloud.github.io/commerce-sdk/classes/checkout.shopperbaskets.html#updateshippingmethodforshipment)
- SCAPI: [updateShippingMethodForShipment](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-baskets?meta=updateShippingMethodForShipment)

