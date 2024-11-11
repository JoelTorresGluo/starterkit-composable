import { utcToZonedTime } from 'date-fns-tz'

export const isTimeInInterval = (
  startTime: string,
  endTime: string,
  timezone: string
) => {
  // Get the current time
  const currentTime = utcToZonedTime(new Date(), timezone) // In June 10am in Los Angeles is 5pm UTC

  // Create Date objects for the start and end times of the interval
  const start = new Date()
  const end = new Date()

  // Set the time for the start and end objects
  const [startHour, startMinute] = startTime.split(':')
  start.setHours(parseInt(startHour, 10))
  start.setMinutes(parseInt(startMinute, 10))

  const [endHour, endMinute] = endTime.split(':')
  end.setHours(parseInt(endHour, 10))
  end.setMinutes(parseInt(endMinute, 10))

  // Check if the current time falls within the interval
  return currentTime >= start && currentTime <= end
}
