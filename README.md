# Orium Accelerator

[Orium](https://www.orium.com/) monorepo where we manage _packages_ and _apps_ for the [Composable](https://composable.com/) solution.

## Getting Started

Follow [this guide](https://oriumhq.jira.com/wiki/spaces/CWA/pages/295829585) on creating a new client codebase for a delivery project

### After creating a project codebase
- Delete the Getting Started section after creating the codebase for a project
- Review the links below and make sure they are applicable to your project.
- Rename links or section titles to suit your project.
- Delete these instructions.
---

## Overview

This codebase is contains three applications:
- Storefront in `apps/storefront`
- Composable-docs `apps/docs`
- Storybook `apps/storybook`

Refer to the [Orium Accelerator Documentation](https://composable-pro-docs.vercel.app/) for detailed information about the accelerator and its features.

### Storefront
This section is the main app

To run the app, navigate to `/apps/storefront`

To install the dependencies run:
```
pnpm i
```

Run Jest unit tests and print coverage report

```
pnpm test
```

To Start dev server

```
pnpm dev
```

Then, navigate to [localhost:3001](http://localhost:3001). Note: Depending on the storefront configuration, this could be on port `3000`, or `3002`

### Composable-docs
This section is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.
To visit the documentation, navigate to `/apps/composable-docs` and run:

```shell
$ pnpm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

Visit [http://localhost:6001/](http://localhost:6001/) to view the documentation.

### Storybook
This section contain information about the theme and basic usage of the components

To run the storybook, navigate to `/apps/storybook` and run:
```
pnpm storybook
```

Then, navigate to [localhost:52551](http://localhost:52551).


Powered by:

- [Vercel](https://vercel.com)
- [Next.js](https://nextjs.org/)
- [Chakra-UI](https://chakra-ui.com/guides/first-steps)
- [React-Query](https://react-query.tanstack.com/)
- [tRPC](https://trpc.io/)
