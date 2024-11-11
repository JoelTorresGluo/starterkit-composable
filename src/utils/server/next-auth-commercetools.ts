import axios from 'axios'
import type { NextAuthOptions, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import {
  COMMERCETOOLS_HOST,
  COMMERCETOOLS_PROJECT_KEY,
  COMMERCETOOLS_USER_SCOPED_CLIENT_ID,
  COMMERCETOOLS_USER_SCOPED_CLIENT_SECRET,
} from '../../constants'
import {
  customerLogin,
  getAuthAccessTokenService,
  getLastCartForUser,
} from '../../services'
import { createSdkClient } from '../sdk'
import { getAnonymousSessionFromCookie } from './auth-cookies'
import { expiresAtMs } from './token-expiry'

/* This file implements a Next-Auth stack tailored to commercetools.

- `CommercetoolsCredentialsProvider` - Implements a `CredentialsProvider` with respect to commercetools customer accounts.
- `authOptions` - A next config for commercetools;  implements `jwt`/`session` callbacks along with JWT token refresh. Supported by:
  - `selectJwtFieldsFromAuthenticatingUser` - Extracts fields from the authenticating user that are to be included in the JWT.
  - `maybeRefreshJwt` - Try to return an existing, 'fresh' JWT (refreshing if expiring soon), or undefined.
 */

/** A {@link CredentialsProvider} backed by commercetools' customer & authentication APIs.
 *
 * The implementation function `authorize(credentials, req)` logs in a user (merging any anonymous carts),
 * before returning a transient `User` object of profile & auth token data for {@link authOptions} `jwt()`.
 */
const CommercetoolsCredentialsProvider = CredentialsProvider({
  credentials: {
    username: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },
  name: 'Credentials',
  async authorize(credentials, req) {
    if (!credentials) {
      return null
    }

    // Get the user auth token: https://docs.commercetools.com/api/authorization#password-flow
    const authToken = await getAuthAccessTokenService({
      httpClient: axios.create(),
      params: {
        username: credentials.username,
        password: credentials.password,
        projectKey: COMMERCETOOLS_PROJECT_KEY,
        clientId: COMMERCETOOLS_USER_SCOPED_CLIENT_ID,
        clientSecret: COMMERCETOOLS_USER_SCOPED_CLIENT_SECRET,
        host: COMMERCETOOLS_HOST,
      },
    })

    const client = createSdkClient()

    /**
     * hasPreviousActiveCart is checked in order to determine whether to:
     * - Merge the cart (for when there's a previous active customer cart)
     * - Use the anonymous cart as the new active customer cart (for when there are no previous active customer cart)
     *
     * This is required because the commercetools API cart merge process doesnt transfer some properties
     * (like the "locale") to a fresh cart. In this scenario we opt to transfer the current anonymous cart,
     * to the customers, instead of creating a new one.
     */
    const hasPreviousActiveCart = Boolean(
      await getLastCartForUser({
        client,
        customerId: getCustomerIdFromScope(authToken.scope),
        locale: req.body?.locale,
      })
    )

    // @ts-ignore -- NextAuth underscribes the available fields on req
    let anonymousUser = getAnonymousSessionFromCookie(req)

    // will merge the anonymous cart to the last customer cart, if needed
    const customer = await customerLogin({
      client,
      email: credentials.username,
      password: credentials.password,
      anonymousUserId: anonymousUser?.id,
      mergeCart: hasPreviousActiveCart,
    })

    return {
      id: customer.id,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      customerGroupId: customer.customerGroup?.id,
      authToken,
      expiresAt: expiresAtMs(authToken.expires_in),
    }
  },
})

/** Extracts fields from the authenticating user that are to be included in the JWT. */
function selectJwtFieldsFromAuthenticatingUser(user: User): JWT {
  const jwtFields = {
    auth_token: user.authToken,
    refresh_token: user.authToken.refresh_token,
    expires_at: user.expiresAt,
    customer: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      customerGroupId: user.customerGroupId,
    },
  }
  return jwtFields
}

/** A Next-Auth configuration tailored to commercetools.
 *
 * * `jwt(...)` – Manages JWT lifecycle, invoked in one of two ways, either:
 *    * `{ !user, token }` –> Returns the existing token (possibly refreshed)
 *    * `{ user, Partial<token> }` -> Returns a new token context, extracting fields from the results of `CommerceToolsCredentialProvider.authorize()`.
 * * `session(...)` – Manages the session, lifting user-facing customer profile data forwarded by `jwt()`.
 */
export const authOptions: NextAuthOptions = {
  pages: {},
  callbacks: {
    async jwt({ user, token }) {
      if (!!user) {
        // During a login `user` is present once (and only once!)
        // If so, extract supplemental fields to be included/encrypted in the JWT.
        return {
          ...token,
          ...selectJwtFieldsFromAuthenticatingUser(user),
        }
      }
      return token
    },
    session({ session, token }) {
      if (token.customer) {
        // When a user is logged in...
        // Lift any *safe*, user-facing customer profile data to the session.
        session.user = {
          ...token.customer,
        }
      }

      return session
    },
  },
  providers: [CommercetoolsCredentialsProvider],
}

const getCustomerIdFromScope = (rawScopes: string) => {
  return rawScopes
    .split(' ')
    .find((scope) => scope.startsWith('customer_id:'))
    ?.split('customer_id:')?.[1]
}
