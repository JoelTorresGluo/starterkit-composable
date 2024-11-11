import { IntlShape } from 'react-intl'
import { z } from 'zod'

export const EmailSchema = (deps: { intl?: IntlShape }) => {
  const { intl } = deps

  return z.object({
    email: z
      .string()
      .email(intl?.formatMessage({ id: 'validation.emailValid' })),
  })
}

export type Email = z.infer<ReturnType<typeof EmailSchema>>

export const validateEmail = (email: Email): boolean => {
  return EmailSchema({}).safeParse(email).success
}
