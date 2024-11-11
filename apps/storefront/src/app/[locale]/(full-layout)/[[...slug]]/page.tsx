import { VisuallyHidden } from '@chakra-ui/react'
import { ContentItems } from '@modules/content/components/render-content'
import {
  HOME_PAGE,
  OrganizationJsonLdScript,
  SiteLinksSearchBoxScript,
  getMetadataAlternateLanguages,
} from '@modules/general'
import { getSupportedLocale } from '@modules/intl'
import {
  getContentPageCached,
  getSiteConfigCached,
} from '@modules/server/cache'
import routeSegmentConfig from '@modules/server/next-cache-config'
import { getServerPreviewData } from '@modules/server/preview/get-server-preview-data'
import { setServerLocale } from '@modules/server/server-context'
import { staticApi } from '@modules/trpc/server'
import { Locale, parsePageSlug } from '@oriuminc/base'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const { dynamic, dynamicParams } = routeSegmentConfig.contentPages

interface ContentPageProps {
  params: {
    locale: Locale
    slug: string
  }
}

export async function generateStaticParams({
  params,
}: {
  params: { locale: Locale }
}) {
  const contentPages = await staticApi.cms.getContentPages({
    locale: params.locale,
  })

  const paths = contentPages.results
    .filter(({ slug }) => !!slug)
    .map(({ slug }) => {
      let path: string[]
      if (slug?.includes('homepage')) path = ['']
      else path = slug!.split('/') //to support deeply nested content page routes, like /seasonal/summer/water-sports

      return { slug: path }
    })

  return paths
}

export async function generateMetadata({
  params,
}: ContentPageProps): Promise<Metadata> {
  const locale = getSupportedLocale(params.locale)
  const parsedSlug = parsePageSlug(params.slug)
  const pageData = await getContentPageCached(parsedSlug || HOME_PAGE, locale)

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
    alternates: getMetadataAlternateLanguages(`/${parsedSlug ?? ''}`),
  }
}

export default async function ContentPage({ params }: ContentPageProps) {
  const locale = getSupportedLocale(params.locale)
  setServerLocale(locale)
  const parsedSlug = parsePageSlug(params.slug)
  const isHomePage = !Boolean(parsedSlug)
  const previewData = getServerPreviewData() ?? undefined
  const [pageData, siteConfig] = await Promise.all([
    getContentPageCached(parsedSlug || HOME_PAGE, locale, previewData),
    getSiteConfigCached(locale, previewData),
  ])

  if (!pageData) {
    notFound()
  }

  return (
    <>
      {isHomePage && (
        <>
          <SiteLinksSearchBoxScript />
          <OrganizationJsonLdScript
            orgName={siteConfig?.name ?? ''}
            logoUrl={siteConfig?.brandLogo?.url ?? ''}
          />
        </>
      )}
      <VisuallyHidden>
        <h1>{pageData?.pageTitle}</h1>
      </VisuallyHidden>
      <ContentItems content={pageData.content ?? []} />
    </>
  )
}
