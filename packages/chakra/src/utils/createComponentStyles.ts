import { TransformedFormat } from './createTextStyles'

type AttributeValue = string

interface Attributes {
  [key: string]: AttributeValue
}

interface StateDefinition {
  value: Attributes
  type: string
}

interface State {
  [state: string]: StateDefinition
}

interface Variant {
  [variant: string]: State
}

interface Size {
  [size: string]: Variant
}

interface Component {
  [component: string]: Size
}

interface Components {
  [component: string]: Component
}

const getBaseStyle = (component: Component) => {
  const allVariants = Object.values(component).flatMap((size) =>
    Object.values(size).flatMap((variant) => Object.values(variant))
  )
  return Object.fromEntries(
    Object.entries(allVariants[0]).filter(([key, value]) =>
      allVariants.every((variant) => variant[key] === value)
    ) as unknown as [string, AttributeValue][]
  )
}

const getSizes = (component: Component) => {
  return Object.fromEntries(
    Object.entries(component).map(([size, sizeAttributes]) => {
      const allVariantDefault = Object.values(sizeAttributes)
        .filter((variantObj: Variant) => 'default' in variantObj)
        .map((variantObj: Variant) => variantObj.default!)

      if (allVariantDefault.length === 0) {
        return [size, {}]
      }

      const commonForThisSize = Object.fromEntries(
        Object.entries(allVariantDefault[0]).filter(([key]) =>
          allVariantDefault.every(
            (variant) => variant && variant[key] === allVariantDefault[0][key]
          )
        )
      )
      return [size, commonForThisSize]
    })
  ) as unknown as Record<string, Attributes>
}

const filterObject = (obj: State, attributesToRemove: Attributes) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([key]) => !attributesToRemove.hasOwnProperty(key)
    )
  )
}

const getVariants = (
  componentData: Component,
  commonAttributesForSizes: Record<string, Attributes>,
  baseStyle: Attributes
) => {
  const firstSizeKey = Object.keys(commonAttributesForSizes)[0]
  const commonAttributes = {
    ...commonAttributesForSizes[firstSizeKey],
    ...baseStyle,
  } as Attributes
  const variants = componentData[firstSizeKey]

  return Object.fromEntries(
    Object.entries(variants).map(([variant, variantAttributes]) => {
      const tempVariantOutput: { [key: string]: any } = {}

      Object.entries(variantAttributes).forEach(([state, stateObj]) => {
        const filteredStateObj = filterObject(stateObj, commonAttributes)

        if (state === 'default') {
          Object.assign(tempVariantOutput, filteredStateObj)
        } else {
          tempVariantOutput[`_${state}`] = filteredStateObj
        }
      })
      return [variant, tempVariantOutput]
    })
  )
}

const createStyle = (
  component: Component,
  textStyles: Record<string, TransformedFormat>
) => {
  const baseStyle = getBaseStyle(component) ?? {}
  const sizes = getSizes(component) ?? {}
  Object.entries(sizes).forEach(([size, sizeObj]) => {
    if (
      textStyles &&
      sizeObj &&
      sizeObj['typography'] &&
      typeof sizeObj['typography'] === 'string'
    ) {
      const textStyle = textStyles[sizeObj['typography']] ?? {}
      sizes[size] = {
        ...sizeObj,
        ...textStyle,
      }
    }
  })

  const variants = getVariants(component, sizes, baseStyle) ?? {}
  return {
    baseStyle,
    sizes,
    variants,
  }
}

export const createComponentStyles = (
  components: Components,
  textStyles: Record<string, TransformedFormat>
) => {
  if (!components) return {}

  return Object.fromEntries(
    Object.entries(components).map(([componentName, component]) => {
      const style = createStyle(component, textStyles)
      return [componentName, style]
    })
  )
}
