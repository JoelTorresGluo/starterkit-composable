# @oriuminc/ui

## 3.1.7-canary.1

### Patch Changes

- 12359c09: fix storybook and gallery

## 3.1.7-canary.0

### Patch Changes

- 9b41afad: fix product slider padding

## 3.1.6

### Patch Changes

- 6f446884: Fix(CPD-1816): EP login UI bug and UI updates by design

## 3.1.6-canary.0

### Patch Changes

- 6f446884: Fix(CPD-1816): EP login UI bug and UI updates by design

## 3.1.5

### Patch Changes

- 0e264d15: feat(CPD-1790/CPD-1789): global search and no match page UI

## 3.1.5-canary.0

### Patch Changes

- 0e264d15: feat(CPD-1790/CPD-1789): global search and no match page UI

## 3.1.4

### Patch Changes

- f3885d1f: fix(CPD-1449): a11y and SEO improvements
- c4cc22ce: fix(CPD-1745): proper h1 for home page and CMS components
- 581f3382: fix(CPD-1730): redirect user to login page if not logged in

## 3.1.4-canary.0

### Patch Changes

- f3885d1f: fix(CPD-1449): a11y and SEO improvements
- c4cc22ce: fix(CPD-1745): proper h1 for home page and CMS components
- 581f3382: fix(CPD-1730): redirect user to login page if not logged in

## 3.1.3

### Patch Changes

- 08d3ff88: Improved accessibility and navigation across the Language Switcher, Cart page, and CMS components, alongside refining UI elements like image buttons and the search submit function.
- a3cda5bf: fix(a11y): some enhancements on Home, PLP, PDP, Sign In page

## 3.1.2

### Patch Changes

- 3d60714e: fix: Improved accessibility by adding aria-live to quantity picker, enabling announcement of quantity changes.
- 0d4fa0c6: fix: some a11y issues were addressed
- a8257438: fix a11y for PDP layout and accordion components

## 3.1.2-canary.0

### Patch Changes

- 3d60714e: fix: Improved accessibility by adding aria-live to quantity picker, enabling announcement of quantity changes.
- 0d4fa0c6: fix: some a11y issues were addressed
- a8257438: fix a11y for PDP layout and accordion components

## 3.1.1

### Patch Changes

- Updated dependencies [b84ced5f]
  - @oriuminc/base@3.1.1

## 3.1.1-canary.0

### Patch Changes

- Updated dependencies [b84ced5f]
  - @oriuminc/base@3.1.1-canary.0

## 3.1.0

### Minor Changes

- 973890f3: The Table component now accepts ReactNode for headers and data

### Patch Changes

- 49cb1e8b: fix(CPD-1485): sort CT order history and fix order summary details
- bb06ab1c: fix(CPD-1179): a11y for user account and checkout
- Updated dependencies [8da46e82]
  - @oriuminc/base@3.1.0

## 3.1.0-canary.0

### Minor Changes

- 973890f3: The Table component now accepts ReactNode for headers and data

### Patch Changes

- 49cb1e8b: fix(CPD-1485): sort CT order history and fix order summary details
- bb06ab1c: fix(CPD-1179): a11y for user account and checkout
- Updated dependencies [8da46e82]
  - @oriuminc/base@3.1.0-canary.0

## 3.0.0

### Patch Changes

- @oriuminc/base@3.0.0

## 3.0.0-canary.0

### Patch Changes

- @oriuminc/base@3.0.0-canary.0

## 2.0.1

### Patch Changes

- ed9ac1bb: Fixed Brand Picker and Header Logo size and position

## 2.0.0

### Minor Changes

- d9d640c8: Make 'label' property of InputField optional
- 4d0cfc6d: Changes to support Next 13 (router, link, image)

### Patch Changes

- Updated dependencies [4d0cfc6d]
- Updated dependencies [3e9205ac]
  - @oriuminc/base@2.0.0

## 1.4.1

### Patch Changes

- 3d773af4: Bump packages
- Updated dependencies [3d773af4]
  - @oriuminc/base@1.4.1

## 1.4.0

### Minor Changes

- bf9dc53f: Improved MegaMenu accessibility
- 7fbaedf8: Removed the default \_focus and \_focusVisible attributes from the QuantityPicker2 buttons
- f4ae3f7c: amplience: add support for Markdown content
  base: add PDP type to CmsInterface
  commercetools: fix codegen
  commercetools: add support for product category
  contentful: fix codegen
  contentful: add support for RichText content
  contentstack: fix codegen
  contentstack: add support for Markdown content
  elasticpath: add hook useCatelogNodeById
  ui: add more props to Accordion for better customization
- ea0cae01: HorizontalProductCardEditable fixed tabs in Wishlist and Remove buttons
- 5afabf36: refactor header section for accessibility
- eb4a821c: Added "alt" attribute to the BrandPicker component's images
- 7e3fe4c6: add accessibility to the brand picker banner
- 85b6dd94: add accessibility skip links

### Patch Changes

- a1f81d27: accessibility: add role and title to langSwitch and options
- 260a7601: Include TypeScript source code in npm packages.
- 53c0a370: Accessibility update for UI component HorizontalProductCard2
- 1d1859b8: Add accessibility to the PDP page
- 48aae9aa: add myAccountButtonProps as an option for HeaderDesktop
- Updated dependencies [260a7601]
- Updated dependencies [f4ae3f7c]
- Updated dependencies [c8c5deb0]
  - @oriuminc/base@1.4.0

