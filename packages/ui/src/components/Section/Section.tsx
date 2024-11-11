import React, { ReactElement, useId } from 'react'
import { Box, BoxProps, useToken } from '@chakra-ui/react'
import {
  SectionHeader as DefaultSectionHeader,
  SectionHeaderProps,
} from './SectionHeader'

interface SectionProps {
  /**
   * Props to be passed to the Box component.
   */
  boxProps?: BoxProps
  /**
   * Props to be passed to the SectionHeader component:
   * - title
   * - hasRequiredFields: optional boolean for displaying
   *   required fields indicator
   * - requiredMarkText: optional string for custom
   *   required fields indicator text.
   * - requiredMarkTextProps: optional props for
   *   required fields indicator.
   * - textProps: optional props for title heading.
   * - boxProps: optional props for the Box that surrounds title and
   *   required fields indicator.
   * - visuallyHidden: optional boolean to  hide SectionHeader
   *   but keeps it for screen readers
   * - headingTag: 'h1', 'h2', 'h3', 'h4', 'h5', or 'h6'
   */
  headerProps: SectionHeaderProps
  /**
   * The content to be displayed within the section.
   */
  children: React.ReactNode
  /**
   * Custom SectionHeader component to be used instead of the default.
   */
  SectionHeader?: React.ComponentType<SectionHeaderProps>
  /**
   * HTML tag to be used for the section container. Can be
   * 'section', 'aside', or 'nav'. Defaults to 'section'.
   */
  sectionTag?: 'section' | 'aside' | 'nav' | 'article'
}

// Declare the default section tag if not specified.
const DefaultSectionTag: SectionProps['sectionTag'] = 'section'

/**
 * A Section component that includes a header and content area.
 *
 * @param {SectionProps} props
 *    The props for the Section component. 'headerProps' is required!
 * @returns {ReactElement}
 *    The rendered Section component.
 */
export const Section = ({
  boxProps,
  headerProps,
  children,
  SectionHeader = DefaultSectionHeader,
  sectionTag = DefaultSectionTag,
}: SectionProps): ReactElement => {
  const sectionTitleId = `section-title-${useId()}`
  const updatedHeaderProps = { ...headerProps, id: sectionTitleId }
  const [size4, size6, size8, size10] = useToken('sizes', [
    'sizes.4',
    'sizes.6',
    'sizes.8',
    'sizes.10',
  ])

  return (
    <Box
      aria-labelledby={sectionTitleId}
      as={sectionTag}
      bg='background'
      p={{
        base: `${size6} ${size4}`,
        md: `${size8} ${size6} ${size10}`,
      }}
      {...boxProps}
    >
      <SectionHeader {...updatedHeaderProps} />
      {children}
    </Box>
  )
}
