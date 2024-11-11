---
sidebar_position: 1
---

# Theme and Components

## Chakra UI

Orium's Accelerator uses [Chakra UI](https://chakra-ui.com) as the base component library and building blocks for components.

Chakra UI was selected as the design system for a number of reasons, including:

* **Accessibility**: Chakra UI provides built-in accessibility support with keyboard navigation, screen reader compatibility, and proper focus management. This helps ensure that your commerce site can be used by a wider audience.
* **Customizability**: Chakra UI offers a wide range of customizable UI components, with the ability to easily adjust styles and colors to match your brand. This makes it possible to create a unique and visually appealing commerce site.
* **React-based**: Chakra UI is built with React, a popular JavaScript library for building user interfaces. Using Chakra UI in your React-based commerce site allows you to leverage the benefits of React, such as fast updates, easy component reuse, and a large community of developers and plugins.

Get familiar with Chakra UI through the official [Chakra UI documentation](https://chakra-ui.com/getting-started)

## Component Library

Building on top of Chakra UI, Orium's Accelerator provides a library of components found under `@oriuminc/ui`.

For importing and using a component, reference the component by name and pass the properties as required as in the following example:

```tsx
import { ArticleCard } from '@oriuminc/ui'
...
export const SampleComponent = ({
  return (
    <ArticleCard
        image={articleCardImage}
        title={title}
        description={description}
        href={href}
      />
    )
})
```

The `@oriuminc/ui` module provides the code for base components. More complex components leverage these base components and can be found within one of the integrations, for example, in `src/modules/CMS_PROVIDER/components/`.

## Customize Theme Colors & More

Orium's Accelerator extends the Charka UI base theme in `src/modules/chakra/index.tsx`.

Colors are defined in `src/modules/chakra/foundations/colors.tsx` and other theme definitions are defined in `src/modules/chakra/foundations/`.

For more information on customizing the theme, see the [Chakra UI Default Theme documentation](https://chakra-ui.com/docs/styled-system/theme).

## Token Override

By default, Chakra UI offers style tokens that are concrete in nature. In Orium's Accelerator, an abstraction with t-shirt sizes, such as `xxs`, `xs`, `sm`, and `md`, is made available to simplify and standardize sizing throughout the application. These tokens are defined in the `src/modules/chakra/theme/foundations/*` directory.

For example:

```tsx
<Heading size="md">Heading goes here</Heading>
```
