export const handleTimeout = (
  callback: Function,
  timeoutTime: number = 5000
) => {
  const timeout = setTimeout(() => {
    callback()
  }, timeoutTime)
  return () => clearTimeout(timeout)
}
