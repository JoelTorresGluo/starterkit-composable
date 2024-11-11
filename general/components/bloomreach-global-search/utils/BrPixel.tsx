'use client'

/*
 * Copyright 2021-2024 Bloomreach
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { BrPixelProps } from '../shared/types'
import {
  BLOOMREACH_ACCOUNT_ID,
  generateBloomreachCatalogName,
} from '../shared/constants'
import { useIntl } from 'react-intl'

export function BrPixel(props: BrPixelProps): React.ReactElement | null {
  const setCookie = useCookies(['_br_uid_2'])[1]
  const { locale } = useIntl()

  const accountId = BLOOMREACH_ACCOUNT_ID
  const catalogName = accountId
    ? generateBloomreachCatalogName(locale)
    : 'badconfig'

  useEffect(() => {
    try {
      if (accountId && typeof window !== 'undefined') {
        ;(window as any).br_data = {
          acct_id: `${accountId}`,
          ptype: `${props.pageType}`,
          search_term: `${props.searchTerm ?? ''}`,
          user_id: '',
          cat_id: `${props.categoryId ?? ''}`,
          cat: `${props.categoryId ?? ''}`,
          view_id: `${props.viewId ?? ''}`,
          type: `${props.type ?? ''}`,
          title: `${props.title ?? ''}`,
          tms: '',
          test_data: false,
          prod_id: `${props.prodId ?? ''}`,
          prod_name: `${props.prodName ?? ''}`,
          sku: `${props.sku ?? ''}`,
        }
        ;(window as any).br_data.domain_key = catalogName

        const brtrk = document.createElement('script')
        brtrk.type = 'text/javascript'
        brtrk.async = true
        brtrk.src = `//cdns.brsrvr.com/v1/br-trk-${accountId}.js`
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
          `BrPixel: Accound id error ${accountId} and error window ${typeof window}`
        )
      }
    } catch (error) {
      console.error('BrPixel: Error occurred:', error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId, catalogName])

  return <>{/*BrPixel display*/}</>
}
