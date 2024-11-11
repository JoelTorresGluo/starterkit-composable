---
sidebar_position: 12
---

# Bloomreach - Discovery

Bloomreach Discovery is a SaaS-based product discovery platform that helps you curate relevant, intelligent, and efficient digital search experiences so that your customers find the right products at the right time with maximum ease.
Discovery equips you with real-time data and actionable customer behavior insights that help you fine-tune your customers' search experiences to their preferences.


| Discovery Features| Implemented | Documentation Links                                                                                   |
| --- |-----|-------------------------------------------------------------------------------------------------------|
| Search and Merchandising | Yes | [Documentation](https://documentation.bloomreach.com/discovery/reference/product-search-category-api) |
| Recommendations and Pathways | Yes | [ Documentation](https://documentation.bloomreach.com/discovery/reference/autosuggest-api)            |
| SEO | No | [Documentation](https://documentation.bloomreach.com/discovery/docs/thematic-pages-tool)                                                                                     |
| Insight and Analytics | Yes | [Documentation](https://documentation.bloomreach.com/discovery/docs/pixel-overview)                   |
| Testing and Audience | Yes | [ Documentation](https://documentation.bloomreach.com/discovery/docs/ab-testing)                      |

For more information, visit the [Bloomreach Discovery Docs](https://documentation.bloomreach.com/discovery/docs/documentation-overview).


## How to enable in the Next.js storefront application

Follow the steps outlined below to enable the Bloomreach integration in the Next.js storefront application by adding your Bloomreach `API Tokens` and `Default Category` values to the `.env.local` file in the application's root directory:

1. **Set up local environment file**:
   1. Locate your application's root folder, and create or update the `.env.local` file.
   2. The `.env.local` file will hold all of the necessary API tokens and other key configuration values for your integration.

2. **Retrieve API information**:
   1. Sign in to your [Bloomreach account](https://tools.bloomreach.com/navapp) using Chrome.
   2. Navigate to your account dashboard to find the section where API keys are managed.

3. **Update `.env.local` File**:
   Add or update the `API Tokens` and the `Default Category` values in your `.env.local` file according to the following format:

   ```shell
      # Bloomreach (Search as a Service)
      NEXT_PUBLIC_BLOOMREACH_DEFAULT_CATEGORY=wine
      
      #Bloomreach config
      BLOOMREACH_HOST=https://api.connect.bloomreach.com
      BLOOMREACH_ACCOUNT_ID=XXXX
      BLOOMREACH_CATALOG_NAME_MANIFOLD_EN=XXXX
      BLOOMREACH_CATALOG_NAME_MANIFOLD_FR=XXXX
      BLOOMREACH_API_KEY=XXXXXXXXXXXXX
        
      NEXT_PUBLIC_BLOOMREACH_DEFAULT_QUERY_SUGGESTION=wine
      NEXT_PUBLIC_BLOOMREACH_SEARCH_HOST=https://core.dxpapi.com/
      NEXT_PUBLIC_BLOOMREACH_AUTO_SUGGEST_HOST=http://suggest.dxpapi.com/
      NEXT_PUBLIC_BLOOMREACH_CATALOG_NAME=XXXX
      NEXT_PUBLIC_BLOOMREACH_CONTENT_CATALOG_NAME=XXXX
      NEXT_PUBLIC_BLOOMREACH_WIDGET_ID=XXXX
      NEXT_PUBLIC_BLOOMREACH_BR_UID2=XXXX
        
      #STORE SPLASH
      NEXT_PUBLIC_BLOOMREACH_SPLASH_ACCOUNT_ID=XXXX
      NEXT_PUBLIC_BLOOMREACH_SPLASH_CATALOG_NAME_EN=XXXX
      NEXT_PUBLIC_BLOOMREACH_SPLASH_CATALOG_NAME_FR=XXXX
      #STORE MANIFOLD
      BLOOMREACH_MANIFOLD_ACCOUNT_ID=XXXX
      BLOOMREACH_MANIFOLD_CATALOG_NAME_EN=XXXX
      BLOOMREACH_MANIFOLD_CATALOG_NAME_FR=XXXX
   ```

## Add a new catalog for a new languaje

In order to add a new supported catalog for a new language its necessary to add an env variable and name it like:

```shell
NEXT_PUBLIC_BLOOMREACH_"STORE"_CATALOG_NAME_"LANG"
```
Where STORE refers to the store where the catalog belongs and LANG the lang of the catalog.


In case you want to set an specific catalog lang for a country like fr_CA, the env variable needs to be set as:

```shell
NEXT_PUBLIC_BLOOMREACH_SPLASH_CATALOG_NAME_FR_CA
```

Otherwise to set a default French catalog the env variable needs to be set as:

```shell
NEXT_PUBLIC_BLOOMREACH_SPLASH_CATALOG_NAME_FR
```

After the env is set you must declare a constant inside the file constants.ts in the directory
"packages/templates/general/components/bloomreach-global-search/shared/"

The file looks like this
```js
export const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME ?? ''
export const BLOOMREACH_CATALOG_CONSTANTS: {
  [key: string]: {
    [key: string]: string
  }
} = {
  SPLASH: {
    //...
    CATALOG_NAME_FR:
      process.env.NEXT_PUBLIC_BLOOMREACH_SPLASH_CATALOG_NAME_FR ?? '',
  }
}
```

In our example the env variable with the format NEXT_PUBLIC_BLOOMREACH_SPLASH_CATALOG_NAME_FR its translated to the JS object with this format:

```ts
export const BLOOMREACH_CATALOG_CONSTANTS: {
  [key: string]: {
    [key: string]: string
  }
} = {
   //...
   SPLASH: {
      CATALOG_NAME_FR: process.env.NEXT_PUBLIC_BLOOMREACH_SPLASH_CATALOG_NAME_FR
   }
}
```

NEXT_PUBLIC_BLOOMREACH_STORE_CATALOG_NAME_LANG

```ts
export const BLOOMREACH_CATALOG_CONSTANTS: {
  [key: string]: {
    [key: string]: string
  }
} = 
{
   //...
   "STORE" : {
      CATALOG_NAME_"LANG": NEXT_PUBLIC_BLOOMREACH_"STORE"_CATALOG_NAME_"LANG"
   }
}
```

After this the catalog env variable can be used with the following sintax:
```js
   import { BLOOMREACH_CATALOG_CONSTANTS } from '../shared/constants'

   BLOOMREACH_CATALOG_CONSTANTS[BRAND_NAME][LANG],

```

## Scheme of Store, Catalog, and Language
In this integration, we employ two brands or stores, specifically Manifold and Splash. Each of these supports two languages.

To access different languages, we use catalog names. For instance, for English, we would use 'BLOOMREACH_MANIFOLD_CATALOG_NAME_EN'.
These values are crafted from the .env file in the Bloomreach Tool Platform.

Looking into the indexing process, it's applied to each catalog within a store. Upon finishing the upload for all products, the next step involves manually adding some of the facets and attributes that can be searched in the Tool Portal of Bloomreach.

## Overview of Bloomreach Integration

The process of integrating Bloomreach using Commercetools and BigCommerce is carried out in three main phases:

1. Establish a Bloomreach account, complete with suited permissions (API KEY) for every store, catalog, or utilized language.
2. Configure data synchronization by setting up a [CT sync connector](bloomreach-commercetools#continuous-synchronization-process) or a [BC sync connector](bloomreach-bigcommerce#continuous-synchronization-process), alternatively, supply product data via product uploads for either [Commercetools Integration](bloomreach-commercetools) or [BigCommerce Integration](bloomreach-bigcommerce).
3. Upload the products to Bloomreach and set up the corresponding attributes and facets for the below-described functionalities.

### Bloomreach api calls

The following is an example of an API call to Bloomreach Products API taken from the [Bloomreach Product API docs](https://documentation.bloomreach.com/discovery/reference/product-search-category-api).

```js
const fetch = require('node-fetch');

const url = 'https://core.dxpapi.com/api/v1/core/?account_id=6702&_br_uid_2=uid%3D7797686432023%3Av%3D11.5%3Ats%3D1428617911187%3Ahc%3D55&domain_key=documentation_site&fl=pid&q=cable&request_type=search&search_type=keyword&url=https%3A%2F%2Fwww.documentation-site.com';
const options = {method: 'GET'};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
```


### Search functionality

The bloomreach integration wraps the API into a function called "fetchSearchHit", exported in the file bloomreachClient.ts. It returns a Promise containing the API response.

```js
import { fetchSearchHit } from 'packages/templates/general/components/bloomreach-global-search/utils/bloomreachClient'
```

#### Fetch function params

The fetch function receives a configuration object that must contain the required data to make the request defined with the TypeScript type:

```ts
export interface BloomreachSearchParams {
  q: string | undefined
  domain_key: string | undefined
  account_id: string | undefined
  catalog_views: string | undefined
  fl: string
  search_type: string
  rows: number
  fq?: { [key: string]: string }[]
  sort?: string
  start?: number
}
```

Where: 
- q: The site visitor's search query.
- domain_key: The site's domain ID
- account_id: The site's numerical Bloomreach account ID.
- catalog_views: The current catalog
- fl: The list of the products' fields to be returned by the API call.
- search_type: The search type, set to "keyword" to search for product search, otherwise set to "category" for category API search.
- rows: Rows to be returned for each page.
- fq: Facets Query
- sort: Sort of the results
- start: Offset of the results

Facets and Filtering docs: https://documentation.bloomreach.com/discovery/reference/faceting-and-filtering


```js
import { fetchSearchHit } from 'packages/templates/general/components/bloomreach-global-search/utils/bloomreachClient'


async function request() {
   let searchParams: BloomreachSearchParams = {
      q: "Wine",
      domain_key: "<domain-key>",
      fl: 'pid,title,brand,price,thumb_image,url',
      search_type: 'bestseller',
      account_id: "<account-id>,
      catalog_views: "<catalog_views>"
      rows: 5,
      sort: "price",
   }

   const response = await fetchSearchHit(params)
}
```

#### Adding facets

The Bloomreach Product API requires to send the query param "fq" multiple times in order to perform a facet-based filtering. The "fetchSearchHit" function receives a function as second argument to add multiple queries before the fetch is performed


```js
response = await fetchSearchHit(
    {
      ...searchParams,
    },
    (params) => {

      params.append('fq', 'price:[200 TO 300]')
      params.append('fq', 'rating:[2 TO 5]')      
      
      return params
    }
  )
```

### Example: Global search

This is an over-simplified code

```jsx
export const BloomreachGlobalSearch = () => {
  
   const updateQuery = (q: string) => {
      // CODE... 
   }

   const handleSetQuery = async (label: string) => {
      // CODE...
   }
   const handleSearch = async (e: React.ChangeEvent<HTMLFormElement>) => {
      // CODE...
   }

   const handleResetSearchBox = () => {
      // CODE...
   }

   const handleSuggestionSelected = async (label: string) => {
      // CODE...
   }

   return (
      <SearchInput {...SOME_PARAMS}/>
   )
}

```

### PLP functionality

This is a simplified PLP code

```jsx
export const BloomreachProductListing = ({
  popularProducts = null,
  customerId,
}: BloomreachProductListingProps) => {
  const { locale, formatMessage } = useIntl()
  const router = useRouter()
  const { hitsPerPage } = useGridLayout()

  useEffect(() => {
    if (!router.isReady) return
    const fetchSearchResultsFromAPI = async () => {
      setIsLoading(true)

      try {
        const { response, facet_counts } = await fetchSearchResults(
          router,
          hitsPerPage,
          locale
        )
        if (response) {
          setItems(response.docs)
          setPage(1)
          setFacets(parseFacets(facet_counts))
          setTotalResults(response.numFound)
        }
      } catch (e) {
        console.error(e)
      }
      setIsLoading(false)
    }

    fetchSearchResultsFromAPI()
  }, [router.isReady, router.asPath, router.query?.query, hitsPerPage])

  const onChangeSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // CODE..
  }

   return (
      <PageContainer>
         <NoResultsBoundary
         catchOn="unfiltered-search-only"
         popularProducts={popularProducts}
         query={query}
         >
            <Box mt={{ base: 6, lg: 16 }} mb={{ base: 2, lg: 3 }}>
               <Breadcrumb query={query || category} isSearchPage={isSearchPage} />
            </Box>   
            <FacetFilters />
            <InfiniteHits />
         </NoResultsBoundary>
      </PageContainer>
   )
}

```
