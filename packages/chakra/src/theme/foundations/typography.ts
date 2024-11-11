import localFont from 'next/font/local'
import {
  fontSize,
  fontFamilies,
  fontWeights as fontWeightsTokens,
  lineHeights as lineHeightsTokens,
  letterSpacing as letterSpacingTokens,
} from '../../figma-tokens'

// IMPORTANT: Chakra UI CLI has a bug affecting theme typings and autocomplete.
// If you intend to run `pnpm theme`, you'll need to make code adjustments.
//
// Steps:
// 1. Comment out the 'Normal Usage' section below.
// 2. Uncomment the 'For pnpm theme Usage' section.
//
// This workaround is due to a known issue with Chakra UI CLI. For more details, visit:
// https://github.com/chakra-ui/chakra-ui/issues/7157#issuecomment-1399243083

// For `pnpm theme` Usage (Uncomment for running `pnpm theme`):
// const circularStdFont = null

// Normal Usage (Comment out when running `pnpm theme`):
const circularStdFont = localFont({
  src: [
    // Regular font weights
    {
      path: './../../fonts/CircularStd/CircularStd-Book.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './../../fonts/CircularStd/CircularStd-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './../../fonts/CircularStd/CircularStd-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './../../fonts/CircularStd/CircularStd-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    // Italic font weights
    {
      path: './../../fonts/CircularStd/CircularStd-BookItalic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './../../fonts/CircularStd/CircularStd-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: './../../fonts/CircularStd/CircularStd-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
    {
      path: './../../fonts/CircularStd/CircularStd-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
  ],
})
// --- End of Normal Usage ---

export const availableFonts = {
  // fontFamily value are dynamically generated from the font file name,
  // so we can't use the fontFamilies tokens here
  primary: circularStdFont?.style?.fontFamily ?? 'Circular',
  secondary: fontFamilies?.secondary ?? 'Inter',
  tertiary: fontFamilies?.tertiary ?? 'Arial',
}

export const fonts = {
  body: availableFonts.primary,
  heading: availableFonts.primary,
  mono: availableFonts.primary,
  //https://nextjs.org/docs/basic-features/font-optimization
  // Define font family for Circular Std
  // Because the font family name is dynamically generated from the font file name
  // (ex: __circularStdFont_f63866 for CircularStd-Book.ttf),
  Circular: circularStdFont?.style?.fontFamily,
  CircularStd: circularStdFont?.style?.fontFamily,
  'Circular Std': circularStdFont?.style?.fontFamily,
}

// Need to match with chakra-ui Theme Key
export const typography = {
  fonts,
  fontSizes: fontSize,
  fontWeights: fontWeightsTokens,
  letterSpacings: letterSpacingTokens,
  lineHeights: lineHeightsTokens,
}
