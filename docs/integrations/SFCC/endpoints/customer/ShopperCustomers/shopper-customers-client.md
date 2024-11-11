---
sidebar_position: 1
---

# ShopperCustomers Client

The ShopperCustomers client can be used to interact with the Shopper Customers API. Methods exposed by this client are authenticated against a Customer JWT in the context of a shopper.

## Example

```js
import { Customer, ClientConfig, slasHelpers } from "commerce-sdk";

const clientConfig: ClientConfig = {
  parameters: {
    clientId: "XXXXXX",
    organizationId: "XXXX",
    shortCode: "XXX",
    siteId: "XX"
  }
};

const slasClient = new Customer.ShopperLogin(clientConfig);
const token = await slasHelpers.loginGuestUser(slasClient, { redirectURI });

clientConfig.headers['authorization'] = `Bearer ${token.access_token}`;
const shopperCustomersClient = new Customer.ShopperCustomers(clientConfig);
```