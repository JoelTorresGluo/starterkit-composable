---
sidebar_position: 9
---

# Analytics
Orium's Web Accelerator seamlessly supports analytics services, allowing you to leverage them to gain valuable insights into user behavior.

## Getting Started
To choose an analytics service, set the `NEXT_PUBLIC_ANALYTICS_ENGINE` environment variable. Additionally, configure the respective API keys.

### Verifying Configuration
Before proceeding, run the application locally and use the debugging features on the analytics platforms to ensure correct configurations.

## Event Tracking
### E-commerce Events
The base instrumentation of each analytics service sends the following e-commerce events:

- sign_up
- login
- view_item
- add_to_cart
- remove_from_cart
- view_cart
- begin_checkout
- add_shipping_info
- add_payment_info
- purchase

### Payload Structure
The integration employs a generic interface for firing each e-commerce event. This approach ensures a consistent method for triggering events, abstracting away the underlying analytics service specifics. Depending on the selected service, the event will be mapped to a valid payload for that service.

### Custom Events
You can add more events (or change the existing ones) by modifying the `analytics` package, which contains one folder for each of the supported services.
Make sure the generic interface is inline with the changes.

## Troubleshooting
Errors may occur if the API keys are not properly set or if there's a misconfiguration in the analytics service. Here are steps to troubleshoot and handle misconfigurations:

- **Verify Analytics Engine**: confirm that the `NEXT_PUBLIC_ANALYTICS_ENGINE` variable is set to the intended analytics service.
- **Check API Keys**: ensure that the API keys are correctly set in your environment variables.
- **Platform Debugging**: utilize the debugging features provided by each analytics platform to identify any specific misconfigurations on the respective platforms.
- **Check Network Requests**: use browser developer tools or network monitoring tools to inspect the outgoing requests. Look for any failed requests and investigate the error messages.
- **Review Event Payloads**: examine the structure of your event payloads to ensure they match the expected format for the selected analytics service. Refer to the analytics platform documentation for payload requirements.



