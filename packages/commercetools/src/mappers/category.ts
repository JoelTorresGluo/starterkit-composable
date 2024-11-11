import { Category as CommercetoolsCategory } from '@commercetools/platform-sdk'
import { Locale } from '@oriuminc/base'
import { ComposableCategory } from '@oriuminc/commerce-generic'

export const commercetoolsCategoryToComposableCategory = ({
  category,
  locale,
}: {
  category: CommercetoolsCategory
  locale: Locale
}): ComposableCategory => {
  return {
    id: category.id,
    key: category.key,
    name: category.name[locale] ?? '',
    slug: category.slug[locale] ?? '',
    description: category.description?.[locale] ?? '',
    image: category.assets?.[0]?.sources?.[0]?.uri
      ? {
          url: category.assets[0].sources[0].uri,
          altText: category.assets?.[0].name[locale] ?? '',
        }
      : undefined,
  }
}
