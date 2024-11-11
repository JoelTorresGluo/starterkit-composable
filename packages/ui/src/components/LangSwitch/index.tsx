'use client'

import { FC, ReactNode, useState } from 'react'
import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger as OrigPopoverTrigger,
  Portal,
  useDisclosure,
  VisuallyHidden,
  useToken,
} from '@chakra-ui/react'
import { IoGlobeOutline } from 'react-icons/io5'
import FocusLock from 'react-focus-lock'

import { IntlConfig } from '@oriuminc/base'

export interface LangSwitchProps {
  intl: Pick<IntlConfig, 'code' | 'title'>[]
  setLocale: (locale: string) => void
  langSwitchTitle?: string
  liveAnnouncementText?: string
}

export const PopoverTrigger: FC<{ children: ReactNode }> = OrigPopoverTrigger

export const LangSwitch = ({
  intl,
  setLocale,
  langSwitchTitle = 'Language switcher',
  liveAnnouncementText = 'Language changed to',
}: LangSwitchProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure()

  const [liveAnnouncement, setLiveAnnouncement] = useState('')

  const handleLocaleChange = (locale: string, title: string) => {
    setLocale(locale)
    setLiveAnnouncement(`${liveAnnouncementText} ${title}`)
  }
  const [size7] = useToken('sizes', ['sizes.7'])
  const [colorText] = useToken('colors', ['colors.text'])

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button
          variant='unstyled'
          display='flex'
          alignItems='center'
          aria-label={langSwitchTitle}
          justifyContent='center'
          w='10'
        >
          <IoGlobeOutline
            size={size7}
            color={colorText}
            aria-hidden='true'
            focusable='false'
          />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          // TODO: Replace pixel value with token.
          w='200px'
        >
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverBody>
              {intl.map((el) => {
                return (
                  <Button
                    key={el.code}
                    role='button'
                    aria-label={el.title}
                    w='full'
                    fontSize='sm'
                    variant='unstyled'
                    onClick={() => {
                      handleLocaleChange(el.code, el.title)
                      onClose()
                    }}
                  >
                    {el.title}
                  </Button>
                )
              })}
            </PopoverBody>
          </FocusLock>
        </PopoverContent>
      </Portal>
      <VisuallyHidden aria-live='assertive'>{liveAnnouncement}</VisuallyHidden>
    </Popover>
  )
}
