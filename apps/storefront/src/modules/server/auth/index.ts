import { commerceProvider } from '@modules/providers/commerce'
import { getServerSession } from 'next-auth'

export const getServerAuthSession = () =>
  getServerSession(commerceProvider.authOptions!)
