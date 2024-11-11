import { Locale } from '@oriuminc/base'
import { cache } from 'react'

/**
 * This function uses react cache to store a value
 * that can be retrieved in any server component, avoiding prop-drilling.
 *
 * See the example for locale below.
 */
export const createServerContext = <T>(
  initialValue: T
): [() => T, (v: T) => void] => {
  const getRef = cache(() => ({ current: initialValue }))

  const getValue = (): T => getRef().current

  const setValue = (value: T) => {
    getRef().current = value
  }

  return [getValue, setValue]
}

export const [getServerLocale, setServerLocale] = createServerContext(
  'en-US' as Locale
)
