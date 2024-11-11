import { Box, Button, Select, Text, useToken } from '@chakra-ui/react'
import { useState } from 'react'
import { SearchInput } from '../../ui/search-input'
import { useStores } from '../../hooks/use-stores'
import { useStoreLocatorRouter } from '../../hooks/use-store-locator-router'

export const Toolbar = () => {
  const [search, setSearch] = useState('')
  const { quantity } = useStores()
  const { goTo } = useStoreLocatorRouter()

  const [size3, size4, size8] = useToken('sizes', [
    'sizes.3',
    'sizes.4',
    'size8',
  ])

  return (
    <Box p={{ base: `${size4}`, lg: `${size8}` }}>
      <Text
        display={['none', null, 'block']}
        textStyle='desktop-200'
        color='text'
        mb='4'
      >
        Find a store near you
      </Text>

      <SearchInput
        onClear={() => setSearch('')}
        clearButtonProps={{
          'aria-label': 'Clear search input',
        }}
        submitButtonProps={{
          children: 'Search',
        }}
        inputProps={{
          placeholder: 'Enter ZIP Code or City & State',
          value: search,
          onChange: (e) => setSearch(e.target.value),
        }}
      />

      <Box display='flex' mt={4}>
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
          <Box pl='4'>Filters</Box>
          <Box pr='4'>
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
        <Select
          w='full'
          // TODO: Replace pixel value with token.
          maxW='300px'
        >
          <option value='1'>Distance: Nearest to me</option>
          <option value='1'>Distance: Farthest from me</option>
        </Select>
      </Box>

      <Text mt='4' textStyle='mobile-200' color='text' fontWeight='normal'>
        Displaying{' '}
        <Box as='span' color='text-muted'>
          {quantity} {quantity === 1 ? 'Item' : 'Items'}
        </Box>
      </Text>
    </Box>
  )
}
