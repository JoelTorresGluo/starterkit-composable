import { GenericAnalyticsClient, GenericEventsCollection } from '../generic'
import { castToGoogleAnalyticsEvent } from './ga-event-mapping'
import { gaTrackEvent } from './utils'

export class GoogleAnalyticsClient extends GenericAnalyticsClient {
  track(event: GenericEventsCollection) {
    const gaEvent = castToGoogleAnalyticsEvent(event)
    if (gaEvent) {
      gaTrackEvent(gaEvent)
    }
  }
}
