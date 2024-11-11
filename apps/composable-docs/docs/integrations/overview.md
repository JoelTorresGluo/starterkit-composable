---
sidebar_position: 1
---
# Overview

Orium's Accelerator is pre-integrated with several headless service providers, including commerce, Content Management Systems (CMS), search and payments.

Orium's Accelerator offers two types of integrations:

* Packaged integration code that can be used within the code base, including components, providers, and hooks.
* External connectors and utilities that allow configuring and syncing headless services with one another.

## Packaged Integrations

Orium's Accelerator provides integrations that are made available through packages. These packages are imported from Orium NPM repository. You can import these packages from `@oriuminc/*integration*` and use them within the codebase.

The topics in the integration section provides descriptions of these packages, their configurations, and highlights important providers and hooks available for use.

## Connectors and Utilities

Orium's Accelerator provides some integrations in the form of connectors. These connectors are usually externally hosted in the cloud, and ensures that data is flowing correctly between headless services. For example, a connector that ensures that new or modified product data from the commerce service is automatically pushed to the search service.

For utilities, Orium's Accelerator provides scripts that are usually executed once at project inception to configure headless services. For example, a script might be responsible for populating a search service with products based on a prepared JSON file, or populating a Content Management System (CMS) with content models. The scripts are organized in the `/scripts` folder of the codebase.
