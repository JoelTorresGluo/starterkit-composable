---
sidebar_position: 5
---

# Project Structure


This topic provides details about the directory structure of Orium's Accelerator repository and the different files within the repository. Before you can start developing your commerce integrations or solution, you must get access to the repository and complete the setup as described in the [Readme](https://github.com/oriuminc/composable-pro#readme) file.

## Monorepository

Orium's accelerator is a monorepository, using [pnpm workspaces](https://pnpm.io/workspaces) and [Turborepo](https://turbo.build/repo). The monorepository consists of `apps`, `packages`, and `scripts` directory. In short, a monorepository (also commonly referred to as a monorepo) is a repository that contains code for multiple projects and packages, allowing all projects and packages to be managed together in one place. This pattern provides increased reusability and scalability. For example, code that exists in a package can be consumed by one or more applications, meaning features can be built once and provide features to multiple applications.

## Monorepo Folder Structure

The monorepo has the following folders:

- `apps/`: 
    - `storefront`: Contains the Next.js Storefront application
    - `docs`: A Docusaurus application providing documentation on the Storefront application
- `packages`: Contains common code used primarily by the Storefront application like UI components and integrations to third party APIs for Commerce, CMS, and Search.
- `scripts`: Consists of node applications to assist with setting up your third-party APIs, for example populating your commerce API with products, or initializing your CMS with content models
- The codebase also contains configuration files, such as `turbo.json` and `package.json`, that consists of various configuration settings for development and deployment.