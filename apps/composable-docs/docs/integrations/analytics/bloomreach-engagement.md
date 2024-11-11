---
sidebar_position: 4
---

# Bloomreach Engagement

## Configuration
Add the following environment variables:
```bash
NEXT_PUBLIC_ANALYTICS_ENGINE=bloomreach-engagement
NEXT_PUBLIC_BLOOMREACH_ENGAGEMENT_TOKEN=your_bloomreach_engagement_token
```

:::note
The token can be found in Bloomreach Engagement Dashboard's integration snippet: go to `Settings > Web integration` and grab the token from the snippet.
:::

## Code Example

```javascript
// packages/analytics/src/bloomreach-engagement/client.ts

// the BloomreachEngagementClient class extends the GenericAnalyticsClient, 
// which declares the track function
export class BloomreachEngagementClient extends GenericAnalyticsClient {
    track(event: GenericEventsCollection) {
        const _event = castToBloomreachEngagementEvent(event)
        if (_event) {
            ;(window as any)?.exponea?.track(_event.name, _event.params)
        }
    }
}
```

```javascript
// packages/analytics/src/bloomreach-engagement/event-mapping.ts
export function castToBloomreachEngagementEvent(
    event: GenericEventsCollection
): GenericEventsCollection | undefined {
    // Here you can do any desired mapping.
    // So far we just forward the generic events as is. 
    switch (event.name) {
        default:
            return event
    }
}
```


