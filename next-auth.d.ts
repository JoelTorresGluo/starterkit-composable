import { type DefaultSession } from 'next-auth'

export type ComposableCustomerProfile = {
  id: string
  email: string
  firstName?: string | null
  lastName?: string | null
  customerGroupId?: string | null
}

// https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: ComposableCustomerProfile
  }

  /**
   * Returned by NextAuthCommerceToolsProvider's `authorize()` function.
   *
   * Use to transiently observe and persist customers' profile data.
   */
  interface User extends ComposableCustomerProfile {
    email: string
    authToken: {
      access_token: string
      expires_in: number
      refresh_token?: string
      scope?: string
      token_type?: 'Bearer'
    }
    expiresAt: number
  }
}

declare module 'next-auth/jwt' {
  /**
   * Returned by the `jwt` callback and `getToken`, when using JWT sessions
   */
  interface JWT {
    auth_token: {
      access_token: string
      expires_in: number
      refresh_token?: string
      scope?: string
      token_type?: 'Bearer'
    }
    expires_at: number
    customer?: ComposableCustomerProfile
    error?: 'RefreshAccessTokenError'
  }
}
