import { GenericAnalyticsClient, GenericEventsCollection } from '../generic'
import { castToSegmentEvent } from './segment-event-mapping'
import { segmentTrackEvent } from './utils'

export class SegmentAnalyticsClient extends GenericAnalyticsClient {
  track(event: GenericEventsCollection) {
    const segmentEvent = castToSegmentEvent(event)
    if (segmentEvent) {
      segmentTrackEvent(segmentEvent)
    }
  }
}
