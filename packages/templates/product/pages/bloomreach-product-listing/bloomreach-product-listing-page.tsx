import { BloomreachProductListing } from './bloomreach-product-listing'
import { FiltersProvider } from './filters-provider'
import { GridLayoutProvider } from '@oriuminc/base'
import { ReactNode } from 'react'

export interface BloomreachProductListingPageProps {
  popularProducts?: ReactNode
  customerId?: string
}

export const BloomreachProductListingPage = ({
  popularProducts = null,
  customerId,
}: BloomreachProductListingPageProps) => {
  return (
    <GridLayoutProvider>
      <FiltersProvider>
        <BloomreachProductListing
          popularProducts={popularProducts}
          customerId={customerId}
        />
      </FiltersProvider>
    </GridLayoutProvider>
  )
}
