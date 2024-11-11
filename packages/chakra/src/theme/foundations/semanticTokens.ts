import { semanticColorTokens, semanticUI } from './colors'

export const semanticTokens = {
  colors: {
    // Figma tokens
    background: {
      default: semanticColorTokens.colors.light['background'],
      _dark: semanticColorTokens.colors.dark['background'],
    },
    text: {
      default: semanticColorTokens.colors.light['text'],
      _dark: semanticColorTokens.colors.dark['text'],
    },
    'text-muted': {
      default: semanticColorTokens.colors.light['text-muted'],
      _dark: semanticColorTokens.colors.dark['text-muted'],
    },
    primary: {
      default: semanticColorTokens.colors.light['primary'],
      _dark: semanticColorTokens.colors.dark['primary'],
    },
    secondary: {
      default: semanticColorTokens.colors.light['secondary'],
      _dark: semanticColorTokens.colors.dark['secondary'],
    },
    highlight: {
      default: semanticColorTokens.colors.light['highlight'],
      _dark: semanticColorTokens.colors.dark['highlight'],
    },
    muted: {
      default: semanticColorTokens.colors.light['muted'],
      _dark: semanticColorTokens.colors.dark['muted'],
    },
    accent: {
      default: semanticColorTokens.colors.light['accent'],
      _dark: semanticColorTokens.colors.dark['accent'],
    },
    'bg-danger': {
      default: semanticUI['danger-med'],
      _dark: semanticUI['danger-dark'],
    },
    'bg-success': {
      default: semanticUI['success-med'],
      _dark: semanticUI['success-dark'],
    },
    'bg-btn-muted': {
      default: semanticColorTokens.colors.light['muted'],
      _dark: semanticColorTokens.colors.dark['muted'],
    },
    'fg-btn-muted': {
      default: semanticColorTokens.colors.light['text'],
      _dark: semanticColorTokens.colors.dark['text-muted'],
    },
  },
}
