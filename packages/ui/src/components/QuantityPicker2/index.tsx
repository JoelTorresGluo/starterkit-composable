'use client'

import {
  Box,
  BoxProps,
  Center,
  Flex,
  IconButton,
  IconButtonProps,
  Text,
  useControllableState,
  UseControllableStateProps,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { useRef, forwardRef } from 'react'

interface QuantityPicker2Props extends UseControllableStateProps<number> {
  max?: number
  min?: number
  rootProps?: BoxProps
  isLoading?: boolean
  hideLabel?: boolean
  ariaLabel?: string
  label?: string
  quantityForLabel?: string
  buttonProps?: Partial<IconButtonProps>
}

export const QuantityPicker2 = (props: QuantityPicker2Props) => {
  const {
    min = 0,
    max,
    rootProps,
    isLoading,
    hideLabel,
    label = 'Quantity',
    ariaLabel = 'Quantity for product',
    buttonProps,
    ...rest
  } = props

  const decrementButtonRef = useRef<HTMLButtonElement | null>(null)
  const incrementButtonRef = useRef<HTMLButtonElement | null>(null)
  const [value, setValue] = useControllableState(rest)

  const handleDecrement = () => {
    if (isLoading || value === min) return
    setValue(value - 1)
    decrementButtonRef.current?.focus()
  }
  const handleIncrement = () => {
    if (isLoading || value === max) return
    setValue(value + 1)
    incrementButtonRef.current?.focus()
  }

  return (
    <Box aria-label={`${value}, ${ariaLabel}`} {...rootProps}>
      {hideLabel ? (
        <VisuallyHidden>
          <Text>{label}</Text>
        </VisuallyHidden>
      ) : (
        <Text fontSize='sm' fontWeight='medium'>
          {label}
        </Text>
      )}
      <Flex
        border='sm'
        borderRadius='base'
        px='2'
        py={{ base: 1, md: 2 }}
        justifyContent='space-between'
      >
        <QuantityPickerButton
          onClick={handleDecrement}
          icon={<FiMinus />}
          aria-label={`${label} Decrement`}
          ref={decrementButtonRef}
          isDisabled={isLoading}
          color='text'
          {...buttonProps}
        />
        <Center minW='8'>
          <Text
            as='span'
            userSelect='none'
            aria-live='assertive'
            aria-label={`${value}, ${ariaLabel}`}
          >
            {value}
          </Text>
        </Center>
        <QuantityPickerButton
          onClick={handleIncrement}
          icon={<FiPlus />}
          aria-label={`${label} Increment`}
          ref={incrementButtonRef}
          isDisabled={isLoading}
          color='text'
          {...buttonProps}
        />
      </Flex>
    </Box>
  )
}

const QuantityPickerButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => (
    <IconButton size='xs' fontSize='sm' variant='ghost' ref={ref} {...props} />
  )
)
QuantityPickerButton.displayName = 'QuantityPickerButton'
