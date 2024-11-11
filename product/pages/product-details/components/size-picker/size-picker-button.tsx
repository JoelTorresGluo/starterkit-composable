import {
  Button,
  chakra,
  useColorModeValue,
  useRadio,
  UseRadioProps,
  ButtonProps,
  Badge,
} from '@chakra-ui/react'

export type SizePickerButtonProps = UseRadioProps & {
  label?: string
  buttonProps?: ButtonProps
  selected?: boolean
  selectedText?: string
  stockLevelText?: string
  stock?: number
}

const getStockBadge = (stock?: number) => {
  if (stock !== undefined) {
    if (stock <= 0)
      return (
        <Badge
          position={'absolute'}
          fontSize={'2xs'}
          bg={'shading.100'}
          color={'danger-med'}
          bottom={'0px'}
          right={'0px'}
        >
          Out of Stock
        </Badge>
      )
    else if (stock > 0 && stock <= 5)
      return (
        <Badge
          position={'absolute'}
          fontSize={'2xs'}
          bg={'shading.100'}
          color={'text'}
          bottom={'0px'}
          right={'0px'}
        >
          Only {stock} left
        </Badge>
      )
  }
  return
}

export const SizePickerButton = (props: SizePickerButtonProps) => {
  const {
    value,
    label,
    stock,
    selected,
    buttonProps,
    selectedText,
    stockLevelText,
  } = props
  const { getInputProps, htmlProps, getCheckboxProps } = useRadio(props)
  const stockBadge = getStockBadge(stock)
  const stockLevelLabel =
    stock !== undefined ? `(${stockLevelText ?? 'Stock Level'}: ${stock})` : ''
  const ariaLabel = `${label} ${selectedText ?? 'Selected'} ${stockLevelLabel}`

  return (
    <chakra.label textStyle={'blockquote-75'} {...htmlProps}>
      <chakra.input
        tabIndex={selected ? 0 : 1}
        aria-label={ariaLabel}
        {...getInputProps()}
      />
      <Button
        value={value}
        as='span'
        size={'lg'}
        minW={{ base: 16, md: 20 }}
        py={1}
        px={4}
        bg={useColorModeValue('background', 'text')}
        cursor='pointer'
        variant='outline'
        color={useColorModeValue('text', 'background')}
        borderRadius='base'
        borderColor={selected ? 'primary' : 'shading.300'}
        borderWidth={selected ? '3px' : '1px'}
        {...buttonProps}
        {...getCheckboxProps()}
      >
        {label}
        {stockBadge}
      </Button>
    </chakra.label>
  )
}
