'use client'

import { useRouter } from 'next/router'
import { useContentfulProductListingPage } from '../hooks'
import { CmsProductListingPageComponentProps } from '@oriuminc/base'
import { ContentItems } from '../components/render-content'
import { VisuallyHidden } from '@chakra-ui/react'
import { MetaData } from '@oriuminc/templates/general'

export const ContentfulProductListingPage = ({
  children,
  ProductsConnector,
  useCtConnector,
  slug,
}: CmsProductListingPageComponentProps) => {
  const router = useRouter()
  const { data } = useContentfulProductListingPage(
    `${slug || router.query.slug}`
  )

  return (
    <>
      <MetaData page={data ?? undefined} />

      <VisuallyHidden>
        <h1>{data?.pageTitle}</h1>
      </VisuallyHidden>

      {data?.headerContent &&
        ContentItems({
          content: data?.headerContent ?? [],
          ProductsConnector,
          useCtConnector,
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
