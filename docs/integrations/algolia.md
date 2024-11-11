---
sidebar_position: 5
---

# Algolia

Algolia is the headless search engine that powers the search experience in your application. Algolia enables a full global search, Product Listing Pages (PLP), and custom filtering and sorting requirements.

For more information, see the [Algolia documentation](https://www.algolia.com/doc/).

## Configuring the Integration

1. In your application's root folder, create or update the `.env.local` file:
    1. Log into your [Algolia Dashboard](https://www.algolia.com/dashboard).
    1. Go to **Settings** > **Teams and Acccess** > **API Keys**.
    1. Update the `.env.local` file with the `Application ID` and the `Search API Key` values as in the following example:

       ```shell
        NEXT_PUBLIC_ALGOLIA_APP_ID={application_id}
        NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY={search_api_key}
       
        ## The BASE_INDEX value will be used as a prefix for your Agolia index names. By default this is 'storefront'
        NEXT_PUBLIC_ALGOLIA_BASE_INDEX='storefront'
        
        ## The key of your Search - Configuration record in the CMS. This will be used to setup the facet filters and sort by options on the Product Listing Page
        NEXT_PUBLIC_CMS_ALGOLIA_CONFIG_KEY={cms_algolia_config_key}
       ```
       
### Configuration on the CMS

Orium's Accelerator stores and consumes some configurations, like filters and sort by options for Algolia powered pages, in the Content Management System (CMS).

For more information about this, check the `Algolia Configuration` section on the corresponding CMS page of these docs.


## Index Guidelines and Naming Conventions

Orium's Accelerator uses the following rules to build Algolia indexes:

- One index variant per locale instead of a single index with multiple fields for each locale.
- One index variant per brand. This is applicable only for multi-brand stores.
- Each index can have as many replicas as sorting options as shown in the Product Listing Page. The default setting is four.

Based on the schema, the format for the primary index name is,  `{BASE_INDEX_NAME}_{BRAND_NAME}_{LOCALE}`.  For example,  `mystore_mybrand_en-US`

Based on the schema, the format for a replica is `{BASE_INDEX_NAME}_{BRAND_NAME}_{LOCALE}_{SORTING_OPT}`. For example, `mystore_mybrand_en-US_nameDesc`

## Algolia Integration Overview

At a high-level, the Algolia integration is composed of 3 stages:

1. Create and configure indexes.
1. Provide the initial data load, and set up an automatic syncing process to keep the data up-to-date.
1. Consume the Algolia search API to provide search functionality on the site.

### Index Configuration

During the initial setup, you must configure the necessary indices, which is the collection of records where data is stored, in Algolia. These configurations include the searchable attributes, facets and replicas. Replicas contain the same records as the primary index, but have their own configurations to adjust ranking and sorting options.

You can conduct the configurations through Algolia's API or through the [Algolia dashboard](https://www.algolia.com/dashboard).

### Data synchronization with Algolia

Algolia hosts an up-to-date copy of the source data and provides functionality to search this data directly from its own servers through the following steps:

1. Fetch data from the source, usually the commerce service.
1. Transform the data into JSON records by keeping the fields relevant for searching.
1. Send the records to Algolia.

This process is conducted once during the initial data load, and then continuously whenever the source data changes. For example, when a new product is published or when a product price or inventory changes.

The initial data load is bootstrapped using pre-configured scripts that is available in the `scripts` folder.

The continuous sync requires an integration that listens to events on the commerce provider side, and then executes the necessary actions to update Algolia’s records.

### Search functionality

You can use Algolia with the frontend of the application after all data is loaded into Algolia, and indexes and other configurations are complete.

Orium's Accelerator uses Algolia's official widget library to provide search UI functionality, including `React InstantSearch Hooks`. The following section provides more details on the search functionality.

## React InstantSearch Hooks

[React InstantSearch Hooks](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react-hooks/) is based on `InstantSearch.js` and provides UI components and allows more control when rendering with Hooks.

### Setting up React InstantSearch Hooks

1. Outside your component, initialize a search client instance using the `algoliasearch` constructor as in the following example:  

  ```jsx
  const algoliaClient = algoliasearch('app-id', 'search-api-key')
  ```

1. Wrap the search UI with an `InstantSearch` provider and pass it to the search client instance as in the following code sample:

  ```jsx
  export const MySearchComponent = () => {
    return (
        <InstantSearch searchClient={algoliaClient} indexName={'index-name'}>
          // all of the search UI here
        </InstantSearch>
    )
  }
  ```

1. To build your search UI components and handle queries to Algolia, use the hooks provided in `react-instantsearch-hooks-web`.

### Example: Global Search in Orium's Accelerator

_Note that this is a simplified example._

```jsx
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-hooks-web'
import { Search } from './Search'

// Instantiate the search client
const algoliaClient = algoliasearch('app-id', 'search-api-key')

export const AlgoliaGlobalSearch = () => {
   return (
     {/* Wrap the search UI with the InstantSearch provider */}
     <InstantSearch searchClient={algoliaClient} indexName={'index-name'}>
        <Search />
     </InstantSearch>
   )
}
```

```jsx
import { useHits, useSearchBox } from 'react-instantsearch-hooks-web'
import { StarterKitAlgoliaProduct } from '@oriuminc/algolia'
import { SearchInput } from './SearchInput'
import { SearchResults } from './SearchResults'

export const Search = () => {
    // The useSearchBox hook returns a "refine" function
    // that you can use to search based on a string
    // (in our case, its the string that the user inputs)
   const { refine } = useSearchBox()
    // Then you can use the useHits hooks to retrieve the query results
   const { hits } = useHits<StarterKitAlgoliaProduct>()

   return (
     <>
        <SearchInput value={inputValue} onChange={(e) => refine(e.target.value)} />
        <SearchResults products={hits} />
     </>
   )
}
```

### Example: Product Listing Page in Orium's Accelerator

_Note that this is a simplified example._

```jsx
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-hooks-web'
import { Filters } from './Filters'
import { Results } from './Results'

// Instantiate the search client
const algoliaClient = algoliasearch('app-id', 'search-api-key')

export const ProductListingPage = () => {
  return (
    {/* Wrap the search UI with the InstantSearch provider */}
    <InstantSearch searchClient={algoliaClient} indexName={'index-name'}>
      <Filters />
      <Results />
    </InstantSearch>
  )
}
```

```jsx
import { RefinementList } from './RefinementList'

// Define the list of filters that you want to show
const FILTERS = [
   { attribute: 'brand' },
   { attribute: 'color' }
]

export const Filters = () => {
  return (
    <>
      {FILTERS.map((refinement) => <RefinementList key={refinement.attribute} {...refinement} />)}
    </>
  )
}
```

```jsx
import { Box, Checkbox, Heading, Text, HStack } from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import { UseRefinementListProps } from 'react-instantsearch-hooks-web'

export const RefinementList: FunctionComponent<UseRefinementListProps> = (props) => {
   // The useRefinementList hook receives the refinements that we set previously
   // and returns an array "items" which are the possible values of each attribute.
   // It also returns a "refine" function that we can use to apply a refinement.
  const { items, refine } = useRefinementList({ ...props })

  if (items && items.length === 0) return null

  return (
    <Box>
      <Heading>{items.label}</Heading>
       {/*
       Use the "items" array to display the list of possible values.}
       Here we used checkboxes to allow the user to apply a refinement.
       */}
      {items.map((item) => (
        <HStack>
          <Checkbox
            colorScheme="shading"
            id={item.label}
            isChecked={item.isRefined}
            onChange={() => refine(item.value)}
          />
          <HStack
            flexGrow={1}
            justify="space-between"
            fontSize="xs"
            fontWeight="normal"
          >
            <label htmlFor={item.label}>{item.label}</label>
            <Text color="gray.500">{item.count}</Text>
          </HStack>
        </HStack>
      ))}
    </Box>
  )
}
```

## Algolia Insights

Algolia Insights is an analytics tool that tracks user interactions with search features, offering insights into preferences and behavior. It enables personalized search experiences by analyzing clicks and queries, guiding improvements in search relevance and user engagement. Through detailed analytics, it aids in making data-driven decisions to enhance overall search performance and user satisfaction.

This project incorporates methods for tracking standard events as supported by the platform. For more details, see the [Algolia Events Documentation](https://www.algolia.com/doc/guides/sending-events/concepts/event-types/). 

These events are automatically tracked without additional code:

- `clickedObjectIDsAfterSearch`
- `convertedObjectIDsAfterSearch`
- `addedToCartObjectIDsAfterSearch`
- `purchasedObjectIDsAfterSearch`
- `clickedObjectIDs`
- `convertedObjectIDs`
- `addedToCartObjectIDs`
- `purchasedObjectIDs`
- `clickedFilters`
- `convertedFilters`
- `viewedObjectIDs`
- `viewedFilters`

### Implementation Details

- The integration assumes that the product ID from the commerce service is used as the Algolia object ID.
- Since the Algolia indexes used by the accelerator store data at the product level, the events send references to products rather than individual variants.
- The `useAlgoliaInsights` hook, available in the `@oriuminc/algolia` package, is responsible for initializing the Search Insights library.
- Automatic events have been disabled by setting `insights=false` in the `InstantSearchNext` component, since react component rerenders makes it send the same event multiple times. Instead, the accelerator manually triggers the `Hits Viewed` and `Clicked Filters` events.
- When a search result is selected, the Query ID and any applied filters are passed to the Product Detail Page (PDP) via query parameters to be used when adding the product to the cart.
- After a search, if a product is added to the cart from the PDP (with the Query ID present in the query parameters), both the Query ID and the added products are cached using local storage. This cache is used after a purchase to determine whether each product was discovered through a search (`purchasedObjectIDsAfterSearch`) or not (`purchasedObjectIDs`). The cache is cleared after checkout is completed or when more than 20 queries have been stored to avoid overloading the user's local storage.

## Query Suggestions

Query Suggestions is a search experience that displays a list of possible queries that your users can select from as they type. It helps users find queries that are guaranteed to return results. 

### Configuration

In order to implement query suggestions, it's required to create a Query Suggestions index configuration from the Algolia dashboard.

Once the Query Suggestions index is configured, the feature starts building suggestions based on the source index and how the users interact with the search experience.

#### Query Suggestions indexes

A Query Suggestions index contains vetted search suggestions with a popularity score.

By default, the Query Suggestions builder generates suggestions by leveraging data from Search Analytics. Specifically, the builder pulls the most frequent searches from the last 30 days from the designated source index. It's also possible use external analytics or facet data to supplement the suggestions index.

To create a Query Suggestions index, follow these steps:

1. Go to the [Query Suggestions page](https://dashboard.algolia.com/query-suggestions) of the Algolia dashboard.
1. Click the `New Query Suggestions Index` button on the top right.
1. Choose the `Source index` (the index whose analytics data to rely upon to generate the suggestions index). The input autofills the name for the new Query Suggestions index with the source index’s name postfixed with “_query_suggestions”. It's recommended to keep this as is, since the accelerator expects this naming pattern.
1. Click `Accept and Continue`.

The Query Suggestions builder begins building your Query Suggestions index right away.

Once the Query Suggestions index is created you can configure things like languages, banned expressions, minimum letters and hits for suggestions.

#### Query Suggestions UI

The Orium's Accelerator Global Search component will query the Query Suggestions index and display the results:

![Query Suggestions UI](/img/query-suggestions.png)

:::warning
If the Query Suggestions index hasn't been configured, there will be an empty space below the search input. If the project does not require this feature, you will need to remove this component from the codebase.
:::

![No Query Suggestions](/img/no-query-suggestions.png)

## Product Recommendations

Algolia offers five models, designed to provide product recommendations, that can be trained based on your indexes and the `Algolia Insights` events sent by Orium's Accelerator:

- `LookingSimilar`
- `Related Products`
- `FrequentlyBoughtTogether`
- `Trending Items`
- `Trending Facets Value`

You can create and train models directly from the Algolia dashboard. Be sure to check the requirements for each model, as some may require a minimum amount of events to function effectively.

Orium's Accelerator includes components that display recommendations based on the following models:

- `Related Products`
- `FrequentlyBoughtTogether`
- `Trending Items`
- `LookingSimilar`

As an example, a `Related Products` recommendation component is displayed at the bottom of both Product Display pages and cart pages. This component requires that the `Related Products` model is set up for the indexes in use.
