import { IntlShape } from 'react-intl'
import { z } from 'zod'

export const getComposableAddressSchema = (intl?: IntlShape) => {
  return z.object({
    firstName: z
      .string({
        required_error: intl?.formatMessage({
          id: 'validation.firstNameRequired',
        }),
      })
      .max(50, intl?.formatMessage({ id: 'validation.tooLong' }, { max: 50 })),
    lastName: z
      .string({
        required_error: intl?.formatMessage({
          id: 'validation.lastNameRequired',
        }),
      })
      .max(50, intl?.formatMessage({ id: 'validation.tooLong' }, { max: 50 })),
    addressLine1: z
      .string({
        required_error: intl?.formatMessage({
          id: 'validation.addressLine1Required',
        }),
      })
      .min(2, intl?.formatMessage({ id: 'validation.tooShort' }, { min: 2 }))
      .max(
        100,
        intl?.formatMessage({ id: 'validation.tooLong' }, { max: 100 })
      ),
    addressLine2: z
      .string()
      .max(100, intl?.formatMessage({ id: 'validation.tooLong' }, { max: 100 }))
      .optional(),
    country: z
      .string({
        required_error: intl?.formatMessage({
          id: 'validation.countryRequired',
        }),
      })
      .max(50, intl?.formatMessage({ id: 'validation.tooLong' }, { max: 50 })),
    region: z
      .string({
        required_error: intl?.formatMessage({ id: 'validation.required' }),
      })
      .min(2, intl?.formatMessage({ id: 'validation.tooShort' }, { min: 2 }))
      .max(50, intl?.formatMessage({ id: 'validation.tooLong' }, { max: 50 })),
    city: z
      .string({
        required_error: intl?.formatMessage({ id: 'validation.cityRequired' }),
      })
      .min(2, intl?.formatMessage({ id: 'validation.tooShort' }, { min: 2 }))
      .max(50, intl?.formatMessage({ id: 'validation.tooLong' }, { max: 50 })),
    postalCode: z
      .string({
        required_error: intl?.formatMessage({ id: 'validation.required' }),
      })
      .regex(
        /^[0-9A-Za-z\s]+$/,
        intl?.formatMessage({ id: 'validation.invalidCharactersNumberLetter' })
      )
      .min(2, intl?.formatMessage({ id: 'validation.tooShort' }, { min: 2 }))
      .max(50, intl?.formatMessage({ id: 'validation.tooLong' }, { max: 50 })),
    phoneNumber: z
      .string()
      .regex(
        /^[\d\s\(\)\-\+]*$/,
        intl?.formatMessage({ id: 'validation.invalidCharactersNumber' })
      )
      .max(
        15,
        intl?.formatMessage({ id: 'validation.tooLongDigits' }, { max: 15 })
      )
      .optional(),
    isDefaultAddress: z.boolean().optional(),
  })
}

export const ComposableAddressSchema = getComposableAddressSchema()

export type ComposableAddress = z.infer<typeof ComposableAddressSchema> & {
  id?: string
  email?: string
}
