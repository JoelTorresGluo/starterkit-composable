import axios from 'axios'
import { CT_BASE_URLS } from '../config'
const { AUTH_URL } = CT_BASE_URLS

export const getAccessToken = async (
  clientId: string,
  clientSecret: string
) => {
  return axios
    .post(
      `${AUTH_URL}/oauth/token`,
      {},
      {
        params: {
          grant_type: 'client_credentials',
        },
        auth: {
          username: clientId,
          password: clientSecret,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      console.log('Error trying to get access token', err.message)
      throw err
    })
}
