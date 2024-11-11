/**
 * This exists for trying to serialize the value back to JSON.
 * If it cannot serialize it, then it was a string value given.
 *
 * @param value the value you wish to try to parse
 */
export function tryParse(value: string) {
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}
