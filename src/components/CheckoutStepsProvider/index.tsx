'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useRouter } from 'next/router'

export const SUCCESS_STEP_HASH = 'success'

export interface CheckoutStep {
  key: string
  hash: string
  isAllowed: boolean
  id?: number
  name?: string
  title?: string
}

export interface CheckoutStepsContextInterface {
  step: CheckoutStep
  move: () => void
  goTo: (step: string) => void
  steps: CheckoutStep[]
  isInSuccessStep: boolean
}

export interface CheckoutStepsProviderProps {
  children: React.ReactElement
  initialSteps: CheckoutStep[]
  onStepChange?: (step: CheckoutStep) => void
}

export const CheckoutStepsProvider = ({
  children,
  initialSteps,
  onStepChange,
}: CheckoutStepsProviderProps) => {
  const router = useRouter()
  const [steps, setSteps] = useState(initialSteps)
  const currentStep = useMemo(
    () => steps.find((step) => step.hash === router.query.step) ?? steps[0],
    [steps, router]
  )
  const isInSuccessStep = currentStep.hash === SUCCESS_STEP_HASH
  const onStepChangeRef = useRef(onStepChange)
  onStepChangeRef.current = onStepChange

  const move = useCallback(async () => {
    const nextStepIndex = (steps.indexOf(currentStep) ?? 0) + 1
    const nextStep = steps[nextStepIndex] ?? undefined

    if (!nextStep) {
      return
    }

    setSteps((stepsState) => {
      const nextState = [...stepsState]
      nextState[nextStepIndex] = {
        ...nextState[nextStepIndex],
        isAllowed: true,
      }

      return nextState
    })

    router.push(
      {
        query: { step: nextStep.hash },
      },
      undefined,
      {
        shallow: true,
      }
    )

    window.scrollTo(0, 0)
  }, [router, currentStep, steps, setSteps])

  const goTo = useCallback(
    async (step: string) => {
      const targetStep = steps.find((s) => s.hash === step)
      if (!targetStep) return
      router.push(
        {
          query: { step },
        },
        undefined,
        {
          shallow: true,
        }
      )

      window.scrollTo(0, 0)
    },
    [router, steps]
  )

  // Validate the current step
  useEffect(() => {
    const index = steps.indexOf(currentStep) ?? 0

    if (index === 0) {
      return
    }

    const prevStep = steps[index - 1]
    if (!currentStep.isAllowed) {
      router.push({
        query: { step: prevStep.hash },
      })
    }
  }, [steps, currentStep, router])

  // Step Change handler
  useEffect(() => {
    onStepChangeRef.current?.(currentStep)
  }, [onStepChange, currentStep])

  const checkoutStepsContext: CheckoutStepsContextInterface = {
    goTo,
    move,
    step: currentStep,
    steps: steps,
    isInSuccessStep,
  }

  return (
    <CheckoutStepsContext.Provider value={checkoutStepsContext}>
      {children}
    </CheckoutStepsContext.Provider>
  )
}

export const CheckoutStepsContext = createContext<
  CheckoutStepsContextInterface | undefined
>(undefined)

export const useCheckoutSteps = () => {
  const context = useContext(CheckoutStepsContext)
  if (context === undefined) {
    throw new Error('useCheckoutSteps must be used within a CheckoutLayout')
  }

  return context
}
