import { extendTheme } from '@chakra-ui/react'
import { alertTheme } from './theme/components/alert'
import { foundations } from './theme/foundations'
import { textStyles } from './theme/textStyles'
import { layerStyles } from './theme/layerStyles'
import * as components from './theme/components'
import { styles } from './theme/styles'
import { semanticTokens } from './theme/foundations/semanticTokens'

/*
  # Composable Default Theme
  This theme overrides the Chakra-UI base theme. Customizations can be done within the ./theme directory.

  ## Theme Typings and Autocomplete (VSCode)
  1. Install @chakra-ui/cli: `pnpm add --dev @chakra-ui/cli`.
  2. Run: `pnpm theme` (Note: comment out fonts in typography.ts beforehand).
  3. Restart Typescript Server: (Command + Shift + P) -> "Restart TS server".

  ## Customizing the Theme
  Override or add settings to the `theme` folder. To update typings, run `npx chakra-cli tokens [path to this theme file]` and restart the Typescript server.

  ## Examples
  To override the Input component, refer to the various guides and sources listed below.

  ### Resources
  - Styled System: https://chakra-ui.com/docs/styled-system/style-props
  - Components: https://chakra-ui.com/docs/components
  - Chakra-UI GitHub: https://github.com/chakra-ui/chakra-ui/
  - Input Guide: https://chakra-ui.com/docs/components/form/input
*/

/* 
    the export name must be `theme` here for the `npx chakra-cli tokens` to work
    change it to `theme`
*/
export const theme = extendTheme({
  ...foundations,
  textStyles,
  layerStyles,
  styles,
  semanticTokens,
  components: {
    ...components,
    Alert: alertTheme,
    Table: {
      parts: ['table', 'thead', 'tbody', 'tr', 'th', 'td'],
      baseStyle: {
        table: {
          color: 'text',
          borderCollapse: 'collapse',
          width: 'full',
          border: 'none',
        },
        thead: {
          borderBottom: 'sm',
        },
        tbody: {
          border: 'none',
        },
        tr: {
          border: 'none',
          height: '12',
        },
        th: {
          color: 'colors.text.muted',

          padding: '2',
          textAlign: 'left',
          border: 'none',
        },
        td: {
          padding: '4',
          border: 'none',
        },
      },
      variants: {
        simple: {
          table: {
            color: 'text',
          },
          thead: {},
          tbody: {},
          tr: {
            borderBottom: 'sm',
          },
          th: {
            borderColor: 'border',
            borderBottom: 'sm',
            color: 'colors.text.muted',
          },
          td: {
            borderColor: 'border',
            borderBottom: 'sm',
          },
        },
        striped: {
          table: {
            color: 'text',
          },
          thead: {
            borderBottom: 'sm',
          },
          th: {
            borderColor: 'border',
            borderBottom: 'sm',
            color: 'colors.text.muted',
          },
          tbody: {
            tr: {
              '&:nth-of-type(odd)': {
                backgroundColor: 'colors.surface.muted',
              },
              '&:nth-of-type(even)': {
                backgroundColor: 'colors.surface.primary',
              },
            },
          },
        },
      },
    },
    Divider: {
      baseStyle: {
        opacity: '1',
        borderColor: 'colors.surface.border',
      },
    },
    Accordion: {
      parts: ['container', 'button', 'panel'],
      baseStyle: {
        container: {
          borderColor: 'colors.surface.border',
        },
        button: {
          borderColor: 'colors.surface.border',
        },
      },
    },
  },
})
