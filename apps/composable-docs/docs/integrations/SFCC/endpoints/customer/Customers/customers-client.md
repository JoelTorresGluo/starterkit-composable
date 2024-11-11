---
sidebar_position: 1
---

# Customers Client

The Customers client can be used to interact with the Customers Admin API. Methods exposed by this client are authenticated using an Admin API access token.

## Example

```js
import { Customer, ClientConfig } from "commerce-sdk";

const clientConfig: ClientConfig = {
  parameters: {
    clientId: "XXXXXX",
    organizationId: "XXXX",
    shortCode: "XXX",
    siteId: "XX"
  }
};

token = { access_token: 'INSERT_ACCESS_TOKEN_HERE' };

clientConfig.headers['authorization'] = `Bearer ${token.access_token}`;
const customersClient = new Customer.Customers(clientConfig);
```
