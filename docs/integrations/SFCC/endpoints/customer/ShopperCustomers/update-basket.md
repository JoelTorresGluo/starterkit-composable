---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Update Basket

## Purpose

This endpoint updates a basket within SFCC. Only the currency of the basket, source code, the custom properties of the basket, and the shipping items will be considered.

## Example

<Tabs>
  <TabItem value="commerce-sdk" label="Commerce SDK">
    ```js
    const options = {
      body: {
        customerInfo: {
          email: 'shopper@salesforce-test.com',
          customerNo: '000000001'
        },
        billingAddress: {
          firstName: 'Stephanie',
          lastName: 'Miller',
          address1: '104 Presidential Way',
          city: 'Woburn',
          postalCode: '01801',
          stateCode: 'MA',
          countryCode: 'US'
        },
        shipments: [
          {
            shippingMethod: {
              id: '001'
            },
            shippingAddress: {
              firstName: 'Agustin',
              lastName: 'Estes',
              address1: '4162 Turkey Pen Road',
              city: 'New York',
              postalCode: '10016',
              stateCode: 'NY',
              countryCode: 'US'
            }
          }
        ],
        paymentInstruments: [
          {
            paymentMethodId: 'CREDIT_CARD',
            paymentCard: {
              cardType: 'Visa'
            }
          }
        ],
        couponItems: [
          {
            code: '5ties'
          }
        ],
        productItems: [
          {
            productId: 'green-umbrella',
            quantity: 3
          }
        ]
      },
      fetchOptions: {
        method: 'PATCH'
      },
      headers: {
        'Content-Type': 'application/json'
      },
      parameters: {
        basketId: 'a10ff320829cb0eef93ca5310a',
        locale: 'en-US',
        organizationId: 'org456',
        siteId: 'SiteGenesis'
      }
    }
    const updatedBasket = await shopperCustomersClient.updateBasket({ options });
    ```
  </TabItem>
  <TabItem value="scapi" label="SCAPI">
    ```http
    PATCH https://{shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v2/organizations/{organizationId}/baskets/{basketId}?siteId=SiteGenesis
    ```
  </TabItem>
</Tabs>

## Request

### URL

``PATCH https://{shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v2/organizations/{organizationId}/baskets/{basketId}``

### Headers
- ``Authorization: Bearer {slas_token}``
- ``Content-Type: application/json``

### URL Parameters

- ``shortCode`` *string*: A region-specific merchant identifier. **(required)**
  - Retrieved from Business Manager > Administration > Salesforce Commerce API Settings > Shortcode
  - Example: ``0dnz6oep``
- ``organizationId`` *string*: The identifier for the organization. **(required)**
  - Retrieved from Business Manager > Administration > Salesforce Commerce API Settings > organization ID
- ``basketId`` *string*: The ID of the basket to be modified. **(required)**
  - Example: ``a10ff320829cb0eef93ca5310a``

### Query Parameters

- ``siteId`` *string*: Identifies the site context of the request. Attributes may have site-specific values. **(required)**
  - Example: `SiteGenesis`
- ``locale`` *string*: A descriptor to provide locale context for a geographical region by both a language and/or country code. **(optional)**
  - Example: `en-US`
- ``removeExternalTax`` *boolean*: Determines how taxes are calculated. **(optional)**
  - Example: `false`

### Request Body

```json
{
  "customerInfo": {
    "email": "shopper@salesforce-test.com",
    "customerNo": "000000001"
  },
  "billingAddress": {
    "firstName": "Stephanie",
    "lastName": "Miller",
    "address1": "104 Presidential Way",
    "city": "Woburn",
    "postalCode": "01801",
    "stateCode": "MA",
    "countryCode": "US"
  },
  "shipments": [
    {
      "shippingMethod": {
        "id": "001"
      },
      "shippingAddress": {
        "firstName": "Agustin",
        "lastName": "Estes",
        "address1": "4162 Turkey Pen Road",
        "city": "New York",
        "postalCode": "10016",
        "stateCode": "NY",
        "countryCode": "US"
      }
    }
  ],
  "paymentInstruments": [
    {
      "paymentMethodId": "CREDIT_CARD",
      "paymentCard": {
        "cardType": "Visa"
      }
    }
  ],
  "couponItems": [
    {
      "code": "5ties"
    }
  ],
  "productItems": [
    {
      "productId": "green-umbrella",
      "quantity": 3
    }
  ],
  "c_textValue": "oak"
}
```

## Attributes

- ``adjustedMerchandizeTotalTax`` *number*: The total tax on products in the basket, including item-level price adjustments.
  - Example: ``30``
- ``adjustedShippingTotalTax** *number*: The total tax on shipping charges in the basket, including shipping price adjustments.
  - Example: ``0.8``
