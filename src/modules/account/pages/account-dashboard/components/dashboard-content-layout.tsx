'use client'

import {
  Flex,
  Text,
  Show,
  Container,
  Box,
  VStack,
  ButtonProps,
  Button,
  ContainerProps,
} from '@chakra-ui/react'

export interface DashboardContentLayoutProps {
  actionButtonProps?: ButtonProps & React.RefAttributes<HTMLButtonElement>
  actionButtonText?: string
  children?: React.ReactNode
  containerProps?: ContainerProps & React.RefAttributes<HTMLDivElement>
  subTitle?: string
  title: string
}

export const DashboardContentLayout = ({
  actionButtonProps,
  actionButtonText,
  children,
  containerProps,
  subTitle,
  title,
}: DashboardContentLayoutProps) => {
  return (
    <Container m='none' maxW='full' {...containerProps}>
      <Flex
        alignItems='center'
        justifyContent='space-between'
        mb={{ base: 4, md: 8 }}
        minHeight={{ base: 6, md: 12 }}
      >
        <VStack alignItems='flex-start'>
          <Text as='h2' textStyle={{ base: 'mobile-300', md: 'desktop-400' }}>
            {title}
          </Text>
          {subTitle && (
            <Text as='h3' textStyle='blockquote-100' textColor='text-muted'>
              {subTitle}
            </Text>
          )}
        </VStack>
        <Show above='md'>
          {actionButtonText && (
            <Button
              size='lg'
              variant='solid'
              w={{ base: 'full', md: 'fit-content' }}
              {...actionButtonProps}
            >
              {actionButtonText}
            </Button>
          )}
        </Show>
      </Flex>
      {children}
      <Show below='md'>
        {actionButtonText && (
          <Box mb='10'>
            <Button
              size='lg'
              variant='solid'
              w={{ base: 'full', md: 'fit-content' }}
              {...actionButtonProps}
            >
              {actionButtonText}
            </Button>
          </Box>
        )}
      </Show>
    </Container>
  )
}
