import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Input,
  InputProps,
  Text,
  VisuallyHidden,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Button,
} from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'

export interface InputFieldProps {
  inputProps: InputProps
  label?: string
  callToAction?: React.ReactElement
  error?: Pick<FieldError, 'message'>
  formLabelProps?: FormLabelProps
  isRequired?: boolean
  isDisabled?: boolean
  size?: 'md' | 'lg'
  caption?: string
  leftAddon?: string
  rightAddon?: string
}

export const InputField = ({
  inputProps,
  label,
  callToAction,
  error,
  formLabelProps,
  isRequired = false,
  isDisabled = false,
  size = 'md',
  leftAddon,
  rightAddon,
  caption,
}: InputFieldProps) => {
  const { name, value } = inputProps
  if (!name) {
    return null
  }

  return (
    <FormControl
      isInvalid={Boolean(error)}
      size={size}
      isRequired={isRequired}
      isDisabled={isDisabled}
    >
      <Flex justify='space-between'>
        {label && (
          <FormLabel
            mb='2'
            fontSize={size === 'md' ? 'md' : 'lg'}
            fontWeight='bold'
            requiredIndicator={
              <>
                <Text color='danger.500' as='span' aria-hidden='true'>
                  &nbsp;*
                </Text>
                <VisuallyHidden>required</VisuallyHidden>
              </>
            }
            {...formLabelProps}
          >
            {label}
          </FormLabel>
        )}
        {callToAction}
      </Flex>
      <InputGroup>
        {leftAddon && (
          <InputLeftAddon
            sx={{
              bg: 'colors.surface.muted',
              border: 'sm',
              color: 'colors.text.primary',
              height: 'inherit',
              fontSize: 'inherit',
            }}
          >
            <Button
              size={size === 'md' ? 'md' : 'lg'}
              fontWeight='normal'
              color='colors.text.primary'
              as='a'
              href=''
              variant='link'
            >
              {leftAddon}
            </Button>
          </InputLeftAddon>
        )}
        <Input size={size} {...inputProps} />
        {rightAddon && (
          <InputRightAddon
            sx={{
              bg: 'colors.surface.muted',
              border: 'sm',
              color: 'colors.text.primary',
              height: 'inherit',
              fontSize: 'inherit',
            }}
          >
            <Button
              size={size === 'md' ? 'md' : 'lg'}
              fontWeight='normal'
              color='colors.text.primary'
              as='a'
              href=''
              variant='link'
            >
              {rightAddon}
            </Button>
          </InputRightAddon>
        )}
      </InputGroup>
      <FormErrorMessage mt={2}>{error?.message}</FormErrorMessage>
      {caption && <FormHelperText fontSize='xs'>{caption}</FormHelperText>}
    </FormControl>
  )
}
