import tokens from './tokens.json'
import transTokens from './transformedTokens.json'
// TODO/Note: Consider splitting transformedTokens.json into multiple files to enhance tree-shaking,
// as having smaller, more granular files could allow for more efficient elimination of unused code.

// Do not import from transformedTokens.json directly, use this file instead

// Individual exports for each property
export const radii = transTokens.radii
export const semantic = transTokens.semantic
export const core = transTokens.core
export const boxShadow = transTokens.boxShadow
export const overlay = transTokens.overlay
// Typography Primitives
export const fontFamilies = transTokens.fontFamilies
export const fontSize = transTokens.fontSize
export const fontWeights = transTokens.fontWeights
export const lineHeights = transTokens.lineHeights
export const letterSpacing = transTokens.letterSpacing
export const paragraphSpacing = transTokens.paragraphSpacing
// Spacing
export const spacing = transTokens.spacing
export const textCase = transTokens.textCase
export const textDecoration = transTokens.textDecoration
export const breakpoints = transTokens.breakpoints
export const sizes = transTokens.sizes
export const borders = transTokens.borders
// Typography (textStyles)
export const textStyles = transTokens.textStyles
// Components
export const component = transTokens.component

// Original Figma Tokens
export const originalFigmaTokens = tokens
