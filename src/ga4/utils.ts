import { GaEventsCollection } from './types'

export function gaTrackEvent(event: GaEventsCollection): void {
  ;(window as any)?.gtag?.('event', event.name, event.params)
}
