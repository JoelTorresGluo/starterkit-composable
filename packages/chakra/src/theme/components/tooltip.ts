import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system'
import { cssVar } from '@chakra-ui/theme-tools'

const $arrowBg = cssVar('popper-arrow-bg')

const baseStyle = defineStyle((props) => ({
  bg: 'colors.surface-inverse',
  color: 'background',
  [$arrowBg.variable]: cssVar('chakra-colors-text').reference,
}))

export default defineStyleConfig({
  baseStyle,
  variants: {
    dark: {
      bg: 'colors.surface.inverse',
      color: 'colors.text.primary-inverse',
      [$arrowBg.variable]: cssVar('chakra-colors-text').reference,
    },
    light: {
      bg: 'colors.surface.primary',
      color: 'colors.text.primary',

      [$arrowBg.variable]: cssVar('chakra-colors-background').reference,
    },
    highlight: {
      bg: 'colors.surface.highlight',
      color: 'colors.text.primary',
      [$arrowBg.variable]: cssVar('chakra-colors-highlight').reference,
    },
  },
})
