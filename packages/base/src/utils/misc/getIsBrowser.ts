export const getIsBrowser = () => {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined'
}
