---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Logout Customer

## Purpose

This endpoint logs out a shopper by revoking the shopper's access token and refresh token. If the shopper authenticated with a B2C Commerce instance, the OCAPI JWT is also revoked. This endpoint is intended for registered users who have logged in using SLAS and is not for use with guest users.

## Example

<Tabs>
  <TabItem value="commerce-sdk" label="Commerce SDK">
    ```js
    const options = {
      fetchOptions: {
        method: 'GET'
      },
      headers: {
        'Authorization': 'Bearer {shopper_access_token}'
      },
      parameters: {
        client_id: 'z99ec276-cg53-4g94-cf72-76f300c6778zc',
        refresh_token: 'EnL9U2f3-WiVPwL60CFBI21UY_oxWAwX5JkgO-X12Vs',
        organizationId: 'f_ecom_zzxy_prd',
        channel_id: 'RefArch',
        hint: 'all-sessions'
      }
    }

    const response = await shopperLoginClient.logoutCustomer({ options });
    ```
  </TabItem>
  <TabItem value="scapi" label="SCAPI">
    ```http
    GET https://{shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/{organizationId}/oauth2/logout?client_id={client_id}&refresh_token={refresh_token}&channel_id={channel_id}&hint={hint}
    ```
  </TabItem>
</Tabs>

## Request

### URL

``GET https://{shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/{organizationId}/oauth2/logout?client_id={client_id}&refresh_token={refresh_token}&channel_id={channel_id}&hint={hint}&siteId={siteId}``

### Headers
- ``Authorization: Bearer {shopper_access_token}``

### URL Parameters

- ``shortCode`` *string*: A region-specific merchant identifier. **(required)**
  - Retrieved from Business Manager > Administration > Salesforce Commerce API Settings > Shortcode
  - Example: ``0dnz6ope``
- ``version`` *string*: API version identifier. **(required)**
  - Example: `v1`
- ``organizationId`` *string*: An identifier for the organization the request is being made by. **(required)**
  - Example: `f_ecom_zzxy_prd`

### Query Parameters

- ``channel_id`` *string*: The channel_id parameter must be provided if the shopper authenticated using the login endpoint with B2C Commerce. **(optional)**
  - Example: `RefArch`
- ``hint`` *string*: Optional parameter for logging out user sessions. Use all-sessions to log out all user sessions. If hint is not used, only the current user session will be logged out. **(optional)**
  - Example: `all-sessions`
- ``client_id`` *string*: The SLAS client ID. **(required)**
  - Example: `z99ec276-cg53-4g94-cf72-76f300c6778zc`
- ``refresh_token`` *string*: The refresh token that was given during the access token request. **(required)**
  - Example: `EnL9U2f3-WiVPwL60CFBI21UY_oxWAwX5JkgO-X12Vs`

### Request Body

N/A

## Response

<Tabs>
  <TabItem value="200" label="200">
  ```json
    {
        "access_token": "",
        "id_token": "null",
        "refresh_token": "EnL9U2f3-WiVPwL60CFBI21UY_oxWAwX5JkgO-X12Vs",
        "expires_in": 0,
        "refresh_token_expires_in": 0,
        "token_type": "Bearer",
        "usid": "null",
        "customer_id": "null",
        "enc_user_id": "null",
        "idp_access_token": ""
    }
  ```
  </TabItem>
  <TabItem value="400" label="400">

  Bad Request

    ```json
    {
        "error": "invalid_request",
        "error_description": "Bad or missing client_id."
    }

    ```
  </TabItem>

  <TabItem value="303" label="303">

 The user has sent too many requests in a given amount of time, and rate limiting is in effect.

  </TabItem>
   <TabItem value="401" label="401">
     Unauthorized
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
                "error_description": "The server has encountered a situation that it doesn't know how to handle."
            }
        ```
  </TabItem>
</Tabs>

## References

### Official Documentation
- commerce-sdk: [Customer.ShopperLogin.logoutCustomer](https://salesforcecommercecloud.github.io/commerce-sdk/classes/customer.shopperlogin.html#logoutcustomer)
- SCAPI: [logoutCustomer](https://developer.salesforce.com/docs/commerce/commerce-api/references/shopper-login?meta=logoutCustomer)

