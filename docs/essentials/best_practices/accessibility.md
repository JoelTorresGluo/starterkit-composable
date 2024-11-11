---
sidebar_position: 5
---
# Accessibility

The Storefront is built with accessibility in mind and ensures that the pages and components are designed and developed to be inclusive for users with disabilities. Implementing strong support for accessibility ensures a wider range of users can access the features of the Storefront.

Chakra UI provides many components with built in accessibility support, and has documentation about each component's accessibility features, for example see the Drawer component's [Accessibility](https://chakra-ui.com/docs/components/drawer#accessibility) section.

The Storefront is heavily optimized to support support screen readers and keyboard navigation, for example:
- [Skip Links](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Design_and_accessibility/HTML_features_for_accessibility#skip_links) to support screen readers to go directly to the `main` content of the page.
- [Aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live) to announce changes of content on the page, or announce an event like adding item to cart.
- [Aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) to describe the action of buttons and links to screen readers.
- Components follow [Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html) practices to best describe each markup element on a page.


