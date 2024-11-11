import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Card,
  CardBody,
  Skeleton,
} from '@chakra-ui/react'
import {
  IStripePaymentMethod,
  IStripeSetupIntent,
  StripeProvider,
} from '@oriuminc/stripe'
import { CheckoutDetailItem } from '@oriuminc/templates/checkout'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { StripeForm, StripeFormProps } from './stripe-form'

export interface StripePaymentMethodProps {
  setupIntent?: IStripeSetupIntent
  isResuming?: boolean
  onChangeStripeCard?: () => void
  isLoading?: boolean
  isLoadError?: boolean
  onRetryLoading?: () => void
  formProps: StripeFormProps
}

export const StripePaymentMethod = ({
  setupIntent,
  isResuming,
  onChangeStripeCard,
  isLoading,
  isLoadError,
  onRetryLoading,
  formProps,
}: StripePaymentMethodProps) => {
  const intl = useIntl()

  const stripePaymentDetails = useMemo(() => {
    // TODO: fix type for setup intent
    const stripePaymentMethodDetails = (setupIntent as any)
      ?.payment_method as IStripePaymentMethod
    if (!stripePaymentMethodDetails) return undefined
    const card = stripePaymentMethodDetails?.card
    const cardData = card
      ? [
          `${card.brand} XXXX-${card.last4}`,
          `${card.exp_month}/${card.exp_year}`,
        ]
      : undefined
    const stripeLinkData = Boolean(stripePaymentMethodDetails.link)
      ? [
          intl.formatMessage({
            id: 'checkout.paymentSection.stripeLink.paymentMethodTitle',
          }),
        ]
      : undefined
    return (
      cardData ??
      stripeLinkData ?? [
        intl.formatMessage({
          id: 'checkout.paymentSection.stripe.paymentMethodTitle',
        }),
      ]
    )
  }, [setupIntent])

  if (isResuming) {
    return (
      <Card variant='outline' mb='4'>
        <CardBody>
          <CheckoutDetailItem
            title=''
            details={stripePaymentDetails}
            onClickEdit={() => onChangeStripeCard?.()}
          />
        </CardBody>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Skeleton
        // TODO: Replace pixel value with token.
        height='200px'
        mt='xs'
        mb='lg'
      />
    )
  }

  if (isLoadError) {
    return (
      <Alert
        status='error'
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        // TODO: Replace pixel value with token.
        height='200px'
        mt='xs'
        mb='lg'
      >
        <AlertIcon boxSize='30px' mr='0' />
        <AlertTitle mt='4' mb='1'>
          {intl.formatMessage({
            id: 'checkout.paymentSection.stripe.loadingError',
          })}
        </AlertTitle>
        <AlertDescription maxW='container.sm'>
          <Button onClick={() => onRetryLoading?.()} size='sm'>
            {intl.formatMessage({
              id: 'checkout.paymentSection.stripe.loadingErrorTryAgainButton',
            })}
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <StripeProvider
      stripeKey={process.env.NEXT_PUBLIC_STRIPE_KEY || ''}
      stripeClientSecret={setupIntent?.client_secret}
    >
      <StripeForm {...formProps} />
    </StripeProvider>
  )
}
