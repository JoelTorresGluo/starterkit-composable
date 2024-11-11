---
sidebar_position: 11
---

# Constructor.io commercetools Integration

Constructor.io offers an AI-driven e-commerce search engine solution, aimed at optimizing key performance indicators (KPIs) for online retail platforms. Its search technology leverages advanced AI and Machine Learning (ML) algorithms to deliver customer-centric search results. The "Deep Commerce Core" feature learns from customer interactions to continuously improve search performance. This platform integrates sitewide search functionalities, merchant solutions, and enterprise-ready delivery, enhancing product discoverability and personalizing the shopping experience to ultimately boost critical revenue metrics​.

For more information, see the [Constructor.io Docs](https://docs.constructor.io/).

## Prerequisites
1. Constructor Account:
    1. Sign up for a Constructor.io account [Constructor.io](https://constructor.io/).
    1. Complete your account setup.
2. Readonly API Token (Commercetools)
    1. Navigate to the API Tokens section in your Commercetools account.
    1. Create a new readonly API Token for data synchronization.
    1. Store the API Token securely in a password management tool like 1Password, as it will only be displayed once upon generation.
3. Data Synchronization Setup:
    1. Contact the Constructor team via email or through their support channel to set up data synchronization (CT connector) with the newly generated readonly API Token.
4. Refinement List Setup:
    1. Request the Constructor team to set up your basic refinement list (filters) or update them in the dashboard as an Admin.
    2. Note: A refinement list is used to filter search results based on certain criteria like category, color, brand, price, rating, etc.

## Installation and Setup:
1. Get API Keys:
    1. For any starter-kit with commercetools, add the following to your `.env.local`
        - `NEXT_PUBLIC_CONSTRUCTOR_API_KEY` is your Public API Key from constructor
        - `NEXT_PUBLIC_CONSTRUCTOR_DEFAULT_CATEGORY` is your default category if no input
    1. Each Public API Key is one index, for multiple brand you need multiple index

    ```bash
      # Constructor.io (Search as a Service)
      NEXT_PUBLIC_CONSTRUCTOR_API_KEY= #key_xxxxxxxx
      NEXT_PUBLIC_CONSTRUCTOR_DEFAULT_CATEGORY=wine
    ```
2. Setup Sort By using postman:
    1. Follow this API Doc to setup `Sort By` options [Configure Sorting Options](https://docs.constructor.io/rest_api/sort_options_configuration/#set-sort-options)
3. Setup CMS menu links (currently starterkit will have two search provider, `/constructor` route will use constructor, for a new project you can update the page route and replace the default search provider with constructor):
    1. Home: `/constructor`
    1. PLP - category wine: `/constructorio/search?filterName=type&filterValue=wine`
    1. PLP - category accessories: `/constructorio/search?filterName=type&filterValue=accessories`


## Features:
1. Global Search:
    1. Recent searches (related history searches, stored in browser)
    1. Suggestions (Search suggestions returned from constructor)
    1. Products (Search results)
2. Product listing page Search:
    1. Refine by Category, Rating, Brand, etc
    1. Sort By is also customized and updated by using Admin API
    1. Products (Search results)
3. Constructor Dashboard
    1. Edit Facets [https://app.constructor.io/dashboard/searchabilities](https://app.constructor.io/dashboard/searchabilities)
    1. Use Interact to search within constructor dashboard: [Interact dashboard](https://app.constructor.io/dashboard/interact?back=%2Fdashboard)
