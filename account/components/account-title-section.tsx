import { Text, VStack } from '@chakra-ui/react'

export interface TitleSectionProps {
  type: 'page' | 'drawer'
  title: string
  description: string
}

export const TitleSection = ({
  type,
  title,
  description,
}: TitleSectionProps) => {
  return (
    <>
      {type === 'page' ? (
        <VStack>
          <Text
            as='h3'
            textStyle={{ base: 'mobile-300', md: 'desktop-400' }}
            alignSelf='center'
          >
            {title}
          </Text>
          <Text textStyle='blockquote-75' alignSelf='center' textAlign='center'>
            {description}
          </Text>
        </VStack>
      ) : (
        <VStack alignItems='flex-start' spacing='0'>
          <Text as='h3' textStyle='heading-200' mb='2'>
            {title}
          </Text>
          <Text textStyle='body-75'>{description}</Text>
        </VStack>
      )}
    </>
  )
}
