import { PaginationParams } from '@oriuminc/cms-generic'
import {
  ContentfulSdkClient,
  ContentfulSdkContentPageEntry,
  ContentfulSdkProductListingPageEntry,
  ContentfulSdkProductPageEntry,
} from '../types'

export const contentfulContentPagesFetchService = async ({
  client,
  locale,
  limit = 100,
  offset = 0,
}: {
  client: ContentfulSdkClient
  locale: string
} & PaginationParams) => {
  return await client.getEntries<ContentfulSdkContentPageEntry>({
    content_type: 'pageContent',
    locale,
    limit,
    skip: offset,
    include: 3, // should match the max depth of nested components
  })
}

export const contentfulContentPageFetchService = async ({
  client,
  slug,
  locale,
}: {
  client: ContentfulSdkClient
  slug: string
  locale: string
}) => {
  return await client.getEntries<ContentfulSdkContentPageEntry>({
    content_type: 'pageContent',
    'fields.slug': slug,
    locale,
    limit: 1,
    include: 3, // should match the max depth of nested components
  })
}

export const contentfulProductListingPageFetchService = async ({
  client,
  slug,
  locale,
}: {
  client: ContentfulSdkClient
  slug: string
  locale: string
}) => {
  return await client.getEntries<ContentfulSdkProductListingPageEntry>({
    content_type: 'pageProductListing',
    'fields.slug': slug,
    locale,
    limit: 1,
    include: 3, // should match the max depth of nested components
  })
}

export const contentfulProductPageFetchService = async ({
  client,
  slug,
  locale,
}: {
  client: ContentfulSdkClient
  slug: string
  locale: string
}) => {
  return await client.getEntries<ContentfulSdkProductPageEntry>({
    content_type: 'pageProduct',
    'fields.slug': slug,
    locale,
    limit: 1,
    include: 3, // should match the max depth of nested components
  })
}
