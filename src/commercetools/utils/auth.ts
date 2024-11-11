import axios from 'axios'
import { getAccessToken } from '../service/auth'
import { CT_CLIENT_CREDENTIALS } from '../config'

const { CLIENT_ID, CLIENT_SECRET } = CT_CLIENT_CREDENTIALS
export const login = async () => {
  const accessToken = await getAccessToken(CLIENT_ID, CLIENT_SECRET)
  setDefaultHeader(
    'Authorization',
    `${accessToken.token_type} ${accessToken.access_token}`
  )
}

const setDefaultHeader = (key: string, value: string) => {
  axios.defaults.headers.common[key] = value
}
