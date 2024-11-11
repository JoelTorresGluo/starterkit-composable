import { Flex, HStack, VisuallyHidden, Text } from '@chakra-ui/react'
import { useCheckoutSteps } from '@oriuminc/base'
import { CheckoutStepLink } from './checkout-step-link'

export const CheckoutSteps = () => {
  const { goTo, step, steps } = useCheckoutSteps()
  const currentStepIndex = steps.findIndex((s) => s.key === step.key)
  const ariaH1 = `Checkout step ${step.name}, ${currentStepIndex + 1} of ${
    steps.length
  }`
  return (
    <Flex ml={{ base: 'none', md: 8 }}>
      <VisuallyHidden>
        <Text as='h1' aria-live='polite'>
          {ariaH1}
        </Text>
      </VisuallyHidden>
      <HStack spacing='4'>
        {steps.map((s) => {
          if (!s.id || !step.id) return
          const isPreviousOrEqual = step.id >= s.id

          return (
            <CheckoutStepLink
              key={s.id}
              active={step.key === s.key}
              title={`${s.id}.  ${s.name}`}
              onClick={() => goTo(s.hash)}
              isAllowed={s.isAllowed && isPreviousOrEqual}
            />
          )
        })}
      </HStack>
    </Flex>
  )
}
