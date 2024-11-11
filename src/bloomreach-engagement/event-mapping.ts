import { GenericEventsCollection } from '../generic'

export function castToBloomreachEngagementEvent(
  event: GenericEventsCollection
): GenericEventsCollection | undefined {
  // So far we just forward the generic events as it. Here we can do any desired mapping
  switch (event.name) {
    default:
      return event
  }
}
