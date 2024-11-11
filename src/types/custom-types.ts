import { AxiosInstance } from 'axios'

export interface CtServiceDeps<T extends {} = {}> {
  currency?: string
  httpClient?: AxiosInstance
  params?: T
  token: string
}

export interface CtAccessTokenInterface {
  access_token: string
  expires_in: number // seconds
  refresh_token?: string
  scope: string
  token_type: 'Bearer'
}
