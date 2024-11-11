'use client'

import { useIntl } from 'react-intl'
import { useRef, useState } from 'react'
import {
  Alert,
  AlertDescription,
  Button,
  ButtonGroup,
  Collapse,
  HStack,
  Radio,
  RadioProps,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { Section } from '@oriuminc/ui'

export type FormStatus = 'success' | 'error' | undefined

export interface EditableContentCardProps {
  action1?: string
  action2?: string
  alertExpireTime?: number
  deleteFn?: () => void
  edit?: React.ReactElement
  editModeOn?: boolean
  editTitle?: string
  isDirty?: boolean
  isLoading?: boolean
  onCancel?: undefined | (() => void)
  onSubmit?: () => void
  radioProps?: RadioProps
  radioText?: string
  readOnly?: React.ReactElement
  resetEditForm?: () => void
  setStatus?: React.Dispatch<React.SetStateAction<FormStatus>>
  showAction1?: boolean
  showAction2?: boolean
  showRadio?: boolean
  size: 'Large' | 'Small'
  status?: FormStatus
  title?: string
  updateButtonLabel?: string
  deleteButtonRef?: React.RefObject<HTMLButtonElement>
}

// TODO: refactor - remove all those onCancel onSumit to buttonProps
// ie: submitButtonProps, cancelButtonProps etc...
export const EditableContentCard = ({
  action1, // Edit
  action2, // Delete
  alertExpireTime = 250,
  deleteFn,
  edit,
  editModeOn = false,
  editTitle,
  isDirty,
  isLoading,
  onCancel,
  onSubmit,
  radioProps,
  radioText,
  readOnly,
  resetEditForm,
  setStatus,
  showAction1 = true,
  showAction2 = true,
  showRadio,
  size = 'Large',
  status,
  title,
  updateButtonLabel,
  deleteButtonRef,
}: EditableContentCardProps) => {
  const intl = useIntl()
  const editButtonRef = useRef<HTMLButtonElement>(null)
  const [initialLoad, setInitialLoad] = useState(true)

  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: editModeOn,
  })
  useEffect(() => {
    if (status === 'success' && !editModeOn)
      setTimeout(() => {
        onClose()
      }, alertExpireTime)
  }, [status, onClose, alertExpireTime, editModeOn])

  useEffect(() => {
    if (!isOpen && !initialLoad) {
      // fix a race condition with the focus on the edit button vs alert
      setTimeout(() => {
        editButtonRef.current?.focus()
      }, 0)
    }
    setInitialLoad(false)
  }, [isOpen])

  const content = {
    button: {
      cancel: intl.formatMessage({ id: 'action.cancel' }),
      delete: action2 ?? intl.formatMessage({ id: 'action.delete' }),
      edit: action1 ?? intl.formatMessage({ id: 'action.edit' }),
      submit: updateButtonLabel ?? intl.formatMessage({ id: 'action.update' }),
    },
    alert: {
      error: intl.formatMessage({ id: 'account.dashboard.submit.error' }),
      success: intl.formatMessage(
        {
          id: 'account.dashboard.submit.success',
        },
        { title: title ?? '' }
      ),
    },
  }

  const EditButton = () => (
    <Button
      size='sm'
      color='text'
      variant='ghost'
      textDecoration='underline'
      ref={editButtonRef}
      aria-label={`${content.button.edit} ${title}`}
      onClick={() => {
        setStatus?.(undefined)
        onOpen()
      }}
    >
      {content.button.edit}
    </Button>
  )
  const DeleteButton = ({ onClick }: { onClick: () => void }) => (
    <Button
      size='sm'
      color='text'
      variant='ghost'
      onClick={onClick}
      ref={deleteButtonRef}
      aria-label={`${content.button.delete} ${title}`}
      textDecoration='underline'
    >
      {content.button.delete}
    </Button>
  )
  const CancelSubmitButtons = () => (
    <ButtonGroup justifyContent='flex-end' size='sm' w='full'>
      <Button
        size='lg'
        variant='outline'
        type='reset'
        isDisabled={isLoading}
        onClick={() => {
          resetEditForm?.()
          onClose()
          onCancel?.()
        }}
      >
        {content.button.cancel}
      </Button>
      <Button
        size='lg'
        variant='solid'
        type='submit'
        isLoading={isLoading}
        disabled={!onSubmit || (isDirty !== undefined && !isDirty)}
        onClick={() => onSubmit?.()}
      >
        {content.button.submit}
      </Button>
    </ButtonGroup>
  )

  return (
    <VStack
      // TODO: Replace pixel value with token.
      maxW={size === 'Large' ? 'full' : '335px'}
      direction='column'
      spacing='4'
      pt='6'
      pb='8'
      px='4'
      bg='colors.surface.muted'
      alignItems='stretch'
      // This is so the stripe autocomplete component doesnt get clipped.
      sx={{
        '.chakra-collapse:has(iframe)': {
          overflow: 'visible !important',
        },
      }}
    >
      {/* Edit Mode */}
      {edit && (
        <Collapse in={isOpen} unmountOnExit animateOpacity>
          {!title || !editTitle ? (
            <VStack pt='4' pb='1' px='1' spacing='4' alignItems='stretch'>
              {status === 'error' && (
                <Alert status='error'>
                  <AlertDescription>{content.alert.error}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={(e) => e.preventDefault()}>
                <VStack w='full' alignItems='stretch' mb='6'>
                  {edit}
                </VStack>
                <CancelSubmitButtons />
              </form>
            </VStack>
          ) : (
            <Section
              headerProps={{
                hasRequiredFields: true,
                title: editTitle ? editTitle : title,
                headingTag: 'h3',
                boxProps: {
                  h: 8,
                  mb: 'none',
                },
                textProps: {
                  textStyle: { base: 'mobile-200', md: 'desktop-200' },
                  width: 'fit-content',
                },
              }}
              boxProps={{
                display: 'flex',
                flexDirection: 'column',
                pt: 4,
                pb: 1,
                px: 1,
                gap: 4,
                alignItems: 'stretch',
              }}
            >
              {status === 'error' && (
                <Alert status='error'>
                  <AlertDescription>{content.alert.error}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={(e) => e.preventDefault()}>
                <VStack w='full' alignItems='stretch' mb='6'>
                  {edit}
                </VStack>
                <CancelSubmitButtons />
              </form>
            </Section>
          )}
        </Collapse>
      )}

      {/* readOnly Mode */}
      {readOnly && (
        <VStack
          spacing='4'
          alignItems='stretch'
          display={isOpen ? 'none' : 'initial'}
        >
          <HStack w='full'>
            <Text as='h3' textStyle='heading-200' w='full'>
              {title}
            </Text>
            <ButtonGroup>
              {showAction1 && edit && <EditButton />}
              {showAction2 && deleteFn && <DeleteButton onClick={deleteFn} />}
            </ButtonGroup>
          </HStack>

          {/* {status === 'success' && ( */}
          <Alert
            display={status === 'success' ? 'flex' : 'none'}
            status='success'
            my='2'
          >
            {content.alert.success}
          </Alert>
          {/* )} */}

          <VStack align='flex-start'>{readOnly}</VStack>
          {showRadio && (
            <Radio
              size='md'
              defaultChecked={false}
              background='background'
              {...radioProps}
            >
              <Text textStyle='blockquote-75'>{radioText}</Text>
            </Radio>
          )}
        </VStack>
      )}
    </VStack>
  )
}
