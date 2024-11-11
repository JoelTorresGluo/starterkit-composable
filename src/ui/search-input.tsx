import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  ButtonProps,
  InputRightElement,
  useToken,
} from '@chakra-ui/react'

export interface SearchInputProps {
  onClear?: () => void
  inputProps: InputProps & { placeholder: string }
  submitButtonProps: ButtonProps & { children: ButtonProps['children'] }
  clearButtonProps: InputProps & { 'aria-label': string }
  onSubmit?: () => void
}
export const SearchInput = ({
  inputProps,
  clearButtonProps,
  submitButtonProps,
  onClear,
  onSubmit,
}: SearchInputProps) => {
  const [size5, size12] = useToken('sizes', ['sizes.5', 'sizes.12'])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.()
      }}
    >
      <Box position='relative'>
        <InputGroup size='md'>
          <InputLeftElement w='14' h='12' pl='5' pr='4' pointerEvents='none'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width={size5}
              height={size5}
              fill='none'
            >
              <path
                stroke='#828282'
                strokeLinecap='round'
                strokeMiterlimit='10'
                strokeWidth='1.5'
                d='M13.857 13.858 19 19.001M8.364 1a7.364 7.364 0 1 0 0 14.727A7.364 7.364 0 0 0 8.364 1Z'
              />
            </svg>
          </InputLeftElement>
          <Input
            type='input'
            pl='14'
            h='12'
            borderRadius='md'
            _placeholder={{
              color: 'text-muted',
            }}
            _focus={{
              boxShadow: 'outline',
            }}
            {...inputProps}
          />
          {onClear && Boolean(`${inputProps?.value || ''}`.length) && (
            <InputRightElement h='12'>
              <Box
                tabIndex={0}
                _focus={{
                  shadow: 'outline',
                  outline: 'none',
                }}
                onClick={() => onClear()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onClear()
                  }
                }}
                w='5'
                h='5'
                lineHeight='5'
                borderRadius='full'
                cursor='pointer'
                {...clearButtonProps}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width={size5}
                  height={size5}
                  fill='none'
                >
                  <path
                    fill='#828282'
                    d='M10 .25C4.624.25.25 4.624.25 10s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S15.376.25 10 .25Zm3.53 12.22a.75.75 0 1 1-1.06 1.06L10 11.06l-2.47 2.47a.75.75 0 0 1-1.06-1.06L8.94 10 6.47 7.53a.75.75 0 0 1 1.06-1.06L10 8.94l2.47-2.47a.75.75 0 0 1 1.06 1.06L11.06 10l2.47 2.47Z'
                  />
                </svg>
              </Box>
            </InputRightElement>
          )}
        </InputGroup>
        <Button
          display={{ base: 'none', xs: 'block' }}
          type='submit'
          w='24'
          h={`calc(${size12} - 2px)`}
          position='absolute'
          top='none'
          right='none'
          borderRadius='md'
          borderLeftRadius='none'
          {...submitButtonProps}
        />
      </Box>
    </form>
  )
}
