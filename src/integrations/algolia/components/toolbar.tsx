import { Box, Button, Text, useToken } from '@chakra-ui/react'
import { useInstantSearch, useSearchBox } from 'react-instantsearch'
import { useAtom } from 'jotai'
import { searchQueryAtom } from '../../../_data'
import { SearchInput } from '../../../ui/search-input'
import { useStores } from '../../../hooks/use-stores'
import { useStoreLocatorRouter } from '../../../hooks/use-store-locator-router'

let searchTimeout: NodeJS.Timeout | undefined

export const Toolbar = () => {
  const { quantity } = useStores()
  const { goTo } = useStoreLocatorRouter()
  const { refine: searchRefine, clear } = useSearchBox()
  const { results } = useInstantSearch()
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)

  const getFiltersQty = (): number => {
    let filtersQty = 0
    try {
      filtersQty =
        new URLSearchParams((results as unknown as { params: string })?.params) // Types are wrong! params exists in results!
          .get('facetFilters')
          ?.split(',').length ?? 0
    } catch {}

    return filtersQty
  }

  const filtersQty = getFiltersQty()
  const [size3, size4, size8] = useToken('sizes', [
    'sizes.3',
    'sizes.6',
    'sizes.8',
  ])

  return (
    <Box p={{ base: `${size4}`, lg: `${size8}` }}>
      <Text
        display={['none', null, 'block']}
        textStyle='desktop-200'
        color='text'
        mb={4}
      >
        Find a store near you
      </Text>

      <SearchInput
        onClear={() => {
          setSearchQuery('')
          clear()
        }}
        clearButtonProps={{
          'aria-label': 'Clear search input',
        }}
        submitButtonProps={{
          children: 'Search',
        }}
        inputProps={{
          placeholder: 'Enter ZIP Code or City & State',
          value: searchQuery,
          onFocus: () => goTo('results'),
          onChange: (e) => {
            const value = e.target.value
            setSearchQuery(value)
            clearTimeout(searchTimeout)

            if (value === '') {
              clear()
            } else {
              searchTimeout = setTimeout(() => searchRefine(value), 300)
            }
          },
        }}
        onSubmit={() => {
          if (searchQuery === '') {
            clear()
          } else {
            searchRefine(searchQuery)
          }
        }}
      />

      <Box display='flex' alignItems='baseline' mt={4}>
        <Button
          mr='6'
          w='32'
          p='none'
          fontWeight='normal'
          display='flex'
          justifyContent='space-between'
          variant='outline'
          borderColor='shading.200'
          color='text'
          onClick={() => goTo('filters')}
          _hover={{
            borderColor: 'shading.300',
            backgroundColor: 'white',
          }}
          _focus={{
            borderColor: 'shading.300',
            backgroundColor: 'white',
          }}
        >
          <Box pl={4}>Filters {filtersQty ? `(${filtersQty})` : ''}</Box>
          <Box pr={4}>
            <svg
              width={size3}
              height={size3}
              viewBox='0 0 16 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1 1.5H15M3.5 5H12.5M6.5 8.5H9.5'
                stroke='#111111'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </Box>
        </Button>

        <Text mt={4} textStyle='mobile-200' color='text' fontWeight='normal'>
          Displaying{' '}
          <Box as='span' color='text-muted'>
            {quantity} {quantity === 1 ? 'Item' : 'Items'}
          </Box>
        </Text>
      </Box>
    </Box>
  )
}
