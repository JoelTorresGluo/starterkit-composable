import { Container, ContainerProps } from '@chakra-ui/react'

export interface UiContainerProps {
  size?: null | 'full' | '2xl' | 'xl' | 'lg' | string
  children: null | ContainerProps['children']
  mt?: null | ContainerProps['mt']
  mb?: null | ContainerProps['mb']
}

export const UiContainer = ({ children, size, mb, mt }: UiContainerProps) => {
  const _size = size ?? 'full'

  return (
    <Container
      maxW={`container.${_size}`}
      p='none'
      px={_size === 'full' ? 'none' : undefined}
      mb={mb ?? undefined}
      mt={mt ?? undefined}
    >
      {children}
    </Container>
  )
}
