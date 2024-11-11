/**
 * Ensures that the given dimension value (like width, height, font-size, etc.) has a size unit (px or rem).
 * If the dimension doesn't end with '0' or 'rem', it appends 'px' by default.
 *
 * @param dimension - A string representing the dimension value.
 * @returns The dimension with a guaranteed size unit.
 */
export const resolveSizeUnit = (dimension: string): string => {
  if (
    !dimension ||
    typeof dimension !== 'string' ||
    isNaN(parseFloat(dimension))
  )
    return dimension

  // Array of acceptable CSS units.
  const cssUnits = ['em', 'rem', '%', 'ch', 'vh', 'vw', 'dvh', 'dvw']
  const dimensionIsValid = cssUnits.filter((unit) => {
    return dimension.endsWith(unit)
  })

  if (dimension.endsWith('0') || dimensionIsValid.length) {
    return dimension
  }

  return `${dimension}px`
}
