import { textStyles as _textStyles } from '../figma-tokens'
import { mergeTextStyles } from '../utils'

// For key/props ref: https://v0.chakra-ui.com/style-props
export const responsiveTextStyles = {
  /* For responsive text styles
   * 1. you can use the `mergeTextStyles`
   * util to Combine textStyles
   * 2. do just use `textStyle={{ base: 'mobile-400', lg: 'desktop-400' }}`
   * inline in your component
   */
  // heading
  'heading-50': mergeTextStyles({
    baseStyle: _textStyles['mobile-50'],
    mdStyle: _textStyles['desktop-50'],
  }),
  'heading-75': mergeTextStyles({
    baseStyle: _textStyles['mobile-75'],
    mdStyle: _textStyles['desktop-75'],
  }),
  'heading-100': mergeTextStyles({
    baseStyle: _textStyles['mobile-100'],
    mdStyle: _textStyles['desktop-100'],
  }),
  'heading-200': mergeTextStyles({
    baseStyle: _textStyles['mobile-200'],
    mdStyle: _textStyles['desktop-200'],
  }),
  'heading-300': mergeTextStyles({
    baseStyle: _textStyles['mobile-300'],
    mdStyle: _textStyles['desktop-300'],
  }),
  'heading-400': mergeTextStyles({
    baseStyle: _textStyles['mobile-400'],
    mdStyle: _textStyles['desktop-400'],
  }),
  'heading-500': mergeTextStyles({
    baseStyle: _textStyles['mobile-500'],
    mdStyle: _textStyles['desktop-500'],
  }),
  'heading-600': mergeTextStyles({
    baseStyle: _textStyles['mobile-600'],
    mdStyle: _textStyles['desktop-600'],
  }),
  'heading-700': mergeTextStyles({
    baseStyle: _textStyles['mobile-700'],
    mdStyle: _textStyles['desktop-700'],
  }),
  // body
  'body-50-75': mergeTextStyles({
    baseStyle: _textStyles['body-50'],
    mdStyle: _textStyles['body-75'],
  }),
  'body-75-100': mergeTextStyles({
    baseStyle: _textStyles['body-75'],
    mdStyle: _textStyles['body-100'],
  }),
  'body-300-500': mergeTextStyles({
    baseStyle: _textStyles['body-100'],
    mdStyle: _textStyles['body-300'],
  }),
  'body-100-300': mergeTextStyles({
    baseStyle: _textStyles['body-100'],
    mdStyle: _textStyles['body-300'],
  }),
  'blockquote-75-100': mergeTextStyles({
    baseStyle: _textStyles['blockquote-75'],
    mdStyle: _textStyles['blockquote-100'],
  }),
  blockquote: mergeTextStyles({
    baseStyle: _textStyles['blockquote-50'],
    mdStyle: _textStyles['blockquote-75'],
  }),
  'body-25-50': mergeTextStyles({
    baseStyle: _textStyles['body-25'],
    mdStyle: _textStyles['body-50'],
  }),
  eyebrow: mergeTextStyles({
    baseStyle: _textStyles['eyebrow-50'],
    mdStyle: _textStyles['eyebrow-75'],
  }),
}

export const textStyles = { ...responsiveTextStyles, ..._textStyles }
