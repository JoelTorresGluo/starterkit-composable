'use client'

import { useRouter } from 'next/router'
import { useContentfulProductPage } from '../hooks'
import { CmsProductPageComponentProps } from '@oriuminc/base'
import { ContentItems } from '../components/render-content'
import { VisuallyHidden } from '@chakra-ui/react'

export const ContentfulProductPage = ({
  children,
  ProductsConnector,
  useCtConnector,
  slug,
  showPrice = true,
}: CmsProductPageComponentProps) => {
  const router = useRouter()
  const { data } = useContentfulProductPage(`${slug || router.query.slug}`)

  return (
    <>
      {data?.headerContent &&
        ContentItems({
          content: data?.headerContent ?? [],
          ProductsConnector,
          useCtConnector,
          showPrice,
        })}
      {children}
      {data?.footerContent &&
        ContentItems({
          content: data?.footerContent ?? [],
          ProductsConnector,
          useCtConnector,
        })}
    </>
  )
}
