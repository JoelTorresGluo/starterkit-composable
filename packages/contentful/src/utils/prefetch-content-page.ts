import { ComposableContentPage } from '@oriuminc/cms-generic'
import { QueryClient } from '@tanstack/react-query'
import { HOME_PAGE } from '../constants'
import { getContentfulContentPageKey } from '../hooks'
import { contentfulContentPageToComposableContentPage } from '../mappers'
import {
  contentfulContentPageFetchService,
  initContentfulClient,
} from '../services'

export const prefetchContentPage = async ({
  slug,
  locale,
  queryClient,
  isPreview = false,
}: {
  slug?: string
  locale: string
  isPreview?: boolean
  queryClient: QueryClient
}): Promise<ComposableContentPage | null> => {
  const _slug = slug || HOME_PAGE
  const _locale = locale || ''

  const page = await contentfulContentPageFetchService({
    client: initContentfulClient({ isPreview }),
    slug: _slug,
    locale: _locale,
  }).then((resp) => contentfulContentPageToComposableContentPage(resp))

  await queryClient.prefetchQuery(
    getContentfulContentPageKey(_slug, _locale),
    () => page
  )

  return page
}
