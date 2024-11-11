export const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME ?? ''
const PREFIX = BRAND_NAME ? `${BRAND_NAME}/` : ''

export const HOME_PAGE = `${PREFIX}homepage`

export const MEGA_MENU_ID = {
  MAIN_NAV: `${PREFIX}mega-menu-nav`,
  FOOTER: `${PREFIX}mega-menu-footer`,
} as const

export const ITEM_LIMIT = 150
export const ONE_HOUR = 1000 * 60 * 60
export const ONE_DAY = 1000 * 60 * 60 * 24
export const ONE_WEEK = 1000 * 60 * 60 * 24 * 7

export const CLOSE_PREVIEW_MODE_PATH = `/api/contentful/exit-preview`
