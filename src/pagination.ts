export interface PaginationParams {
  limit?: number
  offset?: number
}

export interface PaginatedResponse<T> {
  results: T[]
  paging: {
    total?: number
  } & PaginationParams
}
