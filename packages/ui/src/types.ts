import { ContainerProps } from '@chakra-ui/react'

export interface UiContainerProps {
  container?: 'full' | '2xl' | 'xl' | 'lg'
  marginTop?: ContainerProps['marginTop']
  marginBottom?: ContainerProps['marginBottom']
}

export type ContentfulMegaMenuItem = {
  sys: {
    id?: string | null
  }
  label?: string | null
  href?: string | null
} | null

export type GetChildrenComponent = ({ id }: { id: string }) => {
  children?: ContentfulMegaMenuItem[]
  hasChildren: boolean
}
