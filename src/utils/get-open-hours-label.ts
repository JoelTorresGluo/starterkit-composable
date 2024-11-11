import { Store } from '../_data'
import { getCurrentDate } from './get-current-date'
import { TIMEZONE_DEFAULT } from '../constants'

export const getOpenHoursLabel = (store: Store): string | undefined => {
  if (!store.open_hours) {
    return
  }

  // Check if an override exists
  const currentDate = getCurrentDate()
  const override = store.open_overrides?.[currentDate]
  if (override) {
    return `${override.map((el) => el.open + ' - ' + el.close).join(' / ')} (${
      store.timezone || TIMEZONE_DEFAULT
    })`
  }

  // Get the current day of the week
  const dayKey = new Date().toLocaleDateString('en-US', { weekday: 'short' })
  const dayHours = store.open_hours?.[dayKey]
  if (dayHours) {
    return `${dayHours.map((el) => el.open + ' - ' + el.close).join(' / ')} (${
      store.timezone || TIMEZONE_DEFAULT
    })`
  }

  return
}
