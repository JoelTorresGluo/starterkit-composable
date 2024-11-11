import { ComposableSiteConfig, Locale } from '@oriuminc/base'
import { PaginatedResponse, PaginationParams } from './pagination'
import {
  ComposableAlgoliaConfiguration,
  ComposableContentPage,
  ComposableMegaMenu,
  ComposableProductListingPage,
  ComposableProductPage,
  ComposableRichText,
  ComposableSearchConfiguration,
} from './schemas'

export interface CmsClient {
  getContentPages: GetContentPages
  getContentPage: GetContentPage
  getProductListingPage: GetProductListingPage
  getProductPage: GetProductPage
  getMegaMenu: GetMegaMenu
  getRichTextContent: GetRichTextContent
  getSiteConfig: GetSiteConfig
  getAlgoliaConfiguration: GetAlgoliaConfiguration
  getSearchConfiguration: GetSearchConfiguration
}

export type GetContentPages = (
  params: {
    locale: Locale
    previewData?: any
  } & PaginationParams
) => Promise<PaginatedResponse<ComposableContentPage>>

export type GetContentPage = (params: {
  slug: string
  locale: Locale
  previewData?: any
}) => Promise<ComposableContentPage | null>

export type GetProductListingPage = (params: {
  slug: string
  locale: Locale
  previewData?: any
}) => Promise<ComposableProductListingPage | null>

export type GetProductPage = (params: {
  slug: string
  locale: Locale
  previewData?: any
}) => Promise<ComposableProductPage | null>

export type GetMegaMenu = (params: {
  id: string
  locale: Locale
  previewData?: any
}) => Promise<ComposableMegaMenu | null>

export type GetSiteConfig = (params: {
  key: string
  locale: Locale
  previewData?: any
}) => Promise<ComposableSiteConfig | null>

export type GetAlgoliaConfiguration = (params: {
  key: string
  locale: Locale
  previewData?: any
}) => Promise<ComposableAlgoliaConfiguration | null>

export type GetSearchConfiguration = (params: {
  key: string
  locale: Locale
  previewData?: any
}) => Promise<ComposableSearchConfiguration | null>

export type GetRichTextContent = (params: {
  slug: string
  locale: Locale
  previewData?: any
}) => Promise<ComposableRichText | null>
