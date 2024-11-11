import { resolveSizeUnit } from './resolveSizeUnit'

/**
 * Creates a radius object from the given radius tokens.
 *
 * @param radiiTokens - The radius tokens to use.
 * @returns The radius object.
 */
export const createRadius = (radiiTokens: { [key: string]: string }) => {
  return Object.fromEntries(
    Object.keys(radiiTokens).map((key) => {
      const radiusValue =
        key === 'none' || key === 'full'
          ? resolveSizeUnit(radiiTokens[key])
          : radiiTokens[key]
      return [key, radiusValue]
    })
  )
}
