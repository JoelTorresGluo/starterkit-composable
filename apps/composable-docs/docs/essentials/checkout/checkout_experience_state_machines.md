---
sidebar_position: 3
---

# Package: checkout

The Checkout package in `package/checkout` contains:

- two state machines defining the One Step and Three Step Checkout Experiences
  - See `package/checkout/experiences`
- React components and forms in `package/checkout/components` for use in multiple Checkout Experiences:
  - shipping address input
  - billing address input
  - shipping option input
  - payment method section
  - Stripe form

Checkout Experience state machines are defined in `package/checkout/experiences`:
- Each Checkout Experience will need typically require unique UI components, for example the Three Step Checkout Experiences contains UI components specific to the Three Step user experience.
