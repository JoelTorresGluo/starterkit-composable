import {
  ComponentArticleCardSchema,
  ComponentBannerFullSchema,
  ComponentBannerSplitSchema,
  ComponentBannerTextOnlySchema,
  ComponentBigCommerceConnectorSchema,
  ComponentCoverCardSchema,
  ComponentCtConnectorSchema,
  ComponentCtProductListSchema,
  ComponentEpConnectorSchema,
  ComponentGridSchema,
  ComponentSFCCConnectorSchema,
  ComponentSFCCProductListSchema,
  ComponentShopifyConnectorSchema,
  ComponentShopifyProductListSchema,
  ComponentTextCardSchema,
} from './components'
import { z } from 'zod'
import { RichTextSchema } from './rich-text'
import { ImageFieldSchema } from './fields'

export const PageComponentValidationErrorField = z.object({
  _errors_: z.array(z.string()).optional().nullable(),
})

export const PageComponentSchema = z.union([
  ComponentArticleCardSchema,
  ComponentBannerFullSchema,
  ComponentBannerSplitSchema,
  ComponentBannerTextOnlySchema,
  ComponentBigCommerceConnectorSchema,
  ComponentCoverCardSchema,
  ComponentCtConnectorSchema,
  ComponentCtProductListSchema,
  ComponentEpConnectorSchema,
  ComponentGridSchema,
  ComponentSFCCConnectorSchema,
  ComponentSFCCProductListSchema,
  ComponentShopifyConnectorSchema,
  ComponentShopifyProductListSchema,
  ComponentTextCardSchema,
  RichTextSchema,
])

export type ComposablePageComponent = z.infer<typeof PageComponentSchema>

export const PageContentFieldSchema = z.array(
  PageComponentSchema.and(PageComponentValidationErrorField).or(z.null())
)

export type PageContentField = z.infer<typeof PageContentFieldSchema>

const ContentPageSchema = z.object({
  internalTitle: z.string(),
  pageTitle: z.string().optional().nullable(),
  slug: z.string().optional(),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  metaKeywords: z.string().optional().nullable(),
  openGraphTitle: z.string().optional().nullable(),
  openGraphDescription: z.string().optional().nullable(),
  openGraphImages: z.array(ImageFieldSchema).optional().nullable(),
  content: PageContentFieldSchema,
})

export type ComposableContentPage = z.infer<typeof ContentPageSchema>

const ProductListingPageSchema = z.object({
  internalTitle: z.string(),
  pageTitle: z.string().optional().nullable(),
  slug: z.string().optional(),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  metaKeywords: z.string().optional().nullable(),
  openGraphTitle: z.string().optional().nullable(),
  openGraphDescription: z.string().optional().nullable(),
  openGraphImages: z.array(ImageFieldSchema).optional().nullable(),
  headerContent: PageContentFieldSchema,
  footerContent: PageContentFieldSchema,
})

export type ComposableProductListingPage = z.infer<
  typeof ProductListingPageSchema
>

const ProductPageSchema = z.object({
  internalTitle: z.string(),
  slug: z.string().optional(),
  headerContent: PageContentFieldSchema,
  footerContent: PageContentFieldSchema,
})

export type ComposableProductPage = z.infer<typeof ProductPageSchema>

const PageComponentWithNestedContentSchema = ComponentGridSchema

export type ComponentWithNestedContent = z.infer<
  typeof PageComponentWithNestedContentSchema
>
