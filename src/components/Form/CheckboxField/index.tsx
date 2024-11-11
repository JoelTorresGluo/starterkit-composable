import { FieldError } from 'react-hook-form'
import {
  Checkbox,
  CheckboxProps,
  Flex,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Text,
  TextProps,
} from '@chakra-ui/react'

export interface CheckboxFieldProps {
  checkboxProps: CheckboxProps
  textProps?: TextProps
  content: string
  rootProps?: FormControlProps
  callToAction?: React.ReactElement
  displayLabel?: boolean
  error?: FieldError
  formLabelProps?: FormLabelProps
  isRequired?: boolean
  label?: string
  caption?: string
}

export const CheckboxField = ({
  rootProps,
  checkboxProps,
  textProps,
  content,
  callToAction,
  error,
  formLabelProps,
  displayLabel = false,
  isRequired = false,
  label = '',
  caption,
}: CheckboxFieldProps) => {
  const { name } = checkboxProps
  if (!name) {
    return null
  }

  return (
    <FormControl
      isInvalid={Boolean(error)}
      isRequired={isRequired}
      {...rootProps}
    >
      {displayLabel && (
        <Flex justify='space-between'>
          <FormLabel
            h='auto'
            fontWeight='bold'
            textStyle='blockquote-75'
            {...formLabelProps}
          >
            {label}
          </FormLabel>
          {callToAction}
        </Flex>
      )}
      <Checkbox {...checkboxProps}>
        <Text textStyle='blockquote-75' as='span' {...textProps}>
          {content}
          {isRequired && (
            <Text as='span' color='danger-med' fontSize='md'>
              &nbsp;*
            </Text>
          )}
        </Text>
      </Checkbox>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
      {caption && <FormHelperText fontSize='xs'>{caption}</FormHelperText>}
    </FormControl>
  )
}
