---
sidebar_position: 1
---

# Orders Client

The Orders client can be used to interact with the Orders Admin API. Methods exposed by this client are authenticated using an Admin API access token.

## Example

```js
import { Checkout, ClientConfig } from "commerce-sdk";

const clientConfig: ClientConfig = {
  parameters: {
    clientId: "XXXXXX",
    organizationId: "XXXX",
    shortCode: "XXX",
    siteId: "XX"
  }
};

const token = { access_token: 'INSERT_ACCESS_TOKEN_HERE' };

clientConfig.headers['authorization'] = `Bearer ${token.access_token}`;
const ordersClient = new Checkout.Orders(clientConfig);
```
