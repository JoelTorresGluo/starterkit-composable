---
sidebar_position: 1
---

# Campaigns Client 

The Campaigns client can be used to interact with the Campaigns Admin API. Methods exposed by this client are authenticated using an Admin API access token. This client facilitates the management of campaign experiences for customers.

## Example

```js
import { Pricing, ClientConfig } from "commerce-sdk";
// or
const { Pricing, ClientConfig } = require("commerce-sdk");

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

const campaignsClient = new Pricing.Campaigns(clientConfig);
