import { getServerIntl } from '@modules/intl'
import { getServerLocale } from '@modules/server/server-context'
import { staticApi } from '@modules/trpc/server'
import { Locale, getCurrency } from '@oriuminc/base'
import { ComposableProductSearchQueryParams } from '@oriuminc/commerce-generic'
import { ProductSliderRenderer } from './product-slider-renderer'

interface ComponentProductListProps {
  title?: string | null
  subtitle?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  variant: 'default' | 'large'
  query?: ComposableProductSearchQueryParams
}

export const ComponentProductList = async (
  props: ComponentProductListProps
) => {
  const locale = getServerLocale()
  const intl = await getServerIntl(locale)
  const currency = getCurrency(intl.locale)

  const data = await staticApi.commerce.getProducts({
    currency,
    locale: intl.locale as Locale,
    query: props.query,
  })

  return (
    <ProductSliderRenderer
      products={data?.results ?? []}
      title={props.title ?? undefined}
      subtitle={props.subtitle ?? undefined}
      variant={props.variant === 'large' ? 'large' : 'default'}
      ctaHref={props.ctaHref}
      ctaLabel={props.ctaLabel}
    />
  )
}
