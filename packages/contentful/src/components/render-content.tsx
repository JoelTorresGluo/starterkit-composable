import {
  UiContainer,
  CmsComponentUnknown,
  CmsComponentError,
} from '@oriuminc/ui'
import { ContentItemByTypeInterface, ContentItemsInterface } from '../utils'
import {
  ComponentArticleCard,
  ComponentBannerFull,
  ComponentBannerSplit,
  ComponentBannerTextOnly,
  ComponentCoverCard,
  ComponentCtProductList,
  ComponentGrid,
  ComponentTextCard,
} from './index'

export const ContentItems = ({
  content,
  ProductsConnector,
  useCtConnector,
  showPrice = true,
}: ContentItemsInterface) => {
  return content?.map((component, idx) => {
    if (component === null) return null

    const priority = idx === 0

    return (
      <UiContainer
        key={idx}
        size={component?.containerSize}
        mb={component?.containerMarginBottom}
        mt={component?.containerMarginTop}
      >
        {ContentItemByType({
          content: component,
          ProductsConnector,
          useCtConnector,
          priority,
          showPrice,
        })}
      </UiContainer>
    )
  })
}

const ContentItemByType = ({
  content,
  ProductsConnector,
  priority,
  useCtConnector,
  showPrice,
}: ContentItemByTypeInterface) => {
  if (!content) return null
  if (content._errors_) {
    if (process.env.NODE_ENV == 'production') {
      return null
    }
    return (
      <CmsComponentError
        key={content.id}
        id={content.id}
        contentType={content.contentType}
        errors={content._errors_}
      />
    )
  }
  switch (content?.contentType) {
    case 'componentArticleCard':
      return <ComponentArticleCard priority={priority} {...content} />
    case 'componentBannerFull':
      return <ComponentBannerFull priority={priority} {...content} />
    case 'componentBannerSplit':
      return <ComponentBannerSplit priority={priority} {...content} />
    case 'componentBannerTextOnly':
      return <ComponentBannerTextOnly {...content} />
    case 'componentGrid':
      return <ComponentGrid priority={priority} {...content} />
    case 'componentCoverCard':
      return <ComponentCoverCard priority={priority} {...content} />
    case 'componentTextCard':
      return <ComponentTextCard priority={priority} {...content} />
    case 'componentCtConnector':
      if (!process.env.NEXT_PUBLIC_COMMERCETOOLS_HOST) return null
      return (
        ProductsConnector && (
          <ProductsConnector queryParams='skus' {...content} />
        )
      )
    case 'componentCtProductList': {
      // only CT should load this...
      if (!process.env.NEXT_PUBLIC_COMMERCETOOLS_HOST) return null
      return (
        useCtConnector && (
          <ComponentCtProductList
            {...content}
            useCtConnector={useCtConnector}
            priority={priority}
            showPrice={showPrice}
          />
        )
      )
    }
    case 'componentEpConnector':
      if (!process.env.NEXT_PUBLIC_ELASTIC_PATH_HOST) return null
      return ProductsConnector && <ProductsConnector {...content} />
    case 'componentBigCommerceConnector': {
      // only BC should load this...
      if (!process.env.NEXT_PUBLIC_BIGCOMMERCE_STORE_ID) {
        return null
      }
      return (
        ProductsConnector && (
          <ProductsConnector
            {...content}
            cmsProductsList={content.productList}
            productListType='sku'
            queryParams='skus'
          />
        )
      )
    }
    default: {
      if (process.env.NODE_ENV === 'production') return null
      return (
        <CmsComponentUnknown
          id={content.id}
          contentType={content.contentType}
        />
      )
    }
  }
}
