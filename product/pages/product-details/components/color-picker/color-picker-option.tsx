import {
  chakra,
  Circle,
  Icon,
  useRadio,
  UseRadioProps,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FiCheck } from 'react-icons/fi'

interface ColorPickerOptionProps extends UseRadioProps {
  color: string
}

export const ColorPickerOption = (props: ColorPickerOptionProps) => {
  const { color, value } = props
  const { getInputProps, htmlProps, getCheckboxProps, getLabelProps, state } =
    useRadio(props)

  return (
    <chakra.label
      cursor='pointer'
      h={12}
      w={12}
      textStyle={'blockquote-75'}
      {...htmlProps}
    >
      <chakra.input tabIndex={state.isChecked ? 0 : 1} {...getInputProps()} />
      <Circle
        size='12'
        borderColor={state.isChecked ? 'primary' : 'shading.300'}
        borderWidth={state.isChecked ? 3 : 1}
        _focus={{
          borderColor: 'info.500',
          borderWidth: 3,
        }}
        {...getCheckboxProps()}
      >
        <Circle size='10' bg={color}>
          {state.isChecked && (
            <Icon as={FiCheck} w={6} h={6} color='gray.400' />
          )}
        </Circle>
      </Circle>
      <VisuallyHidden {...getLabelProps()}>
        {color} color selected
      </VisuallyHidden>
    </chakra.label>
  )
}
