import { commerceProvider } from '@modules/providers/commerce'
import NextAuth from 'next-auth'

// eslint-disable-next-line
const handler = NextAuth(commerceProvider.authOptions!)
export { handler as GET, handler as POST }
