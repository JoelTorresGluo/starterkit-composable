---
sidebar_position: 6
---

# Session Bridging

## Overview

Session bridging allows user sessions to be transitioned between B2C Commerce Controllers (such as SFRA) and APIs (SCAPI/OCAPI) while maintaining session state (ex: basket items).

Session bridging involves relating a `dwsid` value (for B2C Commerce sessions) to a JWT access token (for headless sessions).

## Hybrid Setup Routing

When handling a hybrid setup, it is required to use CDN routing rules to direct the user to a specific environment by path. For example, the CDN might point URLs for homepage, PDP and PLP to the headless server, while checkout funnel is routed to the B2C Commerce instance.

## Session Bridging Flow

The detailed session bridging flow is outlined in the [Session Bridge Overview](https://developer.salesforce.com/docs/commerce/commerce-api/guide/slas-session-bridge-overview.html) documentation.

The flow is similar for guest users, registered users both new and returning, the primary difference is either using a refresh token or fetching a new access token.

On a high level, the flow is as follows:

### Headless Entry Point

1. Use SLAS to obtain a [JWT access token](../../endpoints/customer/ShopperLogin/get-access-token.mdx) and a refresh token.
2. Store the refresh token as a cookie for later use
3. Call the [OCAPI /sessions](https://developer.salesforce.com/docs/commerce/b2c-commerce/references/ocapi-shop-api?meta=Exchange%2BJWT) endpoint to retrieve a `dwsid` cookie (will be placed via `Set-Cookie`)
4. This session ID can be used in conjunction with the access token to perform requests against B2C Commerce, and when landing on the B2C commerce instance, the `dwsid` cookie will be used to fetch the same session.

### B2C Commerce Entry Point

1. Use SLAS to obtain a [JWT access token](../../endpoints/customer/ShopperLogin/get-access-token.mdx)
2. Store the refresh token as a cookie for later use
3. The `dwsid` cookie will automatically be placed in the user's browser by B2C Commerce

