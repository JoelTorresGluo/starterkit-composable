import Image from 'next/image'
import NextLink from 'next/link'
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Container,
} from '@chakra-ui/react'

export interface HeroProps {
  title?: string
  description?: string
  imageUrl?: string
  imageAlt?: string
  ctaUrl?: string
  ctaLabel?: string
}

export const Hero = ({
  title,
  description,
  imageUrl,
  imageAlt,
  ctaUrl,
  ctaLabel,
}: HeroProps) => {
  return (
    <Box
      bg='gray.800'
      as='section'
      // TODO: Replace pixel value with token.
      minH='140px'
      position='relative'
    >
      <Box py='32' position='relative' zIndex={1} px={{ base: 6, md: 8 }}>
        <Container color='white' maxW='container.2xl' mx='auto'>
          <Box maxW='container.2xl'>
            <Heading as='h1' size='3xl' fontWeight='extrabold'>
              {title}
            </Heading>
            {description && (
              <Text fontSize={{ md: '2xl' }} mt='4' maxW='container.lg'>
                {description}
              </Text>
            )}
            <Stack
              direction={{ base: 'column', md: 'row' }}
              mt='10'
              spacing='4'
            >
              {ctaUrl && ctaLabel && (
                <Button
                  as={NextLink}
                  href={ctaUrl}
                  colorScheme='blue'
                  px='8'
                  rounded='base'
                  size='lg'
                  fontSize='sm'
                  fontWeight='bold'
                >
                  {ctaLabel}
                </Button>
              )}
            </Stack>
          </Box>
        </Container>
      </Box>
      <Flex
        position='absolute'
        inset='none'
        boxSize='full'
        overflow='hidden'
        align='center'
      >
        <Box position='relative' boxSize='full'>
          <Box boxSize='full' objectPosition='top bottom' position='absolute'>
            {imageUrl && (
              <Image alt={imageAlt || ''} src={imageUrl} fill={true} />
            )}
          </Box>
          <Box position='absolute' boxSize='full' bg='blackAlpha.600' />
        </Box>
      </Flex>
    </Box>
  )
}
