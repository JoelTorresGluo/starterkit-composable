import { Container, ContainerProps } from '@chakra-ui/react'

interface PageContainerProps {
  children: React.ReactElement
  containerProps?: ContainerProps
}

export const PageContainer = ({
  containerProps,
  children,
}: PageContainerProps) => {
  return (
    <Container
      aria-live='polite'
      aria-busy='true'
      maxW='container.2xl'
      px={{ base: 4, '2xs': 6, xs: 24 }}
      mt={{ base: 4, '2xs': 6, xs: 8 }}
      overflow='hidden'
      {...containerProps}
    >
      {children}
    </Container>
  )
}
