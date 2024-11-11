---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Authenticate Customer

## Purpose

This endpoint logs in a shopper with credentials that are managed by a B2C Commerce instance (ECOM). It follows the authorization code grant flow as defined by the OAuth 2.1 standard and uses a proof key for code exchange (PKCE).

## Example

<Tabs>
  <TabItem value="commerce-sdk" label="Commerce SDK">
    ```js
    const options = {
      body: {
        client_id: 'z99ec276-cg53-4g94-cf72-76f300c6778zc',
        response_type: 'code',
        redirect_uri: 'http://localhost:3000/callback',
        state: 'client-state',
        scope: 'openid|offline_access|email',
        usid: '18cda486-fe32-4e27-888b-6e4f89938e67',
        channel_id: 'RefArch',
        code_challenge: 'krc5G3_5lRUcXDUzFZQ88oJA_-ZmlHWkyGsgOrSLEWg'
      },
      headers: {
        'Authorization': 'Basic <Base64 encoded shopperUserID:shopperPassword>',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const response = await shopperLoginClient.authenticateCustomer({ options });
    ```
  </TabItem>
  <TabItem value="scapi" label="SCAPI">
    ```http
    POST https://{shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/{organizationId}/oauth2/login
    ```
  </TabItem>
</Tabs>

## Request

### URL

``POST https://{shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/{organizationId}/oauth2/login``

### Headers
- ``Authorization: Basic {shopper_credentials}``
    - Example: ``shopperUserID:shopperPassword`` (Base 64 Encoded)

:::note
    Base64-encoded string for HTTP Basic authentication. The string is composed of a shopperUserID and shopperPassword, separated by a colon (:), like this: shopperUserID:shopperPassword.
:::
- ``Content-Type: application/x-www-form-urlencoded``

### URL Parameters

- ``shortCode`` *string*: A region-specific merchant identifier. **(required)**
  - Example: ``0dnz6ope``
- ``organizationId`` *string*: An identifier for the organization the request is being made by. **(required)**
  - Example: `f_ecom_zzxy_prd`

### Request Body

```json
    {
        "client_id": "z99ec276-cg53-4g94-cf72-76f300c6778zc",
        "response_type": "code",
        "redirect_uri": "http://localhost:3000/callback",
        "state": "client-state",
        "scope": "openid offline_access email",
        "usid": "18cda486-fe32-4e27-888b-6e4f89938e67",
        "channel_id": "RefArch",
        "code_challenge": "krc5G3_5lRUcXDUzFZQ88oJA_-ZmlHWkyGsgOrSLEWg"
    }
```

### Attributes

- ``client_id`` *string*: The SLAS client ID. **(required)**
  - Example: `z99ec276-cg53-4g94-cf72-76f300c6778zc`
- ``response_type`` *string*: Must be `code`. **(required)**
- ``redirect_uri`` *string*: The URI to which the server redirects the browser after the user grants the authorization. **(required)**
  - Example: `http://localhost:3000/callback`
- ``state`` *string*: Value to be sent by the client to determine the state between the authorization request and the server response. **(optional, but strongly recommended)**
  - Example: `client-state`
- ``scope`` *string*: Scopes to limit an application's access to a user's account. **(optional)**
  - Example: `openid|offline_access|email`
- ``usid`` *string*: The unique shopper ID. **(optional)**
  - Example: `18cda486-fe32-4e27-888b-6e4f89938e67`
- ``channel_id`` *string*: The channel that the request is for. **(required)**
  - Example: `RefArch`
- ``code_challenge`` *string*: PKCE code verifier. **(required)**
  - Example: `krc5G3_5lRUcXDUzFZQ88oJA_-ZmlHWkyGsgOrSLEWg`

## Response

<Tabs>
  <TabItem value="303" label="303">
    ```json
        {
            "authorizationCode": "eyJ2ZXIiOiIxLjAiLCJraWQiOiJTTEFTIiwidHlwIjoiand0IiwiY2x2IjoiS",
            "usid": "156c4e69-e89b-406b-a4b7-576980bb234e"              
        }

    ```
  </TabItem>
  <TabItem value="400" label="400">

    ```json
        {
            "error": "invalid_request",
            "error_description": "Bad or missing client_id."
        }
    ```
  </TabItem>

  <TabItem value="401" label="401">
    ```json
    {
        "error": "invalid_client",
        "error_description": "Basic Authorization failed."
    }
    ```
  </TabItem>
  <TabItem value="500" label="500">
    ```json
       {
            "error": "server_error",
            "error_description": "The server has encountered a situation that it doesn't know how to handle.
        }
    ```
  </TabItem>
   <TabItem value="409" label="409">
    ```json
    {
        "error": "conflict",
        "error_description": "The same loginId and tenantId tried to login twice within 1 second."
    }
    ```
  </TabItem>
</Tabs>

## References

### Official Documentation
- commerce-sdk: [Customer.ShopperLogin.authenticateCustomer](https://salesforcecommercecloud.github.io/commerce-sdk/classes/customer.shopperlogin.html#authenticatecustomer)
- SCAPI: [authenticateCustomer](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-login?meta=authenticateCustomer)

