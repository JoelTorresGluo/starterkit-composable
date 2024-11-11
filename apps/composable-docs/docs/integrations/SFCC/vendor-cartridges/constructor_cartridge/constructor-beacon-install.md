---
sidebar_position: 4
title: Beacon Install
---

A Constructor beacon is a JavaScript snippet configured on your website to capture anonymous user clickstream activity. This data is sent to Constructor’s servers to train AI models, helping users find products and content.

### Where to Load the Beacon
Install the beacon on all pages except those with sensitive data like account management and credit card information. Important pages include:

- Home Page (and any page with a search bar)
- Search Result Page (Search Product Listing Pages)
- Browse Result Page (Browse PLP)
- Product Detail Pages (PDP)

### How to Load the Beacon
The recommended method is direct site placement, as tag managers can be blocked by ad blockers, impacting up to 40% of users. Install the beacon script after a DOM Ready or Window Loaded event, or at the end of the page.

#### Direct Site Placement (Recommended Method)
For best results, install the beacon directly on your site.

#### Tag Manager Options (For Proof Schedule)
- Google Tag Manager
- Tealium iQ
- Adobe Launch

## SFRA Salesforce Cartridge

The Constructor.io cartridge enables you to quickly inject the Constructor.io beacon into your SFRA storefront.

### Cartridge Installation
Refer to the complete guide for [installing the Constructor Connect cartridge](./constructor-setup.md).

### Fill in Your Beacon Bundle Name
After installing the cartridge, locate the Site Preferences under the Constructor.io preference group. Find the Beacon Bundle Name field and paste your bundle name there.