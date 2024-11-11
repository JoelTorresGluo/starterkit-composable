import {
  ComposableAnonymousUser,
  GetCommerceContext,
} from '@oriuminc/commerce-generic'
import axios from 'axios'
import { getToken } from 'next-auth/jwt'
import { CommercetoolsCommerceClient } from '../../commerce-client'
import {
  COMMERCETOOLS_HOST,
  COMMERCETOOLS_PROJECT_KEY,
  COMMERCETOOLS_USER_SCOPED_CLIENT_ID,
  COMMERCETOOLS_USER_SCOPED_CLIENT_SECRET,
} from '../../constants'
import { getAnonymousAccessTokenService } from '../../services'
import { CtAccessTokenInterface } from '../../types'
import {
  clearAnonymousTokenCookie,
  getAnonymousSessionFromCookie,
  setAnonymousTokenCookie,
} from '../../utils'

export const getCommercetoolsCommerceContext: GetCommerceContext = async (
  params
) => {
  const client = CommercetoolsCommerceClient.getInstance()
  // if no (req, res) params just return the client (for SSG)
  if (params === undefined) return { client }

  const { req, res } = params
  const token = await getToken({ req })
  const customer = token?.customer
  // if there is a customer session, return the customer object
  if (customer) {
    // make sure to clear the anonymous session cookie
    clearAnonymousTokenCookie(res)
    return {
      client,
      customer: {
        id: customer.id,
        firstName: customer.firstName ?? undefined,
        lastName: customer.lastName ?? undefined,
        email: customer.email,
        customerGroup: customer.customerGroupId ?? undefined,
        session: token?.auth_token
          ? {
              accessToken: token.auth_token.access_token,
              refreshToken: token.auth_token.refresh_token,
            }
          : undefined,
      },
    }
  }

  const anonymousUserCookie = getAnonymousSessionFromCookie(req)
  // if there is a previous anonymous session, return the anonymousUser
  if (anonymousUserCookie) {
    return {
      client,
      anonymousUser: anonymousUserCookie,
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

  // store the anonymous user in a cookie for future requests
  setAnonymousTokenCookie({ anonymousUser, res })

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
