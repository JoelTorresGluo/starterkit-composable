import {
  ContentfulClientApi,
  EntryCollection,
  EntryFieldTypes,
  EntrySkeletonType,
} from 'contentful'

export type ContentfulSdkClient = ContentfulClientApi<undefined>

// Base Page Fields
export interface ContentfulSdkPageBaseFields {
  internalTitle: EntryFieldTypes.Text
  slug: EntryFieldTypes.Text
}

// Page - Content
export type ContentfulSdkContentPageResponse = EntryCollection<
  ContentfulSdkContentPageEntry,
  undefined,
  string
>

export type ContentfulSdkContentPageEntry = EntrySkeletonType<
  ContentfulSdkContentPageFields,
  'pageContent'
>

export interface ContentfulSdkContentPageFields
  extends ContentfulSdkPageBaseFields {
  metaTitle: EntryFieldTypes.Text
  metaDescription: EntryFieldTypes.Text
  metaKeywords: EntryFieldTypes.Text
  openGraphTitle: EntryFieldTypes.Text
  openGraphDescription: EntryFieldTypes.Text
  openGraphImages: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
  content: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>
}

// Page - Product Listing
export type ContentfulSdkProductListingPageResponse = EntryCollection<
  ContentfulSdkProductListingPageEntry,
  undefined,
  string
>

export type ContentfulSdkProductListingPageEntry = EntrySkeletonType<
  ContentfulSdkProductListingPageFields,
  'pageProductListing'
>

export interface ContentfulSdkProductListingPageFields
  extends ContentfulSdkPageBaseFields {
  metaTitle: EntryFieldTypes.Text
  metaDescription: EntryFieldTypes.Text
  metaKeywords: EntryFieldTypes.Text
  openGraphTitle: EntryFieldTypes.Text
  openGraphDescription: EntryFieldTypes.Text
  openGraphImages: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
  headerContent: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<EntrySkeletonType>
  >
  footerContent: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<EntrySkeletonType>
  >
}

// Page - Product
export type ContentfulSdkProductPageResponse = EntryCollection<
  ContentfulSdkProductPageEntry,
  undefined,
  string
>

export type ContentfulSdkProductPageEntry = EntrySkeletonType<
  ContentfulSdkProductPageFields,
  'pageProduct'
>

export interface ContentfulSdkProductPageFields
  extends ContentfulSdkPageBaseFields {
  headerContent: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<EntrySkeletonType>
  >
  footerContent: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<EntrySkeletonType>
  >
}

// Mega menu
export type ContentfulSdkMegaMenuResponse = EntryCollection<
  ContentfulSdkMegaMenuEntry,
  undefined,
  string
>

export type ContentfulSdkMegaMenuEntry = EntrySkeletonType<
  ContentfulSdkMegaMenuFields,
  'megaMenu'
>

export interface ContentfulSdkMegaMenuFields {
  title: EntryFieldTypes.Text
  identifier: EntryFieldTypes.Text
  items: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>
}

// Site config
export type ContentfulSdkSiteConfigResponse = EntryCollection<
  ContentfulSdkSiteConfigEntry,
  undefined,
  string
>

export type ContentfulSdkSiteConfigEntry = EntrySkeletonType<
  ContentfulSdkSiteConfigFields,
  'siteConfig'
>

export interface ContentfulSdkSiteConfigFields {
  internalTitle: EntryFieldTypes.Text
  name: EntryFieldTypes.Text
  order: EntryFieldTypes.Integer
  key: EntryFieldTypes.Text
  url: EntryFieldTypes.Text
  displayMultiBrandBanner: EntryFieldTypes.Boolean
  brandLogo?: EntryFieldTypes.AssetLink
  brandLogoSmall?: EntryFieldTypes.AssetLink
  shortcutIcon?: EntryFieldTypes.AssetLink
  siblingSites: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<EntrySkeletonType>
  >
}

// Rich text
export type ContentfulSdkRichTextResponse = EntryCollection<
  ContentfulSdkRichTextEntry,
  undefined,
  string
>

export type ContentfulSdkRichTextEntry = EntrySkeletonType<
  ContentfulSdkRichTextFields,
  'richText'
>

export interface ContentfulSdkRichTextFields {
  title?: EntryFieldTypes.Text
  slug: EntryFieldTypes.Text
  richText: EntryFieldTypes.RichText
}

// Algolia configuration
export type ContentfulSdkAlgoliaConfigResponse = EntryCollection<
  ContentfulSdkAlgoliaConfigEntry,
  undefined,
  string
>

export type ContentfulSdkAlgoliaConfigEntry = EntrySkeletonType<
  ContentfulSdkAlgoliaConfigFields,
  'algoliaConfiguration'
>

export interface ContentfulSdkAlgoliaConfigFields {
  title: EntryFieldTypes.Text
  key: EntryFieldTypes.Text
  baseIndexName: EntryFieldTypes.Text
  filters: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>
  sortByOptions: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<EntrySkeletonType>
  >
}

// Generic search configuration
export type ContentfulSdkSearchConfigResponse = EntryCollection<
  ContentfulSdkSearchConfigEntry,
  undefined,
  string
>

export type ContentfulSdkSearchConfigEntry = EntrySkeletonType<
  ContentfulSdkSearchConfigFields,
  'algoliaConfiguration'
>

export interface ContentfulSdkSearchConfigFields {
  title: EntryFieldTypes.Text
  key: EntryFieldTypes.Text
  baseIndexName: EntryFieldTypes.Text
  filters: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>
  sortByOptions: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<EntrySkeletonType>
  >
}
