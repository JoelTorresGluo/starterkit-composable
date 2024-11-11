export type ComposableCheckoutFetchBusinessUnits = () => Promise<BusinessUnits>

export enum BusinessUnitAssociateMode {
  Explicit = 'Explicit',
  ExplicitAndFromParent = 'ExplicitAndFromParent',
}

export enum BusinessUnitStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export enum BusinessUnitType {
  Company = 'Company',
  Division = 'Division',
}

export enum Permission {
  AcceptMyQuotes = 'AcceptMyQuotes',
  AcceptOthersQuotes = 'AcceptOthersQuotes',
  AddChildUnits = 'AddChildUnits',
  CreateApprovalRules = 'CreateApprovalRules',
  CreateMyCarts = 'CreateMyCarts',
  CreateMyOrdersFromMyCarts = 'CreateMyOrdersFromMyCarts',
  CreateMyOrdersFromMyQuotes = 'CreateMyOrdersFromMyQuotes',
  CreateMyQuoteRequestsFromMyCarts = 'CreateMyQuoteRequestsFromMyCarts',
  CreateOrdersFromOthersCarts = 'CreateOrdersFromOthersCarts',
  CreateOrdersFromOthersQuotes = 'CreateOrdersFromOthersQuotes',
  CreateOthersCarts = 'CreateOthersCarts',
  CreateQuoteRequestsFromOthersCarts = 'CreateQuoteRequestsFromOthersCarts',
  DeclineMyQuotes = 'DeclineMyQuotes',
  DeclineOthersQuotes = 'DeclineOthersQuotes',
  DeleteMyCarts = 'DeleteMyCarts',
  DeleteOthersCarts = 'DeleteOthersCarts',
  ReassignMyQuotes = 'ReassignMyQuotes',
  ReassignOthersQuotes = 'ReassignOthersQuotes',
  RenegotiateMyQuotes = 'RenegotiateMyQuotes',
  RenegotiateOthersQuotes = 'RenegotiateOthersQuotes',
  UpdateApprovalFlows = 'UpdateApprovalFlows',
  UpdateApprovalRules = 'UpdateApprovalRules',
  UpdateAssociates = 'UpdateAssociates',
  UpdateBusinessUnitDetails = 'UpdateBusinessUnitDetails',
  UpdateMyCarts = 'UpdateMyCarts',
  UpdateMyOrders = 'UpdateMyOrders',
  UpdateMyQuoteRequests = 'UpdateMyQuoteRequests',
  UpdateOthersCarts = 'UpdateOthersCarts',
  UpdateOthersOrders = 'UpdateOthersOrders',
  UpdateOthersQuoteRequests = 'UpdateOthersQuoteRequests',
  UpdateParentUnit = 'UpdateParentUnit',
  ViewMyCarts = 'ViewMyCarts',
  ViewMyOrders = 'ViewMyOrders',
  ViewMyQuoteRequests = 'ViewMyQuoteRequests',
  ViewMyQuotes = 'ViewMyQuotes',
  ViewOthersCarts = 'ViewOthersCarts',
  ViewOthersOrders = 'ViewOthersOrders',
  ViewOthersQuoteRequests = 'ViewOthersQuoteRequests',
  ViewOthersQuotes = 'ViewOthersQuotes',
}

export interface BusinessUnits {
  id: string
  name: string
  key: string
  associateMode: BusinessUnitAssociateMode
  storeMode?: string | null
  status: BusinessUnitStatus
  version: any
  unitType: BusinessUnitType
  contactEmail?: string | null
  defaultShippingAddressId?: string | null
  defaultBillingAddressId?: string | null
  stores?: Array<{
    id: string
    key: string
    distributionChannels: Array<{
      id: string
      key: string
    }>
  }> | null
  addresses: Array<{
    id?: string | null
    email?: string | null
    salutation?: string | null
    title?: string | null
    firstName?: string | null
    lastName?: string | null
    company?: string | null
    country: any
    city?: string | null
    streetName?: string | null
    streetNumber?: string | null
    state?: string | null
    region?: string | null
    apartment?: string | null
    building?: string | null
    postalCode?: string | null
    pOBox?: string | null
    phone?: string | null
    mobile?: string | null
    fax?: string | null
    additionalAddressInfo?: string | null
    additionalStreetInfo?: string | null
  }>
  topLevelUnit: { key: string }
  parentUnit?: { key: string } | null
  associates: Array<{
    associateRoleAssignments: Array<{
      associateRole: {
        key: string
        permissions: Array<Permission>
      }
    }>
    customerRef?: { id: string } | null
  }>
}
