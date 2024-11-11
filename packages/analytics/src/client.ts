import { SegmentAnalyticsClient } from './segment'
import { GoogleAnalyticsClient } from './ga4'
import { AnalyticsEngine } from './types'
import { GenericAnalyticsClient } from './generic'
import { BloomreachEngagementClient } from './bloomreach-engagement'

const analyticsEngine = process.env.NEXT_PUBLIC_ANALYTICS_ENGINE?.toString() as
  | AnalyticsEngine
  | undefined

export const analyticsClient =
  analyticsEngine === 'bloomreach-engagement'
    ? new BloomreachEngagementClient()
    : analyticsEngine === 'segment'
    ? new SegmentAnalyticsClient()
    : analyticsEngine === 'ga4' || analyticsEngine === 'gtm'
    ? new GoogleAnalyticsClient() // GA4 and GTM implementations use the same client
    : new GenericAnalyticsClient()
