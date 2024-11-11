---
sidebar_position: 5
---

# Product Lists

Product Lists are lists of products that are managed and owned by a customer. They are typically used for Wish Lists, Shopping Lists or Gift Registries. Product lists can also be associated with a specific Event, in the case where users want to ship an order to the event location related to the product list.

Product lists can be owned by both anonymous and registered customers.

## Product List Types

| List Type     | Constant                         | Description              |
|---------------|----------------------------------|--------------------------|
| Gift Registry | `ProductList.TYPE_GIFT_REGISTRY` | Used for gift registries |
| Shopping List | `ProductList.TYPE_SHOPPING_LIST` | Used for shopping lists  |
| Wish List     | `ProductList.TYPE_WISH_LIST`     | Used for wish lists      |
| Custom 1      | `ProductList.TYPE_CUSTOM_1`      | Custom type              |
| Custom 2      | `ProductList.TYPE_CUSTOM_2`      | Custom type              |
| Custom 3      | `ProductList.TYPE_CUSTOM_3`      | Custom type              |

## Core Attributes

The following are the core attributes of a Product List:

- **coRegistrant** _(ProductListRegistrant)_: Identifies the co-registrant for the product list, such as in the case of a wedding registry
- **ID** _(string)_: The unique identifier for the product list (unique amongst the customer's product lists)
- **name** _(string)_: The display name that represents the product list on the storefront
- **owner** _(Customer)_: The owner (either guest or registered) who owns the product list
- **public** _(boolean)_: When true, the product list can be searched by other customers
- **productItems** _(ProductListItem[])_: The list of product items added to the Product List
- **publicItems** _(ProductListItem[])_: The list of product items that are available for public viewing (i.e not by the owner)
- **registrant** _(string)_: Identifies the registrant for the product list, such as in the case of a wedding registry
- **type** _(enum List Type)_: The type of product list

## Working with Product Lists

Product Lists can be managed using the B2C Commerce Script class [ProductList](https://salesforcecommercecloud.github.io/b2c-dev-doc/docs/current/scriptapi/html/index.html?target=class_dw_customer_ProductList.html) or using the [Product List](../endpoints/customer/ShopperCustomers/get-customer-product-list.md) SCAPI endpoints.

