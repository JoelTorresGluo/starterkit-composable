---
sidebar_position: 2
---

# Orium's Accelerator Design System

Orium's Accelerator simplifies the process of building your composable commerce site with its pre-built components and designs. These resources enable developers to quickly start their development journey and save time in customizing their platform to meet specific business needs. Additionally, the project includes a Figma design system, providing a comprehensive set of design elements and guidelines for consistency and ease of use.

## Components and Themes

Orium's Accelerator provides React components and layouts that you can use to build your e-commerce solution.

The `@oriuminc/ui` package, which is in the `packages/ui` directory, contains standard re-usable components, such as accordions, alert boxes, carousels, gallery, and product cards. The components in the `apps/next-app/src/modules` directory leverages the components in the `packages/ui` directory to build more complex components, such as the cart page, menu, Product Listing Pages (PLP), and Product Display Pages (PDP).

The `packages/ui` directory is exported as `@oriuminc/ui` and you can import it in the code as required. The `@oriuminc/ui` package contains the UI components to use in the Next.js application.

Orium's Accelerator uses [Chakra UI](https://chakra-ui.com) as the base component library and as the building block for additional components. Using Chakra UI in your commerce solution enables you to take advantage of a React-based system with accessibility features, customizability, and a large community of developers.

## Using a component

1. To use a component, import the component, reference the component by the name and pass the required parameters as in the following example:

```tsx
import { BannerFull } from '@oriuminc/ui'
...
<BannerFull {...props} />
```

## Customizing the logo

1. In the `/composable-ui/src/components/logo.tsx` file, define the `Logo` component as in the following example:

```tsx
export const Logo = (props: HTMLChakraProps<'svg'>) => (
  <chakra.svg
    color="accent"
    height="21"
    width="auto"
    viewBox="0 0 616.56 68.75"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Logo"
    {...props}
  >
```

After you define the logo component, you can use it in your commerce site by importing the component:

```tsx
import { Logo } from 'components/logo'
```

## Customizing the favicon

1. To change the favicon file, in the `apps/next-app/public/img/favicon.ico` directory, replace the image file.
1. Update the favicon reference in the`/composable-ui/src/utils/constants.ts` file with the new image name as in the following example:

```tsx
...
FAVICON: '/img/favicon.ico',
...
```

## Theme Colors

Orium's Accelerator creates the Chakra UI base theme in the `packages/chakra/src/index.ts` file. The theme file references other files, such as `colors.ts`, in the `packages/chakra/src/theme/foundations/` directory. The files in the  `packages/chakra/src/theme/foundations/` directory contains the custom settings such as, colours, font size, and border styles for the site. You can override the default properties, such as brand colours, default spacing, and font sizes, as required. The `packages/chakra/src/theme/foundations/colors.ts` file contains the primary and secondary colour configuration, and you can override theses settings as required.

For more information on customizing themes, see the [Chakra UI Default Theme documentation](https://chakra-ui.com/docs/styled-system/theme).

## Theme Tokens

Orium's Accelerator extends Chakra UI and uses t-shirt size tokens, such as `xxs`, `xs`, `sm`, and `md`, for configuring different components. The token for each component are defined in the corresponding files in the `packages/chakra/src/theme/foundations/` directory. The following code sample shows an example to style a text:

```tsx
<Text textStyle={'md'}>Text goes here</Text>
```
For more information on using theses tokens consistently during the development, see the [Theme Typing and Autocomplete](getting_started/setup.md) section.

## Performance Guidelines

Chakra UI has components and hooks to assist with responsiveness, however some of these come at a cost to performance due to the reliance on the execution of JavaScript in the browser to perform responsiveness UI updates. We recommend avoiding use of:

- The [Show and Hide](https://chakra-ui.com/docs/components/show-hide) components
- The [useBreakpointValue](https://chakra-ui.com/docs/hooks/use-breakpoint-value)

Chakra UI has great support for responsiveness design through their [Responsive Styles](https://chakra-ui.com/docs/styled-system/responsive-styles) props on their components, which creates CSS media queries, and does not rely on JavaScript being executed in the browser.

## Related Resources

- [Chakra UI documentation](https://chakra-ui.com/getting-started)
- [Responsive Styles](https://chakra-ui.com/docs/styled-system/responsive-styles)
- [Project Repository Structure](essentials/project_structure.md)
- [Monorepository](essentials/project_structure.md)
- [Application Configuration](essentials/configuration.md)
