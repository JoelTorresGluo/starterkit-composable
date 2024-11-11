import { resolveSizeUnit } from './resolveSizeUnit'

/**
 * Creates a border object from the given border tokens.
 *
 * @param borderTokens - The border tokens to use.
 * @returns The border object.
 */
export const createBorders = (borderTokens: {
  [key: string]: { color: string; width: string; style: string }
}) => {
  return Object.fromEntries(
    Object.keys(borderTokens).map((key) => {
      const { width, style, color } = borderTokens[key]
      return [key, `${resolveSizeUnit(width)} ${style} ${color}`]
    })
  )
}
