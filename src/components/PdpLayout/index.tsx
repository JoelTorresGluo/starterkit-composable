import {
  Badge,
  Box,
  Container,
  ContainerProps,
  Heading,
  Skeleton,
  SkeletonText,
  Stack,
  StackProps,
  Text,
} from '@chakra-ui/react'

export type SectionOptions =
  | 'accordion'
  | 'brand'
  | 'description'
  | 'main'
  | 'price'
  | 'title'
  | 'badges'
export interface PdpLayoutProps {
  aside: React.ReactElement
  description: string
  isLoaded: boolean
  main: React.ReactElement
  price: React.ReactElement
  title: string
  accordion?: React.ReactElement
  brand?: string | React.ReactElement
  mainStackProps?: StackProps
  rootProps?: ContainerProps
  sectionOrder?: SectionOptions[]
  stackProps?: StackProps
  lowStockLabel?: string
  hasLowStock?: boolean
}

const accordionSection = (accordion: React.ReactElement, isLoaded: boolean) => (
  <SkeletonText isLoaded={isLoaded}>{accordion}</SkeletonText>
)
const brandSection = (
  brand: string | React.ReactElement,
  isLoaded: boolean
) => (
  <SkeletonText textStyle='eyebrow' isLoaded={isLoaded}>
    {brand}
  </SkeletonText>
)
const descriptionSection = (description: string, isLoaded: boolean) => (
  <SkeletonText isLoaded={isLoaded}>
    <Text textStyle='body-75' color='text'>
      {description}
    </Text>
  </SkeletonText>
)
const priceSection = (price: React.ReactElement, isLoaded: boolean) => (
  <SkeletonText isLoaded={isLoaded} textStyle='heading-200'>
    {price}
  </SkeletonText>
)
const titleSection = (title: string, isLoaded: boolean) => (
  <Skeleton isLoaded={isLoaded}>
    <Heading
      as='h1'
      textStyle='heading-400'
      fontSize={{ base: 'xl', lg: '4xl' }}
      fontWeight='bold'
    >
      {title}
    </Heading>
  </Skeleton>
)

const badgesSection = (
  lowStockLabel: string,
  hasLowStock: boolean,
  isLoaded: boolean
) => (
  <Skeleton isLoaded={isLoaded}>
    {hasLowStock && (
      <Badge
        // TODO: Replace rem value with token.
        // Also font-size is an odd value.
        fontSize='0.7rem'
        variant='outline'
        colorScheme='gray'
        color='gray'
      >
        {lowStockLabel}
      </Badge>
    )}
  </Skeleton>
)

export const PdpLayout = ({
  brand,
  title,
  description,
  price,
  main,
  aside,
  isLoaded,
  accordion,
  rootProps,
  stackProps,
  mainStackProps,
  lowStockLabel,
  hasLowStock = false,
  sectionOrder = [
    'brand',
    'title',
    'price',
    'description',
    'main',
    'accordion',
  ],
}: PdpLayoutProps) => {
  const sectionMap = {
    brand: brand && brandSection(brand, isLoaded),
    title: titleSection(title, isLoaded),
    price: priceSection(price, isLoaded),
    badges:
      !!lowStockLabel && badgesSection(lowStockLabel, hasLowStock, isLoaded),
    description: descriptionSection(description, isLoaded),
    main: isLoaded && main,
    accordion: accordion && accordionSection(accordion, isLoaded),
  }

  return (
    <Box px={{ base: 2, md: 4 }}>
      <Container
        maxW='container.2xl'
        mx='auto'
        py={{ base: '6', md: '8', lg: '12' }}
        {...rootProps}
      >
        <Stack
          direction={{ base: 'column-reverse', lg: 'row' }}
          spacing={{ base: '10', lg: '16', xl: '24' }}
          {...stackProps}
        >
          <Stack
            // TODO: Replace rem value with token.
            maxW={{ lg: '28rem' }}
            justify='flex-start'
            w='full'
            layerStyle='no-scroll-bar'
            {...mainStackProps}
          >
            <Stack m='none' p='1' overflow='visible' overflowY='scroll'>
              {sectionOrder.map((section, i) => (
                <Box key={i} m='none' p='none' border='0' overflow='visible'>
                  {sectionMap[section]}
                </Box>
              ))}
            </Stack>
          </Stack>
          <Box flex='1' overflow='hidden'>
            <Skeleton height={!isLoaded ? '450px' : 'auto'} isLoaded={isLoaded}>
              {aside}
            </Skeleton>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
