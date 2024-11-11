import { ContentItems } from '@modules/content/components/render-content'
import { CMS_PAGE_SLUGS } from '@modules/general'
import { getSupportedLocale } from '@modules/intl'
import { ConstructorProductListingPage } from '@modules/product'
import { getContentPageCached } from '@modules/server/cache'
import { Locale } from '@oriuminc/base'
import { notFound } from 'next/navigation'

export default async function ConstructorSearchPage({
  params,
}: {
  params: { locale: Locale }
}) {
  if (!process.env.NEXT_PUBLIC_CONSTRUCTOR_API_KEY) {
    notFound()
  }

  const locale = getSupportedLocale(params.locale)
  const noResultsContent = await getContentPageCached(
    CMS_PAGE_SLUGS.NO_SEARCH_RESULTS,
    locale
  )

  return (
    <ConstructorProductListingPage
      noResultsFallbackComponent={
        noResultsContent ? (
          <ContentItems content={noResultsContent.content ?? []} />
        ) : null
      }
    />
  )
}
