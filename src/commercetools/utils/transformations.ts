import jpeg, { BufferLike } from 'jpeg-js'
import { currentLangs } from './settings'

export const localize = (data: string) => {
  return currentLangs.reduce((prev, cur) => {
    return { ...prev, [cur]: data }
  }, {})
}

export const convertJpgToJpeg = (stream: BufferLike) => {
  return jpeg.decode(stream, {
    tolerantDecoding: true,
    useTArray: true,
  })
}
