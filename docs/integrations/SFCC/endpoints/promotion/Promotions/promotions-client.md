---
sidebar_position: 1
---

# Promotions Client

The Promotions client can be used to interact with the Promotions Admin API. Methods exposed by this client are authenticated using an Admin API access token.

## Example

```js
import { Pricing, ClientConfig } from "commerce-sdk";

const clientConfig: ClientConfig = {
  parameters: {
    clientId: "XXXXXX",
    organizationId: "XXXX",
    shortCode: "XXX",
    siteId: "XX"
  }
};

const token = { access_token: 'INSERT_ACCESS_TOKEN_HERE' };
clientConfig.headers = {
    'authorization': `Bearer ${token.access_token}`
};

const promotionsClient = new Pricing.Promotions(clientConfig);
```
