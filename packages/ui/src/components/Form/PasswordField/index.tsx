'use client'

import { forwardRef, useRef } from 'react'
import { useIntl } from 'react-intl'
import { FieldError } from 'react-hook-form'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from '@chakra-ui/react'

interface PasswordFieldProps {
  label: string
  inputProps: Omit<InputProps, 'type'>
  error?: FieldError
  callToAction?: React.ReactElement
  isRequired?: boolean
  formLabelProps?: FormLabelProps
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    { label, error, inputProps, callToAction, isRequired, formLabelProps },
    ref
  ) => {
    const intl = useIntl()
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = useRef<HTMLInputElement>(null)
    const mergeRef = useMergeRefs(inputRef, ref)
    const { name } = inputProps

    if (!name) {
      return null
    }

    const onClickReveal = () => {
      onToggle()
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true })
      }
    }

    return (
      <FormControl isInvalid={Boolean(error)} isRequired={isRequired}>
        <Flex justify='space-between'>
          <FormLabel {...formLabelProps}>{label}</FormLabel>
          {callToAction}
        </Flex>
        <InputGroup>
          <Input
            ref={mergeRef}
            name={name}
            type={isOpen ? 'text' : 'password'}
            autoComplete='current-password'
            _placeholder={{
              color: 'shading.300',
            }}
            {...inputProps}
          />
          <InputRightElement>
            <IconButton
              bg='transparent !important'
              variant='ghost'
              aria-label={intl.formatMessage({
                id: isOpen ? 'action.passwordMask' : 'action.passwordReveal',
              })}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      </FormControl>
    )
  }
)

PasswordField.displayName = 'PasswordField'
