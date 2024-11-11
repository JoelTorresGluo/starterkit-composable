import { useComposable } from '@oriuminc/base'
import { useEffect, useState, useRef, useMemo } from 'react'
import { Box, List, ListItem, Text, Stack, useToken } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { useCombobox } from 'downshift'
import { useRouter } from 'next/router'
import {
  useCioAutocomplete,
  Section,
  Product,
} from '@constructor-io/constructorio-ui-autocomplete'
import { combineSearchData } from '../global-search-shared/utils'
import {
  CollectionItem,
  CollectionList,
  Hit,
  Overlay,
  ProductList,
  SearchDataType,
  SearchInput,
} from '../global-search-shared'
import {
  CONSTRUCTOR_CONSTANT,
  DEFAULT_CONFIG,
  PLUGINS,
  Z_INDEX,
} from '../global-search-shared/constants'
import { useRecentSearches } from './hooks'
import {
  buildSearchCollections,
  useCioClient,
  transformConstructorHit,
} from './utils'
import { CONSTRUCTOR_DEFAULT_CATEGORY } from '../../../product/pages/product-listing-shared'
import { analyticsClient } from '@oriuminc/analytics'

export const ConstructorGlobalSearch = ({ userId }: { userId?: string }) => {
  const intl = useIntl()
  const router = useRouter()
  const { path, currency } = useComposable()
  const clearSearchRef = useRef<HTMLButtonElement>(null)
  const closeSearchButtonRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchButtonRef = useRef<HTMLButtonElement>(null)
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState<
    { id: string; label: string }[]
  >([])
  const { updateRecentSearch, removeRecentSearch, searchRecentSearches } =
    useRecentSearches({
      key: CONSTRUCTOR_CONSTANT.RECENT_SEARCHES_KEY,
      limit: DEFAULT_CONFIG.hitsPerPage,
    })

  const cioClient = useCioClient({
    userId,
  })
  const { setQuery, sections, query } = useCioAutocomplete({
    cioJsClient: cioClient,
    onSubmit: () => {},
  })

  const hits = (
    (sections.find(
      (section: Section) =>
        (section as any).identifier === CONSTRUCTOR_CONSTANT.SECTION_ID.PRODUCTS
    )?.data as Product[]) ?? []
  ).map((item) => transformConstructorHit({ item, currency }))
  const suggestions = useMemo(() => {
    return buildSearchCollections({ sections, recentSearches, query })
  }, [sections, query, recentSearches])

  const combinedItems = combineSearchData(suggestions, hits)
  /*
  TODO: fix these errors, they are caused by downshift but nothing seems to be broken
  https://github.com/downshift-js/downshift/issues/1531
    downshift: The ref prop "undefined" from getMenuProps was not applied correctly on your element.
    downshift: The ref prop "undefined" from getInputProps was not applied correctly on your element.
  */
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
    const loadDefaultQuery = () => {
      // TODO: need a default query
      updateQuery(inputValue || CONSTRUCTOR_DEFAULT_CATEGORY.filterValue)
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
    updateRecentSearch(inputValue)
    setMenuIsOpen(false)
    inputRef?.current?.blur()
    await router.push(
      path.getConstructorIoSearch({ query: encodeURIComponent(inputValue) })
    )
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
    await router.push(
      path.getConstructorIoSearch({ query: encodeURIComponent(label) })
    )
  }
  const handleRemoveRecentSearch = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    label: string
  ) => {
    e.preventDefault()
    e.stopPropagation()
    removeRecentSearch(label)
    // refresh autocomplete
    updateQuery(inputValue)
  }
  const handleResetSearchBox = () => {
    resetSearchBox()
    inputRef?.current?.focus()
  }

  const renderSearchResultItem = (item: any) => {
    switch (item.type) {
      case SearchDataType.COLLECTION:
        return (
          <ListItem
            key={`${item.name}${item.index}`}
            py='0-5'
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
        ...getInputProps({
          onFocus: () => {
            setMenuIsOpen(true)
          },
          ref: inputRef,
        }),
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
          <List
            aria-label={intl.formatMessage({ id: 'action.search' })}
            px={{ base: 4, md: 'none' }}
            {...getMenuProps()}
          >
            {isOpen && (
              <Box
                mt={{ base: 28, md: 'xxxl' }}
                mb='lg'
                px={{ base: 4, md: 8 }}
              >
                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  gap={{ base: 4, md: 10 }}
                >
                  <Box minW={{ base: 'full', md: '30%' }}>
                    {suggestions?.collections.map((collection, index) => {
                      if (!collection.items.length) return null
                      return (
                        <CollectionList
                          key={`${collection.source.sourceId}${index}`}
                          collection={collection as any}
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
                      mb='3'
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
          </List>
        ),
      }}
    />
  )
}
