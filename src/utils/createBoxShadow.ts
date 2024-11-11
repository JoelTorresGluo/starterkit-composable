import { resolveSizeUnit } from './resolveSizeUnit'

interface ShadowObject {
  x: string // Horizontal offset of the shadow
  y: string // Vertical offset of the shadow
  blur: string // Blur radius of the shadow
  spread: string // Spread radius of the shadow
  color: string // Color of the shadow
  type: string // Type of shadow
}
type ShadowData = ShadowObject | ShadowObject[]
type ShadowTokens = Record<string, ShadowData>

const formatShadow = (shadowObj: ShadowObject): string =>
  `${resolveSizeUnit(shadowObj.x)} ${resolveSizeUnit(
    shadowObj.y
  )} ${resolveSizeUnit(shadowObj.blur)} ${resolveSizeUnit(shadowObj.spread)} ${
    shadowObj.color
  }`

const getShadowValue = (shadowData: ShadowData): string => {
  if (Array.isArray(shadowData)) {
    return shadowData.map(formatShadow).join(', ')
  }
  return formatShadow(shadowData)
}

/**
 * Creates a box shadow object from the given shadow tokens.
 *
 * @param tokens - The complete tokens object.
 * @returns The box shadow object.
 */
export const createBoxShadow = (
  tokens: ShadowTokens
): Record<string, string> => {
  // Note: new shadow tokens need to be added here
  const shadowTokens = {
    none: tokens.none,
    xs: tokens.xs,
    sm: tokens.sm,
    md: tokens.md,
    lg: tokens.lg,
    xl: tokens.xl,
    '2xl': tokens['2xl'],
    text: tokens.text,
    inner: tokens.inner,
    'sm-inverseY': tokens['sm-inverseY'],
    outline: tokens.outline,
  }

  return Object.fromEntries(
    Object.keys(shadowTokens).map((key) => {
      const shadowValue = getShadowValue(tokens[key])
      const formattedShadow =
        key === 'inner' ? `inset ${shadowValue}` : shadowValue
      return [key, formattedShadow]
    })
  )
}
