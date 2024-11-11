import {
  ComponentValidationError,
  ComponentWithNestedContent,
  ComposableContentPage,
  ComposablePageComponent,
  ComposableProductListingPage,
  ComposableProductPage,
  PageContentField,
  PaginatedResponse,
  validateComponentSchema,
} from '@oriuminc/cms-generic'
import { Asset, Entry } from 'contentful'
import {
  ContentfulSdkContentPageResponse,
  ContentfulSdkProductListingPageResponse,
  ContentfulSdkProductPageResponse,
} from '../types'
import { formatImageField } from './assets'
import { formatComponentFields } from './common'
import { parseContentfulPageComponent } from './components'

export const contentfulContentPagesToComposableContentPages = (
  rawResults: ContentfulSdkContentPageResponse
): PaginatedResponse<ComposableContentPage> => {
  const items = rawResults.items
  return {
    results: items.map((item) => ({
      ...item.fields,
      openGraphImages: item.fields.openGraphImages?.map((image) =>
        formatImageField((image as Asset).fields)
      ),
      content: item.fields.content?.map((c) => formatComponent(c as Entry)),
    })),
    paging: {
      total: rawResults.total,
      limit: rawResults.limit,
      offset: rawResults.skip,
    },
  }
}

export const contentfulContentPageToComposableContentPage = (
  rawPageData: ContentfulSdkContentPageResponse
): ComposableContentPage | null => {
  const fields = rawPageData.items[0]?.fields
  if (!fields || !Object.entries(fields).length) return null
  return {
    ...fields,
    openGraphImages: fields.openGraphImages?.map((image) =>
      formatImageField((image as Asset).fields)
    ),
    content: fields.content?.map((c) => formatComponent(c as Entry)),
  }
}

export const contentfulProductListingPageToComposableProductListingPage = (
  rawPageData: ContentfulSdkProductListingPageResponse
): ComposableProductListingPage | null => {
  const fields = rawPageData.items[0]?.fields
  if (!fields || !Object.entries(fields).length) return null
  return {
    ...fields,
    openGraphImages: fields.openGraphImages?.map((image) =>
      formatImageField((image as Asset).fields)
    ),
    headerContent: fields.headerContent?.map((c) =>
      formatComponent(c as Entry)
    ),
    footerContent: fields.footerContent?.map((c) =>
      formatComponent(c as Entry)
    ),
  }
}

export const contentfulProductPageToComposableProductPage = (
  rawPageData: ContentfulSdkProductPageResponse
): ComposableProductPage | null => {
  const fields = rawPageData.items[0]?.fields
  if (!fields || !Object.entries(fields).length) return null
  return {
    ...fields,
    headerContent: fields.headerContent?.map((c) =>
      formatComponent(c as Entry)
    ),
    footerContent: fields.footerContent?.map((c) =>
      formatComponent(c as Entry)
    ),
  }
}

const formatComponent = (entry: Entry): PageContentField[number] | null => {
  const contentType = entry?.sys.contentType?.sys
    .id as ComposablePageComponent['contentType']
  if (!contentType) return null
  try {
    switch (contentType) {
      case 'componentGrid':
        return formatWithNestedContent(entry, contentType)
      default:
        return formatPageContent(entry, contentType)
    }
  } catch (e) {
    if (e instanceof ComponentValidationError) {
      return {
        ...formatComponentFields(entry.fields),
        contentType,
        id: entry.sys.id,
        _errors_: e.issues.map(
          (issue) => `${issue.path.join('.')}: ${issue.message}`
        ),
      } as unknown as ComposablePageComponent
    } else {
      return {
        contentType,
        id: entry.sys.id,
        _errors_: [(e as Error)?.message ?? 'Unknown error in component'],
      } as unknown as ComposablePageComponent
    }
  }
}

const formatPageContent = (
  entry: Entry,
  contentType: ComposablePageComponent['contentType']
): ComposablePageComponent => {
  const component = parseContentfulPageComponent({ entry, contentType })
  return validateComponentSchema(
    {
      ...formatComponentFields(component.fields),
      contentType,
      id: entry.sys.id,
    },
    contentType
  )
}

const formatWithNestedContent = (
  entry: Entry,
  contentType: ComponentWithNestedContent['contentType']
): ComponentWithNestedContent => {
  const fields = formatComponentFields(entry.fields)
  return {
    ...fields,
    contentType,
    id: entry.sys.id,
    content: fields.content?.map((c: any) => formatComponent(c)),
  } as ComponentWithNestedContent
}
