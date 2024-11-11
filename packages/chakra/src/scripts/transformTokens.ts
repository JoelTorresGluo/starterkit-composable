import fs from 'fs'
import path from 'path'
import rawTokens from '../figma-tokens/tokens.json'
import {
  createBorders,
  createBoxShadow,
  createComponentStyles,
  createRadius,
  createSpacing,
  createTextStyles,
  getTypographyName,
} from '../utils'

// This is the brand name and should come from an environment variable or constant
const BRAND = 'splash'
const UNUSED_TOKENS = [
  // text styles
  'heading',
  'figma',
  'body',
  'eyebrow',
  'link',
  'ui',
  'callouts',
  // shadows
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  'text',
  'inner',
  'outline',
  'sm-inverseY',
]
export type BrandTokens = typeof rawTokens[typeof BRAND]
type DefinitionObject = {
  [key: string]: any
}

const resolveReference = (
  reference: string,
  sourceObject: DefinitionObject,
  key?: string
): any => {
  const regex = /\{([^\}]+)\}/g

  return reference.replace(regex, (match, pathStr) => {
    let value: any = sourceObject
    const segments = pathStr.split('.')
    if (key === 'typography') {
      return getTypographyName(pathStr)
    }

    for (const segment of segments) {
      value = value[segment]
      if (typeof value === 'undefined') {
        return match
      }
    }

    if (typeof value === 'string' && regex.test(value)) {
      if (value.includes(match)) {
        throw new Error(`Circular reference detected: ${match}`)
      }
      return resolveReference(value, sourceObject)
    }
    return value.value || match
  })
}

const replaceReferencesInObject = (
  resultObject: DefinitionObject,
  sourceObject: DefinitionObject = resultObject
): void => {
  for (const key in resultObject) {
    if (typeof resultObject[key] === 'string') {
      resultObject[key] = resolveReference(resultObject[key], sourceObject, key)
    } else if (resultObject[key] && typeof resultObject[key] === 'object') {
      replaceReferencesInObject(resultObject[key], sourceObject)
    }
  }
}

const transformTokens = (tokens: BrandTokens): BrandTokens => {
  replaceReferencesInObject(tokens)
  return tokens
}

const writeJsonToFile = (
  filePath: string,
  data: BrandTokens,
  directoryPath: string
): void => {
  fs.writeFileSync(
    path.join(directoryPath, filePath),
    JSON.stringify(data, null, 2)
  )
}

const removeUnusedTokens = (tokens: any) => {
  UNUSED_TOKENS.forEach((token) => {
    delete tokens[token]
  })
}

const transformForChakra = (tokens: any) => {
  const textStyles = createTextStyles(tokens)
  const resultObject = {
    ...tokens,
    spacing: createSpacing(tokens.sizes),
    radii: createRadius(tokens.radii),
    borders: createBorders(tokens.borders),
    boxShadow: createBoxShadow(tokens),
    textStyles: textStyles,
    component: createComponentStyles(tokens.component, textStyles),
  }
  removeUnusedTokens(resultObject)

  return resultObject
}

const removeUnusedValueAndKeys = (tokens: any) => {
  for (const key in tokens) {
    if (tokens[key] && typeof tokens[key] === 'object') {
      if ('value' in tokens[key]) {
        tokens[key] = tokens[key].value // Replace the parent object with the value of the value property
      } else {
        removeUnusedValueAndKeys(tokens[key]) // Recursively handle nested objects
      }
    }
  }
  delete tokens.type // Remove the type property
}

try {
  console.log('🚀 Starting figma token transformation...')
  // Step 1: transform tokens from Figma (get definitions)
  const transformedTokens = transformTokens(rawTokens[BRAND])

  // Step 2: clean up tokens (remove unused data)
  removeUnusedValueAndKeys(transformedTokens)

  // Step 3: transform tokens for Chakra UI theme system
  const finalTransformedTokens = transformForChakra(transformedTokens)

  writeJsonToFile(
    'transformedTokens.json',
    finalTransformedTokens,
    path.join(__dirname, '../figma-tokens')
  )

  console.log('✅ Figma token transformation completed successfully.')
} catch (error) {
  console.error(
    '❌ An error occurred during the figma token transformation:',
    error
  )
}

export {}
