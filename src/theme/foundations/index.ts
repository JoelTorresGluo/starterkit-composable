import { borders } from './borders'
import { borderStyles } from './borderStyles'
import { breakpoints } from './breakpoints'
import { colors } from './colors'
import { radii } from './radius'
import { shadows } from './shadows' // elevation
import { fontSize } from '../../figma-tokens'
import { sizes } from './sizes'
import { spacing } from './spacing'
import { typography } from './typography'

export const foundations = {
  borders,
  borderStyles,
  breakpoints,
  colors,
  radii,
  shadows,
  sizes,
  space: { ...spacing, ...fontSize },
  ...typography,
}
