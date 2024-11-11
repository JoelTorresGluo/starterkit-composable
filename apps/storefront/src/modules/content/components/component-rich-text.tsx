import { Box } from '@chakra-ui/react'
import { palette } from '@oriuminc/chakra/src/theme/foundations/colors'
import { ComposableRichText } from '@oriuminc/cms-generic'

// Because Chakra UI will reset all CSS,
// we need to define default CSS for each element
const DEFAULT_CSS = {
  blockquote: {
    borderLeft: `3px solid ${palette.shading['100']}`,
    margin: '1rem 0',
    padding: '0.5rem 1rem',
  },
  h1: {
    fontSize: '2rem',
    fontWeight: 'bold',
    lineHeight: '1.2',
    margin: '1rem 0',
  },
  h2: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    lineHeight: '1.3',
    margin: '1rem 0',
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 'semi-bold',
    lineHeight: '1.4',
    margin: '1rem 0',
  },
  h4: {
    fontSize: '1.2rem',
    fontWeight: 'semi-bold',
    lineHeight: '1.5',
    margin: '1rem 0',
  },
  h5: {
    fontSize: '1rem',
    fontWeight: 'semi-bold',
    lineHeight: '1.6',
    margin: '1rem 0',
  },
  h6: {
    fontSize: '0.8rem',
    fontWeight: 'semi-bold',
    lineHeight: '1.7',
    margin: '1rem 0',
  },
  // Paragraph
  p: {
    fontSize: '1rem',
    lineHeight: '1.6',
    margin: '0.5rem 0',
  },
  // Ordered list
  ol: {
    margin: '0.5rem',
    paddingLeft: '1rem',
    listStyleType: 'decimal',
  },
  // Unordered list
  ul: {
    margin: '0.5rem',
    paddingLeft: '0.5rem',
    listStyleType: 'disc',
  },
  li: {
    fontSize: '1rem',
    lineHeight: '1.6',
  },
  // Anchor tag
  a: {
    color: `${palette.info['500']}`,
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  },
  // Table and its components
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tbody: {},
  thead: {},
  tr: {
    border: '1px solid #ccc',
  },
  td: {
    padding: '8px',
    textAlign: 'left',
    border: '1px solid #ccc',
  },
  th: {
    padding: '8px',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  // Custom elements
  'check-list': {
    display: 'flex',
    alignItems: 'center',
  },
  // Grid and column layouts
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    flex: '1',
  },
  'grid-container': {
    display: 'grid',
  },
  'grid-child': {
    gridArea: 'auto',
  },
  // Span and Div
  span: {},
  div: {},
  // iframe
  iframe: {
    width: '100%',
    height: '400px',
  },
}
// Package ChakraUIRenderer source: https://github.com/mustaphaturhan/chakra-ui-markdown-renderer/blob/master/src/index.tsx
export const ComponentRichText = ({
  html,
}: Pick<ComposableRichText, 'html'>) => {
  if (!html) {
    return null
  }

  return (
    <Box
      __css={DEFAULT_CSS}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
      height='fit-content'
    />
  )
}
