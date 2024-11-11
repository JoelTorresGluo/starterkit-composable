import { borderStyles } from './foundations/borderStyles'

export const layerStyles = {
  'test-class': {
    fontSize: 'calc(32px + 16 * ((100vw - 568px) / (768 - 568))',
    marginInlineStart: 2,
  },
  'divider-default': {
    borderStyle: borderStyles.normal,
    borderBottom: 'sm',
  },
  'no-scroll-bar': {
    'div:first-of-type::-webkit-scrollbar': {
      display: 'none' /* for Chrome, Safari, and Opera */,
    },
    'div:first-of-type': {
      MsOverflowStyle: 'none' /* for Internet Explorer, Edge */,
      scrollbarWidth: 'none' /* for Firefox */,
    },
  },
  highlight: {
    backgroundColor: 'highlight',
    textColor: 'text',
  },
  dark: {
    backgroundColor: 'text',
    textColor: 'background',
  },
  light: {
    backgroundColor: 'background',
    textColor: 'text',
  },
  'dark-text': {
    textColor: 'background',
  },
  'light-text': {
    textColor: 'text',
  },
  'header-footer-padding': {
    px: { base: 4, sm: 10 },
  },
  'container-padding': {
    px: { base: 4, sm: 10, xl: '20' },
  },
}
