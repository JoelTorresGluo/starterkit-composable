'use client'

import {
  ComposableContentPage,
  ComposableProductListingPage,
} from '@oriuminc/cms-generic'
import { NextSeo } from 'next-seo'
import { intlConfig } from '../intl'
import { getSiteUrl, getTwitterMetaTag } from '@oriuminc/base'
import { useRouter } from 'next/router'

export const MetaData = ({
  page,
}: {
  page?: Pick<
    ComposableContentPage | ComposableProductListingPage,
    | 'metaTitle'
    | 'metaDescription'
    | 'metaKeywords'
    | 'openGraphTitle'
    | 'openGraphDescription'
    | 'openGraphImages'
  >
}) => {
  const router = useRouter()
  return (
    <NextSeo
      title={page?.metaTitle || undefined}
      description={page?.metaDescription || undefined}
      openGraph={{
        title: page?.openGraphTitle || undefined,
        description: page?.openGraphDescription || undefined,
        images: page?.openGraphImages?.map((image) => ({
          url: image.url || '',
          alt: image.title || '',
        })),
      }}
      twitter={getTwitterMetaTag()}
      additionalMetaTags={
        page?.metaKeywords
          ? [
              {
                property: 'keywords',
                content: `${page.metaKeywords}`,
              },
            ]
          : undefined
      }
      languageAlternates={[
        ...intlConfig.map(({ code }) => ({
          hrefLang: code,
          href: getSiteUrl() + `/${code}` + router.asPath,
        })),
        {
          hrefLang: 'x-default',
          href: getSiteUrl() + router.asPath,
        },
      ]}
    />
  )
}
