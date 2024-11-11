'use client'

import { HamburgerIcon } from '@chakra-ui/icons'
import { Link } from '@chakra-ui/next-js'

import {
  Box,
  Button,
  ButtonProps,
  Container,
  Grid,
  GridItem,
  HStack,
  useToken,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

import { CartIcon } from '../CartIcon'
import { IoPersonCircleOutline } from 'react-icons/io5'

import { LangSwitch, LangSwitchProps } from '../LangSwitch'

interface BaseHeaderDesktopProps {
  accountDashboardButtonText: string
  accountDashboardUrl: string
  brandLogo?: ReactNode
  cartQuantity?: number
  homeUrl: string
  isLoggedIn: boolean
  loginButtonText: string
  loginUrl: string
  logout: () => void
  logoutButtonText: string
  myAccountButtonProps?: ButtonProps
  onOpenAccountDrawer?: () => void
  onOpenCartDrawer?: () => void
  onOpenMegaDrawer?: () => void
  isCartDrawerOpen: boolean
  isMegaDrawerOpen: boolean
  ariaCartDrawerLabel?: string
  ariaMegaDrawerLabel?: string
  searchComponent?: ReactNode
  userName?: string
}

export type HeaderDesktopProps = BaseHeaderDesktopProps & LangSwitchProps

export const HeaderDesktop = ({
  accountDashboardButtonText,
  accountDashboardUrl,
  brandLogo,
  cartQuantity,
  homeUrl,
  isLoggedIn,
  loginButtonText,
  loginUrl,
  logout,
  logoutButtonText,
  myAccountButtonProps,
  isCartDrawerOpen,
  isMegaDrawerOpen,
  ariaCartDrawerLabel = 'items in your shopping bag',
  ariaMegaDrawerLabel = 'Open main menu',
  onOpenAccountDrawer,
  onOpenCartDrawer,
  onOpenMegaDrawer,
  searchComponent,
  userName,
  ...langSwitchProps
}: HeaderDesktopProps) => {
  const [size8] = useToken('sizes', ['sizes.8'])
  const [colorText] = useToken('colors', ['colors.text'])

  return (
    <Box
      layerStyle='header-footer-padding'
      py={{ base: 2, md: 2.5 }}
      borderBottom={{
        base: 'sm',
        md: 'none',
      }}
    >
      <Container maxW='container.2xl'>
        <Grid gridTemplateColumns={{ base: '1fr', md: '1fr 4fr 1fr' }} gap='4'>
          <GridItem
            display='flex'
            flexDirection='row'
            justifyContent='center'
            alignItems='center'
            gap='3'
          >
            <Button
              name='menu'
              aria-label={ariaMegaDrawerLabel}
              aria-expanded={isMegaDrawerOpen}
              w='8'
              variant='unstyled'
              onClick={() => onOpenMegaDrawer?.()}
              display={{ base: 'block', md: 'none' }}
            >
              <HamburgerIcon boxSize='7' />
            </Button>
            {brandLogo && (
              <Link prefetch={true} href={homeUrl} position='relative' w='full'>
                {brandLogo}
              </Link>
            )}
            <HStack display={{ base: 'flex', md: 'none' }} gap='1' spacing='0'>
              <LangSwitch {...langSwitchProps} />

              <Button
                variant='link'
                name='my account'
                aria-label={`My account ${userName}`}
                boxSize='10'
                onClick={() => onOpenAccountDrawer?.()}
                display='flex'
                alignItems='center'
                justifyContent='center'
                {...myAccountButtonProps}
              >
                {isLoggedIn && userName && userName !== '' ? (
                  <Box
                    borderRadius='50%'
                    background='text'
                    color='background'
                    textStyle='blockquote-50'
                    fontWeight='700'
                    boxSize='7'
                    p='1'
                  >
                    {userName}
                  </Box>
                ) : (
                  <IoPersonCircleOutline size={size8} color={colorText} />
                )}
              </Button>
              <Button
                id='my-shopping-bag'
                name='my shopping bag'
                w='10'
                variant='unstyled'
                onClick={() => onOpenCartDrawer?.()}
                alignItems='center'
                justifyContent='center'
                aria-expanded={isCartDrawerOpen}
                aria-label={`${cartQuantity} ${ariaCartDrawerLabel}`}
              >
                <CartIcon cartQuantity={cartQuantity} />
              </Button>
            </HStack>
          </GridItem>

          <GridItem role='search'>{searchComponent}</GridItem>

          <GridItem justifySelf='end' display={{ base: 'none', md: 'flex' }}>
            <Box display='flex' justifyContent='end' alignItems='center'>
              <HStack gap='2' spacing='0'>
                <LangSwitch {...langSwitchProps} />
                <Button
                  variant='link'
                  name='my account'
                  aria-label={`My account ${userName}`}
                  boxSize='10'
                  onClick={() => onOpenAccountDrawer?.()}
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  {...myAccountButtonProps}
                >
                  {isLoggedIn && userName && userName !== '' ? (
                    <Box
                      borderRadius='50%'
                      background='text'
                      color='background'
                      textStyle='blockquote-50'
                      fontWeight='bold'
                      boxSize='7'
                      p='1'
                    >
                      {userName}
                    </Box>
                  ) : (
                    <IoPersonCircleOutline size={size8} color={colorText} />
                  )}
                </Button>

                <Button
                  id='my-shopping-bag'
                  name='my shopping bag'
                  w='10'
                  variant='unstyled'
                  onClick={() => onOpenCartDrawer?.()}
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  aria-expanded={isCartDrawerOpen}
                  aria-label={`${cartQuantity} ${ariaCartDrawerLabel}`}
                >
                  <CartIcon cartQuantity={cartQuantity} />
                </Button>
              </HStack>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}
