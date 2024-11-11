import {
  AnalyticsEngine,
  GoogleAnalyticsScript,
  GoogleTagManagerScript,
  SegmentScript,
  BloomreachEngagementScript,
} from '@oriuminc/analytics'

export const ANALYTICS_ENGINE = process.env.NEXT_PUBLIC_ANALYTICS_ENGINE as
  | AnalyticsEngine
  | undefined

export interface AnalyticsScriptProps {
  customer?: {
    email: string
  }
}

export const AnalyticsScript = ({ customer }: AnalyticsScriptProps) => {
  return (
    <>
      {ANALYTICS_ENGINE === 'bloomreach-engagement' && (
        <BloomreachEngagementScript
          customer={customer}
          token={process.env.NEXT_PUBLIC_BLOOMREACH_ENGAGEMENT_TOKEN}
        />
      )}
      {ANALYTICS_ENGINE === 'gtm' && (
        <GoogleTagManagerScript
          googleTagManagerId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}
        />
      )}
      {ANALYTICS_ENGINE === 'ga4' && (
        <GoogleAnalyticsScript
          googleAnalyticsId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}
        />
      )}
      {ANALYTICS_ENGINE === 'segment' && (
        <SegmentScript
          segmentWriteKey={process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY}
        />
      )}
    </>
  )
}
