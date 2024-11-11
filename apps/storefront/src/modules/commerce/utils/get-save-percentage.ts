import { RoundDecimalsParams, roundDecimals } from './round-decimals'

export interface GetSavePercentageParams {
  regularAmount: number
  saleAmount: number
  decimal?: RoundDecimalsParams['decimal']
}

/**
 * Returns percentage saved with rounded decimal places
 *
 * @param {number} regularAmount - e.g. `123.45`
 * @param {number} saleAmount - e.g. `123.45`
 * @param {number|0} decimal - e.g. `0 | 1 | 2 | 3 | 4 or undefined`
 * @returns Percentage saved with rounded decimal places
 */
export const getSavePercentage = ({
  regularAmount,
  saleAmount,
  decimal = 2,
}: GetSavePercentageParams) => {
  if (regularAmount <= 0 || regularAmount <= saleAmount) return 0
  if (saleAmount <= 0) return 100

  return roundDecimals({
    num: (100 * (regularAmount - saleAmount)) / regularAmount,
    decimal,
  })
}
