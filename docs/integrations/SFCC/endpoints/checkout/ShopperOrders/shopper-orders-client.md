---
sidebar_position: 1
---

# ShopperOrders Client

The ShopperOrders client can be used to interact with the Shopper Orders API. Methods exposed by this client are authenticated against a Customer JWT in the context of a shopper.

## Example

```js
import { Checkout, ClientConfig, Customer, slasHelpers } from "commerce-sdk";

const clientConfig: ClientConfig = {
  parameters: {
    clientId: "XXXXXX",
    organizationId: "XXXX",
    shortCode: "XXX",
    siteId: "XX"
  }
};

const redirectURI = "http://localhost:3000/callback";
const slasClient = new Customer.ShopperLogin(clientConfig);
const token = await slasHelpers.loginGuestUser(slasClient, { redirectURI });

clientConfig.headers['authorization'] = `Bearer ${token.access_token}`;
const shopperOrdersClient = new Checkout.ShopperOrders(clientConfig);
```