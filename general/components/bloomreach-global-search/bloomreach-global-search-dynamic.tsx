import { useComposable } from '@oriuminc/base'
import { useEffect, useState, useRef, useMemo } from 'react'
import { Box, List, Text, Stack, useToken } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { useCombobox } from 'downshift'
import { useRouter } from 'next/router'
import { Overlay, SearchInput } from '../global-search-shared'
import {
  BLOOMREACH_CONSTANT,
  DEFAULT_CONFIG,
  SOURCE_ID_TO_TRANSLATION_ID,
  Z_INDEX,
} from '../global-search-shared/constants'
import { useRecentSearches } from './hooks'
import { useBloomreachAutoComplete } from './utils/bloomreachClient'
import BloomreachSuggestionList from './components/bloomreach-suggestion-list'
import { parseSearchBarItems } from './utils/bloomreach-search-utils'
import BloomreachSearchProducItem from './components/bloomreach-search-product-item'
import { BloomreachProductList } from './components/bloomreach-product-list'
import { HitItem, SearchItemType } from './shared/types'
import { BLOOMREACH_DEFAULT_QUERY } from '../../../product/pages/product-listing-shared'

export const BloomreachGlobalSearch = () => {
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
      key: BLOOMREACH_CONSTANT.RECENT_SEARCHES_KEY,
      limit: DEFAULT_CONFIG.hitsPerPage,
    })

  const { setQuery: setBloomreachSuggestionQuery, suggestionGroups } =
    useBloomreachAutoComplete()

  const { hitList, suggestionList, recentSearchList } = useMemo(
    () =>
      parseSearchBarItems(
        suggestionGroups.bloomReachSuggestResponse,
        suggestionGroups.bloomReachSearchResponse,
        recentSearches
      ),
    [suggestionGroups]
  )

  const combinedItems = [...hitList, ...suggestionList, ...recentSearchList]

  const [searchDebounce, setSearchDebounce] = useState<NodeJS.Timeout | null>(
    null
  )
  const [suggestSelected, setSuggesstSelected] = useState<{
    previousInputValue: string
    label: string
  }>()
  const [previousInputValue, setPreviousInputValue] = useState('')

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
    itemToString: (item) => item?.label ?? '',
    onSelectedItemChange: async ({ selectedItem }) => {
      if (selectedItem?.type === SearchItemType.HitItem) {
        await goToProductPDP(selectedItem.slug)
      } else if (
        selectedItem?.type === SearchItemType.RecentSearchItem ||
        selectedItem?.type === SearchItemType.SuggestionItem
      ) {
        if (selectedItem?.type === SearchItemType.SuggestionItem) {
          handleSuggestionSelected(selectedItem?.label ?? '')
        }
        await handleSetQuery(selectedItem?.label ?? '')
      }
    },
    onInputValueChange: ({ inputValue, ..._rest }) => {
      if (searchDebounce) {
        clearTimeout(searchDebounce)
      }

      setSearchDebounce(
        setTimeout(() => {
          const q = inputValue || BLOOMREACH_DEFAULT_QUERY.searchValue || ''
          setPreviousInputValue(q)
          updateQuery(q)
        }, 300)
      )
    },
  })

  const goToProductPDP = async (productSlug?: string) => {
    if (productSlug) {
      resetSearchBox()
      setMenuIsOpen(false)
      await router.push(path.getPDP({ slug: productSlug }))
    }
  }

  const updateQuery = (q: string) => {
    setRecentSearches(searchRecentSearches(q) ?? [])
    setBloomreachSuggestionQuery(q)
  }

  const handleSetQuery = async (label: string) => {
    setInputValue(label)
    updateRecentSearch(label)
    setMenuIsOpen(false)
    await router.push(
      path.getBloomreachSearch({ query: encodeURIComponent(label) })
    )
  }
  const handleSearch = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateRecentSearch(inputValue)
    setMenuIsOpen(false)
    inputRef?.current?.blur()
    //navega hacie [slug]/search?query="busqueda"
    await router.push(
      path.getBloomreachSearch({ query: encodeURIComponent(inputValue) })
    )
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
      updateQuery(inputValue || BLOOMREACH_DEFAULT_QUERY.searchValue || '')
      setRecentSearches(searchRecentSearches('') ?? [])
    }

    setTimeout(loadDefaultQuery, 0)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', handleFocusIn)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', handleFocusIn)
    }
  }, [isOpen])

  const handleSuggestionSelected = async (label: string) => {
    setSuggesstSelected({ previousInputValue, label })
  }

  useEffect(() => {
    if (!suggestSelected) return
    const searchData = {
      aq: suggestSelected.previousInputValue,
      q: suggestSelected.label,
    }
    // @ts-ignore
    BrTrk?.getTracker().logEvent('suggest', 'click', searchData, {}, true)
  }, [suggestSelected])

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
                    {recentSearchList.length > 0 && (
                      <Box
                        key={`${SOURCE_ID_TO_TRANSLATION_ID.recentSearchesPlugin}`}
                        mb='4'
                      >
                        <Text
                          as='h2'
                          fontWeight='semibold'
                          textStyle='blockquote-75-100'
                          mb='3'
                          textTransform='uppercase'
                        >
                          {intl.formatMessage({
                            id: SOURCE_ID_TO_TRANSLATION_ID.recentSearchesPlugin,
                          })}
                        </Text>
                        {combinedItems
                          .filter(
                            (el) => el.type === SearchItemType.RecentSearchItem
                          )
                          .map((item, index) => {
                            return (
                              <BloomreachSuggestionList
                                key={item.label}
                                item={{
                                  index,
                                  label: item.label,
                                }}
                                inputValue={inputValue}
                                bgStyle={
                                  highlightedIndex === item.index
                                    ? 'highlight'
                                    : 'background'
                                }
                                isSelected={highlightedIndex === item.index}
                                handleRemove={handleRemoveRecentSearch}
                                {...getItemProps({ item, index: item.index })}
                              />
                            )
                          })}
                      </Box>
                    )}
                    {suggestionList.length > 0 && (
                      <Box
                        key={`${SOURCE_ID_TO_TRANSLATION_ID.querySuggestionsPlugin}`}
                        mb='4'
                      >
                        <Text
                          as='h2'
                          fontWeight='semibold'
                          textStyle='blockquote-75-100'
                          mb='3'
                          textTransform='uppercase'
                        >
                          {intl.formatMessage({
                            id: SOURCE_ID_TO_TRANSLATION_ID.querySuggestionsPlugin,
                          })}
                        </Text>
                        {combinedItems
                          .filter(
                            (el) => el.type === SearchItemType.SuggestionItem
                          )
                          .map((item, index) => {
                            return (
                              <BloomreachSuggestionList
                                key={item.label}
                                item={{
                                  index,
                                  label: item.label,
                                }}
                                inputValue={inputValue}
                                bgStyle={
                                  highlightedIndex === item.index
                                    ? 'highlight'
                                    : 'background'
                                }
                                isSelected={highlightedIndex === item.index}
                                {...getItemProps({ item, index: item.index })}
                              />
                            )
                          })}
                      </Box>
                    )}
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
                    <BloomreachProductList
                      hitItems={
                        combinedItems.filter(
                          (el) => el.type === SearchItemType.HitItem
                        ) as HitItem[]
                      }
                      inputValue={inputValue}
                      renderItem={(item) => (
                        <BloomreachSearchProducItem
                          item={item as unknown as HitItem}
                          bgStyle={
                            highlightedIndex === item.index
                              ? 'highlight'
                              : 'background'
                          }
                          {...getItemProps({ item, index: item.index } as any)}
                          isSelected={highlightedIndex === item.index}
                        />
                      )}
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
