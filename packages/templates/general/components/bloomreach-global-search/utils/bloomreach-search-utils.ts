import { symlink } from 'fs'
import {
  HitItem,
  RecentSearchItem,
  SearchItemType,
  SuggestionItem,
} from '../shared/types'
import {
  BloomreachProductList,
  BloomreachSearchSuggestResponse,
} from './bloomreachClient'

export function parseSearchBarItems(
  searchSuggestion: BloomreachSearchSuggestResponse,
  searhQuickResults: BloomreachProductList[],
  recentSearch: { id: string; label: string }[]
): {
  suggestionList: SuggestionItem[]
  hitList: HitItem[]
  recentSearchList: RecentSearchItem[]
} {
  let suggestionList: SuggestionItem[] = searchSuggestion?.suggestionGroups
    ?.reduce(
      (p, c) => [
        ...p,
        ...c.querySuggestions.map((el) => ({
          ...el,
          catalogName: c.catalogName,
          view: c.view,
        })),
      ],
      [] as any[]
    )
    .map((item) => ({
      index: 0,
      label: item.displayText ?? item.query ?? '',
      type: SearchItemType.SuggestionItem,
    }))

  let hitList: HitItem[] = searhQuickResults?.map?.(
    ({ pid, title, thumb_image, url, ...el }) => ({
      pId: pid,
      index: 0,
      thumb_image,
      label: title,
      slug: url,
      type: SearchItemType.HitItem,
      ...el,
    })
  )

  let recentSearchList: RecentSearchItem[] = recentSearch.map((item) => ({
    index: 0,
    id: item.id,
    label: item.label,
    type: SearchItemType.RecentSearchItem,
  }))
  let index = 0

  suggestionList = (suggestionList ?? []).map((el) => ({
    ...el,
    index: index++,
  }))
  hitList = (hitList ?? []).map((el) => ({ ...el, index: index++ }))
  recentSearchList = (recentSearchList ?? []).map((el) => ({
    ...el,
    index: index++,
  }))

  return {
    suggestionList,
    hitList,
    recentSearchList,
  }
}
