import { ContentItems } from '@modules/content/components/render-content'
import { CMS_PAGE_SLUGS, getMetadataAlternateLanguages } from '@modules/general'
import { getSupportedLocale } from '@modules/intl'
import { ProductListingPage } from '@modules/product'
import {
  getAlgoliaConfigurationCached,
  getContentPageCached,
  getProductListingPageCached,
} from '@modules/server/cache'
import routeSegmentConfig from '@modules/server/next-cache-config'
import { getServerPreviewData } from '@modules/server/preview/get-server-preview-data'
import { setServerLocale } from '@modules/server/server-context'
import { staticApi } from '@modules/trpc/server'
import { Locale } from '@oriuminc/base'
import { Metadata } from 'next'

export const { dynamic, dynamicParams } = routeSegmentConfig.categoryPages

export async function generateStaticParams({
  params,
}: {
  params: { locale: Locale }
}) {
  const paths = await staticApi.commerce.getCategoryStaticPaths({
    locale: params.locale,
  })

  return paths
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: Locale }
}): Promise<Metadata> {
  const locale = getSupportedLocale(params.locale)
  const pageData = await getProductListingPageCached(params.slug, locale)

  return {
    title: pageData?.metaTitle,
    description: pageData?.metaDescription,
    keywords: pageData?.metaKeywords,
    openGraph: {
      title: pageData?.openGraphTitle ?? undefined,
      description: pageData?.openGraphDescription ?? undefined,
      // @ts-ignore
      images: pageData?.openGraphImages
        ?.map((img) => img.url)
        .filter((url) => !!url),
    },
    alternates: getMetadataAlternateLanguages(`/${params.slug ?? ''}`),
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string; locale: Locale }
}) {
  const locale = getSupportedLocale(params.locale)
  setServerLocale(locale)
  const previewData = getServerPreviewData() ?? undefined

  const [algoliaConfiguration, cmsContent, noResultsContent] =
    await Promise.all([
      getAlgoliaConfigurationCached(locale, previewData),
      getProductListingPageCached(params.slug, locale, previewData),
      getContentPageCached(
        CMS_PAGE_SLUGS.NO_SEARCH_RESULTS,
        locale,
        previewData
      ),
    ])

  return (
    <>
      {cmsContent?.headerContent && (
        <ContentItems content={cmsContent?.headerContent ?? []} />
      )}
      <ProductListingPage
        algoliaConfiguration={algoliaConfiguration}
        noResultsFallbackComponent={
          noResultsContent ? (
            <ContentItems content={noResultsContent.content ?? []} />
          ) : null
        }
      />
      {cmsContent?.footerContent && (
        <ContentItems content={cmsContent?.footerContent ?? []} />
      )}
    </>
  )
}
