import { commercetoolsProvider } from '@oriuminc/commercetools'
import NextAuth from 'next-auth'

// eslint-disable-next-line
const handler = NextAuth(commercetoolsProvider.authOptions!)
export { handler as GET, handler as POST }
