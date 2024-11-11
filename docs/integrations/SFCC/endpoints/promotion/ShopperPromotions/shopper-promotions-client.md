---
sidebar_position: 1
---

# Shopper Promotions Client

The Shopper Promotions client allows interaction with the Shopper Promotions API to view details for active promotions. This client is authenticated using a shopper access token obtained via SLAS (Shopper Login and Signup Service).

## Example

```js
  import { Pricing, ClientConfig, Customer, slasHelpers } from "commerce-sdk";
  // or
  const { Pricing, ClientConfig, Customer, slasHelpers } = require("commerce-sdk");

  const clientConfig: ClientConfig = {
    parameters: {
      clientId: "XXXXXX",
      organizationId: "XXXX",
      shortCode: "XXX",
      siteId: "XX"
    }
  };

  // Authentication must be done through SLAS. On a server, the redirectURI is never called
  const redirectURI = "http://localhost:3000/callback";
  const slasClient = new Customer.ShopperLogin(clientConfig);
  const token = await slasHelpers.loginGuestUser(slasClient, { redirectURI });
  clientConfig.headers['authorization'] = `Bearer ${token.access_token}`;
  const shopperPromotionsClient = new Pricing.ShopperPromotions(clientConfig);
```
