import {
  ComposableAnonymousUser,
  GetAppRouterCommerceContext,
} from '@oriuminc/commerce-generic'
import axios from 'axios'
import { decode } from 'next-auth/jwt'
import { CommercetoolsCommerceClient } from '../../commerce-client'
import {
  ANONYMOUS_USER_COOKIE,
  COMMERCETOOLS_HOST,
  COMMERCETOOLS_PROJECT_KEY,
  COMMERCETOOLS_USER_SCOPED_CLIENT_ID,
  COMMERCETOOLS_USER_SCOPED_CLIENT_SECRET,
} from '../../constants'
import { getAnonymousAccessTokenService } from '../../services'
import { CtAccessTokenInterface } from '../../types'
import superjson from 'superjson'

export const getAppRouterCommercetoolsCommerceContext: GetAppRouterCommerceContext =
  async (params) => {
    const isStatic = params?.staticContext ?? false
    const client = CommercetoolsCommerceClient.getInstance()

    if (isStatic) {
      // during build, return only the client
      return { client }
    }

    // this import needs to be dynamic, or it will complain about importing outside of the app router
    const { cookies } = await import('next/headers')
    let cookieStore = cookies()

    // decode Next-auth cookie to get the session data
    const token = await decode({
      token:
        cookieStore?.get('__Secure-next-auth.session-token')?.value ||
        cookieStore?.get('next-auth.session-token')?.value,
      secret: process.env.NEXTAUTH_SECRET!,
    })
    const customer = token?.customer
    // if there is a customer session, return the customer object
    if (customer) {
      try {
        // make sure to clear the anonymous session cookie
        cookieStore?.delete(ANONYMOUS_USER_COOKIE)
      } catch (ignored) {
        // if calling from a static page, trying to set cookies will throw, ignore it
      }
      return {
        client,
        customer: {
          id: customer?.id,
          firstName: customer?.firstName ?? undefined,
          lastName: customer?.lastName ?? undefined,
          email: customer?.email,
          customerGroup: customer?.customerGroupId ?? undefined,
          session: token?.auth_token
            ? {
                accessToken: token.auth_token.access_token,
                refreshToken: token.auth_token.refresh_token,
              }
            : undefined,
        },
      }
    }

    const anonymousUserCookie = cookieStore?.get(ANONYMOUS_USER_COOKIE)?.value
    // if there is a previous anonymous session, return the anonymousUser
    if (anonymousUserCookie) {
      return {
        client,
        anonymousUser: superjson.parse(anonymousUserCookie),
      }
    }

    // else, create a new anonymous session
    const anonymousToken = await getAnonymousAccessTokenService({
      httpClient: axios.create(),
      params: {
        projectKey: COMMERCETOOLS_PROJECT_KEY,
        clientId: COMMERCETOOLS_USER_SCOPED_CLIENT_ID,
        clientSecret: COMMERCETOOLS_USER_SCOPED_CLIENT_SECRET,
        host: COMMERCETOOLS_HOST,
      },
    })

    const anonymousUserId = getAnonymousIdFromToken(anonymousToken)
    const anonymousUser: ComposableAnonymousUser = {
      id: anonymousUserId!,
      session: {
        accessToken: anonymousToken.access_token,
        refreshToken: anonymousToken.refresh_token,
      },
    }

    try {
      // store the anonymous user in a cookie for future requests
      cookieStore?.set(
        ANONYMOUS_USER_COOKIE,
        superjson.stringify(anonymousUser)
      )
    } catch (ignored) {
      // if calling from a static page, trying to set cookies will throw, ignore it
    }

    return {
      client,
      anonymousUser,
    }
  }

/**
 * Given a token, finds the anonymous id using the "scope" field.
 */
export const getAnonymousIdFromToken = (token: CtAccessTokenInterface) => {
  return token.scope
    .split(' ')
    .find((scope) => scope.includes('anonymous_id:'))
    ?.split('anonymous_id:')?.[1]
}
