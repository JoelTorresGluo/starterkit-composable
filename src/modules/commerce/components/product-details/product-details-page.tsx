import { ComponentRichText } from '@modules/content'
import { ProductJsonLdScript, RICHTEXT_SCHEMA } from '@modules/general'
import { BrPixel } from '@modules/general/components/search/bloomreach-global-search/utils/BrPixel'
import { getServerIntl } from '@modules/intl'
import { getRichTextContentCached } from '@modules/server/cache'
import { getServerLocale } from '@modules/server/server-context'
import {
  ComposableProduct,
  ComposableProductVariant,
} from '@oriuminc/commerce-generic'
import { Accordion, PdpLayout } from '@oriuminc/ui'
import {
  ProductActions,
  ProductAnalytics,
  ProductGallery,
  ProductSpecifications,
} from './components'
import { ProductPrice } from './components/product-price'

export const ProductDetailsPage = async ({
  product,
  variant,
  variantIndex,
}: {
  product: ComposableProduct
  variant: ComposableProductVariant
  variantIndex: number
}) => {
  const locale = getServerLocale()
  const name = product?.title ?? ''
  const description = product?.description ?? ''
  const brand = variant?.attributes?.find(
    (attribute) => attribute.name === 'brand'
  )?.value

  return (
    <>
      <ProductAnalytics product={product} />

      <ProductJsonLdScript
        product={product}
        variant={variant}
        locale={locale}
      />

      <BrPixel
        pageType='product'
        prodId={product?.id}
        prodName={name}
        sku={variant?.sku ?? ''}
      />

      <PdpLayout
        key={product?.id}
        brand={brand}
        title={name}
        description={description}
        isLoaded={true}
        sectionOrder={[
          'brand',
          'title',
          'price',
          'main',
          'description',
          'accordion',
        ]}
        stackProps={{
          direction: { base: 'column-reverse', lg: 'row-reverse' },
        }}
        mainStackProps={{
          position: 'sticky',
          height: 'fit-content',
          top: 12,
        }}
        price={<ProductPrice product={product} variantIndex={variantIndex} />}
        accordion={
          <ProductDetailsAccordion product={product} variant={variant} />
        }
        main={<ProductActions product={product} variantIndex={variantIndex} />}
        aside={<ProductGallery product={product} variant={variant} />}
      />
    </>
  )
}

const ProductDetailsAccordion = async ({
  product,
  variant,
}: {
  product: ComposableProduct
  variant: ComposableProductVariant
}) => {
  const locale = getServerLocale()
  const intl = await getServerIntl(locale)
  const shippingAndReturn = await getRichTextContentCached(
    RICHTEXT_SCHEMA.pdp.shippingAndReturn.replace(
      '{{category}}',
      product?.categories?.[0]?.slug ?? ''
    ),
    locale
  )

  return (
    <Accordion
      size='medium'
      items={[
        {
          label: intl.formatMessage({
            id: 'product.specifications.title',
          }),
          content: (
            <ProductSpecifications product={product} variant={variant} />
          ),
        },
        {
          label: intl.formatMessage({
            id: 'product.returnsAndShippingPolicy.title',
          }),
          content: <ComponentRichText html={shippingAndReturn?.html} />,
        },
      ]}
      accordionProps={{
        mt: 8,
        allowMultiple: true,
        defaultIndex: 1,
      }}
    />
  )
}
