import {
  Box,
  Grid,
  GridItem,
  Stack,
  StackDivider,
  Text,
  TextProps,
} from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { SuccessSection } from './checkout-success-section'

export interface OrderDetailsProps {
  confirmationEmailAddress: string
  orderDate: string
  paymentMethod: {
    line1: string
    line2?: string
  }
  deliveryMethod: {
    line1: string
    line2?: string
  }
  billing: {
    name: string
    addressLine1: string
    addressLine2?: string
    cityRegionPostalCode: string
  }
  shipping: {
    name: string
    addressLine1: string
    addressLine2?: string
    cityRegionPostalCode: string
  }
  gridOrder?: {
    base?: string
    lg?: string
    md?: string
    sm?: string
  }
  withSummary?: boolean
}

export const OrderDetails = ({
  confirmationEmailAddress,
  orderDate,
  paymentMethod,
  deliveryMethod,
  billing,
  shipping,
  gridOrder,
  withSummary = false,
}: OrderDetailsProps) => {
  const intl = useIntl()

  return (
    <SuccessSection
      title={intl.formatMessage({ id: 'checkout.success.orderDetails.title' })}
    >
      <Stack spacing='4' divider={<StackDivider />}>
        <Stack spacing='4'>
          <InfoSection
            title={intl.formatMessage({
              id: 'checkout.success.orderDetails.confirmationEmail',
            })}
            content={[confirmationEmailAddress]}
          />
          <InfoSection
            title={intl.formatMessage({
              id: 'checkout.success.orderDetails.orderDate',
            })}
            content={[orderDate]}
          />
        </Stack>

        <Grid
          templateRows='repeat(1, 1fr)'
          templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
          gridTemplateAreas={
            gridOrder ?? {
              base: `"paymentMethod" "billingAddress" "delivery" "shippingAddress" "summaryCharges"`,
              lg: `
                  "paymentMethod delivery" 
                  "billingAddress shippingAddress" 
                  "summaryCharges summaryCharges"
              `,
            }
          }
          gap='6'
        >
          <GridItem gridArea='paymentMethod'>
            <InfoSection
              title={intl.formatMessage({
                id: 'checkout.success.orderDetails.paymentMethod',
              })}
              content={[paymentMethod?.line1 ?? '', paymentMethod?.line2 ?? '']}
              textTransform='capitalize'
            />
          </GridItem>
          <GridItem gridArea='billingAddress'>
            <InfoSection
              title={intl.formatMessage({
                id: 'checkout.success.orderDetails.billingAddress',
              })}
              content={[
                billing.name,
                billing.addressLine1,
                billing.addressLine2 ?? '',
                billing.cityRegionPostalCode ?? '',
              ]}
            />
          </GridItem>
          <GridItem gridArea='delivery'>
            <InfoSection
              title={intl.formatMessage({
                id: 'checkout.success.orderDetails.deliveryOption',
              })}
              content={[deliveryMethod.line1, deliveryMethod.line2 ?? '']}
            />
          </GridItem>
          <GridItem gridArea='shippingAddress'>
            <InfoSection
              title={intl.formatMessage({
                id: 'checkout.success.orderDetails.shippingAddress',
              })}
              content={[
                shipping.name,
                shipping.addressLine1,
                shipping.addressLine2 ?? '',
                shipping.cityRegionPostalCode ?? '',
              ]}
            />
          </GridItem>
          {withSummary && (
            <GridItem gridArea='summaryCharges'>
              <InfoSection
                // TODO: localize text.
                title='Summary Charges'
                content={[
                  shipping.name,
                  shipping.addressLine1,
                  shipping.addressLine2 ?? '',
                  shipping.cityRegionPostalCode ?? '',
                ]}
              />
            </GridItem>
          )}
        </Grid>
      </Stack>
    </SuccessSection>
  )
}

interface InfoSectionProps extends Omit<TextProps, 'content'> {
  title: string
  content: string[]
}

export const InfoSection = ({
  title,
  content,
  ...textProps
}: InfoSectionProps) => {
  return (
    <Box>
      <Text fontSize='sm' fontWeight='extrabold' {...textProps}>
        {title}
      </Text>
      {content.map((c, index) => (
        <Text {...textProps} key={index} fontSize='sm'>
          {c}
        </Text>
      ))}
    </Box>
  )
}
