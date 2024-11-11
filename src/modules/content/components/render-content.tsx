import { PageContentField } from '@oriuminc/cms-generic'
import {
  CmsComponentError,
  CmsComponentUnknown,
  UiContainer,
} from '@oriuminc/ui'
import { ComponentBannerFull } from './component-banner-full'
import { ComponentBannerSplit } from './component-banner-split'
import { ComponentBannerTextOnly } from './component-banner-text-only'
import { ComponentGrid } from './component-grid'
import { ComponentArticleCard } from './component-article-card'
import { ComponentCoverCard } from './component-cover-card'
import { ComponentTextCard } from './component-text-card'
import { ComponentRichText } from './component-rich-text'
import {
  ComponentProductsConnector,
  ProductConnectorSkeleton,
} from './component-products-connector'
import { Suspense } from 'react'
import { SkeletonProductSlider } from './skeletons/skeleton-product-slider'
import { ComponentProductList } from './component-product-list'

export interface ContentItemsInterface {
  content: PageContentField
}

export function ContentItems({ content }: ContentItemsInterface) {
  return content.map((contentItem, idx) => {
    if (contentItem === null) return null

    const priority = idx === 0

    return (
      <UiContainer
        key={contentItem.id}
        size={contentItem.containerSize}
        mt={contentItem.containerMarginTop}
        mb={contentItem.containerMarginBottom}
      >
        {ContentItemByType({
          contentItem,
          priority,
        })}
      </UiContainer>
    )
  })
}

export interface ContentItemInterface {
  contentItem: PageContentField[number]
  priority: boolean
}

const ContentItemByType = ({ contentItem, priority }: ContentItemInterface) => {
  if (!contentItem) return null
  if (contentItem._errors_) {
    if (process.env.NODE_ENV === 'production') {
      return null
    }
    return (
      <CmsComponentError
        key={contentItem.id}
        id={contentItem.id}
        contentType={contentItem.contentType}
        errors={contentItem._errors_}
      />
    )
  }

  switch (contentItem?.contentType) {
    case 'componentBannerFull':
      return <ComponentBannerFull priority={priority} {...contentItem} />
    case 'componentBannerSplit':
      return <ComponentBannerSplit priority={priority} {...contentItem} />
    case 'componentBannerTextOnly':
      return <ComponentBannerTextOnly {...contentItem} />
    case 'componentGrid':
      return <ComponentGrid priority={priority} {...contentItem} />
    case 'componentArticleCard':
      return <ComponentArticleCard priority={priority} {...contentItem} />
    case 'componentCoverCard':
      return <ComponentCoverCard priority={priority} {...contentItem} />
    case 'componentTextCard':
      return <ComponentTextCard priority={priority} {...contentItem} />
    case 'richText':
      return <ComponentRichText {...contentItem} />
    case 'componentBigCommerceConnector':
    case 'componentEpConnector': {
      // TODO: bring this back when implementing EP and BC commmerce
      return null
      // return (
      //   <ComponentProductsConnector
      //     query={contentItem.productList2}
      //     {...contentItem}
      //   />
      // )
    }
    case 'componentCtConnector': {
      // only CT should load this...
      if (!process.env.NEXT_PUBLIC_COMMERCETOOLS_HOST) return null

      return (
        <Suspense fallback={<ProductConnectorSkeleton />}>
          <ComponentProductsConnector
            query={contentItem.productList2}
            {...contentItem}
          />
        </Suspense>
      )
    }
    case 'componentCtProductList': {
      // only CT should load this...
      if (!process.env.NEXT_PUBLIC_COMMERCETOOLS_HOST) return null

      return (
        <Suspense fallback={<SkeletonProductSlider />}>
          <ComponentProductList
            query={contentItem.productList2}
            {...contentItem}
          />
        </Suspense>
      )
    }
    case 'componentShopifyProductList': {
      if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) return null

      return (
        <Suspense fallback={<SkeletonProductSlider />}>
          <ComponentProductList
            query={contentItem.productList2}
            {...contentItem}
          />
        </Suspense>
      )
    }
    case 'componentShopifyConnector': {
      if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) return null
      return (
        <Suspense fallback={<SkeletonProductSlider />}>
          <ComponentProductsConnector
            query={contentItem.productList2}
            {...contentItem}
          />
        </Suspense>
      )
    }
    default: {
      if (process.env.NODE_ENV === 'production') return null
      return (
        <CmsComponentUnknown
          id={(contentItem as any).id}
          contentType={(contentItem as any).contentType}
        />
      )
    }
  }
}
