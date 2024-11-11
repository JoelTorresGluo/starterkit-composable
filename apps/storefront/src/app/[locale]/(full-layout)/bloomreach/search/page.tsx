import { BLOOMREACH_ACCOUNT_ID } from '@modules/general/components/search/bloomreach-global-search/shared/constants'
import { BloomreachProductListingPage } from '@modules/product'
import { notFound } from 'next/navigation'

export default async function BloomreachSearchPage() {
  if (!BLOOMREACH_ACCOUNT_ID) {
    notFound()
  }

  return <BloomreachProductListingPage />
}
