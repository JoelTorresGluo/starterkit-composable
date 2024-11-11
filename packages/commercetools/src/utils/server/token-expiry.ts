export const expiresAtMs = (expiresInSeconds: number) => {
  const expiresInMs = expiresInSeconds * 1000
  return Date.now() + expiresInMs
}
