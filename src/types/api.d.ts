export interface ApiResponse<T> {
  message: string
  data: T
}

export interface ApiError {
  error: string | string[]
  data: null
  message: string
}
