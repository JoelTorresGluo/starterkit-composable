'use client'

import {
  FormControl,
  FormControlProps,
  FormLabel,
  useRadioGroup,
  UseRadioGroupProps,
  Wrap,
  WrapItem,
  VisuallyHidden,
} from '@chakra-ui/react'
import { SizePickerButton } from './size-picker-button'

interface Option {
  label: string
  value: string | number
  stock?: number
}

interface SizePickerProps extends UseRadioGroupProps {
  options: Option[]
  rootProps?: FormControlProps
  hideLabel?: boolean
  label?: string
  name?: string
}

export const SizePicker = (props: SizePickerProps) => {
  const { options, rootProps, hideLabel, label, name = 'Size', ...rest } = props
  const { getRadioProps, getRootProps, value } = useRadioGroup(rest)
  const selectedOption = options.find((option) => option.value == value)

  return (
    <FormControl {...rootProps}>
      {!hideLabel && (
        <FormLabel fontSize='sm' fontWeight='medium' aria-hidden={true}>
          {label ?? `${name}: ${selectedOption?.label ?? '-'}`}
        </FormLabel>
      )}
      <Wrap
        aria-label={
          label ??
          `Currently selected ${name} is ${selectedOption?.label ?? 'none'}`
        }
        overflow={'visible'}
        {...getRootProps()}
      >
        {options.map((option) => (
          <WrapItem key={`${option.value}${option.label}`}>
            <SizePickerButton
              selected={option.value === selectedOption?.value}
              label={option.label}
              stock={option.stock}
              {...getRadioProps({ value: option.value })}
            />
          </WrapItem>
        ))}
      </Wrap>
    </FormControl>
  )
}
