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
  ComponentSFCCConnectorSchema,
  ComponentSFCCProductListSchema,
  ComponentShopifyConnectorSchema,
  ComponentShopifyProductListSchema,
  ComponentTextCardSchema,
  ComposablePageComponent,
  RichTextSchema,
} from '../schemas'

export { ZodError as ComponentValidationError } from 'zod'

export const validateComponentSchema = (
  entry: any,
  contentType: ComposablePageComponent['contentType']
) => {
  switch (contentType) {
    case 'componentArticleCard':
      return ComponentArticleCardSchema.parse(entry)
    case 'componentBannerFull':
      return ComponentBannerFullSchema.parse(entry)
    case 'componentBannerSplit':
      return ComponentBannerSplitSchema.parse(entry)
    case 'componentBannerTextOnly':
      return ComponentBannerTextOnlySchema.parse(entry)
    case 'componentBigCommerceConnector':
      return ComponentBigCommerceConnectorSchema.parse(entry)
    case 'componentCoverCard':
      return ComponentCoverCardSchema.parse(entry)
    case 'componentCtConnector':
      return ComponentCtConnectorSchema.parse(entry)
    case 'componentCtProductList':
      return ComponentCtProductListSchema.parse(entry)
    case 'componentEpConnector':
      return ComponentEpConnectorSchema.parse(entry)
    case 'componentSFCCConnector':
      return ComponentSFCCConnectorSchema.parse(entry)
    case 'componentSFCCProductList':
      return ComponentSFCCProductListSchema.parse(entry)
    case 'componentShopifyConnector':
      return ComponentShopifyConnectorSchema.parse(entry)
    case 'componentShopifyProductList':
      return ComponentShopifyProductListSchema.parse(entry)
    case 'componentTextCard':
      return ComponentTextCardSchema.parse(entry)
    case 'richText':
      return RichTextSchema.parse(entry)
  }
  throw new Error(
    `Content type ${contentType} not registered in the validation function (validateComponentSchema)`
  )
}
