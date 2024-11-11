import { Flex, HStack, VisuallyHidden, Text } from '@chakra-ui/react'
import { CheckoutStepLink } from './checkout-step-link'
import { useIntl } from 'react-intl'
import { ActorRefFrom } from 'xstate'
import { useSelector } from '@xstate/react'
import { threeStepStateMachine } from '../../../../machines'

interface CheckoutStepProps {
  threeStepExperienceRef: ActorRefFrom<typeof threeStepStateMachine>
}
export const CheckoutSteps = ({
  threeStepExperienceRef,
}: CheckoutStepProps) => {
  const intl = useIntl()
  const state = useSelector(threeStepExperienceRef, (s) => s)
  const { paymentRef, reviewOrderRef } = state.context

  return (
    <Flex h='full' alignItems='stretch'>
      <VisuallyHidden>
        <Text as='h1' aria-live='polite'>
          {Object.keys(state.value)[0]}
        </Text>
      </VisuallyHidden>
      <HStack spacing='4' alignItems='stretch'>
        <CheckoutStepLink
          active={state.matches('delivery')}
          title={`1. ${intl.formatMessage({
            id: 'checkout.customerSection.title',
          })}`}
          onClick={() =>
            threeStepExperienceRef.send({ type: 'go.step.delivery' })
          }
          isAllowed={state.can({ type: 'go.step.delivery' })}
        />
        <CheckoutStepLink
          active={state.matches('payment')}
          title={`2. ${intl.formatMessage({
            id: 'checkout.paymentSection.title',
          })}`}
          onClick={() =>
            threeStepExperienceRef.send({ type: 'go.step.payment' })
          }
          isAllowed={
            state.can({ type: 'go.step.payment' }) && Boolean(paymentRef)
          }
        />
        <CheckoutStepLink
          active={state.matches('review')}
          title={`3. ${intl.formatMessage({
            id: 'checkout.review.title',
          })}`}
          onClick={() =>
            threeStepExperienceRef.send({ type: 'go.step.review' })
          }
          isAllowed={
            state.can({ type: 'go.step.review' }) && Boolean(reviewOrderRef)
          }
        />
      </HStack>
    </Flex>
  )
}
