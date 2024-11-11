'use client'

import { useIntl } from 'react-intl'
import { SimpleGrid, useBreakpointValue } from '@chakra-ui/react'

import { ComposableSiteConfig } from '@oriuminc/base'
import { ComposableMegaMenu } from '@oriuminc/cms-generic'
import {
  AccordionStack,
  BrandLogo,
  LinkStack,
  Footer as UiFooter,
} from '@oriuminc/ui'

import { PREFETCH_FOOTER_NAV_LINKS } from '@modules/general'
import { composableMegaMenuItemToMegaMenuItemProps } from '../utils'

export const Footer = ({
  siteConfig,
  footer,
}: {
  siteConfig?: ComposableSiteConfig | null
  footer?: ComposableMegaMenu | null
}) => {
  const intl = useIntl()

  const isMobile = useBreakpointValue(
    { base: true, md: false },
    // @ts-ignore
    { fallback: false }
  )

  return (
    <UiFooter
      homeUrl='/'
      brandLogo={
        siteConfig?.brandLogo && (
          <BrandLogo
            src={siteConfig?.brandLogo.url}
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
      {footer?.items?.map((item, idx) => {
        if (!item) return null
        const itemData = composableMegaMenuItemToMegaMenuItemProps(item)
        if (isMobile) {
          return (
            <AccordionStack key={`${idx}-${itemData.id}`} itemData={itemData} />
          )
        }
        return (
          <SimpleGrid
            key={`${idx}-${itemData.id}`}
            width={{ base: 'full', lg: 'auto' }}
            columns={{ base: 2, md: 4 }}
            gap='8'
          >
            <LinkStack
              key={`${idx}-${itemData.id}-link`}
              itemData={itemData}
              level={1}
              prefetch={PREFETCH_FOOTER_NAV_LINKS}
            />
          </SimpleGrid>
        )
      })}
    </UiFooter>
  )
}
