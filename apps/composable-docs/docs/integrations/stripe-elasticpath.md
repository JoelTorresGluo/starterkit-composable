---
sidebar_position: 8
---

# Stripe for Elastic Path

Stripe is an online payment processing service that enables accepting payments with credit cards and other payment methods. For more information, see the official [Stripe Documentation](https://stripe.com/docs).

## ## Configuring the Integration

1. In your application's root folder, create or update the `.env.local` file:
    1. Log into your Stripe Dashboard.
    1. Go to **Developers** > **API keys**.
    1. Update the `.env.local` file with the **Publishable key** as in the following code sample:

       ```shell
        NEXT_PUBLIC_STRIPE_KEY={publishable_key}
       ```

## Data Flow

The actions and functions that are triggered with the Stripe integration are:

1. A customer adds items to the cart and starts the checkout process by selecting Stripe as the payment option.
1.  Orium's Accelerator render Stripe's [card element](https://stripe.com/docs/payments/accept-card-payments?platform=web&ui=elements).
1. The customer enters the necessary information.
1. When the customer clicks **Place Order,** the application attempts to create a Stripe token, which collects the payment method information and completes any required actions, such as authenticating the user by displaying a 3DS dialog.
1. With the token created, Orium's Accelerator proceeds to create the order and a `stripe` gateway payment using the ElasticPath API. During this process, Elastic Path creates a [Stripe PaymentIntent](https://stripe.com/docs/api/payment_intents).


## React Component - Reference File

- `apps/next-app/src/modules/checkout/components/stripe/stripe.tsx`: The Step 2 of the checkout flow brings in the embeddable Stripe [CardElement](https://stripe.com/docs/payments/accept-card-payments?platform=web&ui=elements) component to allow card payments.
