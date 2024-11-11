import { spacing } from './spacing'
import { breakpoints } from './breakpoints'

export const largeSizes = {
  max: 'max-content',
  min: 'min-content',
  full: '100%',
  ...breakpoints,
}

const container = {
  ...breakpoints,
  full: '100%',
}

export const sizes = {
  ...spacing,
  ...largeSizes,
  container,
}
