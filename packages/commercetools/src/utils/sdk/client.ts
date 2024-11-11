import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { ClientBuilder } from '@commercetools/sdk-client-v2'
import {
  COMMERCETOOLS_ADMIN_CLIENT_ID,
  COMMERCETOOLS_ADMIN_CLIENT_SECRET,
  COMMERCETOOLS_HOST,
  COMMERCETOOLS_PROJECT_KEY,
} from '../../constants'

export const createSdkClient = () => {
  return createApiBuilderFromCtpClient(
    new ClientBuilder()
      .withProjectKey(COMMERCETOOLS_PROJECT_KEY)
      .withClientCredentialsFlow({
        host: `https://auth.${COMMERCETOOLS_HOST}`,
        projectKey: COMMERCETOOLS_PROJECT_KEY,
        credentials: {
          clientId: COMMERCETOOLS_ADMIN_CLIENT_ID,
          clientSecret: COMMERCETOOLS_ADMIN_CLIENT_SECRET,
        },
      })
      .withHttpMiddleware({ host: `https://api.${COMMERCETOOLS_HOST}` })
      .build()
  ).withProjectKey({ projectKey: COMMERCETOOLS_PROJECT_KEY })
}
