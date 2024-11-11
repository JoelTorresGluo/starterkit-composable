import {
  FormControl,
  FormControlProps,
  FormLabel,
  FormLabelProps,
  Select,
  SelectProps,
  VisuallyHidden,
} from '@chakra-ui/react'

interface QuantityPickerProps {
  formLabelProps?: FormLabelProps
  hideLabel?: boolean
  isLoading?: boolean
  label?: string
  minQuantity?: number
  maxQuantity?: number
  onChangeQuantity?: () => void
  quantity?: number
  rootProps?: FormControlProps
  selectProps?: SelectProps
}

const createRange = (min: number, max: number) => {
  let range = []
  for (let i = min; i <= max; i++) {
    range.push(i)
  }
  return range
}

export const QuantityPicker = ({
  formLabelProps,
  hideLabel,
  isLoading,
  label = 'Quantity',
  minQuantity = 1,
  maxQuantity = 10,
  onChangeQuantity,
  quantity = 1,
  rootProps,
  selectProps,
}: QuantityPickerProps) => {
  if (maxQuantity < minQuantity) return null

  if (quantity > maxQuantity) maxQuantity = quantity
  if (quantity < minQuantity) minQuantity = quantity

  return (
    <FormControl {...rootProps}>
      {hideLabel ? (
        <VisuallyHidden>
          <FormLabel>{label}</FormLabel>
        </VisuallyHidden>
      ) : (
        <FormLabel
          textStyle='mobile-50'
          fontWeight='extrabold'
          fontSize='sm'
          {...formLabelProps}
        >
          {label}
        </FormLabel>
      )}
      <Select
        name={label}
        size='sm'
        defaultValue={quantity ?? 1}
        w={{ base: 16, lg: 20 }}
        h={{ base: 7, lg: 10 }}
        borderRadius='md'
        textStyle={{ base: 'body-50', lg: 'blockquote-100' }}
        mt='1'
        onChange={() => onChangeQuantity?.()}
        isDisabled={isLoading}
        {...selectProps}
      >
        {createRange(minQuantity, maxQuantity).map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}
