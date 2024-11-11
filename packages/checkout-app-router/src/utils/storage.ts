export const getStorageKey = ({
  prefix,
  userId,
  cartId,
}: {
  prefix: string
  userId: string
  cartId: string
}) => {
  return `${prefix}-${userId}-${cartId}`
}
