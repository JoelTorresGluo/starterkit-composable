import { SegmentEventsCollection } from './types'

export function segmentTrackEvent(event: SegmentEventsCollection): void {
  ;(window as any)?.analytics?.track?.(event.name, event.params)
}
