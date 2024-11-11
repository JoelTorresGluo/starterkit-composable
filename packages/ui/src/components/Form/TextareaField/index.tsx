import { FieldError } from 'react-hook-form'
import {
  Textarea,
  FormControl,
  FormErrorMessage,
  FormLabel,
  TextareaProps,
  Flex,
  Text,
  FormHelperText,
} from '@chakra-ui/react'

interface TextareaFieldProps {
  label: string
  inputProps: TextareaProps
  error?: FieldError
  callToAction?: React.ReactElement
  isRequired?: boolean
  caption?: string
}

export const TextareaField = ({
  label,
  error,
  inputProps,
  callToAction,
  isRequired = false,
  caption,
}: TextareaFieldProps) => {
  const { name } = inputProps
  if (!name) {
    return null
  }

  return (
    <FormControl isInvalid={Boolean(error)} isRequired={isRequired}>
      <Flex justify='space-between'>
        <FormLabel
          requiredIndicator={
            <Text color='danger.500' as='span' aria-hidden='true'>
              *
            </Text>
          }
          mb='2'
        >
          {label}
        </FormLabel>
        {callToAction}
      </Flex>
      <Textarea {...inputProps} />
      <FormErrorMessage mt='2'>{error?.message}</FormErrorMessage>
      {caption && <FormHelperText fontSize='xs'>{caption}</FormHelperText>}
    </FormControl>
  )
}
