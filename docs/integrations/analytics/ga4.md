---
sidebar_position: 1
---

# Google Analytics 4

## Configuration
Add the following environment variables:
```bash
NEXT_PUBLIC_ANALYTICS_ENGINE=ga4
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga4_id
```

## Events Payload Structure
For GA4 events payload reference check [GA4 Recommended events](https://support.google.com/analytics/answer/9267735?hl=en).

### Example (add_to_cart event)
```javascript
// packages/analytics/src/ga4/client.ts

// the GoogleAnalyticsClient class extends the GenericAnalyticsClient, 
// which declares the track function
export class GoogleAnalyticsClient extends GenericAnalyticsClient {
  track(event: GenericEventsCollection) {
    const gaEvent = castToGoogleAnalyticsEvent(event)
    if (gaEvent) {
      gaTrackEvent(gaEvent)
    }
  }
}
```

```javascript
// packages/analytics/src/ga4/ga-event-mapping.ts
export function castToGoogleAnalyticsEvent(
    event: GenericEventsCollection
): GaEventsCollection | undefined {
    switch (event.name) {
        case 'add_to_cart':
            return castAddToCartEvent(event)
        // ...
    }
}

// map the generic event to the recommended payload
function castAddToCartEvent({
  params,
}: GenericAddToCartEvent): GaAddToCartEvent {
  return {
    name: 'add_to_cart',
    params: {
      currency: params?.currency ?? '',
      value: params?.value ?? 0,
      items:
        params?.items?.map((item) => ({
          item_id: item.id,
          item_name: item.name,
          affiliation: item.affiliation,
          coupon: item.coupon,
          discount: item.discount,
          index: item.index,
          item_brand: item.brand,
          item_category: item.categories?.[0],
          item_category2: item.categories?.[1],
          item_category3: item.categories?.[2],
          item_category4: item.categories?.[3],
          item_category5: item.categories?.[4],
          item_list_id: item.list_id,
          item_list_name: item.list_name,
          item_variant: item.variant,
          location_id: item.location_id,
          price: item.price,
          quantity: item.quantity,
        })) ?? [],
    },
  }
}
```


