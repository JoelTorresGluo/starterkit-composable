import { CMS_ALGOLIA_CONFIG_KEY } from '@modules/general'
import { ComposableAlgoliaConfiguration } from '@oriuminc/cms-generic'
import { CmsComponentError } from '@oriuminc/ui'

import { ProductListing } from './product-listing'

export const ProductListingPage = ({
  algoliaConfiguration,
  noResultsFallbackComponent = null,
}: {
  algoliaConfiguration: ComposableAlgoliaConfiguration | null
  noResultsFallbackComponent?: React.ReactNode
}) => {
  if (!algoliaConfiguration) {
    if (process.env.NODE_ENV === 'production') return null
    return (
      <CmsComponentError
        id={CMS_ALGOLIA_CONFIG_KEY}
        contentType='algoliaConfiguration'
        headingText='Algolia Configuration Not Found!'
        errorMessageText=''
        errors={[
          'Algolia configuration not found in the CMS',
          `Please check the CMS for a Search - Configuration entry with expected key: ${CMS_ALGOLIA_CONFIG_KEY}. This is set via environment variable NEXT_PUBLIC_CMS_ALGOLIA_CONFIG_KEY`,
        ]}
      />
    )
  }

  return (
    <ProductListing
      popularProducts={noResultsFallbackComponent}
      filters={algoliaConfiguration.filters ?? undefined}
      sortByOptions={algoliaConfiguration.sortByOptions ?? undefined}
    />
  )
}
