import { FieldError } from 'react-hook-form'
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Select,
  SelectProps,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react'

interface SelectFieldProps {
  selectProps: SelectProps
  label: string
  callToAction?: React.ReactElement
  error?: FieldError
  formLabelProps?: FormLabelProps
  isRequired?: boolean
  children: React.ReactElement | React.ReactElement[]
  caption?: string
}

export const SelectField = ({
  selectProps,
  label,
  callToAction,
  error,
  formLabelProps,
  isRequired = false,
  children,
  caption,
}: SelectFieldProps) => {
  const { name } = selectProps
  if (!name) {
    return null
  }

  return (
    <FormControl isInvalid={Boolean(error)} isRequired={isRequired}>
      <Flex justify='space-between'>
        <FormLabel
          requiredIndicator={
            <>
              <Text color='danger.500' as='span' aria-hidden='true'>
                *
              </Text>
              <VisuallyHidden>required</VisuallyHidden>
            </>
          }
          mb='2'
          {...formLabelProps}
        >
          {label}
        </FormLabel>
        {callToAction}
      </Flex>
      <Select {...selectProps}>{children}</Select>
      <FormErrorMessage mt='2'>{error?.message}</FormErrorMessage>
      {caption && <FormHelperText fontSize='xs'>{caption}</FormHelperText>}
    </FormControl>
  )
}
