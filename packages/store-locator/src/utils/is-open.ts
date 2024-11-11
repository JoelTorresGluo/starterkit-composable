import { Store } from '../_data'
import { isTimeInInterval } from './is-time-in-interval'
import { getCurrentDate } from './get-current-date'
import { TIMEZONE_DEFAULT } from '../constants'

export const isOpen = (store: Store): boolean => {
  if (!store.open_hours) {
    return false
  }

  // Check if an override exists
  const currentDate = getCurrentDate()
  const override = store.open_overrides?.[currentDate]
  if (override) {
    return override.some((el) =>
      isTimeInInterval(el.open, el.close, store.timezone || TIMEZONE_DEFAULT)
    )
  }

  // Get the current day of the week
  const dayKey = new Date().toLocaleDateString('en-US', { weekday: 'short' })
  const dayHours = store.open_hours?.[dayKey]
  if (dayHours) {
    return dayHours.some((el) =>
      isTimeInInterval(el.open, el.close, store.timezone || TIMEZONE_DEFAULT)
    )
  }

  return false
}
