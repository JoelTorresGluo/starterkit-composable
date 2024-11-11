import { createChannel } from '../service/channels'
import { localize } from '../utils/transformations'

export async function createChannels(stores: string[]) {
  return await Promise.all(
    stores.map(
      async (channel: string) => await createChannel(getChannelPayload(channel))
    )
  )
}

export const getChannelPayload = (channel: string) => ({
  key: `${channel}-channel`,
  roles: ['ProductDistribution', 'InventorySupply'],
  name: localize(`${channel} channel name`),
})
