import { CtAccessTokenInterface, CtServiceDeps } from '../../types'
import { HttpClientRequired } from '../../utils'
import qs from 'qs'

export const getAuthAccessTokenService = async ({
  httpClient,
  params,
}: Omit<
  CtServiceDeps<{
    username: string
    password: string
    projectKey: string
    clientId: string
    clientSecret: string
    host: string
  }>,
  'token'
>) => {
  if (!httpClient) {
    throw new HttpClientRequired()
  }

  const res = await httpClient.post<CtAccessTokenInterface>(
    `https://auth.${params?.host}/oauth/${params?.projectKey}/customers/token`,
    qs.stringify({
      grant_type: 'password',
      username: params?.username,
      password: params?.password,
    }),
    {
      auth: {
        username: params?.clientId ?? '',
        password: params?.clientSecret ?? '',
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      baseURL: undefined,
    }
  )

  return res.data
}
