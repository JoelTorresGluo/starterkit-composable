export interface RoundDecimalsParams {
  num: number
  decimal?: 0 | 1 | 2 | 3 | 4
}

/**
 * Returns number with rounded decimal places
 *
 * @param {number} num - e.g. `123.45`
 * @param {number|0} decimal - e.g. `0 | 1 | 2 | 3 | 4 or undefined`
 * @returns Number with rounded decimal places
 */
export const roundDecimals = ({ num, decimal = 2 }: RoundDecimalsParams) => {
  return Math.ceil((num + Number.EPSILON) * 10 ** decimal) / 10 ** decimal
}
