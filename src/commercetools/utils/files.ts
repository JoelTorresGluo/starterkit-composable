import fs from 'fs'
import { PROCESSED_PRODUCTS_FILEPATH, RAW_PRODUCTS_FILEPATH } from '../config'
import { RawProduct, RawProducts } from '../types'

export const saveJsonFile = (filename: string, jsonObject: object) => {
  fs.writeFileSync(filename, JSON.stringify(jsonObject, null, 4))
}

export const getFileOrNull = (
  filepath: string,
  parseToJson: boolean = true
) => {
  try {
    const fileContent = fs.readFileSync(filepath).toString('utf8')
    return parseToJson ? JSON.parse(fileContent) : fileContent
  } catch (err) {
    console.log(`${filepath} not found`)
    return null
  }
}

export const getRawDemoProducts = () => {
  const file = getFileOrNull(RAW_PRODUCTS_FILEPATH)
  if (!file) {
    throw new Error(
      'PRODUCTS FILE NOT FOUND!\n' +
        'Remember to place the raw products file on ' +
        RAW_PRODUCTS_FILEPATH +
        '\n' +
        'before running "pnpm build-products"\n'
    )
  }
  return file as RawProduct[]
}

export const getDemoProducts = () => {
  const file = getFileOrNull(PROCESSED_PRODUCTS_FILEPATH)
  if (!file) {
    throw new Error(
      'PRODUCTS FILE NOT FOUND!\n' +
        'Remember to place the raw products file on ' +
        RAW_PRODUCTS_FILEPATH +
        '\n' +
        'and run "pnpm build-products" before the "pnpm upload" command\n'
    )
  }

  return file as RawProducts
}

export const getArrayOrString = (rawValue: string) => {
  const isStringArray = rawValue.includes(',')
  if (!isStringArray) return rawValue
  const stringArrayWithoutQuotes = rawValue.replace(/"/g, '')
  return stringArrayWithoutQuotes.replace(/,(\s*)/, ',').split(',')
}
