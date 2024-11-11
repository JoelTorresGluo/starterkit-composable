---
sidebar_position: 2
---

# Google Tag Manager + Google Analytics 4

## Configuration
1. In Google Tag Manager, create a `GA4 Configuration` tag, providing your GA4 ID. The firing trigger should be set to `Initialization - All pages`.
1. Create a `Google Analytics GA4 Event - Ecommerce` tag. The event name should be set to `{{Event}}` and the `Send Ecommerce data` option should be checked. Add a custom event trigger for each of the GA4 events that you want to send. Set each custom event name to the GA4 event (add_to_cart, remove_from_cart, etc.).
1. Add the following environment variables:
```bash
NEXT_PUBLIC_ANALYTICS_ENGINE=gtm
NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=your_gtm_id
```

### Example GTM configuration for Ecommerce events

Refer to the below example of a Tag configuration to send storefront ecommerce events to Google Analytics.
![GTM Tag Configuration for Ecommerce Events to Google Analytics](/img/gtm-events-tag-config.png)

### Example GTM configuration for Google Analytics page views

Refer to the below example of a Tag configuration to send storefront ecommerce events to Google Analytics.
![GTM Tag Configuration for Google Analytics](/img/gtm-ga-tag-config.png)



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


