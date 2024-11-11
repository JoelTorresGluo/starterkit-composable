import { CtAccessTokenInterface, CtServiceDeps } from '../../types'
import { HttpClientRequired } from '../../utils'
import qs from 'qs'

export const getAnonymousAccessTokenService = async ({
  httpClient,
  params,
}: Omit<
  CtServiceDeps<{
    projectKey: string
    clientId: string
    clientSecret: string
    host: string
    scope?: string
  }>,
  'token'
>) => {
  if (!httpClient) {
    throw new HttpClientRequired()
  }
  const res = await httpClient.post<CtAccessTokenInterface>(
    `https://auth.${params?.host}/oauth/${params?.projectKey}/anonymous/token`,
    qs.stringify({
      grant_type: 'client_credentials',
      scope: params?.scope,
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
