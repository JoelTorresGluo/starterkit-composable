import { Badge as ChakraBadge } from '@chakra-ui/react'

export interface BadgeProps {
  value: string
  variant: BadgeVariants
}

export type BadgeVariants = 'solid' | 'subtle' | 'outline'

export const Badge = ({ value, variant = 'solid' }: BadgeProps) => {
  return <ChakraBadge variant={variant}>{value}</ChakraBadge>
}
