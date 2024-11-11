import { resolveSizeUnit } from './resolveSizeUnit'

/**
 * Creates a spacing object from the given spacing tokens.
 *
 * @param spacingTokens - The spacing tokens to use.
 * @returns The spacing object.
 */
export const createSpacing = (spacingTokens: { [key: string]: string }) => {
  return Object.fromEntries(
    Object.keys(spacingTokens).map((key) => [
      key.replace('-', '.'),
      resolveSizeUnit(spacingTokens[key]),
    ])
  )
}
