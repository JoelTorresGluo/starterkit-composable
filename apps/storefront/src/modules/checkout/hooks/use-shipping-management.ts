import { useSelectedShippingOption } from './use-selected-shipping-option'
import { useCart } from '@modules/commerce'
import { ComposableCheckoutShippingManagement } from '@oriuminc/checkout-app-router'
import { api } from '@modules/trpc/react'
import { useIntl } from 'react-intl'
import { getCurrency } from '@oriuminc/base'
import { Locale } from '@oriuminc/base'

/**
 * Provides functions for working with shipping options
 *
 * @returns {Object} An object containing the following functions:
 * - fetchShippingOptions: A function that fetches the shipping options.
 * - onSelectedShippingOption: A function that sets the selected shipping option.
 */
export const useShippingManagement =
  (): ComposableCheckoutShippingManagement => {
    const { locale } = useIntl()
    const currency = getCurrency(locale)
    const { updateCart } = useCart()
    const { setSelectedShippingOptionId } = useSelectedShippingOption()

    const {
      client: { commerce },
    } = api.useUtils()
    const fetchShippingOptions = async () => {
      try {
        const shippingOptions = await commerce.getShippingMethods.query({
          locale: locale as Locale,
          currency,
        })

        if (shippingOptions && shippingOptions?.results.length < 1) {
          throw new Error('No shipping options available')
        }

        return shippingOptions.results
      } catch (err) {
        throw new Error('Error fetching shipping options')
      }
    }

    const selectShippingOption = async (shippingOptionId: string) => {
      try {
        if (!shippingOptionId) return

        setSelectedShippingOptionId(shippingOptionId)
        await updateCart.mutateAsync({
          actions: [
            {
              action: 'setShippingMethod',
              shippingMethod: {
                id: shippingOptionId,
              },
            },
          ],
        })
      } catch (err) {
        throw new Error(`Error selecting shipping option ${err}`)
      }
    }

    return {
      fetchShippingOptions,
      onSelectedShippingOption: setSelectedShippingOptionId,
      selectShippingOption,
    }
  }
