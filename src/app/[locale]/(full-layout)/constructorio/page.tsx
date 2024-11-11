import { VisuallyHidden } from '@chakra-ui/react'
import { ContentItems } from '@modules/content/components/render-content'
import {
  BRAND_NAME,
  HOME_PAGE,
  OrganizationJsonLdScript,
  SiteLinksSearchBoxScript,
} from '@modules/general'
import { BLOOMREACH_ACCOUNT_ID } from '@modules/general/components/search/bloomreach-global-search/shared/constants'
import { BrPixel } from '@modules/general/components/search/bloomreach-global-search/utils/BrPixel'
import { getSupportedLocale } from '@modules/intl'
import {
  getContentPageCached,
  getSiteConfigCached,
} from '@modules/server/cache'
import { Locale, parsePageSlug } from '@oriuminc/base'
import { notFound } from 'next/navigation'

interface ContentPageProps {
  params: {
    locale: Locale
    slug: string
  }
}

export default async function ContentPage({ params }: ContentPageProps) {
  if (!process.env.NEXT_PUBLIC_CONSTRUCTOR_API_KEY) {
    notFound()
  }

  const locale = getSupportedLocale(params.locale)
  const parsedSlug = parsePageSlug(params.slug)
  const isHomePage = !Boolean(parsedSlug)
  const [pageData, siteConfig] = await Promise.all([
    getContentPageCached(parsedSlug || HOME_PAGE, locale),
    getSiteConfigCached(locale),
  ])

  if (!pageData) {
    notFound()
  }

  return (
    <>
      <BrPixel pageType='homepage' title={BRAND_NAME} />

      {isHomePage && <SiteLinksSearchBoxScript />}

      <OrganizationJsonLdScript
        orgName={siteConfig?.name ?? ''}
        logoUrl={siteConfig?.brandLogo?.url ?? ''}
      />

      <VisuallyHidden>
        <h1>{pageData?.pageTitle}</h1>
      </VisuallyHidden>

      <ContentItems content={pageData.content ?? []} />
    </>
  )
}
