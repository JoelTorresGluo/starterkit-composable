import { ProductDetailsPage } from '@modules/commerce/components/product-details/product-details-page'
import { ContentItems } from '@modules/content/components/render-content'
import { getMetadataAlternateLanguages } from '@modules/general'
import { getSupportedLocale } from '@modules/intl'
import {
  getProductBySlugCached,
  getProductPageCached,
} from '@modules/server/cache'
import staticPagesConfig from '@modules/server/next-cache-config'
import { getServerPreviewData } from '@modules/server/preview/get-server-preview-data'
import { setServerLocale } from '@modules/server/server-context'
import { Locale } from '@oriuminc/base'
import { ComposableProduct } from '@oriuminc/commerce-generic'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Box } from '@chakra-ui/react'
import { RelatedProducts } from '@modules/commerce'
import { getServerIntl } from '@modules/intl'

export const { dynamic, dynamicParams } = staticPagesConfig.productPages

export async function generateMetadata({
  params,
}: {
  params: { slug: string; variant: string; locale: Locale }
}): Promise<Metadata> {
  const locale = getSupportedLocale(params.locale)
  const product = await getProductBySlugCached(params.slug, locale)
  if (!product) return {}

  const { variant: productVariant } = getVariant({
    product,
    variantParam: params.variant,
  })

  return {
    title: product?.seo?.title ?? product?.title,
    description: product?.seo?.description ?? product?.description,
    keywords: product?.seo?.keywords ?? product?.title,
    alternates: getMetadataAlternateLanguages(`/${params.slug}`),
    openGraph: {
      images: product?.images?.map((image) => ({
        url: image.url,
        width: image.width ?? undefined,
        height: image.height ?? undefined,
        alt: image.altText ?? '',
      })),
    },
    other: {
      'product:price.amount': productVariant?.price?.current.amount ?? '',
      'product:price.currency':
        productVariant?.price?.current.currencyCode ?? '',
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string; variant: string; locale: Locale }
}) {
  const locale = getSupportedLocale(params.locale)
  setServerLocale(locale)
  const intl = await getServerIntl(locale)

  const product = await getProductBySlugCached(params.slug, locale)
  if (!product) {
    notFound()
  }

  const { variantIndex, variant: productVariant } = getVariant({
    product,
    variantParam: params.variant,
  })

  const cmsContent = await getProductPageCached(
    params.slug,
    locale,
    getServerPreviewData() ?? undefined
  )

  return (
    <>
      {cmsContent?.headerContent && (
        <ContentItems content={cmsContent?.headerContent ?? []} />
      )}
      <ProductDetailsPage
        product={product}
        variant={productVariant}
        variantIndex={variantIndex}
      />
      {cmsContent?.footerContent && (
        <ContentItems content={cmsContent?.footerContent ?? []} />
      )}
      <Box my={4} px={8}>
        <RelatedProducts
          title={intl.formatMessage({
            id: 'algolia.recommendations.youMightAlsoLike',
          })}
          productIDs={[product.id]}
        />
      </Box>
    </>
  )
}

const getVariant = ({
  variantParam,
  product,
}: {
  variantParam: string
  product: ComposableProduct
}) => {
  // get the selected variant or fallback to the main one
  const initialVariantIndex = Number(variantParam) || 0
  const variantIndex = product.variants[initialVariantIndex]
    ? initialVariantIndex
    : 0
  const variant = product.variants[variantIndex]

  return {
    variantIndex,
    variant,
  }
}
