import { Box, List, ListItem, Stack, Text } from '@chakra-ui/react'
import { useComposable } from '@oriuminc/base'
import { useCombobox } from 'downshift'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { COMMERCETOOLS_DEFAULT_CATEGORY } from '../../../product/pages/product-listing-shared'
import {
  COMMERCETOOLS_CONSTANT,
  CollectionItem,
  CollectionList,
  DEFAULT_CONFIG,
  Overlay,
  PLUGINS,
  ProductList,
  SearchDataType,
  SearchInput,
  Z_INDEX,
  combineSearchData,
} from '../global-search-shared'
import { CommercetoolsSearchProducItem } from './components'
import { useCtAutocomplete, useRecentSearches } from './hooks'
import { buildSearchCollections, transformCommercetoolsHit } from './utils'

export const CommercetoolsGlobalSearch = ({
  isLoggedIn,
  channelId,
}: {
  isLoggedIn?: boolean
  channelId?: string
}) => {
  const intl = useIntl()
  const router = useRouter()
  const { path, locale, currency } = useComposable()
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
      key: COMMERCETOOLS_CONSTANT.RECENT_SEARCHES_KEY,
      limit: DEFAULT_CONFIG.hitsPerPage,
    })

  const { query, setQuery, hits, suggestions } = useCtAutocomplete({
    channelId,
  })

  const _hits = useMemo(
    () =>
      hits?.map((item, index) =>
        transformCommercetoolsHit({ item, locale, currency, index, isLoggedIn })
      ),
    [currency, hits, isLoggedIn, locale]
  )

  const _suggestions = useMemo(
    () => buildSearchCollections({ suggestions, recentSearches, query }),
    [suggestions, recentSearches, query]
  )

  const combinedItems = combineSearchData(_suggestions, _hits)

  const goToProductPDP = async (productSlug?: string) => {
    if (productSlug) {
      resetSearchBox()
      setMenuIsOpen(false)

      await router.push(path.getPDP({ slug: productSlug }))
    }
  }

  const updateQuery = (q: string) => {
    setRecentSearches(searchRecentSearches(q) ?? [])
    setQuery(q)
  }

  const handleSetQuery = async (label: string) => {
    setInputValue(label)
    updateRecentSearch(label)
    setMenuIsOpen(false)

    await router.push(path.getSearch({ query: encodeURIComponent(label) }))
  }

  const handleSearch = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateRecentSearch(inputValue)
    setMenuIsOpen(false)

    inputRef?.current?.blur()

    await router.push(path.getSearch({ query: encodeURIComponent(inputValue) }))
  }

  const handleRemoveRecentSearch = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    label: string
  ) => {
    e.preventDefault()
    e.stopPropagation()

    removeRecentSearch(label)
    updateQuery('')
  }

  const handleResetSearchBox = () => {
    resetSearchBox()
    inputRef?.current?.focus()
  }

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

  useEffect(() => {
    const deboucedSearch = setTimeout(() => updateQuery(inputValue), 300)

    return () => {
      clearTimeout(deboucedSearch)
    }
  }, [inputValue])

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
      updateQuery(inputValue || COMMERCETOOLS_DEFAULT_CATEGORY.filterValue)
    }

    setTimeout(loadDefaultQuery, 0)

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', handleFocusIn)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', handleFocusIn)
    }
  }, [])

  const renderSearchResultItem = (item: any) => {
    switch (item.type) {
      case SearchDataType.COLLECTION:
        return (
          <ListItem
            key={`${item.name}${item.index}`}
            padding='2px 0'
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
            <CommercetoolsSearchProducItem
              hit={item}
              selected={highlightedIndex === item.index}
            />
          </ListItem>
        )

      default:
        return <></>
    }
  }

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
          base: isOpen ? '-6rem' : 'none',
          md: 'none',
        },
        pt: {
          base: isOpen ? '1rem' : 'none',
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
                // TODO: Replace pixel value with token.
                mt={{ base: '7rem', md: 'xxxl' }}
                mb='lg'
                px={{ base: 4, md: 8 }}
              >
                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  gap={{ base: 4, md: 10 }}
                >
                  <Box minW={{ base: 'full', md: '30%' }}>
                    {_suggestions?.collections.map((collection, index) => {
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
                      fontWeight='semiBold'
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
