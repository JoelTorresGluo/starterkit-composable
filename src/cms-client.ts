import {
  CmsClient,
  GetAlgoliaConfiguration,
  GetContentPage,
  GetContentPages,
  GetMegaMenu,
  GetProductListingPage,
  GetProductPage,
  GetRichTextContent,
  GetSearchConfiguration,
  GetSiteConfig,
} from '@oriuminc/cms-generic'
import {
  contentfulAlgoliaConfigToComposableAlgoliaConfiguration,
  contentfulContentPageToComposableContentPage,
  contentfulContentPagesToComposableContentPages,
  contentfulMegaMenuToComposableMegaMenu,
  contentfulProductListingPageToComposableProductListingPage,
  contentfulProductPageToComposableProductPage,
  contentfulRichTextToComposableRichText,
  contentfulSearchConfigToComposableSearchConfiguration,
  contentfulSiteConfigToComposableSiteConfig,
} from './mappers'
import {
  contentfulAlgoliaConfigFetchService,
  contentfulContentPageFetchService,
  contentfulContentPagesFetchService,
  contentfulMegaMenuFetchService,
  contentfulProductListingPageFetchService,
  contentfulProductPageFetchService,
  contentfulRichTextFetchService,
  contentfulSearchConfigFetchService,
  contentfulSiteConfigFetchService,
  initContentfulClient,
} from './services'
import { ContentfulSdkClient } from './types'

export class ContentfulCmsClient implements CmsClient {
  private static instance: ContentfulCmsClient

  private productionClient: ContentfulSdkClient
  private previewClient: ContentfulSdkClient

  private constructor() {
    this.productionClient = initContentfulClient()
    this.previewClient = initContentfulClient({ isPreview: true })
  }

  public static getInstance(): ContentfulCmsClient {
    if (!ContentfulCmsClient.instance) {
      ContentfulCmsClient.instance = new ContentfulCmsClient()
    }
    return ContentfulCmsClient.instance
  }

  /**
   * If there a preview data is provided, then use the preview client,
   * otherwise, use the production client
   */
  private getClient(previewData?: any) {
    return previewData ? this.previewClient : this.productionClient
  }

  getContentPages: GetContentPages = async ({
    locale,
    limit = 100,
    offset = 0,
    previewData,
  }) => {
    const contentfulPages = await contentfulContentPagesFetchService({
      client: this.getClient(previewData),
      locale,
      limit,
      offset,
    })
    return contentfulContentPagesToComposableContentPages(contentfulPages)
  }

  getContentPage: GetContentPage = async ({ slug, locale, previewData }) => {
    const contentfulPage = await contentfulContentPageFetchService({
      client: this.getClient(previewData),
      slug,
      locale,
    })
    return contentfulPage
      ? contentfulContentPageToComposableContentPage(contentfulPage)
      : null
  }

  getProductListingPage: GetProductListingPage = async ({
    slug,
    locale,
    previewData,
  }) => {
    const contentfulPage = await contentfulProductListingPageFetchService({
      client: this.getClient(previewData),
      slug,
      locale,
    })
    return contentfulPage
      ? contentfulProductListingPageToComposableProductListingPage(
          contentfulPage
        )
      : null
  }

  getProductPage: GetProductPage = async ({ slug, locale, previewData }) => {
    const contentfulPage = await contentfulProductPageFetchService({
      client: this.getClient(previewData),
      slug,
      locale,
    })
    return contentfulPage
      ? contentfulProductPageToComposableProductPage(contentfulPage)
      : null
  }

  getMegaMenu: GetMegaMenu = async ({ id, locale, previewData }) => {
    const contentfulMegaMenu = await contentfulMegaMenuFetchService({
      client: this.getClient(previewData),
      id,
      locale,
    })
    return contentfulMegaMenu
      ? contentfulMegaMenuToComposableMegaMenu(contentfulMegaMenu)
      : null
  }

  getRichTextContent: GetRichTextContent = async ({
    slug,
    locale,
    previewData,
  }) => {
    const contentfulRichText = await contentfulRichTextFetchService({
      client: this.getClient(previewData),
      slug,
      locale,
    })
    return contentfulRichText
      ? contentfulRichTextToComposableRichText(contentfulRichText)
      : null
  }

  getSiteConfig: GetSiteConfig = async ({ key, locale, previewData }) => {
    const contentfulSiteConfig = await contentfulSiteConfigFetchService({
      client: this.getClient(previewData),
      key,
      locale,
    })
    return contentfulSiteConfig
      ? contentfulSiteConfigToComposableSiteConfig(contentfulSiteConfig)
      : null
  }

  getAlgoliaConfiguration: GetAlgoliaConfiguration = async ({
    key,
    locale,
    previewData,
  }) => {
    const contentfulAlgoliaConfig = await contentfulAlgoliaConfigFetchService({
      client: this.getClient(previewData),
      key,
      locale,
    })
    return contentfulAlgoliaConfig
      ? contentfulAlgoliaConfigToComposableAlgoliaConfiguration(
          contentfulAlgoliaConfig
        )
      : null
  }

  getSearchConfiguration: GetSearchConfiguration = async ({
    key,
    locale,
    previewData,
  }) => {
    const contentfulSearchConfig = await contentfulSearchConfigFetchService({
      client: this.getClient(previewData),
      key,
      locale,
    })
    return contentfulSearchConfig
      ? contentfulSearchConfigToComposableSearchConfiguration(
          contentfulSearchConfig
        )
      : null
  }
}