## 1.4.0-canary.0

### Minor Changes

- f4ae3f7c: amplience: add support for Markdown content
  base: add PDP type to CmsInterface
  commercetools: fix codegen
  commercetools: add support for product category
  contentful: fix codegen
  contentful: add support for RichText content
  contentstack: fix codegen
  contentstack: add support for Markdown content
  elasticpath: add hook useCatelogNodeById
  ui: add more props to Accordion for better customization

### Patch Changes

- Updated dependencies [f4ae3f7c]
  - @oriuminc/base@1.4.0-canary.0

## 1.3.1

### Patch Changes

- 39c95c06: fix: user name icon fallback to user icon when user name is undefined
  fix: add missing shipping address field additional_address_info to CheckoutProvider

## 1.3.1-canary.0

### Patch Changes

- 39c95c06: fix: user name icon fallback to user icon when user name is undefined
  fix: add missing shipping address field additional_address_info to CheckoutProvider

## 1.3.0

### Minor Changes

- 75de4f8b: updated HeaderDesktop to show user name initial for logged in user
  added default requiredIndicator to PasswordField for consistency in styling
  added default placeholder text color to InputField

### Patch Changes

- 1622f7b6: fix: enable to add a custom overlayBackground for BannerFull and CoverCard components by passing overlayBackground as a property and setting a default value for it
- 57367010: feat: ensure components customizability
- 5c830eec: update: add account/dashboard/page routes
  fix: icons in the header nav
- d894530f: fix: some styles in HorizontalProductCardReadOnly

## 1.3.0-canary.0

### Patch Changes

- 5c830ee: update: add account/dashboard/page routes
  fix: icons in the header nav
- d894530: fix: some styles in HorizontalProductCardReadOnly

## 1.2.0

### Patch Changes

- 4a9c0f8: feat: add dev script to watch changes

## 1.1.2

## 1.1.1

## 1.1.1-canary.1

## 1.1.1-canary.0

## 1.1.0

### Minor Changes

- 61704fe: Added the HorizontalProductCard2 and QuantityPicker2 components
- 2e22abd: ArticleCard: add flex:1 to the title's div
  CoverCard: set image height to 100% if not provided; add small padding by default

### Patch Changes

- 243d406: Update build pipeline

## 1.1.0-canary.7

## 1.1.0-canary.6

### Minor Changes

- 61704fe: Added the HorizontalProductCard2 and QuantityPicker2 components
- 2e22abd: ArticleCard: add flex:1 to the title's div
  CoverCard: set image height to 100% if not provided; add small padding by default

### Patch Changes

- 243d406: Update build pipeline

## 1.0.1-canary.5

## 1.0.1-canary.4

## 1.0.1-canary.3

## 1.0.1-canary.2

## 1.0.1-canary.1

## 1.0.1-canary.0

## 1.0.0

### Major Changes

- 2a5bd25: Upgrade to Next 12.2, added ItemLink to be able to render next/Link only when the href is provided
- 2a5bd25: Update React to v18

### Minor Changes

- 2a5bd25: Added DeliveryMethodOption component and updated Form input components
- 4ea4bc3: Added a boxProps props to the SectionHeader component
- 26b1f09: Added new Disclosure Components (Accordion, Pagination, Tabs)
- 2a5bd25: add form label props to style password input
- 2a5bd25: Updated the DeliveryMethodOption component styles
- 52b1f03: Added data display components: Badge, Close Button, Tag, Table and List
- 24e4c6c: Added Feedback components in UI Packages
- 2a5bd25: - Add UI component HorizontalProductCard
  - Add UI component Quantity Picker
  - Add UI component Price
- ebf8c81: Deleted the DeliveryMethodOption component & styled the PasswordField component

### Patch Changes

- 34f8c04: Fix absolute import
- 206f4cf: Export ItemLink component

## 1.0.0-canary.6

## 1.0.0-canary.5

## 1.0.0-canary.4

### Patch Changes

- 34f8c04: Fix absolute import

## 1.0.0-canary.3

### Patch Changes

- 206f4cf: Export ItemLink component

## 1.0.0-canary.2

## 1.0.0-canary.1

### Minor Changes

- 4ea4bc3: Added a boxProps props to the SectionHeader component
- 26b1f09: Added new Disclosure Components (Accordion, Pagination, Tabs)
- 52b1f03: Added data display components: Badge, Close Button, Tag, Table and List
- 24e4c6c: Added Feedback components in UI Packages
- ebf8c81: Deleted the DeliveryMethodOption component & styled the PasswordField component

## 1.0.0-canary.0

### Major Changes

- 2a5bd25: Upgrade to Next 12.2, added ItemLink to be able to render next/Link only when the href is provided
- 2a5bd25: Update React to v18

### Minor Changes

- 2a5bd25: Added DeliveryMethodOption component and updated Form input components
- 2a5bd25: add form label props to style password input
- 2a5bd25: Updated the DeliveryMethodOption component styles
- 2a5bd25: - Add UI component HorizontalProductCard
  - Add UI component Quantity Picker
  - Add UI component Price
