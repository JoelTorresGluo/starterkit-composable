import { ComposableAnonymousUser } from '@oriuminc/commerce-generic'
import { NextApiRequest, NextApiResponse } from 'next'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import superjson from 'superjson'
import { ANONYMOUS_USER_COOKIE } from '../../constants'

export function getAnonymousSessionFromCookie(
  req?: NextApiRequest
): ComposableAnonymousUser | undefined {
  const anonymousTokenString = parseCookies({ req })[ANONYMOUS_USER_COOKIE]

  if (!anonymousTokenString) return undefined

  const anonymousTokenData =
    superjson.parse<ComposableAnonymousUser>(anonymousTokenString)

  if (
    !!anonymousTokenData &&
    !!anonymousTokenData.id &&
    !!anonymousTokenData.session
  ) {
    return anonymousTokenData
  } else {
    return undefined
  }
}

export const setAnonymousTokenCookie = ({
  res,
  anonymousUser,
}: {
  res: NextApiResponse | undefined
  anonymousUser: ComposableAnonymousUser
}) => {
  setCookie(
    { res },
    ANONYMOUS_USER_COOKIE,
    superjson.stringify(anonymousUser),
    {
      maxAge: 10 * 365 * 24 * 60 * 60, // 10 years
      sameSite: 'lax',
      path: '/',
      httpOnly: true,
    }
  )
}

export const clearAnonymousTokenCookie = (res: NextApiResponse) => {
  destroyCookie({ res }, ANONYMOUS_USER_COOKIE, { path: '/' })
}
