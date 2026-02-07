import { NextResponse } from 'next/server'
import { z } from 'zod'

/**
 * Standard API response schema
 */
export const apiResponseSchema = z.object({
  message: z.string(),
  data: z.any().nullable(),
  error: z.any().nullable(),
})

export type ApiResponse<T> = z.infer<typeof apiResponseSchema> & {
  data?: T
}

/**
 * Create a successful API response
 *
 * @param data - The response data
 * @param status - HTTP status code (default: 200)
 * @returns NextResponse with success message
 */
export function success<T>(data: T, status = 200) {
  return NextResponse.json(
    { message: 'ok', data, error: null },
    { status },
  )
}

/**
 * Create an unauthorized (401) response
 *
 * @param message - Error message (default: "Unauthorized")
 * @returns NextResponse with 401 status
 */
export function unauthorized(message = 'Unauthorized') {
  return NextResponse.json(
    { message, data: null, error: message },
    { status: 401 },
  )
}

/**
 * Create a validation error (400) response
 *
 * @param errors - Array of error messages
 * @returns NextResponse with 400 status
 */
export function validationError(errors: string[]) {
  return NextResponse.json(
    { message: 'Validation failed', data: null, error: errors },
    { status: 400 },
  )
}

/**
 * Create a conflict (409) response
 *
 * @param message - Conflict message
 * @returns NextResponse with 409 status
 */
export function conflict(message: string) {
  return NextResponse.json(
    { message, data: null, error: message },
    { status: 409 },
  )
}

/**
 * Create an internal server error (500) response
 * Logs the error to console
 *
 * @param error - The error object
 * @returns NextResponse with 500 status
 */
export function serverError(error: unknown) {
  console.error('Server error:', error)
  return NextResponse.json(
    { message: 'Internal server error', data: null, error: 'Internal server error' },
    { status: 500 },
  )
}

/**
 * Create a not found (404) response
 *
 * @param message - Error message (default: "Not found")
 * @returns NextResponse with 404 status
 */
export function notFound(message = 'Not found') {
  return NextResponse.json(
    { message, data: null, error: message },
    { status: 404 },
  )
}
