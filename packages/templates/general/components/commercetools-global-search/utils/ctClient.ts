import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import {
  AuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2'
import {
  COMMERCETOOLS_CLIENT_ID,
  COMMERCETOOLS_CLIENT_SECRET,
  COMMERCETOOLS_HOST,
  COMMERCETOOLS_PROJECT_KEY,
  SdkClient,
} from '../shared'

export const createSdkClient = (): SdkClient => {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: `https://auth.${COMMERCETOOLS_HOST}`,
    projectKey: COMMERCETOOLS_PROJECT_KEY,
    credentials: {
      clientId: COMMERCETOOLS_CLIENT_ID,
      clientSecret: COMMERCETOOLS_CLIENT_SECRET,
    },
    fetch,
  }

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: `https://api.${COMMERCETOOLS_HOST}`,
    fetch,
  }

  return createApiBuilderFromCtpClient(
    new ClientBuilder()
      .withProjectKey(COMMERCETOOLS_PROJECT_KEY)
      .withClientCredentialsFlow(authMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build()
  ).withProjectKey({ projectKey: COMMERCETOOLS_PROJECT_KEY })
}
