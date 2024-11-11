import { Suspense } from 'react'
import { BloomreachProductListing } from './bloomreach-product-listing'
import { FiltersProvider } from './filters-provider'
import { GridLayoutProvider } from '@oriuminc/base'

export interface BloomreachProductListingPageProps {
  popularProducts?: React.ReactNode
  customerId?: string
}

export const BloomreachProductListingPage = ({
  popularProducts = null,
  customerId,
}: BloomreachProductListingPageProps) => {
  return (
    <GridLayoutProvider>
      <FiltersProvider>
        <Suspense fallback={<></>}>
          <BloomreachProductListing
            popularProducts={popularProducts}
            customerId={customerId}
          />
        </Suspense>
      </FiltersProvider>
    </GridLayoutProvider>
  )
}
