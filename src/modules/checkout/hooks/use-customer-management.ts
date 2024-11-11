import { useUser } from '@modules/commerce'
import { useHandleError } from '@modules/general'
import { api } from '@modules/trpc/react'
import {
  ComposableCheckoutCustomerManagement,
  ComposableCheckoutFetchCustomer,
  ComposableCheckoutLogin,
} from '@oriuminc/checkout-app-router'
import { ComposableAddress } from '@oriuminc/commerce-generic'
import { useCallback } from 'react'

/** Provides functions for fetching the customer, logging in the customer,
 *  and setting the customer's address.
 *
 * @returns {Object} An object containing the following functions:
 * - fetchCustomer: A function that fetches the customer data.
 * - login: A function that logs in the user.
 * - updateCustomerAddress: A function that updates the customer's address.
 *
 */
export const useCustomerManagement =
  (): ComposableCheckoutCustomerManagement => {
    const { updateCustomer, login: userLogin } = useUser()
    const {
      client: { commerce },
    } = api.useUtils()

    const { createHandleError } = useHandleError()

    const handleError = createHandleError()

    const login: ComposableCheckoutLogin = async ({ email, password }) => {
      try {
        await userLogin.mutateAsync({ email, password })
      } catch (err) {
        handleError(err)
      }
    }

    const fetchCustomer: ComposableCheckoutFetchCustomer = async () => {
      try {
        const user = await commerce.getCustomer.query()

        if (!user) {
          throw new Error('No user found')
        }

        return {
          addresses: user.addresses ?? [],
          addressSelected: user.addresses?.find(
            (a) => a.id === user.defaultShippingAddressId
          ),

          defaultShippingAddressId: user.defaultShippingAddressId,
          email: user.email ?? '',
          firstName: user.firstName ?? '',
          lastName: user.lastName ?? '',
          id: user.id ?? '',
        }
      } catch (err) {
        throw new Error('Error fetching user')
      }
    }

    const updateCustomerAddress = useCallback(
      async (address: ComposableAddress) => {
        try {
          const user = await updateCustomer.mutateAsync({
            actions: [
              {
                action: 'updateShippingAddress',
                addressId: address.id,
                address,
              },
            ],
          })

          return {
            addresses: user?.addresses ?? [],
            addressSelected: user?.addresses?.find((a) => a.id === address.id),
          }
        } catch (err) {
          throw err
        }
      },
      [updateCustomer]
    )

    return {
      fetchCustomer,
      login,
      updateCustomerAddress,
    }
  }
