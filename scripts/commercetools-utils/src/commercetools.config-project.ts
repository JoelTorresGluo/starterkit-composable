import { login } from './commercetools/utils/auth'
import {
  createShippingMethod,
  createZone,
  getProjectSettings,
  UpdateProjectAction,
  updateProjectSettings,
} from './commercetools/service/project'
import { PROJECT_SETTINGS, SHIPPING } from './commercetools/config'
import {
  getChangeCountriesAction,
  getChangeCurrenciesAction,
  getChangeLanguagesAction,
  getCountryTaxRateFallbackAction,
  getOrdersSearchAction,
  getStorefrontSearchAction,
} from './commercetools/utils/projectUpdateActions'
import { getTaxCategoryPayload } from './commercetools/helpers/taxCategories'
import { createTaxCategory } from './commercetools/service/taxCategories'

export const configProject = async () => {
  console.log('Configuring commercetools project...')

  const projectSettings = await getProjectSettings()

  if (!projectSettings || !projectSettings.version) {
    console.log('Unable to retrieve project settings')
    return
  }

  const updateProjectActions: UpdateProjectAction[] = []

  if (PROJECT_SETTINGS.currencies) {
    updateProjectActions.push(
      getChangeCurrenciesAction(PROJECT_SETTINGS.currencies)
    )
  }

  if (PROJECT_SETTINGS.languages) {
    updateProjectActions.push(
      getChangeLanguagesAction(PROJECT_SETTINGS.languages)
    )
  }

  if (PROJECT_SETTINGS.countries) {
    updateProjectActions.push(
      getChangeCountriesAction(PROJECT_SETTINGS.countries)
    )
  }

  if (PROJECT_SETTINGS.storefrontSearch) {
    updateProjectActions.push(
      getStorefrontSearchAction(PROJECT_SETTINGS.storefrontSearch)
    )
  }

  if (PROJECT_SETTINGS.ordersSearch) {
    updateProjectActions.push(
      getOrdersSearchAction(PROJECT_SETTINGS.ordersSearch)
    )
  }

  if (PROJECT_SETTINGS.countryTaxRateFallback) {
    updateProjectActions.push(
      getCountryTaxRateFallbackAction(PROJECT_SETTINGS.countryTaxRateFallback)
    )
  }

  await updateProjectSettings({
    version: projectSettings.version,
    actions: updateProjectActions,
  })

  const taxCategory = await createTaxCategory(getTaxCategoryPayload('Standard'))

  let zone
  for (const shippingZone of SHIPPING.zones || []) {
    zone = await createZone({
      name: shippingZone.name,
      countries: shippingZone.countries,
    })
  }

  if (zone) {
    for (const shippingMethod of SHIPPING.shippingMethods || []) {
      await createShippingMethod({
        name: shippingMethod.name,
        zoneId: zone.id,
        taxCategoryId: taxCategory.id,
        localizedDescription: shippingMethod.localizedDescription,
        isDefault: shippingMethod.isDefault,
        rates: shippingMethod.rates,
      })
    }
  }
}
;(async () => {
  await login()
  await configProject()
})()
