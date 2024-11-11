import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { BrPixelProps } from '../shared/types'
import {
  BLOOMREACH_ACCOUNT_ID,
  generateBloomreachCatalogName,
} from '../shared/constants'
import { useIntl } from 'react-intl'

export const useBrPixel = (props: BrPixelProps) => {
  // eslint-disable-next-line prefer-destructuring
  const setCookie = useCookies(['_br_uid_2'])[1]
  const [searchTerm, setBrPixelSearchTerm] = useState<string>(
    props.searchTerm || ''
  )
  const [category, setBrPixelCategory] = useState<string>(
    props.categoryId || ''
  )
  const { locale } = useIntl()

  const domainKey = generateBloomreachCatalogName(locale)

  useEffect(() => {
    try {
      if (BLOOMREACH_ACCOUNT_ID && typeof window !== 'undefined') {
        ;(window as any).br_data = {
          acct_id: `${BLOOMREACH_ACCOUNT_ID}`,
          ptype: `${props.pageType || ''}`,
          search_term: `${searchTerm}`,
          cat_id: `${category}`,
          user_id: '',
          cat: `${category ? `Home|${category}` : 'Home'}`,
          view_id: `${props.viewId ?? ''}`,
          type: `${props.type ?? ''}`,
          title: `${props.title ?? ''}`,
          tms: '',
          test_data: false,
        }
        if (domainKey && domainKey.trim() !== '') {
          ;(window as any).br_data.domain_key = `${domainKey}`
        } else {
          console.error(`BrPixel: Error with the domainKey: ${domainKey}`)
        }

        const brtrk = document.createElement('script')
        brtrk.type = 'text/javascript'
        brtrk.async = true
        brtrk.src = `//cdns.brsrvr.com/v1/br-trk-${BLOOMREACH_ACCOUNT_ID}.js`
        // Update react cookie with the latest value
        brtrk.addEventListener('load', () => {
          const brUid2 = document.cookie
            .split('; ')
            .find((cookie) => cookie.trim().startsWith('_br_uid_2='))
            ?.split('=')[1]
          setCookie('_br_uid_2', brUid2, { path: '/' })
        })
        // eslint-disable-next-line prefer-destructuring
        const s = document.getElementsByTagName('script')[0]
        if (s && s.parentNode) {
          s.parentNode?.insertBefore(brtrk, s)
        } else {
          document.body.appendChild(brtrk)
        }
      } else {
        console.error(
          `BrPixel: Accound id error ${BLOOMREACH_ACCOUNT_ID} and error window ${typeof window}`
        )
      }
    } catch (error) {
      console.error('BrPixel: Error occurred:', error)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, category])

  return { setBrPixelSearchTerm, setBrPixelCategory }
}
