import Image from 'next/image'
import { Box, Container, SimpleGrid, Text, LinkProps } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { MegaMenuItemProps } from './MegaMenuItem'

export const MegaMenuContentThumbnails = (props: {
  data?: (MegaMenuItemProps | null | undefined)[]
  linkProps?: LinkProps
  prefetchChildNavs: boolean | undefined
}) => {
  return (
    <Container p='10' maxW='container.lg'>
      <SimpleGrid w='full' columns={4} spacing='10'>
        {props.data?.map((el, idx) => {
          const { id, label, href, description, imageSrc } = el ?? {}
          if (!href) return null
          return (
            <Box key={`${id}-${idx}`}>
              <Link
                href={href}
                py='1'
                tabIndex={0}
                display='block'
                textAlign='center'
                _hover={{ textDecoration: 'none' }}
                prefetch={props.prefetchChildNavs}
                {...props.linkProps}
              >
                <Box
                  // TODO: Replace pixel values with tokens.
                  w='120px'
                  h='80px'
                  position='relative'
                  borderRadius='base'
                  overflow='hidden'
                  mx='auto'
                  mb='3'
                >
                  {imageSrc && (
                    <Image
                      src={imageSrc}
                      alt=''
                      fill={true}
                      style={{ objectFit: 'contain' }}
                    />
                  )}
                </Box>
                <Text fontWeight='bold' color='gray.600'>
                  {label}
                </Text>
                <Text fontSize='sm' color='gray.500'>
                  {description}
                </Text>
              </Link>
            </Box>
          )
        })}
      </SimpleGrid>
    </Container>
  )
}
