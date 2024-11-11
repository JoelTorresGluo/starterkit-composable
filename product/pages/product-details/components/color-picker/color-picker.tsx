import {
  FormControl,
  FormControlProps,
  FormLabel,
  HStack,
  useRadioGroup,
  UseRadioGroupProps,
  VisuallyHidden,
} from '@chakra-ui/react'
import { ColorPickerOption } from './color-picker-option'

interface ColorPickerProps extends UseRadioGroupProps {
  options: Option[]
  rootProps?: FormControlProps
  hideLabel?: boolean
  label?: string
  name?: string
}

interface Option {
  label: string
  value: string
}

export const ColorPicker = (props: ColorPickerProps) => {
  const {
    options,
    rootProps,
    hideLabel,
    label,
    name = 'Color',
    ...rest
  } = props
  const { getRadioProps, getRootProps, value } = useRadioGroup(rest)
  const selectedOption = options.find((option) => option.value == value)
  return (
    <FormControl {...rootProps}>
      {!hideLabel && (
        <FormLabel fontSize='sm' fontWeight='medium' aria-hidden={true}>
          {label ?? `${name}: ${selectedOption?.label ?? '-'}`}
        </FormLabel>
      )}
      <HStack
        aria-label={
          label ??
          `Currently selected ${name} is ${selectedOption?.label ?? 'none'}`
        }
        {...getRootProps()}
      >
        {options.map((option) => (
          <ColorPickerOption
            key={option.value}
            color={option.label}
            {...getRadioProps({ value: option.value })}
          />
        ))}
      </HStack>
    </FormControl>
  )
}
