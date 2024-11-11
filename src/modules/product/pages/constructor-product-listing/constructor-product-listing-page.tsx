'use client'

import { useUser } from '@modules/commerce'
import { GridLayoutProvider } from '@oriuminc/base'
import { Suspense } from 'react'
import { ConstructorProductListing } from './constructor-product-listing'
import { FiltersProvider } from './filters-provider'

export const ConstructorProductListingPage = ({
  noResultsFallbackComponent = null,
}: {
  noResultsFallbackComponent?: React.ReactNode
}) => {
  const { customer } = useUser()
  return (
    <GridLayoutProvider>
      <FiltersProvider>
        <Suspense fallback={<></>}>
          <ConstructorProductListing
            popularProducts={noResultsFallbackComponent}
            customerId={customer?.id}
          />
        </Suspense>
      </FiltersProvider>
    </GridLayoutProvider>
  )
}
