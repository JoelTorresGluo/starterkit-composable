---
sidebar_position: 7
---

# Redirect Mapping

## Overview

Redirect Mapping is a critical feature for managing how traffic is redirected from one URL to another. This is especially important when reorganizing content, migrating websites, or ensuring that outdated URLs properly lead users to the correct content. The Redirect Mapping system ensures minimal disruption to user experience and maintains SEO rankings by providing a method for search engines to understand the changes in your site structure.

## Setting Up Redirect Mapping

To set up Redirect Mapping, you need to define a series of redirection rules that the Accelerator will follow when handling incoming HTTP requests. These rules are typically set up in a configuration file, which the Accelerator processes to determine the redirection logic.

### Step 1: Accessing the Configuration File

Locate the configuration file used for setting up redirects. This is typically named `next.config.js` or a similar name that is appropriate for your Accelerator environment.

### Step 2: Defining Redirect Rules

Within the configuration file, you will define your redirect rules. Each rule consists of a `source` URL (the original path to match against), a `destination` URL (the new path to redirect to), and a `permanent` flag indicating whether the redirect should be treated as permanent (HTTP status code 301) or temporary (HTTP status code 302).

### Step 3: Applying the Configuration

After defining the redirect rules, save the configuration file. The Accelerator will need to be restarted or redeployed to apply the new redirect settings.

## How Redirect Mapping Works

When a request hits the Accelerator, the system checks if the request URL matches any `source` pattern defined in your redirect rules. If a match is found, the Accelerator issues an HTTP redirect response, directing the client to the `destination` URL.

### Example Configuration

Here's an example of how a simple redirect mapping might look in your `next.config.js` file:

```javascript
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
      // Add more rules as needed
    ];
  },
};
```

In this example, a request to `/old-page` would be permanently redirected to `/new-page`.

## Best Practices for Redirect Mapping

- **Use Permanent Redirects for Permanent Changes**: If a page has moved permanently, use a 308. See why [here](https://nextjs.org/docs/pages/api-reference/next-config-js/redirects)

- **Avoid Redirect Chains**: Try not to create long sequences of redirects (redirect chains), as this can slow down the user experience and complicate search engine indexing.

- **Regularly Update Redirects**: Keep your redirect mappings up to date to ensure that all redirects are still relevant and lead to the correct destinations.

- **Monitor Traffic and Logs**: After implementing redirects, monitor your traffic and server logs to ensure that the redirects are working as expected and that there are no unexpected errors.

By following these steps and best practices, you can effectively set up and manage Redirect Mapping within the Accelerator to ensure a seamless user experience and maintain SEO performance.
