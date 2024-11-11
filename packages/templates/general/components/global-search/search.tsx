import {
  AutocompleteOptions,
  AutocompleteState,
  BaseItem,
  createAutocomplete,
} from '@algolia/autocomplete-core'
import { Box, List, ListItem, Text, Stack, useToken } from '@chakra-ui/react'
import { useCombobox } from 'downshift'
import { useEffect, useState, useRef } from 'react'
import { useHits, useSearchBox } from 'react-instantsearch'
import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { useComposable } from '@oriuminc/base'
import type { Hit as AlgoliaHit } from 'instantsearch.js/es/types'
import type { SearchClient } from 'algoliasearch/lite'
import {
  CollectionItem,
  CollectionItemProps,
  CollectionList,
  Hit,
  HitItem,
  Overlay,
  ProductList,
  SearchDataType,
  SearchInput,
} from '../global-search-shared'
import {
  DEBOUNCE_TIME,
  DEFAULT_AUTOCOMPLETE_STATE,
  DEFAULT_CONFIG,
  PLUGINS,
  Z_INDEX,
} from '../global-search-shared/constants'
import {
  combineSearchData,
  hasCollections,
} from '../global-search-shared/utils'
import {
  usePopularPlugin,
  useRecentSearchesPlugin,
  useSuggestionsPlugin,
} from './hooks'
import React from 'react'
import { analyticsClient } from '@oriuminc/analytics'

interface SearchProps extends Partial<AutocompleteOptions<AlgoliaHit>> {
  searchClient: SearchClient
  indexName: string
  querySuggestionsIndexName: string
}

