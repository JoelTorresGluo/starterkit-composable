import { UpdateProjectAction } from '../service/project'

export const getChangeCurrenciesAction = (
  currencies: string[]
): UpdateProjectAction<'changeCurrencies'> => {
  return {
    action: 'changeCurrencies',
    currencies,
  }
}

export const getChangeLanguagesAction = (
  languages: string[]
): UpdateProjectAction<'changeLanguages'> => {
  return {
    action: 'changeLanguages',
    languages,
  }
}

export const getChangeCountriesAction = (
  countries: string[]
): UpdateProjectAction<'changeCountries'> => {
  return {
    action: 'changeCountries',
    countries,
  }
}

export const getStorefrontSearchAction = (
  enabled: boolean
): UpdateProjectAction<'changeProductSearchIndexingEnabled'> => {
  return {
    action: 'changeProductSearchIndexingEnabled',
    enabled,
  }
}

export const getOrdersSearchAction = (
  enabled: boolean
): UpdateProjectAction<'changeOrderSearchStatus'> => {
  return {
    action: 'changeOrderSearchStatus',
    status: enabled ? 'Activated' : 'Deactivated',
  }
}

export const getCountryTaxRateFallbackAction = (
  enabled: boolean
): UpdateProjectAction<'changeCountryTaxRateFallbackEnabled'> => {
  return {
    action: 'changeCountryTaxRateFallbackEnabled',
    countryTaxRateFallbackEnabled: enabled,
  }
}
