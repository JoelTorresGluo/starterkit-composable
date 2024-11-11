---
sidebar_position: 2
---

# Open Graph Tags

## Overview

Open Graph tags are meta tags that are used to customize the content that is shared on social media platforms. These tags are used to control how your content is displayed when it is shared on social media platforms, such as Facebook, X (Twitter), and LinkedIn.

## Open Graph Tags in the Storefront

The Storefront uses the [`generateMetadata`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function) function of Next.js to set Open Graph tags on the following pages:
 - Homepage
 - Content pages
 - Product Listing Pages
 - Product Display Pages


The following social media platforms are supported:
- Facebook
- X (Twitter)
- LinkedIn
- WhatsApp

## Screenshots

### Facebook

![Facebook](/img/fb-og.png)

### X (Twitter)

![X (Twitter)](/img/tw-og.png)

### LinkedIn

![LinkedIn](/img/linkedin-og.png)

### WhatsApp

![WhatsApp](/img/wsp-og.png)


## Image Sizes in `og:image`

Review each social media platform's image recommendations for use with `og:image`. For example, Facebook has a [minimum size of 200x200](https://developers.facebook.com/docs/sharing/webmasters/images/), and recommends larger size images up to 8MB. 
- The Homepage, Content Pages, and Product Listing pages will use the image(s) defined in the CMS field `Open Graph Images`.
- The Product Display Page will populate `og:image` with the images defined in the Commerce API.

## Tools 

To debug the OG tags, you can use the following tools:

- https://developers.facebook.com/tools/debug/
- https://cards-dev.twitter.com/validator
- https://www.linkedin.com/post-inspector/inspect/

## References

- https://ogp.me/
- https://developers.facebook.com/docs/sharing/webmasters/
- https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards
- https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin?context=linkedin/consumer/context

