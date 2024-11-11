---
sidebar_position: 3
---

# Segment

## Configuration
If you don't have a Segment account or haven't configured a Source yet, follow the [Basic Segment Installation](https://segment.com/docs/getting-started/02-simple-install/) guide.
Add the following environment variables:
```bash
NEXT_PUBLIC_ANALYTICS_ENGINE=segment
NEXT_PUBLIC_SEGMENT_WRITE_KEY=your_segment_key
```

## Events Payload Structure
See Segment's [Ecommerce Events](https://segment.com/docs/connections/spec/ecommerce/v2/).

### Example (add_to_cart event)
```javascript
// packages/analytics/src/segment/client.ts

// the SegmentAnalyticsClient class extends the GenericAnalyticsClient, 
// which declares the track function
export class SegmentAnalyticsClient extends GenericAnalyticsClient {
    track(event: GenericEventsCollection) {
        const segmentEvent = castToSegmentEvent(event)
        if (segmentEvent) {
            segmentTrackEvent(segmentEvent)
        }
    }
}
```

```javascript
// packages/analytics/src/segment/segment-event-mapping.ts
export function castToSegmentEvent(
    event: GenericEventsCollection
): SegmentEventsCollection | undefined {
    switch (event.name) {
        case 'add_to_cart':
            return castAddToCartEvent(event)
        // ...
    }
}

// map the generic event to the recommended payload
function castAddToCartEvent({
    params,
}: GenericAddToCartEvent): SegmentProductAddedEvent {
    const item = params?.items[0]
    return {
        name: 'Product Added',
        params: {
            brand: item?.brand,
            cart_id: params?.cart_id,
            category1: item?.categories?.[0],
            category2: item?.categories?.[1],
            category3: item?.categories?.[2],
            image_url: item?.image_url,
            name: item?.name,
            position: item?.index,
            price: item?.price,
            product_id: item?.id,
            quantity: item?.quantity,
            size: item?.size,
            sku: item?.sku,
            source: item?.source,
            url: item?.product_url,
            variant: item?.variant,
            list_id: item?.list_id,
            list_name: item?.list_name,
        },
    }
}
```


