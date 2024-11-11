import React from 'react'
import {
  Flex,
  BoxProps,
  Heading,
  Text,
  TextProps,
  VisuallyHidden,
} from '@chakra-ui/react'
import { useIntl } from 'react-intl'

export interface SectionHeaderProps {
  /**
   * Indicates if the section has required fields.
   */
  hasRequiredFields?: boolean
  /**
   * Custom text to indicate required fields.
   */
  requiredMarkText?: string
  /**
   * Props to be passed to the required mark text component.
   */
  requiredMarkTextProps?: TextProps
  /**
   * Props to be passed to the heading text component.
   */
  textProps?: TextProps
  /**
   * Props to be passed to the Flex container that surrounds
   * title and required fields indicator.
   */
  boxProps?: BoxProps
  /**
   * Title text or element to be displayed in the section header.
   */
  title: string | React.ReactElement
  /**
   * If true, hides the section header visually but keeps
   * it accessible to screen readers.
   */
  visuallyHidden?: boolean
  /**
   * HTML tag to be used for the heading element.
   * Can be 'h1', 'h2', 'h3', 'h4', 'h5', or 'h6'.
   */
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /**
   * ID for the heading element which is generated
   * automatically by the <Section> component.
   */
  id?: string
}

/**
 * Component to display a required mark text.
 *
 * @param {Object} props
 *    The props for the RequiredMark component.
 * @param {string} [props.requiredMarkText]
 *    Custom text for the required mark.
 * @param {TextProps} [props.requiredMarkTextProps]
 *    Props to be passed to the required mark text component.
 * @returns {React.ReactElement}
 *    The rendered RequiredMark component.
 */
const RequiredMark = ({
  requiredMarkText,
  requiredMarkTextProps,
}: Pick<
  SectionHeaderProps,
  'requiredMarkTextProps' | 'requiredMarkText'
>): React.ReactElement => {
  const intl = useIntl()
  const defaultText = intl.formatMessage({
    id: 'section.required',
  })

  return (
    <Text
      textStyle='blockquote'
      color='text-muted'
      aria-label='required'
      {...requiredMarkTextProps}
    >
      {requiredMarkText ?? defaultText}
    </Text>
  )
}

// Declare the default heading tag if not specified.
const DefaultHeadingTag: SectionHeaderProps['headingTag'] = 'h2'

/**
 * A SectionHeader component that displays a heading
 * and optionally a required mark.
 *
 * @param {SectionHeaderProps} props
 *    The props for the SectionHeader component.
 * @returns {React.ReactElement}
 *    The rendered SectionHeader component.
 */
export const SectionHeader = ({
  hasRequiredFields,
  requiredMarkText,
  requiredMarkTextProps,
  textProps,
  boxProps,
  title,
  visuallyHidden = false,
  headingTag = DefaultHeadingTag,
  id,
}: SectionHeaderProps): React.ReactElement => {
  if (visuallyHidden) {
    return (
      <VisuallyHidden as='div'>
        {title && (
          <Heading as={headingTag} {...textProps} id={id}>
            {title}
          </Heading>
        )}
        {hasRequiredFields && (
          <RequiredMark
            requiredMarkText={requiredMarkText}
            requiredMarkTextProps={requiredMarkTextProps}
          />
        )}
      </VisuallyHidden>
    )
  }

  return (
    <Flex justifyContent='space-between' {...boxProps}>
      {title && (
        <Heading as={headingTag} {...textProps} id={id}>
          {title}
        </Heading>
      )}
      {hasRequiredFields && (
        <RequiredMark
          requiredMarkText={requiredMarkText}
          requiredMarkTextProps={requiredMarkTextProps}
        />
      )}
    </Flex>
  )
}
