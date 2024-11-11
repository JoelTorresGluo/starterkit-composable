import { Link, LinkProps, TextProps, Text } from '@chakra-ui/react'

type SkipToListItem = {
  href: string
  label: string
}

export interface SkipLinksProps {
  linkProps?: LinkProps
  skipToList: SkipToListItem[]
  textProps?: TextProps
}

export const SkipLinks = ({
  linkProps,
  skipToList,
  textProps,
}: SkipLinksProps) => {
  return (
    <nav
      // TODO: Localize string.
      aria-label='Skip Links'
    >
      {skipToList.map((item) => (
        <Link
          key={item.href}
          position='absolute'
          // TODO: Replace color value with token.
          bg='rgba(220,220,220, 0.7)'
          bottom='100%'
          w='full'
          p='8'
          textDecoration='none'
          borderBottom='none'
          _focus={{
            bottom: 'auto',
            top: 'none',
            zIndex: 9999,
          }}
          href={item.href}
          {...linkProps}
        >
          <Text
            fontSize='4'
            p='6'
            margin='auto'
            w='fit-content'
            textAlign='center'
            textTransform='uppercase'
            bg='text'
            color='background'
            {...textProps}
          >
            {item.label}
          </Text>
        </Link>
      ))}
    </nav>
  )
}
