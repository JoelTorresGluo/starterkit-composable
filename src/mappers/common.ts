import { Entry } from 'contentful'
import { formatImageField, isImageField } from './assets'
import { isRichTextField } from './rich-text'
import { contentfulRichTextContentToComposableRichTextHtml } from '../utils/sdk-utils/rich-text'

export const formatComponentFields = (fields: Entry['fields']) => {
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => {
      if (isImageField(value)) return [key, formatImageField(value.fields)]
      if (isRichTextField(value)) {
        return [key, contentfulRichTextContentToComposableRichTextHtml(value)]
      }
      return [key, value]
    })
  )
}
