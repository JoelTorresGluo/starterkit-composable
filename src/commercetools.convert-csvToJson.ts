import { parse } from 'csv-parse'
import fs from 'fs'
import {
  CSV_RAW_PRODUCTS_FILEPATH,
  RAW_PRODUCTS_FILEPATH,
} from './commercetools/config'
import { getArrayOrString, saveJsonFile } from './commercetools/utils/files'
import { forEach, startsWith } from 'lodash'

const variantObjectCreator = (
  variantArray: string[],
  variantSpecifier: string,
  finalObject = [] as any
) => {
  forEach(variantArray, (value, key) => {
    if (!finalObject[key]) {
      finalObject[key] = {}
    }
    finalObject[key][variantSpecifier] = value
  })
}
export const transformCsvToJson = (csvFilePath: string, jsonPath: string) => {
  const commerceData = [] as any
  fs.createReadStream(csvFilePath)
    .pipe(parse({ delimiter: ',', columns: true, skip_empty_lines: true }))
    .on('data', (chunk) => {
      const lowercaseChunk: { [key: string]: any } = {}
      const variant = [] as any
      for (const key in chunk) {
        const lowercaseKey = key.toLowerCase()
        if (!startsWith(lowercaseKey, 'variant')) {
          lowercaseChunk[lowercaseKey] = chunk[key]
          continue
        }
        const shrinkedKey = lowercaseKey.replace('variant', '')
        variantObjectCreator(chunk[key].split(','), shrinkedKey, variant)
      }
      lowercaseChunk.images = lowercaseChunk.images
        ? getArrayOrString(lowercaseChunk.images)
        : []
      lowercaseChunk.seller = getArrayOrString(lowercaseChunk.seller)
      lowercaseChunk.variants = variant
      commerceData.push(lowercaseChunk)
    })
    .on('end', () => {
      saveJsonFile(jsonPath, commerceData)
    })
}

transformCsvToJson(CSV_RAW_PRODUCTS_FILEPATH, RAW_PRODUCTS_FILEPATH)
