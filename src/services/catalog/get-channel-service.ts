import { SdkClient } from '../../types'

export const getChannelByKey = async ({
  client,
  channelKey,
}: {
  client: SdkClient
  channelKey: string
}) => {
  const results = await client
    .channels()
    .get({
      queryArgs: {
        where: `key="${channelKey}"`,
        limit: 1,
      },
    })
    .execute()
  return results.body.results?.[0]
}
