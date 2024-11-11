import { Text } from '@chakra-ui/react'
import { Section } from '@oriuminc/ui'

interface SuccessSectionProps {
  title: string
  children: React.ReactNode
}

export const SuccessSection = ({ title, children }: SuccessSectionProps) => {
  return (
    <Section
      headerProps={{
        title: <Text fontWeight='extrabold'>{title}</Text>,
      }}
      boxProps={{
        width: '100%',
        py: { base: 'md', lg: 10 },
        px: { base: 'sm', lg: 10 },
      }}
    >
      {children}
    </Section>
  )
}
