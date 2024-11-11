import { useMemo } from 'react'
import { useBreakpointValue, useTheme } from '@chakra-ui/react'

export const useDataUrls = () => {
  const theme = useTheme()
  const primaryColor = theme.colors.primary['500'].replace('#', '%23')
  const secondaryColor = theme.colors.secondary['700'].replace('#', '%23')

  const getUser = (height = 40) => {
    const color = '%233182CE'
    return `data:image/svg+xml;charset=UTF-8, %3csvg height='${height}' viewBox='0 0 39 39' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='19.5679' cy='19.5' r='16' fill='${color}' stroke='white' stroke-width='6'/%3e%3c/svg%3e`
  }

  const getDefault = (height = 50) => {
    return `data:image/svg+xml;charset=UTF-8, %3csvg height='${height}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 33 49'%3e%3cpath d='M32.5 16.5c0 13.33-16 32-16 32s-16-18.67-16-32c0-4.24 1.69-8.31 4.69-11.31 3-3 7.07-4.69 11.31-4.69s8.31 1.69 11.31 4.69c3 3 4.69 7.07 4.69 11.31Z' style='fill:${primaryColor};stroke:%23fff;stroke-linejoin:round'/%3e%3c/svg%3e`
  }

  const getBookmark = (height = 50) => {
    return `data:image/svg+xml;charset=UTF-8, %3csvg height='${height}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 33 49'%3e%3cpath d='M32.5 16.5c0 13.33-16 32-16 32s-16-18.67-16-32c0-4.24 1.69-8.31 4.69-11.31 3-3 7.07-4.69 11.31-4.69s8.31 1.69 11.31 4.69c3 3 4.69 7.07 4.69 11.31Z' style='fill:${primaryColor};stroke:%23fff;stroke-linejoin:round'/%3e%3cpath d='M20.81 23.5c-.11 0-.21-.03-.29-.09L16.5 20.5l-4.02 2.91c-.09.06-.19.1-.3.1-.11 0-.21-.03-.29-.1a.452.452 0 0 1-.18-.25.545.545 0 0 1 0-.31l1.57-4.64-4.06-2.79a.525.525 0 0 1-.19-.25.415.415 0 0 1 0-.31c.03-.1.09-.19.18-.25s.19-.1.3-.1h5.01l1.51-4.65a.507.507 0 0 1 .47-.35c.1 0 .21.03.29.1.09.06.15.15.18.25l1.51 4.66h5.01c.11 0 .21.03.3.1.09.06.15.15.18.25s.03.21 0 .31c-.04.1-.1.19-.19.25l-4.06 2.78 1.57 4.64c.03.08.03.16.02.23-.01.08-.04.15-.09.22-.05.06-.11.12-.18.15-.07.04-.15.06-.23.06Z' style='fill:%23fff'/%3e%3c/svg%3e`
  }

  const getHome = (height = 50) => {
    return `data:image/svg+xml;charset=UTF-8, %3csvg height='${height}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 33 49'%3e%3cpath d='M32.5 16.5c0 13.33-16 32-16 32s-16-18.67-16-32c0-4.24 1.69-8.31 4.69-11.31 3-3 7.07-4.69 11.31-4.69s8.31 1.69 11.31 4.69c3 3 4.69 7.07 4.69 11.31Z' style='fill:${primaryColor};stroke:%23fff;stroke-linejoin:round'/%3e%3cpath d='M16.67 11.66s-.11-.07-.17-.07-.13.02-.17.07l-5.75 5.5s-.04.05-.06.08c-.01.03-.02.06-.02.1v5.16a.99.99 0 0 0 1 1h3c.13 0 .26-.05.35-.15A.51.51 0 0 0 15 23v-4.25c0-.07.03-.13.07-.18s.11-.07.18-.07h2.5c.07 0 .13.03.18.07.05.05.07.11.07.18V23c0 .13.05.26.15.35s.22.15.35.15h3c.27 0 .52-.11.71-.29s.29-.44.29-.71v-5.16s0-.07-.02-.1-.03-.06-.06-.08l-5.75-5.5Z' fill='%23fff' /%3e%3cpath d='m23.84 16.13-2.34-2.24V10.5a.47.47 0 0 0-.15-.35A.51.51 0 0 0 21 10h-1.5c-.13 0-.26.05-.35.15s-.15.22-.15.35v1l-1.81-1.73c-.17-.17-.42-.27-.69-.27s-.52.1-.69.27l-6.65 6.36c-.19.19-.22.5-.04.7.04.05.1.09.16.12s.13.05.2.05.14 0 .2-.03c.06-.02.12-.06.17-.11l6.48-6.2s.11-.07.17-.07.13.02.17.07l6.49 6.2a.51.51 0 0 0 .71-.01c.19-.2.18-.53-.02-.72Z' fill='%23fff'/%3e%3c/svg%3e`
  }

  const mapMarkerIcon = useBreakpointValue(
    [
      {
        user: getUser(26),
        default: getDefault(38),
        bookmarks: getBookmark(38),
        home: getHome(38),
      },
      null,
      null,
      {
        user: getUser(40),
        default: getDefault(50),
        bookmarks: getBookmark(50),
        home: getHome(50),
      },
    ],
    {
      ssr: false,
    }
  )

  const mapMarkerUser = mapMarkerIcon?.user
  const mapMarkerDefault = mapMarkerIcon?.default
  const mapMarkerBookmarks = mapMarkerIcon?.bookmarks
  const mapMarkerHome = mapMarkerIcon?.home

  return useMemo(() => {
    return {
      getBookmarkIcon: (fill?: boolean) => {
        const _fill = fill ? secondaryColor : 'none'
        const _stroke = fill ? secondaryColor : '%23111111'
        const bookmarkIcon = `data:image/svg+xml;charset=UTF-8, %3csvg width='19' height='17' viewBox='0 0 19 17' fill='${_fill}' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M17.3916 6.8125H11.3447L9.5166 1.1875L7.68848 6.8125H1.6416L6.56348 10.1875L4.66504 15.8125L9.5166 12.2969L14.3682 15.8125L12.4697 10.1875L17.3916 6.8125Z' stroke='${_stroke}' stroke-width='1.5' stroke-linejoin='round'/%3e%3c/svg%3e`
        return bookmarkIcon
      },
      getMapMarkerIcon: (
        variant: 'default' | 'bookmarks' | 'home' | 'user' = 'default'
      ) => {
        switch (variant) {
          case 'default':
            return mapMarkerDefault ?? ''
          case 'bookmarks':
            return mapMarkerBookmarks ?? ''
          case 'user':
            return mapMarkerUser ?? ''
          case 'home':
            return mapMarkerHome ?? ''
          default:
            return mapMarkerDefault ?? ''
        }
      },
    }
  }, [
    secondaryColor,
    mapMarkerDefault,
    mapMarkerBookmarks,
    mapMarkerUser,
    mapMarkerHome,
  ])
}
