---
sidebar_position: 10
---

# Constructor.io

Constructor.io provides an AI-driven e-commerce search engine solution, optimizing key performance indicators (KPIs) for online retail platforms. Its search technology utilizes advanced AI and Machine Learning (ML) algorithms to deliver customer-centric search results. The "Deep Commerce Core" feature learns from customer interactions, continuously enhancing search performance. This platform integrates sitewide search functionalities, merchant solutions, and is enterprise-ready, boosting product discoverability and personalizing shopping experiences to significantly improve revenue metrics.

For more information, visit the [Constructor.io Docs](https://docs.constructor.io/).

## Configuring the Integration

1. In your application's root folder, create or update the `.env.local` file:
    1. Log in to your [Constructor.io account](https://app.constructor.io/users/sign_in).
    1. Navigate to **Integration** > **API Integration** > **API Tokens**.
    1. Update the `.env.local` file with the `API Tokens` and the `Default Category` values as follows:

       ```shell
          # Constructor.io (Search as a Service)
          NEXT_PUBLIC_CONSTRUCTOR_API_KEY= #key_xxxxxxxx
          NEXT_PUBLIC_CONSTRUCTOR_DEFAULT_CATEGORY=wine
       ```

## Index

- Each index uses an index key (NEXT_PUBLIC_CONSTRUCTOR_API_KEY).
- Each index includes sections:
  - Products (product data)
  - Search Suggestions (search query suggestions/autocomplete)

## Constructor.io Integration Overview

The Constructor.io integration involves two main stages:

1. Creating and configuring data sync (CT connector) or providing product data through uploads.
1. Using the Constructor.io search API to enable search/autocomplete functionality on your site.

### Search functionality

Orium's Accelerator uses Constructor.io's frontend library to provide search/autocomplete UI functionality, including `constructorio-client-javascript`. The following section provides more details on the search functionality.

### Constructor.io Libraries

  - `@constructor-io/constructorio-client-javascript": "^2.36.4"`
  - `@constructor-io/constructorio-ui-autocomplete": "^1.23.4"`

### Setting up ConstructorIOClient

1. Outside your component, initialize a search client instance using the `ConstructorIOClient` constructor as shown below:

  ```jsx
    import ConstructorIOClient from '@constructor-io/constructorio-client-javascript'

    export const cioClient = new ConstructorIOClient({
      apiKey: process.env.NEXT_PUBLIC_CONSTRUCTOR_API_KEY ?? 'API_KEY_NOT_SET',
      // TODO: create sessionId and clientId for a personalize results
      // https://github.com/Constructor-io/constructorio-client-javascript/wiki/Utilization-in-a-DOM-less-environment
      sessionId: 1234,
      clientId: '1234',
    })

  ```

### Example: Global search

_Note that this is a simplified example._

```jsx
export const ConstructorGlobalSearch = () => {

  const { setQuery, sections, query } = useCioAutocomplete({
    cioJsClient: cioClient,
    onSubmit: () => {},
  })

  const updateQuery = (q: string) => {
    setRecentSearches(searchRecentSearches(q) ?? [])
    if (q) {
      setQuery(q)
    }
  }

  useEffect(() => {
    const search = setTimeout(() => {
      updateQuery(inputValue)
    }, 300)
    const debounce = () => clearTimeout(search)
    return debounce
  }, [inputValue])

  const handleSearch = async (e: React.ChangeEvent<HTMLFormElement>) => {
    // Code
  }
  const handleSetQuery = async (label: string) => {
    // Code
  }

  const renderSearchResultItem = (item: any) => {
    // UI
  }

  return (
    <SearchInput />
  )
```

### Example: PLP search page

_Again, this is a simplified example._

```jsx

export const ConstructorProductListing = ({
  popularProducts = null,
}) => {
  const { formatMessage } = useIntl()
  const router = useRouter()
  const { hitsPerPage } = useGridLayout()
 
  useEffect(() => {
    if (!router.isReady) return
    const fetchSearchResultsFromAPI = async () => {
      setIsLoading(true)
      try {
        const response = await fetchSearchResults(router, hitsPerPage)
        if (response) {
          setItems(response.results)
        }
      } catch (e) {
        console.error(e)
      }
      setIsLoading(false)
    }

    fetchSearchResultsFromAPI()
  }, [router.isReady, router.asPath, router.query?.query, hitsPerPage])


  const onChangeSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Code
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
