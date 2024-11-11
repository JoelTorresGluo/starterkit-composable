---
sidebar_position: 1
---

# Products Client

The Products client can be used to interact with the Admin Products API. Methods exposed by this client are authenticated against an admin access token.

## Example

```js
import { Product, ClientConfig } from "commerce-sdk";

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
const productsClient = new Product.Products(clientConfig);
```