import { GenericEventsCollection } from './types'

export interface AnalyticsClient {
  track: (event: GenericEventsCollection) => void
}

export class GenericAnalyticsClient implements AnalyticsClient {
  track(event: GenericEventsCollection) {}
}
