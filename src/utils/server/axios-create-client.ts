import axios, { AxiosRequestConfig } from 'axios'
import { getApiUrl } from './get-api-url'

export const axiosCreateClient = (params: {
  host: string
  projectKey: string
  config?: AxiosRequestConfig
}) => {
  const apiUrl = getApiUrl(params.host, params.projectKey)
  return axios.create({
    baseURL: apiUrl,
    ...params.config,
  })
}
