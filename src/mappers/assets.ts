import { Asset } from 'contentful'
import { ImageField } from '@oriuminc/cms-generic'

export const isImageField = (target: Asset) => {
  return target && typeof target === 'object' && target.sys?.type === 'Asset'
}

export const formatImageField = (fields: any): ImageField => {
  return {
    title: fields?.title ?? '',
    description: fields?.description ?? '',
    url: fields?.file?.url ? 'https:' + fields?.file?.url : '',
  }
}
