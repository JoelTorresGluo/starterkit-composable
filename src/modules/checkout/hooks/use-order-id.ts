import { atom, useAtom } from 'jotai'

const orderIdAtom = atom<string>('')

export function useOrderId() {
  const [orderId, setOrderId] = useAtom(orderIdAtom)
  return {
    orderId,
    setOrderId,
  }
}
