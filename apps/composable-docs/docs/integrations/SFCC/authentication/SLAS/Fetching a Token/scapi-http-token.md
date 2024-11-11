---
sidebar_position: 2
---

# Using SLAS API

### 1. Generate Code Verifier and Challenge

The first step to get a token for a guest user is to generate the following strings:

- `code_verifier` - a random string
- `code_challenge` - a SHA-256 encoded version of `code_verifier`

These will be used to validate public clients using PKCE.

### 2. Authorization Code Request

Once `code_verifier` and `code_challenge` have been generated, use them to request an [authorization code](../../../endpoints/customer/ShopperLogin/authorize-customer.mdx) with the following parameters:

- **hint**: `guest`
- **response_type**: `code`
- **client_id**: `{slas_client_id}`
- **code_challenge**: `{code_challenge}`
- **redirect_uri**: `{redirect_uri}`

An authorization code will be sent to the redirect_uri in response.

### 3. Token Request

Make a request to the [access token](../../../endpoints/customer/ShopperLogin/get-access-token.mdx) endpoint with the following parameters:

- **grant_type**: `authorization_code_pkce`
- **code_verifier**: `{code_verifier}`
- **code**: `{authorization_code}`
- **client_id**: `{slas_client_id}`
- **redirect_uri**: `{redirect_uri}`
- **channel_id**: `{sfcc_site_id}`

The token endpoint will return a customer JWT, a customer ID, a USID and a refresh token.

### 4. JWT Validation

Use the `/getJwksUri` endpoint to validate the above JWT.

## References

- [Public Client Use Cases](https://developer.salesforce.com/docs/commerce/commerce-api/guide/slas-public-client.html)
