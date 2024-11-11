import { commercetoolsProvider } from '@oriuminc/commercetools'
import { getServerSession } from 'next-auth'

export const getServerAuthSession = () =>
  getServerSession(commercetoolsProvider.authOptions!)
