import { useContentfulContentPage, useContentfulSiteConfig } from '../hooks'
import { CmsPageComponentProps, getSiteUrl } from '@oriuminc/base'
import { BRAND_NAME, HOME_PAGE } from '../constants'
import { ContentItems } from '../components/render-content'
import { VisuallyHidden } from '@chakra-ui/react'
import { MetaData } from '@oriuminc/templates/general'
import { OrganizationJsonLd, SiteLinksSearchBoxJsonLd } from 'next-seo'

export const ContentfulContentPage = ({
  ProductsConnector,
  useCtConnector,
  NoMatchPage,
  slug,
}: CmsPageComponentProps) => {
  const { data, isNoMatch } = useContentfulContentPage(slug || HOME_PAGE)
  const siteConfig = useContentfulSiteConfig(BRAND_NAME)
  const isHomePage = !Boolean(slug)

  if (isNoMatch) {
    return <NoMatchPage />
  }

  return (
    <>
      <MetaData page={data ?? undefined} />
      {isHomePage && (
        <SiteLinksSearchBoxJsonLd
          url={getSiteUrl()}
          potentialActions={[
            {
              target: `${getSiteUrl()}\/search?query`,
              queryInput: 'search_term_string',
            },
          ]}
        />
      )}

      <OrganizationJsonLd
        name={siteConfig?.data?.name ?? ''}
        url={getSiteUrl()}
        logo={siteConfig?.data?.brandLogo?.url ?? ''}
      />

      <VisuallyHidden>
        <h1>{data?.pageTitle}</h1>
      </VisuallyHidden>

      {ContentItems({
        content: data?.content ?? [],
        ProductsConnector,
        useCtConnector,
      })}
    </>
  )
}
