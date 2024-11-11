---
sidebar_position: 7
---

# Stripe for commercetools

Stripe is an online payment processing service that enables accepting payments with credit cards and other payment methods. For more information, see the official [Stripe Documentation](https://stripe.com/docs).

## Configuring the Integration

1. In your application's root folder, create or update the `.env.local` file:

   1. Log into your Stripe Dashboard and go to **Developers** > **API keys**.
   1. Update the `.env.local` file with the **Publishable key** and the **Secret key** as in the following code sample:

      ```shell
        NEXT_PUBLIC_STRIPE_KEY={publishable_key}
        STRIPE_SECRET_KEY={secret_key}
       ```
:::caution
Ensure that you never add your Stripe secret keys in the `NEXT_PUBLIC_*` environment variables or on client-side code. Take the necessary steps to ensure that the secret keys are never disclosed to the public.
:::


## Data Flow

The following list describes the actions and functions that are triggered with the Stripe integration:

1. A customer adds items to their cart and starts the checkout process, selecting Stripe as the payment option.
1. A new [SetupIntent](https://stripe.com/docs/api/setup_intents) is created.
1. Orium's Accelerator render Stripe's [PaymentElement](https://stripe.com/docs/payments/payment-element).
1. The customer selects one of the payment methods available and inputs the necessary information.
1. When the customer clicks on "Review your Order", the application attempts to confirm the Setup Intent, which tells Stripe to collect the payment method information and complete any required actions, such as authenticating the user by displaying a 3DS dialog.
1. With the [PaymentMethod](https://stripe.com/docs/api/payment_methods) already created, the card information can be safely displayed in the review step.
1. When the customer confirms the order, a new [PaymentIntent](https://stripe.com/docs/api/payment_intents) is created with `capture_method: 'manual'`, to ensure that the customer is not charged before the order is created.
1. After the order is created, a [capture](https://stripe.com/docs/api/payment_intents/capture) is invoked with the PaymentIntent to collect the funds.


## Reference Files

### Backend files

- `packages/stripe`: Contains services used to communicate with the Stripe REST API.
- `apps/next-app/src/server/api/routers/stripe/stripe-router.ts`: Defines the API routes that allow the frontend React components to consume the services defined in the`packages/stripe` directory.
### React Components
- `packages/checkout/src/components/payment-methods/stripe/stripe-form.tsx`: Brings in the embeddable Stripe [`Element`](https://stripe.com/docs/payments/payment-element) component to allow up to 25+ payment methods with a single integration.

## Stripe tRPC Router

The Orium's Accelerator frontend uses Stripe endpoints that are built in the tRPC Stripe router. For more information, see the `apps/next-app/src/server/api/routers/stripe/stripe-router.ts` file. This router uses the stripe package `packages/stripe` to perform a secure server-to-server communication with the [Stripe Payment Intents API](https://stripe.com/docs/payments/payment-intents).

## Stripe Link

[Link](https://docs.stripe.com/payments/link) is Stripe’s fast-checkout solution. It securely saves and autofills customer address and payment details, with support for multiple payment methods.

Orium's Accelerator comes with Link already integrated into the [PaymentElement](https://stripe.com/docs/payments/payment-element).

### Creating a Link account
- For testing environments (using Stripe Test API keys), the Stripe PaymentElement will ask if you want to save your card details with Link. You can enter any phone number during this step, it does not need to be a valid phone number. If you start another checkout session with the same email address, you will be able to access your saved payment method from Link. You can use code 000000 to authenticate with Link when testing.
- For production, the Stripe PaymentElement will ask if you want to save your card details with Link, and will require a valid phone number. The next time you enter Checkout, the PaymentElement will send you a text with the code to authenticate to Link. After authentication you will be able to choose a saved payment method.
You can also create a production account and manage settings from the [Link website](https://link.com/).

### Using Link
1. From the [Stripe Dashboard settings](https://dashboard.stripe.com/test/settings/payment_methods), ensure the Link payment method is enabled.
2. On checkout, the accelerator will pass the customer's email to Stripe's PaymentElement.
3. Stripe will check if there's a Link account associated with that email. If there is, you will be prompted to enter a security code (in production, Stripe sends the code via SMS; in test mode, you can use `000000`).  
![Stripe Link enter code](/img/stripe-link-enter-code.png)
4. Once authenticated, you will see your saved credit cards.  
![Stripe Link logged in](/img/stripe-link-logged-in.png)
5. If you don't already have a Link account, you can sign up by using the `Save your info for secure 1-click checkout with Link` checkbox.  
![Stripe Link save info](/img/stripe-link-save-info.png)

### Important Considerations
- **Test Mode vs. Production**: Live (production) Link accounts will not work when using Stripe in test mode. A Link test account is required.
- **Email Display**: When using Link as the payment method, the Stripe dashboard will show the Link account's email, instead of the confirmation email entered during checkout.
- **Card Details**: Link abstracts away the selected card details, making it impossible to retrieve and show them in the order details.
- **API Version**: Make sure the Stripe account is using the latest version of the API, as older version might not enable Link for payment intents by default. You can verify this -and upgrade if necessary- from Stripe’s Developer dashboard under the API Version section. 