- ``agentBasket`` *boolean*: Indicates if the basket was created by an agent.
  - Example: ``false``
- ``basketId`` *string*: The unique identifier for the basket.
  - Example: ``a10ff320829cb0eef93ca5310a``
- ``billingAddress`` *OrderAddress*: The billing address.
- ``bonusDiscountLineItems`` *Array BonusDiscountLineItem*: The bonus discount line items.
- ``channelType`` *string*: The sales channel.
  - Example: ``storefront``
- ``couponItems`` *Array CouponItem*: The coupon items.
- ``currency`` *string*: The ISO 4217 mnemonic code of the currency.
  - Example: ``USD``
- ``customerInfo`` *CustomerInfo*: The customer information, if the customer is logged in.
- ``giftCertificateItems`` *Array GiftCertificateItem*: The gift certificate line items.
- ``groupedTaxItems`` *Array GroupedTaxItem*: Tax values grouped and summed based on the tax rate.
- ``inventoryReservationExpiry`` *datetime*: The expiration datetime of the inventory reservation.
  - Example: ``2019-10-18T08:29:55.340Z``
- ``merchandizeTotalTax`` *number*: The total products tax in the purchase currency.
  - Example: ``30``
- ``notes`` *SimpleLink*: The notes.
- ``orderPriceAdjustments`` *Array PriceAdjustment*: The order-level price adjustments.
- ``orderTotal`` *number*: The total price, including products, shipping, and tax.
  - Example: ``646.76``
- ``paymentInstruments`` *Array OrderPaymentInstrument*: The payment instruments list.
- ``productItems`` *Array ProductItem*: The product items.
- ``productSubTotal`` *number*: The total price of all products, including item-level adjustments, but not including order-level adjustments or shipping charges.
  - Example: `599.97`
- ``productTotal`` *number*: The total price of all products, including adjustments, but not including shipping charges.
  - Example: ``599.97``
- ``shipments`` *Array Shipment*: The shipments.

## Response

<Tabs>
  <TabItem value="200" label="200">
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
        "address1": "4162  Turkey Pen Road",
        "city": "New York",
        "countryCode": "US",
        "firstName": "Agustin",
        "fullName": "Agustin Estes",
        "id": "4432af77112f7c2433248a48e8",
        "lastName": "Estes",
        "postalCode": "10016",
        "stateCode": "NY"
      },
      "shippingMethod": {
        "description": "Order received within 7-10 business days",
        "id": "001",
        "name": "Ground",
        "price": 15.99
      },
      "shippingStatus": "not_shipped",
      "shippingTotal": 15.99,
      "shippingTotalTax": 0.8,
      "taxTotal": 30.8
    }
  ],
  "shippingItems": [
    {
      "adjustedTax": 0.8,
      "basePrice": 15.99,
      "itemId": "d5ed0e58b8f8b5efe8d617a630",
      "itemText": "Shipping",
      "price": 15.99,
      "priceAfterItemDiscount": 15.99,
      "shipmentId": "me",
      "tax": 0.8,
      "taxBasis": 15.99,
      "taxClassId": "standard",
      "taxRate": 0.05
    }
  ],
  "shippingTotal": 15.99,
  "shippingTotalTax": 0.8,
  "taxation": "net",
  "taxTotal": 30.8
}
  ```
  </TabItem>

  <TabItem value="404" label="404">

  Shipment ID is unknown.

    ```json
 {
  "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/shipment-not-found",
  "title": "Shipment Not Found",
  "detail": "The shipping method with ID '123' is unknown or can't be applied to the basket."
}
  ```
  </TabItem>
  <TabItem value="400" label="400">

  - The provided payment method is invalid or not applicable.
  - The `customerId` URL parameter does not match the verified customer represented by the JSON Web Token (JWT).
  - A new basket cannot be created because the maximum number of baskets per customer would be exceeded.
  - A new temporary basket cannot be created because the maximum number of temporary baskets per customer would be exceeded.
  - The same shipment ID appeared twice in the body.
  - The coupon number is not provided.
  - A fixed price adjustment was added at order level which is disallowed.
  - A promotion ID was used twice while attempting to add a price adjustment.
  - A system promotion ID was used as a manual promotion ID while attempting to add a price adjustment.
  - More than one hundred price adjustments would have been created.

```json
    {
        "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/bad-request",
        "title": "Bad Request",
        "detail": "Decoding of the property with path '$.failedExample.[1].intProperty' failed because the expected type is 'Integer|Decimal' but the actual type was 'String'."
    }
  ```
  </TabItem>
</Tabs>

## References

### Official Documentation
- commerce-sdk: [Checkout.ShopperBaskets.createBasket](https://salesforcecommercecloud.github.io/commerce-sdk/classes/checkout.shopperbaskets.html#createbasket)
- SCAPI: [createBasket](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-baskets-v2?meta=createBasket)
