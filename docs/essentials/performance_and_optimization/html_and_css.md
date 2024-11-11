---
sidebar_position: 3
---

# Optimizing HTML and CSS

Orium's Accelerator uses Next.j's built-in optimizations to enhance site speed and discoverability.

## Code Splitting

Next.js optimizes HTML and CSS by generating code splits and loads only the required styles for each page. This method breaks the code into smaller chunks so that the browser fetches only the necessary parts required for a page and improves the page loading times.

## Critical CSS

Next.js generates critical CSS inline to improve the initial load time of a page. Critical CSS is the minimal amount of CSS required to render the above-the-fold content of a web page. By including this CSS directly in the page, Next.js reduces the number of network requests and improves the perceived page load time. This optimization is especially beneficial for mobile users who might have slower connections and limited data plans.

## HTML Meta Tags

By default, Next.js includes a `<Head>` component, using which you can set HTML meta tags, such as the page title, description, and canonical URL. These meta tags are important for SEO and provide information about your website to search engines and social media platforms. This feature simplifies the process of optimizing your ecommerce application and enhances its online visibility.

## Responsive Design

With Next.js, you can leverage its built-in support for modern web standards, including responsive design. This feature enables your site to dynamically adjust its layout and appearance to different screen sizes and devices.
