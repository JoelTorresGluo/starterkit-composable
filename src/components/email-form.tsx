import { useIntl } from 'react-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckboxField, InputField } from '@oriuminc/ui'
import { useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { Email, EmailSchema } from '../validation'
import { UseCheckoutFormProps } from '../types'

type ShippingAddressFormProps = Pick<
  UseCheckoutFormProps<{ email: string }>,
  'onChange' | 'initialValues'
>

export const EmailForm = ({
  initialValues,
  onChange,
}: ShippingAddressFormProps) => {
  const intl = useIntl()

  const { register, formState, watch, trigger, getValues } = useForm<Email>({
    resolver: zodResolver(EmailSchema({ intl })),
    mode: 'onTouched',
    shouldFocusError: true,
    defaultValues: initialValues,
  })

  useEffect(() => {
    const subscription = watch((value) => {
      onChange({
        data: value as { email: string },
        isValid: EmailSchema({ intl }).safeParse(value).success,
      })
    })

    return () => subscription.unsubscribe()
  }, [watch, onChange])
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <InputField
          label={intl.formatMessage({
            id: 'checkout.guestForm.label.email',
          })}
          inputProps={{
            ...register('email'),
            placeholder: intl.formatMessage({
              id: 'checkout.guestForm.placeholder.email',
            }),
          }}
          caption={intl.formatMessage({ id: 'checkout.guestForm.label.info' })}
          error={formState.errors.email}
          isRequired
        />
      </form>
      <Box mt='6'>
        <CheckboxField
          content={intl.formatMessage({
            id: 'checkout.guestForm.newsletterSignUp',
          })}
          checkboxProps={{ name: 'newsletter' }}
          textProps={{ fontWeight: 'regular' }}
        />
      </Box>
    </>
  )
}
