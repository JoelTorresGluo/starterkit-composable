import { Styles } from '@chakra-ui/theme-tools'

export default {
  variants: {
    line: (props: Styles) => {
      return {
        tab: {
          color: 'text-muted',
          _focus: {
            borderColor: 'primary',
          },
          _selected: {
            borderColor: 'primary',
            color: 'primary',
            bg: 'transparent',
            fontWeight: 'bold',
          },
        },
        tablist: {
          borderColor: 'transparent',
        },
      }
    },
    'soft-rounded': (props: Styles) => {
      return {
        tab: {
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'transparent',
          color: 'text-muted',
          bg: 'transparent',
          fontWeight: 'normal',

          _focus: {
            borderColor: 'primary',
            color: 'primary',
          },
          _selected: {
            color: 'primary',
            bg: 'transparent',
            fontWeight: 'bold',
            borderColor: 'primary',
          },
        },
      }
    },
    'solid-rounded': (props: Styles) => {
      return {
        tab: {
          borderColor: 'transparent',
          bg: 'transparent',
          color: 'text-muted',
          border: 'none',
          fontWeight: 'normal',

          _focus: {
            borderColor: 'primary',
            bg: 'primary',
            color: 'white',
          },
          _selected: {
            borderColor: 'primary',
            bg: 'primary',
            color: 'white',
            fontWeight: 'bold',
          },
        },
      }
    },
    highlight: (props: Styles) => {
      return {
        tab: {
          color: 'text-muted',
          _selected: {
            color: 'primary',
            fontWeight: 'bold',
          },
        },
      }
    },
  },
}
