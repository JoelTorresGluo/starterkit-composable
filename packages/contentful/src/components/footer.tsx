import { SimpleGrid, useBreakpointValue } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { useContentfulMegaMenu } from '../hooks'
import { useComposable } from '@oriuminc/base'
import {
  AccordionStack,
  BrandLogo,
  Footer as UiFooter,
  LinkStack,
} from '@oriuminc/ui'
import { formatMegaMenuItem } from '../utils'

export const Footer = (props: { megaMenuId: string }) => {
  const intl = useIntl()
  const { path, siteConfig } = useComposable()
  const { data } = useContentfulMegaMenu(props.megaMenuId)
  const isMobile = useBreakpointValue({ base: true, md: false })
  const headerLogo = siteConfig?.brandLogo

  return (
    <UiFooter
      homeUrl={path.getHome()}
      brandLogo={
        headerLogo && (
          <BrandLogo
            src={headerLogo.url}
            alt={siteConfig.name ?? ''}
            height={40}
            width={100}
          />
        )
      }
      tagline={intl.formatMessage({ id: 'footer.info.tagline' })}
      copyrightText={intl.formatMessage(
        { id: 'footer.info.copyright' },
        { year: new Date().getFullYear() }
      )}
    >
      {data?.items?.map((item) => {
        if (!item) return null

        if (isMobile) {
          return (
            <AccordionStack key={item.id} itemData={formatMegaMenuItem(item)} />
          )
        }
        return (
          <SimpleGrid
            key={item.id}
            w={{ base: 'full', lg: 'auto' }}
            columns={{ base: 2, md: 4 }}
            gap='8'
          >
            <LinkStack
              key={`${item.id}-link`}
              itemData={formatMegaMenuItem(item)}
              level={1}
            />
          </SimpleGrid>
        )
      })}
    </UiFooter>
  )
}
