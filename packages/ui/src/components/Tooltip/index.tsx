import {
  Tooltip as ChakraTooltip,
  TooltipProps as ChakraTooltipProps,
} from '@chakra-ui/react'

export interface TooltipProps extends ChakraTooltipProps {
  theme?: TooltipTheme
  label: string
  placement?:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end'
}

export type TooltipTheme = 'dark' | 'light' | 'highlight'

export const Tooltip = ({
  placement = 'top',
  padding = '3',
  hasArrow = false,
  borderRadius = '4',
  label,
  children,
  theme = 'dark',
  width = 'md',
  ...rest
}: TooltipProps) => {
  return (
    <ChakraTooltip
      defaultIsOpen={true}
      hasArrow={true}
      borderRadius={borderRadius}
      placement={placement}
      w={width}
      p={padding}
      label={label}
      variant={theme}
      {...rest}
    >
      {children}
    </ChakraTooltip>
  )
}
