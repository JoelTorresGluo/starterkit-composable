import { NextApiRequest, NextApiResponse } from 'next'
import { CommerceClient } from './client'
import { ComposableAnonymousUser, ComposableCustomer } from './types'

export interface CommerceContext {
  client: CommerceClient
  customer?: ComposableCustomer
  anonymousUser?: ComposableAnonymousUser
}

export type GetCommerceContext = (params?: {
  req: NextApiRequest
  res: NextApiResponse
}) => Promise<CommerceContext>

export type GetAppRouterCommerceContext = (params?: {
  staticContext?: boolean
}) => Promise<CommerceContext>
