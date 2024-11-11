'use client'

import { ChangeEvent, useRef } from 'react'
import { useIntl } from 'react-intl'
import { FiSearch } from 'react-icons/fi'
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputProps,
  InputRightElement,
  useBreakpointValue,
  useToken,
  VisuallyHidden,
} from '@chakra-ui/react'
import { IoMdCloseCircle } from 'react-icons/io'

export interface SearchInputProps {
  buttonProps?: ButtonProps & { ref?: React.RefObject<HTMLButtonElement> }
  clearSearchInput?: () => void
  clearSearchRef?: React.RefObject<HTMLButtonElement>
  closeSearch?: () => void
  closeSearchButtonRef?: React.RefObject<HTMLButtonElement>
  formSubmitHandle?: (e: ChangeEvent<HTMLFormElement>) => void
  inputGroupProps?: InputGroupProps
  inputProps?: InputProps
  containerProps?: FlexProps
  isOpen?: boolean
  overlayProps?: BoxProps
}

export const SearchInput = ({
  buttonProps,
  clearSearchInput,
  clearSearchRef,
  closeSearch,
  closeSearchButtonRef,
  containerProps,
  formSubmitHandle,
  inputGroupProps,
  inputProps,
  isOpen,
  overlayProps,
}: SearchInputProps) => {
  const intl = useIntl()
  const isMobile = useBreakpointValue({ base: true, md: false })

  const searchInputRef = useRef<HTMLInputElement>(null)
  const handleTouchStart = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  const [size4, size6, size8] = useToken('sizes', [
    'sizes.4',
    'sizes.6',
    'sizes.8',
  ])

  return (
    <Box position='relative'>
      <form onSubmit={formSubmitHandle}>
        <Flex alignItems='center' {...containerProps}>
          <InputGroup {...inputGroupProps}>
            <InputLeftElement pointerEvents='none' pl='4'>
              <Icon as={FiSearch} color='text-muted' boxSize='5' />
            </InputLeftElement>
            <VisuallyHidden>
              <label htmlFor='global-search-input'>
                {intl.formatMessage({ id: 'global.search.input.placeholder' })}
              </label>
            </VisuallyHidden>
            <Input
              ref={searchInputRef}
              onTouchStart={handleTouchStart}
              id='global-search-input'
              borderRadius='md'
              pl='12'
              variant='filled'
              bg='colors.surface.muted'
              placeholder={intl.formatMessage({
                id: 'global.search.input.placeholder',
              })}
              _placeholder={{
                textAlign: isOpen ? 'start' : 'center',
              }}
              {...inputProps}
            />

            <InputRightElement w='fit-content'>
              {!!inputProps?.value && (
                <IconButton
                  // TODO: Localize string.
                  aria-label='Clear'
                  colorScheme='gray'
                  icon={<IoMdCloseCircle />}
                  onClick={clearSearchInput}
                  ref={clearSearchRef}
                  variant='link'
                />
              )}
              <Button
                aria-hidden={!isOpen || isMobile}
                borderLeftRadius='none'
                borderRightRadius='base'
                h={isMobile ? 'full' : '90%'}
                hidden={!isOpen || isMobile}
                size='sm'
                type='submit'
                {...buttonProps}
              >
                {intl.formatMessage({ id: 'global.search.button' })}
              </Button>
            </InputRightElement>
          </InputGroup>
          {isOpen && isMobile && (
            <Button
              borderRightRadius='base'
              color='blackAlpha.900'
              ref={closeSearchButtonRef}
              size='sm'
              textDecoration='none'
              textTransform='uppercase'
              variant='ghost'
              zIndex={inputGroupProps?.zIndex}
              onClick={closeSearch}
            >
              {intl.formatMessage({ id: 'action.close' })}
            </Button>
          )}
        </Flex>
      </form>

      <Box
        borderRadius='md'
        left={`calc(${size4} * -1)`}
        position='absolute'
        top={`calc(${size6} * -1)`}
        w={`calc(100% + ${size8})`}
        {...overlayProps}
      />
    </Box>
  )
}
