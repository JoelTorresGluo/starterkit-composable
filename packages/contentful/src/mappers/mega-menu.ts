import { Entry } from 'contentful'
import { ContentfulSdkMegaMenuResponse } from '../types'
import { formatComponentFields } from './common'
import { formatImageField } from './assets'
import {
  ComposableMegaMenu,
  ComposableMegaMenuItem,
  MegaMenuItemSchema,
} from '@oriuminc/cms-generic'

export const contentfulMegaMenuToComposableMegaMenu = (
  rawMegaMenuData: ContentfulSdkMegaMenuResponse
): ComposableMegaMenu | null => {
  const fields = rawMegaMenuData.items[0]?.fields
  if (!fields || !Object.entries(fields).length) return null
  return {
    ...fields,
    items: fields.items.map((item) => formatItem(item as Entry)),
  }
}

const formatItem = (entry: Entry): ComposableMegaMenuItem | null => {
  const entryType = entry?.sys.contentType?.sys.id
  if (!entryType) return null
  try {
    switch (entryType) {
      case 'megaMenuItem':
        const fields = formatComponentFields(entry.fields)
        return MegaMenuItemSchema.parse({
          ...fields,
          images:
            fields.images?.map((img: any) => formatImageField(img.fields)) ??
            [],
          children: fields.children?.map((c: any) => formatItem(c)) ?? [],
          contentType: entryType,
          id: entry.sys.id,
        })
    }
  } catch (ignored) {}
  return null
}
