export const getPathnameFromAsPath = (asPath: string): string => {
  const path = asPath.split('#')[0].split('?')[0]
  return path
}
