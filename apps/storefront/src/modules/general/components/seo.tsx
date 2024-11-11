import { getServerIntl } from '@modules/intl'
import { Locale, getCurrency, getSiteUrl } from '@oriuminc/base'
import {
  ComposableProduct,
  ComposableProductVariant,
} from '@oriuminc/commerce-generic'

export const SiteLinksSearchBoxScript = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: getSiteUrl(),
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: `${getSiteUrl()}/search?query={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    ],
  }
  return <JsonLdScript content={jsonLd} />
}

export const OrganizationJsonLdScript = ({
  orgName,
  logoUrl,
}: {
  orgName: string
  logoUrl: string
}) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: orgName,
    url: getSiteUrl(),
    logo: logoUrl,
  }
  return <JsonLdScript content={jsonLd} />
}

export const ProductJsonLdScript = async ({
  product,
  variant,
  locale,
}: {
  product: ComposableProduct
  variant: ComposableProductVariant
  locale: Locale
}) => {
  const brand = variant?.attributes?.find(
    (attribute) => attribute.name === 'brand'
  )?.value
  const isOutOfStock =
    variant?.stockQuantity !== undefined && variant.stockQuantity === 0

  const intl = await getServerIntl(locale)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product?.title,
    description: product?.description,
    sku: product?.sku,
    image: product?.images?.map((img) => img.url),
    brand: brand
      ? {
          '@type': 'Brand',
          name: brand,
        }
      : undefined,
    offers: [
      {
        type: 'Offer',
        priceCurrency: variant?.price?.current.currencyCode,
        price: variant?.price?.current?.amount
          ? intl.formatNumber(variant?.price?.current?.amount / 100, {
              style: 'currency',
              currency: getCurrency(locale),
            })
          : null,
        priceValidUntil: new Date().toISOString().split('T')[0],
        itemCondition: 'https://schema.org/NewCondition',
        availability: !isOutOfStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        url: `${getSiteUrl()}/product/${product.slug}`,
        seller: brand
          ? {
              type: 'Organization',
              name: brand,
            }
          : undefined,
      },
    ],
  }
  return <JsonLdScript content={jsonLd} />
}

const JsonLdScript = (content: any) => {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(content) }}
    />
  )
}
