import { getSupportedLocale } from '@modules/intl'
import { ProductListingPage } from '@modules/product'
import { getAlgoliaConfigurationCached } from '@modules/server/cache'
import { Locale } from '@oriuminc/base'
import { Metadata } from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default async function CategoryPage({
  params,
}: {
  params: { locale: Locale }
}) {
  const locale = getSupportedLocale(params.locale)
  const algoliaConfiguration = await getAlgoliaConfigurationCached(locale)

  return <ProductListingPage algoliaConfiguration={algoliaConfiguration} />
}
