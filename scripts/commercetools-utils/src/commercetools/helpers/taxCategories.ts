import { CreateTaxCategoryPayload } from '../service/taxCategories'
import { currentCountries } from '../utils/settings'

export const KEY_TAX_CATEGORY_STANDARD = 'standard-tax-category'

export const getTaxCategoryPayload = (
  taxCategory: string
): CreateTaxCategoryPayload => ({
  name: taxCategory,
  key: KEY_TAX_CATEGORY_STANDARD,
  rates: currentCountries.map((country) => ({
    name: 'Sales',
    country: country,
    amount: country === 'CA' ? 0.07 : country === 'MX' ? 0.16 : 0.1,
    includedInPrice: false,
  })),
})
