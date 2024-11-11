import { FlexProps } from '@chakra-ui/react'

import { useInfiniteHits } from 'react-instantsearch'

import { FunctionComponent } from 'react'
import { ItemCount as ItemCountShared } from '../../../../product-listing-shared'

export const ItemCount: FunctionComponent<FlexProps> = (props) => {
  const { results } = useInfiniteHits()

  return <ItemCountShared total={results?.nbHits} {...props} />
}