export const Search = React.memo((props: SearchProps) => {
  const { searchClient, querySuggestionsIndexName } = props
  const intl = useIntl()
  const router = useRouter()
  const { path } = useComposable()
  const clearSearchRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchButtonRef = useRef<HTMLButtonElement>(null)
  const closeSearchButtonRef = useRef<HTMLButtonElement>(null)
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [autocompleteState, setAutocompleteState] = useState<
    AutocompleteState<BaseItem>
  >(DEFAULT_AUTOCOMPLETE_STATE)
  const { hits } = useHits<AlgoliaHit>()
  const { refine: setQuery } = useSearchBox()
  const { updateRecentSearch, onRemove, recentSearchesPlugin } =
    useRecentSearchesPlugin()
  const { suggestionsPlugin } = useSuggestionsPlugin({
    querySuggestionsIndexName,
    recentSearchesPlugin,
    searchClient,
  })
  const { popularPlugin } = usePopularPlugin({
    searchClient,
    querySuggestionsIndexName,
  })
  const combinedItems = combineSearchData(autocompleteState, hits)
  const autocomplete = createAutocomplete({
    plugins: [recentSearchesPlugin, suggestionsPlugin, popularPlugin],
    onStateChange({ state }) {
      setAutocompleteState(state)
    },
    reshape({ sourcesBySourceId, sources }) {
      const {
        recentSearchesPlugin: recentSearches,
        suggestionsPlugin: querySuggestions,
        popularSearchesPlugin: popular,
        ...rest
      } = sourcesBySourceId

      const sourceIdsToExclude = [PLUGINS.POPULAR_SEARCHES_PLUGIN]
      const shouldDisplayPopular = sources.every((source) => {
        if (sourceIdsToExclude.indexOf(source.sourceId) !== -1) {
          return true
        }
        return source.getItems().length === 0
      })

      return shouldDisplayPopular && popular
        ? [popular]
        : [querySuggestions, recentSearches, ...Object.values(rest)]
    },
  })
  const {
    getInputProps,
    getItemProps,
    getMenuProps,
    highlightedIndex,
    inputValue,
    isOpen,
    reset: resetSearchBox,
    setInputValue,
  } = useCombobox({
    isOpen: menuIsOpen,
    items: combinedItems,
    itemToString: (item) => item?.name ?? '',
    onSelectedItemChange: async ({ selectedItem }) => {
      if (selectedItem?.type === SearchDataType.HIT) {
        await goToProductPDP(selectedItem.slug)
      } else if (selectedItem?.type === SearchDataType.COLLECTION) {
        await handleSetQuery(selectedItem.name)
      }
    },
  })

  const updateQuery = async (q: string) => {
    setQuery(q)
    autocomplete.setQuery(q)
    await autocomplete.refresh()
  }

  useEffect(() => {
    // set the query from the url
    if (router.pathname === '/search') {
      const query = router.query?.query?.toString()
      if (query) {
        setInputValue(query)
      }
    }
  }, [router])

  useEffect(() => {
    const search = setTimeout(async () => {
      await updateQuery(inputValue || DEFAULT_CONFIG.popularQuery)
    }, DEBOUNCE_TIME)
    const debounce = () => clearTimeout(search)
    return debounce
  }, [inputValue])

  const goToProductPDP = async (productSlug?: string) => {
    if (productSlug) {
      resetSearchBox()
      setMenuIsOpen(false)
      await router.push(path.getPDP({ slug: productSlug }))
    }
  }

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.stopPropagation()
        setMenuIsOpen(false)
        inputRef?.current?.blur()
      }
    }
    const handleFocusIn = () => {
      if (
        isOpen &&
        document.activeElement !== inputRef?.current &&
        document.activeElement !== clearSearchRef?.current &&
        document.activeElement !== searchButtonRef?.current &&
        document.activeElement !== closeSearchButtonRef?.current
      ) {
        setMenuIsOpen(false)
      }
    }
    const loadDefaultQuery = async () => {
      autocomplete.setQuery(inputValue || DEFAULT_CONFIG.popularQuery)
      await autocomplete.refresh()
    }

    setTimeout(loadDefaultQuery, 0)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', handleFocusIn)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', handleFocusIn)
    }
  }, [isOpen])

  const handleSearch = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.trim()) {
      updateRecentSearch(inputValue)
      setMenuIsOpen(false)
      inputRef.current?.blur()
      await router.push(
        path.getSearch({ query: encodeURIComponent(inputValue) })
      )
    }
    analyticsClient.track({
      name: 'search',
      params: {
        search_term: inputValue,
      },
    })
  }
  const handleSetQuery = async (label: string) => {
    setInputValue(label)
    updateRecentSearch(label)
    setMenuIsOpen(false)
    await autocomplete.refresh()
    await router.push(path.getSearch({ query: encodeURIComponent(label) }))
  }
  const handleRemoveRecentSearch = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    label: string
  ) => {
    e.preventDefault()
    e.stopPropagation()
    onRemove(label)
    autocomplete.setQuery(inputValue || DEFAULT_CONFIG.popularQuery)
    await autocomplete.refresh()
  }
  const handleResetSearchBox = async () => {
    resetSearchBox()
    inputRef.current?.focus()
    autocomplete.setQuery(DEFAULT_CONFIG.popularQuery)
    await autocomplete.refresh()
  }

  const renderSearchResultItem = (item: CollectionItemProps | HitItem) => {
    switch (item.type) {
      case SearchDataType.COLLECTION:
        return (
          <ListItem
            key={`${item.name}${item.index}`}
            pt='0-5'
            px='none'
            _hover={{
              backgroundColor: 'highlight',
            }}
            bg={highlightedIndex === item.index ? 'highlight' : 'background'}
            {...getItemProps({ item, index: item.index })}
          >
            <CollectionItem
              selected={highlightedIndex === item.index}
              name={item.name}
              inputValue={inputValue}
              handleRemove={
                item.subType === PLUGINS.RECENT_SEARCHES_PLUGIN
                  ? handleRemoveRecentSearch
                  : undefined
              }
            />
          </ListItem>
        )
      case SearchDataType.HIT:
        return (
          <ListItem
            key={`${item.objectID}${item.index}`}
            _hover={{
              backgroundColor: 'highlight',
            }}
            pb='4'
            bg={highlightedIndex === item.index ? 'highlight' : 'background'}
            {...getItemProps({ item, index: item.index })}
          >
            <Hit hit={item as any} selected={highlightedIndex === item.index} />
          </ListItem>
        )
      default:
        return <></>
    }
  }

  const [size24] = useToken('sizes', ['sizes.24'])

  return (
    <SearchInput
      clearSearchRef={clearSearchRef}
      closeSearchButtonRef={closeSearchButtonRef}
      isOpen={isOpen}
      clearSearchInput={handleResetSearchBox}
      closeSearch={() => {
        setMenuIsOpen(false)
      }}
      containerProps={{
        mt: {
          base: isOpen ? `calc(${size24} * -1)` : 'none',
          md: 'none',
        },
        pt: {
          base: isOpen ? 4 : 'none',
          md: 'none',
        },
      }}
      formSubmitHandle={handleSearch}
      inputGroupProps={{
        onKeyDown: (e) => {
          if (e.key === 'Enter') handleSearch(e as any)
        },
        zIndex: Z_INDEX.INPUT_GROUP,
      }}
      inputProps={{
        ...getInputProps({ onFocus: () => setMenuIsOpen(true), ref: inputRef }),
        autoFocus: true,
      }}
      buttonProps={{
        disabled: inputValue === '',
        ref: searchButtonRef,
      }}
      overlayProps={{
        zIndex: Z_INDEX.RESULTS,
        backgroundColor: isOpen ? 'background' : 'transparent',
        children: (
          <Box
            aria-label={intl.formatMessage({ id: 'action.search' })}
            px={{ base: 4, md: 8 }}
            {...getMenuProps()}
          >
            {isOpen && (
              <Box
                mt={{ base: 28, md: 'xxxl' }}
                mb='lg'
                px={{ base: 4, md: 2 }}
              >
                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  gap={{ base: 4, md: 10 }}
                >
                  <Box minW={{ base: 'full', md: '30%' }}>
                    {autocompleteState?.collections.map((collection, index) => {
                      if (!collection.items.length) return null
                      return (
                        <CollectionList
                          key={`${collection.source.sourceId}${index}`}
                          collection={collection}
                          combinedItems={combinedItems}
                          renderItem={renderSearchResultItem}
                        />
                      )
                    })}
                  </Box>
                  <Box w='full'>
                    <Text
                      as='h2'
                      fontWeight='semibold'
                      textStyle='blockquote-75-100'
                      textTransform='uppercase'
                    >
                      {intl.formatMessage({ id: 'text.products' })}
                    </Text>
                    <ProductList
                      combinedItems={combinedItems}
                      inputValue={inputValue}
                      renderItem={renderSearchResultItem}
                    />
                  </Box>
                </Stack>
                <Overlay
                  zIndex={Z_INDEX.OVERLAY}
                  onClick={() => setMenuIsOpen(false)}
                />
              </Box>
            )}
          </Box>
        ),
      }}
    />
  )
})
