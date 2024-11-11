import storesJson from '../../mock-data/stores.json'
import React, { useEffect } from 'react'
import { useStores } from '../../hooks/use-stores'
export const StaticProvider = (props: { children: React.ReactElement }) => {
  const { setStores } = useStores()

  useEffect(() => {
    setStores(storesJson)
  }, [setStores])

  return props.children
}
