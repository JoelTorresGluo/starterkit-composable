---
sidebar_position: 2
---

# Elastic Path

Elastic Path offers headless commerce services, such as managing products, orders, customers, and other commerce functionalities,  for this application. For more information, see the [Elastic Path documentation](https://elasticpath.dev/docs).


## Configuring the Integration

The Elastic Path integration in Orium's Accelerator requires valid credentials to function properly.  

The following steps describe how to create new API keys:

1. In the root folder of the application, create or update the `.env.local` file:

    1. Log into your [Elastic Path Commerce Manager](https://useast.cm.elasticpath.com/).
    1. In the left navigation bar, go to **Application Keys**.
    1. Create a new set of keys and use the following data for the variables in your `.env.local` file:

       ```shell
        # safe to use on client-side
        NEXT_PUBLIC_ELASTIC_PATH_CLIENT_ID={client_id}
        NEXT_PUBLIC_ELASTIC_PATH_HOST={api_url}
        # server-side use only
        ELASTIC_PATH_CLIENT_SECRET={secret}
       ```

## Elastic Path Commerce Cloud REST API

Orium's Accelerator uses [Elastic Path Commerce Cloud REST API](https://elasticpath.dev/docs/api-overview/api-overview to access the resources offered by Elastic Path.

We recommend downloading and setting up the [Postman collection](https://elasticpath.dev/docs/api-overview/test-with-postman-collection) that includes the relevant types of requests for each endpoint.

## @oriuminc/elasticpath

This package contains components and hooks to facilitate the integration with Elastic Path. The following sections highlight the most important hooks and components available in the Elastic Path integration.

### ElasticPathProvider

The `ElasticPathProvider` wraps your Next.js app, which is configured in the `src/pages/_app.tsx` file, and manages the `ElasticPathContext`, which holds the API client object, required API headers, and the anonymous or logged-in customer's token data.  

```tsx
// src/pages/_app.tsx
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <StrictMode>
      <ErrorBoundary>
        <Composable ...>
            <ElasticPathProvider
              clientId={ELASTIC_PATH_CLIENT_ID}
              host={ELASTIC_PATH_HOST}
              headers={ELASTIC_PATH_HEADERS_DEFAULT}
              headersLoggedIn={ELASTIC_PATH_HEADERS_LOGGED_IN}
            >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ElasticPathProvider>
        </Composable>
      </ErrorBoundary>
    </StrictMode>
  )
}
```

### CheckoutProvider

The `CheckoutProvider` component wraps the checkout page, and manages the `CheckoutContext`, which contains the state for the checkout flow. The state includes information about the customer, forms validation, and available shipping and payment methods.

```jsx
// src/modules/checkout/pages/checkout-page/checkout-page.tsx
export const CheckoutPage = () => {
  return (
    <CheckoutProvider>
      <CheckoutStepsProvider ...>
        <CheckoutLayout>
          <CheckoutSteps />
        </CheckoutLayout>
      </CheckoutStepsProvider>
    </CheckoutProvider>
  )
}
```

### Hooks

The following sections highlight the most important hooks available in the Elastic Path integration.

#### useElasticPath()

This hook provides access to the `ElasticPathContext`.  You must use this hook within `ElasticPathProvider`.

```tsx
const { httpClient, accessToken, customerToken } = useElasticPath()
```

#### useAccessToken() & useUserAuthHandler()

This hook handles fetching and updating access tokens in the browser's local storage. By default, `ElasticPathProvider` starts this hook, so you need not call this hook manually.

#### useAuth()

This hook provides `login` and `logout` functions.

```tsx
const { login, logout } = useAuth()
```

#### useUser()

Returns the logged-in customer's information.

```tsx
const { customer } = useUser()
```

#### useCustomerCreate()

This hook returns a `customerCreate` function for registering new customers.

```tsx
const { customerCreate } = useCustomerCreate()
const register = async () => {
    await customerCreate.mutateAsync({
        name,
        email,
        password,
    })
}
```

#### useProductBySlug()

Finds and returns a product in Elastic Path that is associated with a specific slug you provide.

```tsx
const { product } = useProductBySlug({ slug: router.query?.slug?.toString() })
```

#### useCart()

This hook returns the customer's cart and functions to update it.

```tsx
const { cart, addCartItem, deleteCartItem } = useCart()
```

#### useCheckout()

This hook provides access to the `CheckoutContext`. Must be used within the `CheckoutProvider`.

```tsx
const { checkoutState: { customer, shipping_address }, savedShippingAddresses, paymentMethod } = useCheckout()
```

#### useOrders()

This hook returns a customer's orders.

```tsx
const { orders, isLoading, total } = useOrders({
   offset: 0,
   limit: 10,
   include: ['items'],
})
```

#### useOrder()

This hook returns a customer's orders by ID.

```tsx
const { order, isLoading } = useOrder({
   id: orderId,
   include: ['items'],
})
```

## API Routes

The Orium's Accelerator Elastic Path integration uses [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) to perform certain operations on the Next.js server, instead of performing them in the browser. With this approach, you can use admin-level API keys to perform elevated operations.

The following routes are located in the `/src/pages/api` directory:

- `/update-cart-taxes`: Performs inserting a tax item to the cart. The default implementation adds an `ExampleTax` of 12% to all cart items. In a real-world scenario, the tax calculation might be performed by a specialized third-party service.
- `/integrations/algolia`: Performs updating Algolia indexes whenever a catalogue is published. This endpoint rerquires requests from an [Elastic Path Integration](https://elasticpath.dev/docs/integrations/integrations).


#### Creating a new Integration
1. Log in to Elastic Path Commerce Manager.
1.  Go to **Store Settings** > **Webhooks** > **New Webhook**.
1. Set the URL to `{BASE_URL}/api/integrations/algolia`.
1. Generate a secret Key.
1. Subscribe to all PXM catalog events.
1. Add the following variables to your `.env` file:
```bash
# the Secret Key from the 3º step
ELASTIC_PATH_ALGOLIA_INTEGRATION_SECRET_KEY={integration_secret_key}
# the names of the catalogs that you want the integration to be able to update (comma separated)
ELASTIC_PATH_SYNC_CATALOG_NAMES="catalog1,catalog2,..."
```
