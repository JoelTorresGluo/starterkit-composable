import { ConstructorProductListing } from './constructor-product-listing'
import { FiltersProvider } from './filters-provider'
import { GridLayoutProvider } from '@oriuminc/base'
import { ReactNode } from 'react'

export interface ConstructorProductListingPageProps {
  popularProducts?: ReactNode
  customerId?: string
}

export const ConstructorProductListingPage = ({
  popularProducts = null,
  customerId,
}: ConstructorProductListingPageProps) => {
  return (
    <GridLayoutProvider>
      <FiltersProvider>
        <ConstructorProductListing
          popularProducts={popularProducts}
          customerId={customerId}
        />
      </FiltersProvider>
    </GridLayoutProvider>
  )
}
