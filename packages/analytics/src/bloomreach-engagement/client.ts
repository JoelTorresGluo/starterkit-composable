import { GenericAnalyticsClient, GenericEventsCollection } from '../generic'
import { castToBloomreachEngagementEvent } from './event-mapping'

export class BloomreachEngagementClient extends GenericAnalyticsClient {
  track(event: GenericEventsCollection) {
    const _event = castToBloomreachEngagementEvent(event)
    if (_event) {
      ;(window as any)?.exponea?.track(_event.name, _event.params)
    }
  }
}
