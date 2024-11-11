import { CtAccessTokenInterface, CtServiceDeps } from '../../types'
import { HttpClientRequired } from '../../utils'
import qs from 'qs'

export const refreshAccessTokenService = async ({
  httpClient,
  params,
}: Omit<
  CtServiceDeps<{
    refreshToken: string
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
    `https://auth.${params?.host}/oauth/token`,
    qs.stringify({
      grant_type: 'refresh_token',
      refresh_token: params?.refreshToken,
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
